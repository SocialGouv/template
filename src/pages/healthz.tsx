import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";

const HealthZ: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Template | HealthZ"
        description="Page healthZ de l'application Template."
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <div className="fr-container fr-my-6w">
        <h1>App is up and running</h1>
      </div>
    </>
  );
};

export default HealthZ;
