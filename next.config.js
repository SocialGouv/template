const { withSentryConfig } = require("@sentry/nextjs");

const { version } = require("./package.json");

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
  },
};

module.exports = withSentryConfig(moduleExports, { silent: true });
