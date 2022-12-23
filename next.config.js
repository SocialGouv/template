const { withSentryConfig } = require("@sentry/nextjs");

const { version } = require("./package.json");

const ContentSecurityPolicy = require("./csp.config");

const withTM = require("next-transpile-modules")(["@codegouvfr/react-dsfr"]);

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
    NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT: process.env.PRODUCTION,
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
            value: process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
              ? "all"
              : "noindex, nofollow, nosnippet",
          },
        ],
      },
    ];
  },
  ...withTM(withSentryConfig(moduleExports, { silent: true })),
};
