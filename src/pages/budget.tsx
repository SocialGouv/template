import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Table from "@codegouvfr/react-dsfr/Table";
import Callout from "@codegouvfr/react-dsfr/Callout";

const Budget: NextPage = () => (
  <div>
    <Head>
      <title>Budget</title>
    </Head>

    <h1>Budget</h1>
    <p>
      <a href="https://xxx">
        <strong>[xxx]</strong>
      </a>{" "}
      est un service public numérique, c’est pourquoi nous sommes transparents
      sur les ressources allouées et la manière dont elles sont employées.
    </p>
    <h2>Principes</h2>
    <p>
      Nous suivons{" "}
      <a href="https://beta.gouv.fr/manifeste">le manifeste beta.gouv</a> dont
      nous rappelons les principes ici :
    </p>
    <div className="fr-highlight">
      <ul>
        <li>
          Les besoins des utilisateurs sont prioritaires sur les besoins de
          l’administration
        </li>
        <li>Le mode de gestion de l’équipe repose sur la confiance</li>
        <li>
          L’équipe adopte une approche itérative et d’amélioration en continu
        </li>
      </ul>
    </div>
    <h2>Budget consommé</h2>
    <p>Répartition des sources de financements :</p>
    <div className="fr-highlight">
      <ul>
        <li>
          <strong>2021</strong> : le projet est une experimentation financée à
          100% par
          <a href="https://xxx" target="_blank" rel="noopener">
            [xxx]
          </a>
          .
        </li>
        <li>
          <strong>2022</strong> : [xxx] d’assurer le financement du projet. à
          hauteur de[xxx] €.
        </li>
      </ul>
    </div>
    <p>Répartition des dépenses effectuées :</p>
    <Table
      headers={["Poste de dépense", "2021", "2022", "2023"]}
      data={[
        ["Développement", "165 000 €", "213 000 €", "375 000 €"],
        ["Déploiement", "5 000 €", "98 000 €", "157 000 €"],
        ["Design", "25 000 €", "25 000 €", "43 000 €"],
        ["Logiciels", "-", "12 000 €", "12 000 €"],
        ["Hébergement", "1000 €", "3000 €", "3000 €"],
        ["Total TTC", "XXX 000 €", "XXX 000 €", "XXX 000 €"],
      ]}
    ></Table>
    <br />
    <Callout title="À propos de la TVA">
      Contrairement aux entreprises du secteur privé, les administrations ne
      peuvent pas récupérer la TVA supportée sur leurs achats dans le cadre de
      leur activité. Le montant TTC inclut la TVA au taux de 20%.
      <br />
      La TVA est collectée et reversée à l’État et diminue donc le montant du
      budget utilisable sur le projet.
    </Callout>
  </div>
);

export default Budget;
