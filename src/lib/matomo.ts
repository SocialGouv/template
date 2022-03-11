export type MatomoResult = {
  nbPageViews: number;
  nbUniqPageViews: number;
  nbVisits: number;
};

export const fetchMatomoData = async (): Promise<MatomoResult> => {
  const MATOMO_URL = [
    `${process.env.NEXT_PUBLIC_MATOMO_URL}/?module=API&method=VisitsSummary.getVisits&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&format=JSON&period=year&date=today`,
    `${process.env.NEXT_PUBLIC_MATOMO_URL}/?module=API&method=Actions.get&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&format=JSON&period=year&date=today`,
  ];
  const promises = MATOMO_URL.map(url =>
    fetch(url)
      .then(data => data.json())
      .catch(() => {
        return null;
      })
  );
  const [nbVisitData, infoData] = await Promise.all(promises);
  return {
    nbPageViews: infoData?.nb_pageviews ?? 0,
    nbUniqPageViews: infoData?.nb_uniq_pageviews ?? 0,
    nbVisits: nbVisitData?.value ?? 0,
  };
};
