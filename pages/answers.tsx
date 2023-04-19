import React, { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import { fetchHasura } from "../src/lib/hasura";
import { query } from "../src/queries/form";
import { useSession } from "next-auth/react";
import { useE2ESDKClient, useE2ESDKClientKeys } from "@socialgouv/e2esdk-react";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Table } from "@codegouvfr/react-dsfr/Table";

import { z } from "zod";

const formMetadata = z.object({
  id: z.number(),
  created_at: z.string(),
  //.transform((value) => new Date(value)),
  public_key: z.string(),
  sealed_secret: z.string(),
  signature: z.string(),
});

const jsonDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  message: z.string(),
});

const jsonValidationSchema = formMetadata.extend(jsonDataSchema.shape);

type EncryptedAnswer = z.infer<typeof formMetadata> & { data: string };

type DecryptedData = z.infer<typeof jsonDataSchema>;

type DecryptedAnswer = z.infer<typeof jsonValidationSchema>;

type AnswersResponse = {
  errors?: { message: string }[];
  data: {
    answers: EncryptedAnswer[];
  };
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

  const nameFingerprint = "73ZLcYHHAhx6rgMbgpPgc0F1qE89oWOAq6UGdrHkkJQ";
  const allKeys = useE2ESDKClientKeys();
  const currentKey = allKeys?.[nameFingerprint]?.[0] ?? null;

  console.log("allKeys", allKeys);

  useEffect(() => {
    if (!currentKey) {
      setError(
        `Vous devez demander la permission pour accéder à "${nameFingerprint}"`
      );
      return;
    }
    if (!token.accessToken) {
      setError(`You must be logged to access ${nameFingerprint}`);
      return;
    }
    setError(null);

    fetchHasura({ query }, token).then((res: AnswersResponse) => {
      const answers = res.data.answers
        .map((answer) => {
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
              currentKey.nameFingerprint
            ) as Record<"data", string>;
            const decryptedValues: DecryptedData = JSON.parse(values.data);
            const res = jsonDataSchema.safeParse(decryptedValues);
            if (!res.success) {
              setError(`Zod: Impossible de parser la réponse ${answer.id}`);
              console.error(res);
              return null;
            }
            const decryptedAnswer = {
              ...answer,
              ...res.data,
              data: undefined,
            };
            return [
              decryptedAnswer.id,
              decryptedAnswer.created_at.substring(0, 16),
              decryptedAnswer.firstName,
              decryptedAnswer.lastName,
              decryptedAnswer.message,
            ];
          } catch (e) {
            console.error(e);
            setError(`e2esdk: Impossible de parser la réponse ${answer.id}`);
            return null;
          }
        })
        .filter((answer) => !!answer);
      setAnswers(answers);
      console.log("answers", answers);
    });
  }, [token, client, currentKey]);

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
      <Table
        fixed
        caption="Résultats du formulaire"
        data={answers}
        headers={["id", "Date", "Nom", "Prénom", "Message"]}
      />
    </>
  );
};

export default Answers;
