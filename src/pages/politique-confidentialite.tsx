import { MentionPart } from "@components";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";

const Index: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Template | Politique de confidentialité"
        description="Politique de confidentialité de l'application template."
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <div className="fr-container fr-my-6w">
        <h1 id="mentions-legales">Politique de confidentialité</h1>
        <div>
          <MentionPart
            title="Traitement des données à caractère personnel"
            description="Le présent site 1000 premiers jours est à l'initiative de la Direction Générale de la Cohésion Sociale au sein de la Fabrique numérique des ministères sociaux."
          />
        </div>
      </div>
    </>
  );
};

export default Index;
