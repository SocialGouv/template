import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import type { AppProps } from "next/app";
import { Layout } from "@components";
import {
  footerBodySection,
  footerBottomSection,
  footerPartnerSection,
  footerTopSection,
  headerBody,
  headerNav,
} from "@config";
import { useEffect } from "react";
import { init } from "@socialgouv/matomo-next";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
    });
  }, []);

  return (
    <Layout
      headerProps={{ bodySection: headerBody, navSection: headerNav }}
      footerProps={{
        bodySection: footerBodySection,
        bottomSection: footerBottomSection,
        partnerSection: footerPartnerSection,
        topSection: footerTopSection,
      }}
    >
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
