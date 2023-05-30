import { z } from "zod";

import {
  EncryptedFormLocalState,
  base64UrlDecode,
  encryptFile,
  encryptFormData,
  initializeEncryptedFormLocalState,
  decryptFileContents,
  FileMetadata,
  Sodium,
} from "@socialgouv/e2esdk-crypto";

import { Client } from "@socialgouv/e2esdk-client";

import { decryptedDataSchema } from "../../pages/form";
import { fetchHasura } from "./hasura";
import { insert_one } from "../queries/form";

const formMetadata = z.object({
  id: z.number(),
  created_at: z.string(),
  public_key: z.string(),
  sealed_secret: z.string(),
  signature: z.string(),
});

export type EncryptedAnswer = z.infer<typeof formMetadata> & { data: string };

type SubmissionQueryVariables = {
  submissionBucketId: string;
  signature: string;
  sealedSecret: string;
  publicKey: string;
  answersFiles: any[];
  data: string;
};

/**
 * Download a file based on its metadata :
 * - use the hash to download encrypted blob
 * - use the metadata to decipher
 * todo: extract to e2esdk ?
 */
export async function downloadAndDecryptFile(
  sodium: Sodium,
  metadata: FileMetadata
) {
  const res = await fetch(`/api/storage?hash=${metadata.hash}`);
  const blob = await res.blob();
  const cleartext = decryptFileContents(
    sodium,
    new Uint8Array(await blob.arrayBuffer()),
    {
      algorithm: "secretBox",
      key: sodium.from_base64(metadata.key),
    }
  );
  return new File([cleartext], metadata.name, {
    type: metadata.type,
    lastModified: metadata.lastModified,
  });
}

/**
 * Decrypt a given answer
 * - decrypt the encrypted values
 * - parse and validate with zod
 * todo: extract to e2esdk
 */
export const decryptAnswer = (
  client: Client,
  nameFingerprint: string,
  answer: EncryptedAnswer
) => {
  try {
    const values = client.unsealFormData(
      {
        metadata: {
          publicKey: answer.public_key,
          sealedSecret: answer.sealed_secret,
          signature: answer.signature,
        },
        encrypted: { data: answer.data },
      },
      nameFingerprint
    ) as Record<"data", string>;

    const decryptedValues: FormData = JSON.parse(values.data);
    const res = decryptedDataSchema.safeParse(decryptedValues);
    if (!res.success) {
      console.error(`Zod: Impossible de parser la réponse ${answer.id}`);
      console.error(res.error);
      // warning : returning null here is recommended to avoid security issues where malicious content is sent that could break the rendering process, and lead to a blank page.
      // return null;

      return {
        ...answer,
        ...decryptedValues,
      };
    }
    return {
      ...answer,
      ...res.data,
      data: undefined,
    };
  } catch (e) {
    console.error(`e2esdk: Impossible de parser la réponse ${answer.id}`);
    console.error(e);
    return null;
  }
};

/**
 * return encrypted version and metadata for a given `File`
 * todo: extract to e2esdk
 */
export const readAndEncryptFile = async (
  file: File,
  encryptionState: EncryptedFormLocalState
): Promise<ReturnType<typeof encryptFile>> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = () => reject("file reading was aborted");
    reader.onerror = () => reject("file reading has failed");
    reader.onload = async () => {
      const binaryStr = reader.result;
      if (binaryStr) {
        const { encryptedFile, metadata } = await encryptFile(
          encryptionState.sodium,
          file
        );
        resolve({ encryptedFile, metadata });
      }
    };
    reader.readAsArrayBuffer(file);
  });

/**
 * Encrypt input data using e2esdk and submit to the server
 * - create a dedicated FormLocalState
 * - encrypt files using e2esdk readAndEncryptFile
 * - upload encrypted files and keep track of files in submitted data
 * - submit the whole encrypted form data, with files references
 */
export const encryptAndSubmitForm = async (
  formPublicKeyString: string,
  formName: string,
  data: Record<string, any>
) => {
  const formPublicKey = base64UrlDecode(formPublicKeyString);

  // initialize form encryption context
  const state = await initializeEncryptedFormLocalState(
    formName,
    formPublicKey
  );

  // first encrypt files if any
  const answersFiles = [];
  if (data.files) {
    const { files } = data;
    delete data.files;
    const encryptedFiles = await Promise.all(
      files.map((file: File) => readAndEncryptFile(file, state))
    );
    const formData = new FormData();
    for (let i = 0; i < encryptedFiles.length; i++) {
      const { encryptedFile, metadata } = encryptedFiles[i];
      formData.set(`file_${i}`, encryptedFile);
    }
    // add `filesMetadata` to our data object, it will be encrypted too
    data.filesMetadata = {};
    // upload files and save metadata
    if (Array.from(formData.values()).flat().length > 0) {
      await fetch("/api/upload-answers-files", {
        method: "POST",
        body: formData,
      });
      for (const { metadata } of encryptedFiles) {
        const { hash } = metadata;
        // the file_hash is kept as a reference in cleartext in the application database
        answersFiles.push({ file_hash: hash });
        data.filesMetadata[hash] = metadata;
      }
    }
  }

  // encrypt our `data` object
  const { metadata, encrypted } = encryptFormData(
    { data: JSON.stringify(data) },
    state
  );

  // prepare hasura graphql query variables
  const variables: SubmissionQueryVariables = {
    submissionBucketId: formName,
    sealedSecret: metadata.sealedSecret,
    signature: metadata.signature,
    publicKey: metadata.publicKey,
    answersFiles,
    ...encrypted,
  };

  return fetchHasura({
    query: insert_one,
    variables,
  });
};
