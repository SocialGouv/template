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
import { setCookies, removeCookies } from "cookies-next";

import { SSRKeycloakProvider, SSRCookies, Cookies } from "@react-keycloak/ssr";
interface InitialProps {
  cookies: Cookies;
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
      keycloakConfig={{
        url: process.env.NEXT_PUBLIC_KEYCLOAK_URL ?? "",
        realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM ?? "",
        clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ?? "",
      }}
      persistor={SSRCookies(cookies)}
      onTokens={({ token }) =>
        token
          ? setCookies("isAuthenticated", true)
          : removeCookies("isAuthenticated")
      }
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
        <Component {...pageProps} />
      </Layout>
    </SSRKeycloakProvider>
  );
}

export const getServerSideProps = async (context: AppContext) => {
  return {
    props: {
      cookies: context.ctx.req
        ? cookie.parse(context.ctx.req.headers.cookie || "")
        : {},
    },
  };
};

export default MyApp;
