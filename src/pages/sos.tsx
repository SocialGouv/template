import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { fr } from "@codegouvfr/react-dsfr";

const SosPage: NextPage = () => (
  <div className={fr.cx("fr-grid-row--left")}>
    <Head>
      <title>Page d'aide</title>
    </Head>

    <h1>Besoin d'aide ?</h1>

    <h2>Les questions fréquentes</h2>
    <p>lorem</p>

    <h2>Comment nous contacter</h2>
    <p>lorem</p>
  </div>
);

export default SosPage;
