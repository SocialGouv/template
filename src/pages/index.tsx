import * as React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { push as matomoPush } from "@socialgouv/matomo-next";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Stack from "@mui/material/Stack";

const Home: NextPage = () => {
  const onClick1 = () => {
    throw new Error("Hello, sentry");
  };

  return (
    <>
      <Head>
        <title>Template | Fabrique numérique des ministères sociaux</title>
      </Head>
      <Alert
        closable
        description="Everything went well"
        severity="success"
        title="Message successfully sent"
      />
      <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mb-8w fr-mt-8w">
        <div className="fr-col-12 fr-col-md-6">
          <h1>
            POC VAULT v0
            <span className="fr-text--lead d-block fr-mt-3w">
              <p>Template de la fabrique des ministères sociaux.</p>
            </span>
          </h1>
          <p className="fr-mt-10w">
            Pariatur veniam ipsum pariatur elit ullamco sit quis ipsum ad veniam
            proident sunt. Qui ut irure in quis reprehenderit. Laborum anim ad
            laboris ipsum magna ullamco consequat ex consectetur. Duis sit
            adipisicing ipsum occaecat commodo consequat officia ea. Cupidatat
            fugiat reprehenderit aliqua eiusmod mollit Lorem consectetur. Minim
            elit proident eu qui exercitation mollit id esse velit et dolore
            velit laboris. Ipsum occaecat Lorem occaecat magna excepteur veniam
            ullamco cupidatat irure incididunt velit nulla.
          </p>
        </div>
        <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-4">
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            className="fr-mt-2w"
            src="https://dummyimage.com/300x300/188cf2/fff.png&amp;text=logo+1"
            alt="My description"
          />
        </div>
      </div>
      <Stack spacing={2} sx={{ mt: 5 }} direction="row">
        <Button title="Trigger sentry event" onClick={onClick1}>
          Trigger sentry error
        </Button>

        <Button
          title="Trigger matomo event"
          onClick={() => {
            matomoPush(["click", "button", "homepage"]);
          }}
        >
          Trigger matomo event
        </Button>
      </Stack>
    </>
  );
};

export default Home;
