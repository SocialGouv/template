/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import { fr } from "@codegouvfr/react-dsfr";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import {
  useE2ESDKClient,
  useE2ESDKClientIdentity,
} from "@socialgouv/e2esdk-react";
import { FileMetadata } from "@socialgouv/e2esdk-crypto";

import { fetchHasura } from "../src/lib/hasura";
import { query } from "../src/queries/form";
import {
  decryptAnswer,
  downloadAndDecryptFile,
  EncryptedAnswer,
} from "../src/lib/e2esdk";

type AnswersResponse = {
  errors?: { message: string }[];
  data: {
    answers: EncryptedAnswer[];
  };
};

// nameFingerprint of the form sealedBox
const formNameFingerprint = "QyUHkrtl2FmtRyXHbsmf_EIwKGv5wRUZpU9X7Gm4tZw";

const { PreviewModal, openPreviewModal } = createModal({
  name: "preview",
  isOpenedByDefault: false,
});

const EncryptedImagePreview = ({ file }: { file: File }) => {
  return (
    <img
      style={{ maxWidth: "100%" }}
      src={URL.createObjectURL(file)}
      title={file.name}
      alt={file.name}
    />
  );
};

// to download the file
// function saveFile(file: File) {
//   const link = document.createElement("a");
//   link.setAttribute("href", URL.createObjectURL(file));
//   link.setAttribute("download", file.name);
//   link.click();
//   URL.revokeObjectURL(link.href);
// }

const Answers: NextPage = () => {
  const client = useE2ESDKClient();

  const onFileClick = useCallback(
    (metadata: FileMetadata) => {
      downloadAndDecryptFile(client.sodium, metadata).then((rawImage) => {
        setPreviewImage(rawImage); // or saveFile(rawImage)
        // ensure state is updated before showing the modal
        setTimeout(() => {
          openPreviewModal();
        });
      });
    },
    [client]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },

      {
        field: "created_at",
        headerName: "Date",
        width: 130,
        type: "date",
        valueGetter: (val) => new Date(val.row.created_at),
      },
      {
        field: "firstName",
        type: "string",
        headerName: "Prénom",
        width: 120,
      },
      {
        field: "lastName",
        type: "string",
        headerName: "Nom",
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
        cellClassName: "no-outline",
        renderCell: (cell) => {
          const fileList: FileMetadata[] = Object.values(
            cell.row.filesMetadata || {}
          );
          return fileList.map((metadata, i) => (
            <span
              key={metadata.hash + i}
              title={metadata.name}
              className={fr.cx("fr-icon-file-download-line")}
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
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  const identity = useE2ESDKClientIdentity();

  const fetchAnswers = useCallback(
    () =>
      fetchHasura({ query }, token).then((res: AnswersResponse) =>
        res.data.answers
          .map((answer) => decryptAnswer(client, formNameFingerprint, answer))
          .filter(Boolean)
      ),
    [client, token]
  );

  useEffect(() => {
    setError(null);
    if (session?.user?.id) {
      // autologin / signup to e2esdk using user UUID
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
        <PreviewModal title="Preview">
          {previewImage && <EncryptedImagePreview file={previewImage} />}
        </PreviewModal>
        <DataGrid
          rows={answers}
          columns={columns}
          sx={{
            "& *": {
              outline: "none !important",
            },
          }}
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
