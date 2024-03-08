import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Alert } from "@codegouvfr/react-dsfr/Alert";

import { MentionPart } from "../components/MentionPart";

const MentionsLegales: NextPage = () => {
  return (
    <>
      <Head>
        <title>Template | Mention l&eacute;gales</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <Alert title="Cette page doit être mise à jour. " severity="info" />
        <br />
        <h1>Mentions légales</h1>
        <div>
          <MentionPart
            title="Hébergement du site"
            description="Le site est édité au sein de [XXX] :"
          >
            <address className="fr-mb-2w">
              [XXX] <br />
              [XXX] <br />
              [XXX] <br />
              Téléphone: [XXX]
            </address>
          </MentionPart>
          <MentionPart
            title="Directeur de la publication"
            description="Monsieur X et Madame X, Directeur de la publication"
          />
          <MentionPart
            title="Hébergement du site"
            description="Ce site est hébergé par :"
          >
            <p className="fr-mb-2w">
              [XXX] <br />
              [XXX] <br />
              [XXX]
            </p>
          </MentionPart>
          <MentionPart
            title="Accessibilité"
            description="La conformité aux normes d’accessibilité numérique est un objectif
              ultérieur mais nous tâchons de rendre ce site accessible à toutes
              et à tous."
            divProps={{
              id: "accessibilite",
            }}
          >
            <h3>Signaler un dysfonctionnement</h3>
            <p className="fr-mb-2w">
              Si vous rencontrez un défaut d’accessibilité vous empêchant
              d’accéder à un contenu ou une fonctionnalité du site, merci de
              nous en faire part. Si vous n’obtenez pas de réponse rapide de
              notre part, vous êtes en droit de faire parvenir vos doléances ou
              une demande de saisine au Défenseur des droits.
            </p>

            <p>
              Pour en savoir plus sur la politique d’accessibilité numérique de
              l’État&nbsp;:
              <a
                href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
                target="_blank"
                rel="noreferrer"
              >
                numerique.gouv.fr/publications/rgaa-accessibilite
              </a>
            </p>
          </MentionPart>
          <MentionPart
            title="Sécurité"
            description="Le site est protégé par un certificat électronique, matérialisé
            pour la grande majorité des navigateurs par un cadenas. Cette
            protection participe à la confidentialité des échanges. En aucun
            cas les services associés à la plateforme ne seront à l’origine
            d’envoi de courriels pour demander la saisie d’informations
            personnelles."
          />
        </div>
      </div>
    </>
  );
};

export default MentionsLegales;
