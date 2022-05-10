ARG NODE_VERSION=16-alpine

# Builder
FROM node:$NODE_VERSION AS dist

WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile && yarn build

FROM node:$NODE_VERSION AS builder

WORKDIR /app
COPY --from=dist . .
RUN yarn install --production

# Runner
FROM node:$NODE_VERSION AS runner

WORKDIR /app

ARG PRODUCTION
ENV PRODUCTION $PRODUCTION
ENV NODE_ENV production
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED $NEXT_TELEMETRY_DISABLED
ARG SITE_URL
ENV SITE_URL $SITE_URL
ARG SENTRY_DSN
ENV SENTRY_DSN $SENTRY_DSN
ARG SENTRY_ENV
ENV SENTRY_ENV $SENTRY_ENV
ARG MATOMO_URL
ENV MATOMO_URL $MATOMO_URL
ARG MATOMO_SITE_ID
ENV MATOMO_SITE_ID $MATOMO_SITE_ID
ARG APP_REPOSITORY_URL
ENV APP_REPOSITORY_URL $APP_REPOSITORY_URL

COPY --from=builder /app/next.config.js .
COPY --from=builder /app/sentry.client.config.ts .
COPY --from=builder /app/sentry.server.config.ts .
COPY --from=builder /app/package.json .
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.next ./.next

USER node

CMD ["yarn", "start"]