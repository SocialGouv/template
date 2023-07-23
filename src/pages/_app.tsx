import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Link from "next/link";

import { fr } from "@codegouvfr/react-dsfr";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import { useStyles } from "tss-react/dsfr";
import {
  Display,
  headerFooterDisplayItem,
} from "@codegouvfr/react-dsfr/Display";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { init } from "@socialgouv/matomo-next";
import Head from "next/head";

declare module "@codegouvfr/react-dsfr/next-pagesdir" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

// Only in TypeScript projects
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

function App({ Component, pageProps }: AppProps) {
  const { css } = useStyles();

  const router = useRouter();

  const contentSecurityPolicy = process.env.CONTENT_SECURITY_POLICY;

  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
    });
  }, []);

  return (
    <>
      <MuiDsfrThemeProvider>
        <Head>
          <title>Template SocialGouv</title>
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
          <Component {...pageProps} />
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
        <Display />
      </MuiDsfrThemeProvider>
    </>
  );
}

export default withDsfr(withAppEmotionCache(App));
