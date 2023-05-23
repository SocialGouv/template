import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useE2ESDKClient,
  useE2ESDKClientIdentity,
} from "@socialgouv/e2esdk-react";
import {
  decryptFileContents,
  FileMetadata,
  Sodium,
} from "@socialgouv/e2esdk-crypto";

import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchHasura } from "../src/lib/hasura";
import { query } from "../src/queries/form";
import { jsonDataSchema } from "./form";

import { z } from "zod";
import { Client } from "@socialgouv/e2esdk-client";
import { fr } from "@codegouvfr/react-dsfr";

const nameFingerprint = "73ZLcYHHAhx6rgMbgpPgc0F1qE89oWOAq6UGdrHkkJQ";

const formMetadata = z.object({
  id: z.number(),
  created_at: z.string(),
  public_key: z.string(),
  sealed_secret: z.string(),
  signature: z.string(),
});

type EncryptedAnswer = z.infer<typeof formMetadata> & { data: string };

type AnswersResponse = {
  errors?: { message: string }[];
  data: {
    answers: EncryptedAnswer[];
  };
};

async function downloadAndDecryptFile(sodium: Sodium, metadata: FileMetadata) {
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

const decryptAnswer = (client: Client, answer: EncryptedAnswer) => {
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
    const res = jsonDataSchema.safeParse(decryptedValues);
    if (!res.success) {
      console.error(`Zod: Impossible de parser la réponse ${answer.id}`);
      // return null here if you dont want to accept invalid zod schemas
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
    return null;
  }
};

function saveFile(file: File) {
  const link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(file));
  link.setAttribute("download", file.name);
  link.click();
  URL.revokeObjectURL(link.href);
}

const Answers: NextPage = () => {
  const client = useE2ESDKClient();

  const onFileClick = useCallback(
    async (metadata: FileMetadata) => {
      const file = await downloadAndDecryptFile(client.sodium, metadata);
      await saveFile(file);
    },
    [client]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },

      {
        field: "created_at",
        headerName: "Created at",
        width: 130,
        type: "date",
        valueGetter: (val) => new Date(val.row.created_at),
      },
      {
        field: "firstName",
        type: "string",
        headerName: "First name",
        width: 120,
      },
      {
        field: "lastName",
        type: "string",
        headerName: "Last name",
        width: 120,
      },
      {
        field: "email",
        headerName: "Email",
        type: "email",
        width: 150,
        renderCell: (cell) => (
          <a href={`mailto:${cell.row.email}`}>{cell.row.email}</a>
        ),
      },

      {
        field: "newsletter",
        headerName: "Emails",
        width: 70,
        align: "center",
        valueGetter: (val) => (val.row.newsletter && "✅") || "❌",
      },
      {
        field: "alerts",
        headerName: "Alertes",
        width: 70,
        align: "center",
        valueGetter: (val) => (val.row.alerts && "✅") || "❌",
      },
      {
        field: "message",
        headerName: "Message",
        type: "text",
        flex: 1,
      },
      {
        field: "filesData",
        headerName: "Fichiers",
        type: "text",
        flex: 1,
        width: 70,
        renderCell: (cell) => {
          const fileList: FileMetadata[] = Object.values(
            cell.row.filesMetadata || {}
          );
          const { FilesModal, filesModalButtonProps } = createModal({
            name: "files", // The name of Modal component and modalButtonProps is compute from this string
            isOpenedByDefault: false,
          });

          return fileList.map((metadata) => (
            <span
              key={metadata.hash}
              title={metadata.name}
              className={fr.cx("fr-icon-file-download-fill")}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFileClick(metadata);
              }}
              aria-hidden={true}
            ></span>
          ));
        },
      },
    ],
    [onFileClick]
  );

  const { data: session } = useSession();
  const token = useMemo(
    () => ({
      //@ts-ignore
      accessToken: session?.accessToken || "",
      //@ts-ignore
      refreshToken: session?.refreshToken || "",
      //@ts-ignore
      accessTokenExpires: session?.accessTokenExpires || 0,
    }),
    [session]
  );
  const [answers, setAnswers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const identity = useE2ESDKClientIdentity();

  const fetchAnswers = useCallback(
    () =>
      fetchHasura({ query }, token).then((res: AnswersResponse) =>
        res.data.answers
          .map((answer) => decryptAnswer(client, answer))
          .filter(Boolean)
      ),
    [client, token]
  );

  useEffect(() => {
    setError(null);
    if (session?.user?.id) {
      const e2esdkUserId = session.user.id;
      // if alreay logged in e2esdk in with application account id
      if (identity && identity.userId === e2esdkUserId) {
        console.log("fetchAnswers");
        fetchAnswers().then(setAnswers);
      } else {
        // log the user to e2esdk
        console.log("client.login(e2esdkUserId)", e2esdkUserId);
        client.login(e2esdkUserId).catch(async (e) => {
          console.log(e);
          // if not logged in, force new application register in e2esdk
          if (e.message.match("Device is not enrolled for this user")) {
            console.log("client.logout()");
            await client.logout();
            console.log("client.signup(e2esdkUserId)");
            await client.signup(e2esdkUserId);
            return;
          }
          throw e;
        });
      }
    }
  }, [fetchAnswers, identity, client, session]);

  return (
    <>
      {error && (
        <Alert
          style={{ marginBottom: 20 }}
          severity="error"
          small
          description={error}
        />
      )}
      <div style={{ height: 800 }}>
        <DataGrid
          rows={answers}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: "created_at", sort: "desc" }],
            },
          }}
          autoPageSize={true}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default Answers;
