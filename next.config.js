const { withSentryConfig } = require("@sentry/nextjs");

const { version } = require("./package.json");

const ContentSecurityPolicy = require("./csp.config");

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  sentry: {
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
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
  ...withSentryConfig(moduleExports, { silent: true }),
};
