import React from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useE2ESDKClient } from "@socialgouv/e2esdk-react";
import { fetchHasura } from "../src/lib/hasura";
import {
  encryptFormData,
  initializeEncryptedFormLocalState,
} from "@socialgouv/e2esdk-crypto";
import { insert_one } from "../src/queries/form";

const Form: NextPage = () => {
  const client = useE2ESDKClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submissionBucketId = "1yvV24lIWdDXaoaQUezHmLo46WPE8BlzEoPR-jdvD2k"; // payloadFingerprint from form creation

  const onSubmit = handleSubmit(async (data) => {
    const state = await initializeEncryptedFormLocalState(submissionBucketId);
    const { metadata, encrypted } = encryptFormData(
      { data: JSON.stringify(data) },
      state
    );

    const variables = {
      submissionBucketId,
      sealedSecret: metadata.sealedSecret,
      signature: metadata.signature,
      publicKey: metadata.publicKey,
      ...encrypted,
    };

    fetchHasura({
      query: insert_one,
      variables,
    });
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor="firstname">First name :</label>
          <input
            id="firstName"
            placeholder="first name"
            {...register("firstName")}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="lastName">Last name :</label>
          <input
            id="lastName"
            placeholder="last name"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && <p>Last name is required.</p>}
        </fieldset>

        <fieldset>
          <label htmlFor="message">Message :</label>
          <input
            id="message"
            placeholder="message"
            {...register("message", { required: true })}
          />
          {errors.message && <p>Please enter a message</p>}
        </fieldset>
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default Form;
