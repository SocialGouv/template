import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { StatTile } from "../components/StatTile";

import { fetchMatomoData, MatomoResult } from "../lib";

const Stats: NextPage = () => {
  const [matomoData, setMatomoData] = React.useState<MatomoResult>({
    nbPageViews: 0,
    nbVisits: 0,
    nbUniqPageViews: 0,
  });

  useEffect(() => {
    (async () => {
      const data = await fetchMatomoData();
      setMatomoData(data);
    })();
  }, []);
  return (
    <>
      <Head>
        <title>Template | Statistiques d&apos;utilisation</title>
      </Head>
      <div className="fr-container fr-my-10w">
        <h1>Statistiques d&apos;utilisation</h1>
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
          <StatTile
            title="Nombre de visites"
            stats={matomoData.nbVisits}
            description="C'est le nombre de visites total du site sur les 12 derniers mois"
          />
          <StatTile
            title="Nombre de pages vues (total)"
            stats={matomoData.nbPageViews}
            description="C'est le nombre de pages vues au total sur le site sur les 12 derniers mois"
          />
          <StatTile
            title="Nombre de pages vues (uniques)"
            stats={matomoData.nbUniqPageViews}
            description="C'est le nombre de pages vues uniques sur le site sur les 12 derniers mois"
          />
        </div>
      </div>
    </>
  );
};

export default Stats;
