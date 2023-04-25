import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useE2ESDKClient } from "@socialgouv/e2esdk-react";
import { fetchHasura } from "../src/lib/hasura";
import { Input } from "@codegouvfr/react-dsfr/Input";

import {
  encryptFormData,
  initializeEncryptedFormLocalState,
} from "@socialgouv/e2esdk-crypto";
import { insert_one } from "../src/queries/form";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";

type PostVariables = {
  submissionBucketId: string;
  signature: string;
  sealedSecret: string;
  publicKey: string;
  data: string;
};

const Form: NextPage = () => {
  const client = useE2ESDKClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const [formSuccess, setFormSuccess] = useState<boolean | null>(null);
  const [formError, setFormError] = useState<boolean | null>(null);

  const submissionBucketId = "1yvV24lIWdDXaoaQUezHmLo46WPE8BlzEoPR-jdvD2k"; // payloadFingerprint from form creation

  const onSubmit = handleSubmit(async (data) => {
    console.log("data", data);
    setFormError(null);
    setFormSuccess(null);
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

    fetchHasura({
      query: insert_one,
      variables,
    })
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
      </form>
    </>
  );
};

export default Form;
