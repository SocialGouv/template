const { withSentryConfig } = require("@sentry/nextjs");

const { version } = require("./package.json");

const ContentSecurityPolicy = require("./csp.config");

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff2|webmanifest)$/,
      type: "asset/resource",
    });

    return config;
  },
  sentry: {
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_VERSION_COMMIT: process.env.GITHUB_SHA,
    CONTENT_SECURITY_POLICY: ContentSecurityPolicy,
  },
  transpilePackages: ["@codegouvfr/react-dsfr", "tss-react"],
};

module.exports = {
  ...withSentryConfig(moduleExports, { silent: true }),
};
