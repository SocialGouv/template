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
          Il permet de déployer très rapidement une application web à l'état de
          l'art, qui respecte{" "}
          <b>la conformité, l'accessibilité et la sécurité</b> attendues et
          intègre nos outils standards.
          <br />
          <br />
          Vous pouvez vous en servir comme base de départ ou comme référence
          d'implémentation. <b>Les contributions sont bienvenues.</b>
          <br />
          <br />
          <Accordion label="🇫🇷 Design système de l'état">
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
            Le template est fourni 100% accessible.
          </Accordion>
          <Accordion label="📊 Matomo Analytics">
            Intègre un tracker matomo avec le lien de désinscription
            réglementaire dans la politique de confidentialité.
          </Accordion>
          <Accordion label="🚨 Alertes sentry">
            Intègre une sonde sentry pour être alerté des erreurs applicatives
            et monitorer les performances de votre application.
          </Accordion>
          <Accordion label="👮 Conformité juridique">
            Les CGU, mentions légales et politique de confidentialité sont
            fournies pré-rédigées.
          </Accordion>
          <Accordion label="✅ Standards beta">
            Modèle de page de statistiques, de budget et page "SOS" fournies.
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

      <h2 className={fr.cx("fr-mt-15w")}>Example intégrations</h2>
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
