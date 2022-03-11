import { StatsTile } from "@components";
import { fetchMatomoData, MatomoResult } from "@lib";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";

const Index: NextPage = () => {
  const [matomoData, setMatomoData] = React.useState<MatomoResult>();

  useEffect(() => {
    (async () => {
      const matomoData = await fetchMatomoData();
      setMatomoData(matomoData);
    })();
  }, []);
  return (
    <>
      <NextSeo
        title="Template | Statistiques d'utilisation"
        description="Statistiques d'utilisation de l'application template."
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <div className="fr-container fr-my-6w">
        <h1>Statistiques d&apos;utilisation</h1>
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-px-3w">
          <StatsTile
            title="Nombre de visites"
            stats={matomoData?.nbVisits ?? 0}
            description="C'est le nombre de visites total du site"
          />
          <StatsTile
            title="Nombre de pages vues (total)"
            stats={matomoData?.nbPageViews ?? 0}
            description="C'est le nombre de pages vues au total sur le site"
          />
          <StatsTile
            title="Nombre de pages vues (uniques)"
            stats={matomoData?.nbUniqPageViews ?? 0}
            description="C'est le nombre de pages vues uniques sur le site"
          />
        </div>
      </div>
    </>
  );
};

export default Index;
