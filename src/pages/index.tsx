import * as React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Stack from "@mui/material/Stack";

import { push as matomoPush } from "@socialgouv/matomo-next";
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { fr } from "@codegouvfr/react-dsfr";

const Home: NextPage = () => {
  const onClick1 = () => {
    throw new Error("Hello, sentry");
  };

  return (
    <>
      <Head>
        <title>Template | beta.gouv.fr</title>
      </Head>

      <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
        <div className={fr.cx()}>
          <h1>Template</h1>
          Ce template minimal en Next.js met en oeuvre les pratiques
          recommandées chez betagouv et peut vous faire <b>gagner du temps</b>.
          <br />
          <br />
          Il permet de déployer rapidement une application web à l'état de
          l'art, qui respecte nos standards de{" "}
          <b>conformité, accessibilité et sécurité</b>.
          <br />
          <br />
          Vous pouvez vous en servir comme base de départ ou comme référence
          d'implémentation. <b>Les contributions sont bienvenues.</b>
          <br />
          <br />
          <Accordion label="🇫🇷 Système de design de l'état (DSFR)">
            Intègre la dernière version du kit{" "}
            <a
              href="https://github.com/codegouvfr/react-dsfr"
              target="_blank"
              rel="noreferrer noopener"
            >
              @codegouvfr/react-dsfr
            </a>
            . Compatible avec{" "}
            <a href="https://mui.com" target="_blank" rel="noreferrer noopener">
              la librairie MUI
            </a>
            .<br />
            <br />
            Le template est livré 100% accessible.
          </Accordion>
          <Accordion label="📊 Matomo Analytics">
            Intègre le tracker matomo pour analyser l'usage du service.
            <br />
            <br />
            Le lien de désinscription réglementaire est intégré dans la
            politique de confidentialité.
          </Accordion>
          <Accordion label="🚨 Alertes sentry">
            Intègre une sonde sentry pour être alerté en temps réel des erreurs
            applicatives et monitorer les performances de votre service.
          </Accordion>
          <Accordion label="👮 Conformité juridique">
            Des modèles pré-rédigés pour :
            <ul>
              <li>Déclaration d'accessibilité numérique</li>
              <li>Conditions d'utilisation</li>
              <li>Mentions légales</li>
              <li>Politique de confidentialité</li>
            </ul>
          </Accordion>
          <Accordion label="✅ Standards beta">
            <ul>
              <li>Page de statistiques pour suivres les KPIs</li>
              <li>Page de budget pour exposer son budget</li>
              <li>Page SOS pour venir en aide aux usager(e)s</li>
            </ul>
          </Accordion>
          <Accordion label="🔐 Sécurité">
            <ul>
              <li>Gestion des headers CSP</li>
              <li>Image docker root-less</li>
              <li>Pre-commit hooks anti fuite de secrets</li>
            </ul>
          </Accordion>
          <Accordion label="🔎 Testing">
            <ul>
              <li>
                Testing unitaire et de bout-en-bout intégré avec{" "}
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://cypress.io"
                >
                  Cypress.io
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://storybook.js.org/"
                >
                  Storybook
                </a>{" "}
                pour tester/review les composants en isolation
              </li>
              <li>CI de lint, test et scan statique</li>
            </ul>
          </Accordion>
          <Accordion label="📦 Delivery">
            <ul>
              <li>
                Workflows de release automatisés (
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://github.com/semantic-release/semantic-release"
                >
                  semantic-release
                </a>
                )
              </li>
              <li>
                Compatible scalingo, clever cloud avec des reviews-branches
              </li>
            </ul>
          </Accordion>
        </div>
      </div>

      <h2 className={fr.cx("fr-mt-15w")}>Exemples d'intégrations</h2>
      <Stack spacing={2} sx={{ mt: 2 }} direction="row">
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
