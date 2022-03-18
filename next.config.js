const { withSentryConfig } = require("@sentry/nextjs");

const { version } = require("./package.json");

const ContentSecurityPolicy = `
  default-src 'self' *.fabrique.social.gouv.fr;
  img-src 'self' data: *.fabrique.social.gouv.fr https://dummyimage.com/;
  script-src 'self' *.fabrique.social.gouv.fr ${
    process.env.NODE_ENV !== "production" && "'unsafe-eval'"
  };
  frame-src 'self' *.fabrique.social.gouv.fr;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data: blob:;
  prefetch-src 'self' *.fabrique.social.gouv.fr;
`;

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
