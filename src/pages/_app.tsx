import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import type { AppProps, AppContext } from "next/app";
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
import cookie from "cookie";
import * as React from "react";
import type { IncomingMessage } from "http";

import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";

const keycloakCfg = {
  url: "http://localhost:8080",
  realm: "realme-app",
  clientId: "react-client",
};

interface InitialProps {
  cookies: unknown;
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
    });
  }, []);

  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
    >
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
        {/* <SessionProvider session={pageProps.session}> */}

        <Component {...pageProps} />

        {/* </SessionProvider> */}
      </Layout>
    </SSRKeycloakProvider>
  );
}

function parseCookies(req: IncomingMessage) {
  return cookie.parse(req.headers.cookie || "");
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  return {
    cookies: context.ctx.req ? parseCookies(context.ctx.req) : {},
  };
};

export default MyApp;
