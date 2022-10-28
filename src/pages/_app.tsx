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

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
    });
  }, []);

  return (
    <Layout
      headerProps={{ ...headerProps }}
      footerProps={{
        bodySection: footerBodySection,
        bottomSection: footerBottomSection,
        partnerSection: footerPartnerSection,
        topSection: footerTopSection,
      }}
    >
      <DefaultSeo
        {...(SEO as any)}
        additionalLinkTags={[
          {
            rel: "stylesheet",
            href: "/remixicon/fonts/remixicon.css",
          },
        ]}
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
