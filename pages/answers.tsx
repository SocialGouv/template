import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useE2ESDKClient,
  useE2ESDKClientIdentity,
} from "@socialgouv/e2esdk-react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchHasura } from "../src/lib/hasura";
import { query } from "../src/queries/form";
import { jsonDataSchema } from "./form";
import Avatar from "boring-avatars";

import { z } from "zod";
import { Client } from "@socialgouv/e2esdk-client";

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

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "mood",
    headerName: "Mood",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    align: "center",
    width: 40,
    renderCell: (cell) =>
      cell.row.color && (
        <Avatar
          size={30}
          name={cell.row.color}
          variant="pixel"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      ),
  },
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
    field: "color",
    headerName: "Color",
    width: 150,
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
];

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

const Answers: NextPage = () => {
  const client = useE2ESDKClient();
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
    if (session?.user?.email) {
      const e2esdkUserId = session.user.email;
      // if alreay logged in e2esdk in with application account id
      if (identity && identity.userId === e2esdkUserId) {
        console.log("fetchAnswers");
        fetchAnswers().then(setAnswers);
      } else {
        // log the user to e2esdk
        console.log("client.login(e2esdkUserId)");
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
