const { withSentryConfig } = require("@sentry/nextjs");

const { version } = require("./package.json");

const ContentSecurityPolicy = require("./csp.config");

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  sentry: {
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_VERSION_COMMIT: process.env.GITHUB_SHA,
    NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT: process.env.PRODUCTION,
    NEXT_TELEMETRY_DISABLED: process.env.NEXT_TELEMETRY_DISABLED ?? 1,
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL ?? "",
    NEXT_PUBLIC_SENTRY_DSN: process.env.SENTRY_DSN ?? "",
    NEXT_PUBLIC_SENTRY_ENV: process.env.SENTRY_ENV ?? "",
    NEXT_PUBLIC_MATOMO_URL: process.env.MATOMO_URL ?? "",
    NEXT_PUBLIC_MATOMO_SITE_ID: process.env.MATOMO_SITE_ID ?? "",
    NEXT_PUBLIC_APP_REPOSITORY_URL:
      process.env.APP_REPOSITORY_URL ??
      "https://github.com/SocialGouv/template",
    KEYCLOAK_URL:
      process.env.KEYCLOAK_URL ?? "http://localhost:8080/realms/app",
    KEYCLOAK_CLIENT_SECRET:
      process.env.KEYCLOAK_CLIENT_SECRET ?? "AkBnFMIBfEcTdWPL5WlM9HDL0cVa3UOy",
    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID ?? "confidential-client",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    NEXTAUTH_SECRET:
      process.env.NEXTAUTH_SECRET ??
      "RnDOzMROgGQqGE6zJ9Vx+vPoQn/x4Y1zmaz/Xj+xg0I=",
  },
};

module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\n/g, " ").trim(),
          },
          {
            key: "X-Robots-Tag",
            value: process.env.IS_PRODUCTION_DEPLOYMENT
              ? "all"
              : "noindex, nofollow, nosnippet",
          },
        ],
      },
    ];
  },
  ...withSentryConfig(moduleExports, { silent: true }),
};
