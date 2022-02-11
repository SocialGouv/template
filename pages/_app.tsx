import "../styles/globals.css";
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

function MyApp({ Component, pageProps }: AppProps) {
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
