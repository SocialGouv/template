import * as React from "react";
import { fr } from "@codegouvfr/react-dsfr";

import Head from "next/head";
import { NextPage } from "next";

import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";

import Stack from "@mui/material/Stack";

const Home: NextPage = () => {
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
      <br />
      <Alert
        closable
        description="Everything went bad"
        severity="error"
        title="Message NOT successfully sent"
      />
      <br />
      <Tabs
        tabs={[
          {
            label: "Tab 1",
            iconId: "fr-icon-add-line",
            content: <p>Content of tab1</p>,
          },
          {
            label: "Tab 2",
            iconId: "fr-icon-ball-pen-fill",
            content: <p>Content of tab2</p>,
          },
          { label: "Tab 3", content: <p>Content of tab3</p> },
        ]}
      />
      <br />
      <Card
        title="Titre de la carte"
        linkProps={{ href: "#" }}
        desc="Cette carte permet d'indiquer au lecteur des informations sur le lien à présenetr"
      />
      <br />
      <div className={fr.cx("fr-accordions-group")}>
        <Accordion
          label="Name of the Accordion 1"
          content="Content of the Accordion 1"
        />
        <Accordion
          label="Name of the Accordion 2"
          content="Content of the Accordion 2"
        />
      </div>
      <br />
      <Stack spacing={2} sx={{ mt: 5 }} direction="row">
        <Button
          title="@codegouv/react-dsfr storybook"
          linkProps={{
            target: "_blank",
            href: "https://react-dsfr-components.etalab.studio/",
          }}
        >
          See more components at @codegouv/react-dsfr storybook
        </Button>
      </Stack>
    </>
  );
};

export default Home;
