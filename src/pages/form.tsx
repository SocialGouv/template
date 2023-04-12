import React, { useState, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fr } from "@codegouvfr/react-dsfr";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Alert } from "@codegouvfr/react-dsfr/Alert";

import { fileMetadataSchema } from "@socialgouv/e2esdk-crypto";

import { encryptAndSubmitForm } from "../lib/e2esdk";
import { generateFormData } from "../services/fake-form-data";
import { serialExec } from "../lib/serialExec";

// This form sealedBox public key
const formPublicKeyString = "CyLwBWHufxjHfzzI8BNgJXEBOEtIXV_NewC6VFrMkgk";

// Some unique id for this form submission. used for client localstorage
export const formName = "myapp-contact-form";

export const decryptedDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  newsletter: z.boolean().optional().default(false),
  alerts: z.boolean().optional().default(false),
  files: z.array(z.any()).optional(),
  filesMetadata: fileMetadataSchema,
});

type FormData = z.infer<typeof decryptedDataSchema>;

const removeFromArray = (arr: any[], value: any) => {
  const index = arr.indexOf(value);
  if (index > -1) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }
  return arr;
};

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

  const generateSubmissions = useCallback(async () => {
    // generate and submit bunch of fake submissions
    const rows = await Promise.all(
      Array.from({ length: 10 }, generateFormData)
    );
    console.time("encryptAndSubmitForm");
    return serialExec(
      rows.map(
        (row) => () => encryptAndSubmitForm(formPublicKeyString, formName, row)
      )
    ).then(() => {
      console.timeEnd("encryptAndSubmitForm");
      setFormError(false);
      setFormSuccess(true);
      setUploads([]);
      reset();
    });
  }, [reset]);

  const onDrop = (acceptedFiles: File[]) => {
    setUploads([...uploads, ...acceptedFiles]);
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

    data.files = uploads; // use local state for uploads

    encryptAndSubmitForm(formPublicKeyString, formName, data)
      .then((res) => {
        if (res?.data?.insert_answers_one?.id) {
          setFormError(false);
          setFormSuccess(true);
          setUploads([]);
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
      <div className={fr.cx("fr-container")}>
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
                listStyleType: "none",
                marginTop: 10,
                minHeight: 140,
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
                      {/* eslint-disable-next-line react/jsx-no-comment-textnodes, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
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
            Send 10 random submissions
          </Button>
        </form>
      </div>
    </>
  );
};

export default Form;
