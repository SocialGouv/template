// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENV = process.env.SENTRY_ENV || process.env.NEXT_PUBLIC_SENTRY_ENV;

Sentry.init({
  dsn: SENTRY_DSN ?? "",
  environment: SENTRY_ENV ?? "development",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,

  // remove healthz probes
  beforeSendTransaction: (event, hint) => {
    if (event?.request?.url?.endsWith("/healthz")) {
      return null;
    }
    return event;
  },
});
