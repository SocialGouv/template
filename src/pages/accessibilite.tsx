import { DeclarationAccessibilite } from "@components";
import { Alert } from "@dataesr/react-dsfr";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";

const Accessibilite: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Template | Déclaration d'accessibilité"
        description="Déclaration d'accessibilité de l'application template."
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
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
          type="info"
        />
        <br />
        <DeclarationAccessibilite />
      </div>
    </>
  );
};

export default Accessibilite;
