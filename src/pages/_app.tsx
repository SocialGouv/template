import "../shame.css";
import type { AppProps } from "next/app";
import SEO from "../../next-seo.config";
import { Layout } from "@components";
import {
  footerBodySection,
  footerBottomSection,
  footerPartnerSection,
  footerTopSection,
  headerProps,
} from "@config";
import { useEffect } from "react";
import { init } from "@socialgouv/matomo-next";
import { DefaultSeo } from "next-seo";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
    });
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
        rel="stylesheet"
      />
      <Layout
        headerProps={{ ...headerProps }}
        footerProps={{
          bodySection: footerBodySection,
          bottomSection: footerBottomSection,
          partnerSection: footerPartnerSection,
          topSection: footerTopSection,
        }}
      >
        <DefaultSeo {...(SEO as any)} />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
