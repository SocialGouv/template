import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { fetchHasura } from "../src/lib/hasura";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";

import { generateFormData } from "../src/services/fake-form-data";

import {
  encryptFormData,
  initializeEncryptedFormLocalState,
} from "@socialgouv/e2esdk-crypto";
import { insert_one } from "../src/queries/form";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { z } from "zod";

const submissionBucketId = "1yvV24lIWdDXaoaQUezHmLo46WPE8BlzEoPR-jdvD2k"; // payloadFingerprint from form creation

type PostVariables = {
  submissionBucketId: string;
  signature: string;
  sealedSecret: string;
  publicKey: string;
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
});

type FormData = z.infer<typeof jsonDataSchema>;

function generateSubmissions() {
  // generate and submit bunch of submissions
  const rows = Array.from({ length: 100 }, () => generateFormData());
  console.time("encryptAndSubmitForm");
  return Promise.all(rows.map(encryptAndSubmitForm)).then(() => {
    console.timeEnd("encryptAndSubmitForm");
  });
}

const encryptAndSubmitForm = async (data: Record<string, any>) => {
  const state = await initializeEncryptedFormLocalState(submissionBucketId);

  const { metadata, encrypted } = encryptFormData(
    { data: JSON.stringify(data) },
    state
  );

  const variables: PostVariables = {
    submissionBucketId,
    sealedSecret: metadata.sealedSecret,
    signature: metadata.signature,
    publicKey: metadata.publicKey,
    ...encrypted,
  };

  return fetchHasura({
    query: insert_one,
    variables,
  });
};

const Form: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const [formSuccess, setFormSuccess] = useState<boolean | null>(null);
  const [formError, setFormError] = useState<boolean | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    console.log("handleSubmit", data);
    setFormError(null);
    setFormSuccess(null);

    encryptAndSubmitForm(data)
      .then((res) => {
        console.log(res);
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
        <Input
          label="Prénom(s)"
          nativeInputProps={register("lastName", { required: true })}
        />
        <Input
          label="Email"
          nativeInputProps={{
            type: "email",
            ...register("email", { required: true }),
          }}
        />
        <RadioButtons
          legend="Thème de couleur préféré"
          options={[
            {
              label: "Quiet Light",
              nativeInputProps: {
                value: "Quiet Light",
                ...register("color", { required: true }),
              },
            },
            {
              label: "Monokai",
              nativeInputProps: {
                value: "Monokai",
                ...register("color", { required: true }),
              },
            },
            {
              label: "Solarized",
              nativeInputProps: {
                value: "Solarized",
                ...register("color", { required: true }),
              },
            },
            {
              label: "DSFR",
              nativeInputProps: {
                value: "DSFR",
                ...register("color", { required: true }),
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
            ...register("message", { required: true }),
            rows: 6,
          }}
        />
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
