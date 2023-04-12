import React, { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import { fetchHasura } from "../src/lib/hasura";
import { query } from "../src/queries/form";
import { useSession } from "next-auth/react";
import { useE2ESDKClient, useE2ESDKClientKeys } from "@socialgouv/e2esdk-react";

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

  const allKeys = useE2ESDKClientKeys();
  const currentKey =
    allKeys?.["73ZLcYHHAhx6rgMbgpPgc0F1qE89oWOAq6UGdrHkkJQ"]?.[0] ?? null;

  useEffect(() => {
    if (!currentKey) return;
    console.log(currentKey);
    if (!token.accessToken) return;
    fetchHasura({ query }, token).then((res) => {
      // @ts-ignore
      const answers = res.data.answers.map((answer) => {
        return client.unsealFormData(
          {
            metadata: {
              publicKey: answer.public_key,
              sealedSecret: answer.sealed_secret,
              signature: answer.signature,
            },
            // @ts-ignore
            encrypted: { data: answer.data },
          },
          currentKey.nameFingerprint
        );
      });
      setAnswers(answers);
      console.log(answers);
    });
  }, [token, client, currentKey]);

  return (
    <>
      {answers.map((answer) => (
        <div key={answer.id}>{answer.data}</div>
      ))}
    </>
  );
};

export default Answers;
