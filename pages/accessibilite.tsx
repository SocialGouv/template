import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Alert } from "@codegouvfr/react-dsfr/Alert";

import { DeclarationAccessibilite } from "../src/components/DeclarationAccessibilite";

const Accessibilite: NextPage = () => {
  return (
    <>
      <Head>
        <title>Template | Déclaration d&apos;accessibilité</title>
      </Head>

      <div className="fr-container fr-my-6w">
        <Alert
          description={
            <div>
              Utilisez le{" "}
              <a href="https://betagouv.github.io/a11y-generateur-declaration/#create">
                générateur de déclaration
              </a>
              .
            </div>
          }
          title={<div>Cette page doit être mise à jour</div>}
          severity="info"
        />
        <br />
        <DeclarationAccessibilite />
      </div>
    </>
  );
};

export default Accessibilite;
