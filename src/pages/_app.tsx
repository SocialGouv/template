import { ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { fr } from "@codegouvfr/react-dsfr";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { init } from "@socialgouv/matomo-next";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { useStyles } from "tss-react/dsfr";

declare module "@codegouvfr/react-dsfr/next-pagesdir" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

declare module "@codegouvfr/react-dsfr" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const { withDsfr, dsfrDocumentApi } = createNextDsfrIntegrationApi({
  defaultColorScheme: "system",
  Link,
  useLang: () => {
    const { locale = "fr" } = useRouter();
    return locale;
  },

  //doPersistDarkModePreferenceWithCookie: true,
  //Link,
  preloadFonts: [
    //"Marianne-Light",
    //"Marianne-Light_Italic",
    "Marianne-Regular",
    //"Marianne-Regular_Italic",
    "Marianne-Medium",
    //"Marianne-Medium_Italic",
    "Marianne-Bold",
    //"Marianne-Bold_Italic",
    //"Spectral-Regular",
    //"Spectral-ExtraBold"
  ],
});

const { augmentDocumentWithEmotionCache, withAppEmotionCache } =
  createEmotionSsrAdvancedApproach({
    key: "css",
  });

export { dsfrDocumentApi, augmentDocumentWithEmotionCache };

const brandTop = (
  <>
    République
    <br />
    Française
  </>
);

const homeLinkPops = {
  href: "/",
  title:
    "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)",
};

const bottomLinks = [
  {
    text: "Conditions d'utilisation",
    linkProps: {
      href: "/cgu",
    },
  },
  {
    text: "Statistiques",
    linkProps: {
      href: "/stats",
    },
  },
  {
    text: "Politique de confidentialité",
    linkProps: {
      href: "/politique-confidentialite",
    },
  },
  {
    text: "Contribuer sur GitHub",
    linkProps: {
      href: `${process.env.NEXT_PUBLIC_APP_REPOSITORY_URL}${
        process.env.NEXT_PUBLIC_APP_VERSION
          ? `/releases/tag/v${process.env.NEXT_PUBLIC_APP_VERSION}`
          : process.env.NEXT_PUBLIC_APP_VERSION_COMMIT
          ? `/commit/${process.env.NEXT_PUBLIC_APP_VERSION}`
          : ""
      }`,
    },
  },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const { css } = useStyles();
  const router = useRouter();

  const contentSecurityPolicy = process.env.CONTENT_SECURITY_POLICY;
  return (
    <MuiDsfrThemeProvider>
      <Head>
        <title>Template | Fabrique numérique des ministères sociaux</title>
        {contentSecurityPolicy && (
          <meta
            httpEquiv="Content-Security-Policy"
            content={contentSecurityPolicy}
          ></meta>
        )}
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Template de la fabrique des ministères sociaux."
        />
      </Head>
      <Header
        brandTop={brandTop}
        serviceTitle="La fabrique numérique des ministères sociaux"
        serviceTagline="L'incubateur des services numériques du pôle ministériel"
        homeLinkProps={homeLinkPops}
        navigation={[
          {
            text: "Accueil",
            linkProps: {
              href: "/",
            },
            isActive: router.asPath === "/",
          },
          {
            text: "DSFR playground",
            linkProps: {
              href: "/dsfr",
            },
            isActive: router.asPath === "/dsfr",
          },
          {
            text: "Mui playground",
            linkProps: {
              href: "/mui",
            },
            isActive: router.asPath === "/mui",
          },
        ]}
        quickAccessItems={[headerFooterDisplayItem]}
      />
      <div
        className={css({
          margin: "auto",
          maxWidth: 1000,
          ...fr.spacing("padding", {
            topBottom: "10v",
          }),
        })}
      >
        {children}
      </div>
      <Footer
        brandTop={brandTop}
        accessibility="non compliant"
        contentDescription={`
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
                `}
        homeLinkProps={homeLinkPops}
        accessibilityLinkProps={{ href: "/accessibilite" }}
        termsLinkProps={{ href: "/mentions-legales" }}
        bottomItems={[...bottomLinks, headerFooterDisplayItem]}
      />
    </MuiDsfrThemeProvider>
  );
};

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default withDsfr(withAppEmotionCache(App));
