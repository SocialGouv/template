/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { fetchHasura } from "../src/lib/hasura";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";

import { generateFormData } from "../src/services/fake-form-data";

import {
  EncryptedFormLocalState,
  base64UrlDecode,
  encryptFile,
  encryptFormData,
  initializeEncryptedFormLocalState,
} from "@socialgouv/e2esdk-crypto";
import { insert_one } from "../src/queries/form";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { z } from "zod";
import { fr } from "@codegouvfr/react-dsfr";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";

const formPublicKeyString = "AatyS2mCJd__zewF-mT_IEd4925CQgf-CC9U3U3ZRnk"; // form public key
const nameFingerprint = "73ZLcYHHAhx6rgMbgpPgc0F1qE89oWOAq6UGdrHkkJQ"; // workspace nameFingerprint

type PostVariables = {
  submissionBucketId: string;
  signature: string;
  sealedSecret: string;
  publicKey: string;
  answersFiles: any[];
  data: string;
};

export const jsonDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  message: z.string(),
  email: z.string().email().optional(),
  color: z.string().optional(),
  newsletter: z.boolean().optional().default(false),
  alerts: z.boolean().optional().default(false),
  files: z.array(z.any()),
});

type FormData = z.infer<typeof jsonDataSchema>;

function generateSubmissions() {
  // generate and submit bunch of fake submissions
  const rows = Array.from({ length: 100 }, () => generateFormData());
  console.time("encryptAndSubmitForm");
  return Promise.all(rows.map(encryptAndSubmitForm)).then(() => {
    console.timeEnd("encryptAndSubmitForm");
  });
}

const encryptAndSubmitForm = async (data: Record<string, any>) => {
  const formPublicKey = base64UrlDecode(formPublicKeyString);
  const state = await initializeEncryptedFormLocalState(
    nameFingerprint, //submissionBucketId,
    formPublicKey
  );

  const answersFiles = [];
  if (data.files) {
    const { files } = data;
    delete data.files;
    const encryptedFiles = await Promise.all(
      files.map((file: File) => readAndEncryptFile(file, state))
    );
    // console.log("encryptedFiles", encryptedFiles);
    const formData = new FormData();
    for (let i = 0; i < encryptedFiles.length; i++) {
      const { encryptedFile, metadata } = encryptedFiles[i];
      console.dir({ encryptedFile, metadata }, { depth: Infinity });
      formData.set(`file_${i}`, encryptedFile);
    }
    if (Array.from(formData.values()).flat().length > 0) {
      await fetch("/api/upload-answers-files", {
        method: "POST",
        body: formData,
      });
      for (const { metadata } of encryptedFiles) {
        const { hash, key } = metadata;
        answersFiles.push({ file_hash: hash, file_key: key });
      }
    }
  }

  const { metadata, encrypted } = encryptFormData(
    { data: JSON.stringify(data) },
    state
  );

  const variables: PostVariables = {
    submissionBucketId: nameFingerprint,
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

const removeFromArray = (arr: any[], value: any) => {
  const index = arr.indexOf(value);
  if (index > -1) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }
  return arr;
};

const readAndEncryptFile = (
  file: File,
  encryptionState: EncryptedFormLocalState
): Promise<{ encryptedFile: File; metadata: Record<string, any> }> =>
  new Promise((resolve, reject) => {
    console.time("readAndEncryptFile " + file.name);
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
        console.timeEnd("readAndEncryptFile " + file.name);
        resolve({ encryptedFile, metadata });
      }
    };
    reader.readAsArrayBuffer(file);
  });

const Form: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<FormData>({ mode: "onChange" });
  const { isDark } = useIsDark();
  const [formSuccess, setFormSuccess] = useState<boolean | null>(null);
  const [formError, setFormError] = useState<boolean | null>(null);
  const [uploads, setUploads] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const successes = [...uploads];
    acceptedFiles.forEach((file) => {
      successes.push(file);
      setUploads(successes);
    });
  };

  const onRemoveUploadClick = (upload: File) => {
    const handler: React.MouseEventHandler<HTMLSpanElement> = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const newUploads = removeFromArray(uploads, upload);
      setUploads(newUploads);
    };
    return handler;
  };

  const {
    getRootProps: getDropZoneRootProps,
    getInputProps: getDropZoneInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log("handleSubmit", data);
    setFormError(null);
    setFormSuccess(null);

    data.files = uploads; // update to local state

    encryptAndSubmitForm(data)
      .then((res) => {
        if (res?.data?.insert_answers_one?.id) {
          setFormError(false);
          setFormSuccess(true);
          reset();
        }
      })
      .catch((e) => {
        console.error(e);
        setFormError(true);
        setFormSuccess(false);
      });
  });

  return (
    <>
      <Head>
        <title>e2esdk demo - SocialGouv</title>/
      </Head>
      <Alert
        description="Ce formulaire utilise du chiffrement côté client avant d'envoyer les données."
        severity="info"
        small
      />
      {formSuccess && (
        <Alert
          description="Données chiffrées et envoyées"
          severity="success"
          small
        />
      )}
      {formError && (
        <Alert
          description="Impossible d'envoyer les données"
          severity="error"
          small
        />
      )}
      <br />
      <form onSubmit={onSubmit}>
        <Input
          label="Nom"
          nativeInputProps={{ ...register("firstName", { required: true }) }}
        />
        <Input label="Prénom(s)" nativeInputProps={register("lastName")} />
        <Input
          label="Email"
          nativeInputProps={{
            type: "email",
            ...register("email"),
          }}
        />
        <RadioButtons
          legend="Thème de couleur préféré"
          options={[
            {
              label: "Quiet Light",
              nativeInputProps: {
                value: "Quiet Light",
                ...register("color"),
              },
            },
            {
              label: "Monokai",
              nativeInputProps: {
                value: "Monokai",
                ...register("color"),
              },
            },
            {
              label: "Solarized",
              nativeInputProps: {
                value: "Solarized",
                ...register("color"),
              },
            },
            {
              label: "DSFR",
              nativeInputProps: {
                value: "DSFR",
                ...register("color"),
              },
            },
          ]}
          orientation="horizontal"
        />
        <Checkbox
          legend="Communications"
          options={[
            {
              label: "Recevoir la newsletter",
              nativeInputProps: {
                ...register("newsletter"),
              },
            },
            {
              label: "Recevoir les alertes",
              nativeInputProps: {
                ...register("alerts"),
              },
            },
          ]}
        />
        <Input
          label="Message"
          textArea={true}
          nativeTextAreaProps={{
            ...register("message"),
            rows: 6,
          }}
        />
        <div {...getDropZoneRootProps()}>
          <Input
            label="Vos fichiers"
            nativeInputProps={{ ...getDropZoneInputProps() }}
            {...register("files")}
          />
          <div
            style={{
              border: "3px dashed auto",
              padding: 10,
              marginTop: 10,
              minHeight: 100,
              borderColor:
                fr.getColors(isDark)?.decisions.background.alt.grey.active,
              backgroundColor: isDragActive
                ? fr.getColors(isDark)?.decisions.background.alt.grey.active
                : fr.getColors(isDark)?.decisions.background.contrast.grey
                    .default,
            }}
          >
            Déposez vos fichiers ici...
            {(uploads.length && (
              <div style={{ marginTop: 10 }}>
                {uploads.map((upload, i) => (
                  <li key={upload.name + i}>
                    {upload.name}{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={onRemoveUploadClick(upload)}
                    >
                      X
                    </span>
                  </li>
                ))}
              </div>
            )) ||
              null}
          </div>
        </div>
        <br />
        <Button onClick={onSubmit} disabled={!isDirty || !isValid}>
          Envoyer
        </Button>
        <br />
        <br />
        <Button onClick={generateSubmissions}>
          Send 100 random submissinos
        </Button>
      </form>
    </>
  );
};

export default Form;
