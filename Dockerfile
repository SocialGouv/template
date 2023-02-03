ARG NODE_VERSION=16-alpine

# Builder
FROM node:$NODE_VERSION AS builder

ARG PRODUCTION
ENV PRODUCTION $PRODUCTION
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL $NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT_URL
ENV NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT_URL $NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT_URL

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile && yarn build && yarn install --production && if [ -z "$PRODUCTION" ]; then echo "Copy staging values"; cp .env.staging .env.production; fi

# Runner
FROM node:$NODE_VERSION AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js .
COPY --from=builder /app/sentry.client.config.ts .
COPY --from=builder /app/sentry.server.config.ts .
COPY --from=builder /app/package.json .
COPY --from=builder /app/.env.production .
COPY --from=builder /app/.env.staging .
COPY --from=builder /app/csp.config.js .
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.next ./.next

USER 1001

CMD ["yarn", "start"]
