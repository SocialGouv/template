import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Table } from "@codegouvfr/react-dsfr/Table";
import { Alert } from "@codegouvfr/react-dsfr/Alert";

const URL = [
  {
    name: "Déclaration de confidentialité Microsoft",
    value: "https://privacy.microsoft.com/fr-fr/privacystatement",
  },
];

const Confidentiality: NextPage = () => {
  return (
    <>
      <Head>
        <title>Template | Politique de confidentialité</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <Alert title="Cette page doit être mise à jour. " severity="info" />
        <br />
        <h1>Politique de confidentialité</h1>
        <div>
          <h2>Traitement des données à caractère personnel</h2>
          <p>Template ne vous demande ni ne stocke d’information nominative.</p>
          <p>
            Pour autant, nous enregistrons les informations saisies dans la
            barre de recherche. Elles sont conservées pendant deux années pour
            analyser les usages, améliorer la précision des réponses apportées
            et améliorer le service et ainsi réaliser la mission d’intérêt
            public.
          </p>
          <p>
            Nous nous engageons à ne jamais céder ces informations à des tiers.
          </p>
          <p>
            Vous avez un droit d’accès, de rectification et de suppression de
            vos données. Pour l’exercer, faites-nous parvenir une demande en
            précisant la date et l’heure précise de la requête et tout élément
            permettant d’attester que vous êtes bien l’auteur du message - ces
            éléments sont indispensables pour nous permettre de retrouver votre
            recherche - par voie électronique à l’adresse suivante&nbsp;:{" "}
            <a
              title="Envoyer un mail à contact@[produit].beta.gouv.fr"
              href="mailto:contact@[produit].beta.gouv.fr"
            >
              contact@[produit].beta.gouv.fr
            </a>
            <br />
            ou par voie postale&nbsp;:
          </p>
          <address className="fr-mb-2w">
            [XXX]
            <br />
            [XXX]
            <br />
            [XXX]
            <br />
            [XXX]
          </address>
          <p>
            Vous êtes également en droit de saisir la Commission Nationale de
            l’Informatique et des Libertés pour toute réclamation à{" "}
            <a
              title="Adresser une réclamation (plainte) à la CNIL"
              href="https://www.cnil.fr/fr/cnil-direct/question/adresser-une-reclamation-plainte-la-cnil-quelles-conditions-et-comment"
            >
              l’adresse suivante
            </a>
            .
          </p>
          <h2>Hébergement</h2>
          <Table
            headers={["Nom", "Pays", "Traitement", "Conditions"]}
            data={[["[XXX]", "[XXX]", "[XXX]", "[XXX]"]]}
          />
          <h2>Cookies</h2>
          <p>
            Un cookie est un fichier déposé sur votre terminal lors de la visite
            d’un site. Il a pour but de collecter des informations relatives à
            votre navigation et de vous adresser des services adaptés à votre
            terminal (ordinateur, mobile ou tablette).
          </p>
          <p>
            Nous collectons donc des données par l’intermédiaire de dispositifs
            appelés “cookies” permettant d’établir des mesures statistiques.
          </p>
          <Table
            headers={[
              "Nom",
              "Durée de conservation",
              "Finalité",
              "Editeur",
              "Pays",
            ]}
            data={[["[XXX]", "[XXX]", "[XXX]", "[XXX]", "[XXX]"]]}
          />

          <p>
            L’accès aux informations contenues dans les cookies est limité aux
            seules personnes autorisées au sein de la Fabrique numérique. En
            outre, l’éditeur peut utiliser certaines données pour des finalités
            qui lui sont propres.
          </p>
          <p>
            À tout moment, vous pouvez refuser l’utilisation des cookies et
            désactiver le dépôt sur votre ordinateur en utilisant la fonction
            dédiée de votre navigateur (fonction disponible notamment sur
            Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox,
            Apple Safari et Opera).
          </p>
          <p>
            Pour l’outil Matomo, vous pouvez décider de ne jamais être suivi, y
            compris anonymement&nbsp;:
          </p>
          <iframe
            title="matomo optout"
            style={{ border: 0, width: "100%" }}
            src="https://stats.beta.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=2f3b6c&fontSize=16px&fontFamily=sans-serif"
          />
          <p>
            Pour aller plus loin, vous pouvez consulter les fiches proposées par
            la Commission Nationale de l’Informatique et des Libertés
            (CNIL)&nbsp;:
          </p>
          <ul>
            <li>
              <a
                title="Déclaration de confidentialité Microsoft"
                target="_blank"
                rel="nofollow, noopener, noreferrer"
                href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi"
              >
                Cookies et traceurs : que dit la loi ?
              </a>
            </li>
            <li>
              <a
                title="Déclaration de confidentialité Microsoft"
                target="_blank"
                rel="nofollow, noopener, noreferrer"
                href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
              >
                Cookies : les outils pour les maîtriser
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Confidentiality;
