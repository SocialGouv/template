ARG NODE_VERSION=16-alpine

# Builder
FROM node:$NODE_VERSION AS builder

ARG NEXT_PUBLIC_APP_VERSION_COMMIT
ENV NEXT_PUBLIC_APP_VERSION_COMMIT $NEXT_PUBLIC_APP_VERSION_COMMIT
ARG NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT $NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST $NEXT_PUBLIC_HOST
ARG NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT_URL
ENV NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT_URL $NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT_URL

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile 

COPY ./next.config.js .
COPY ./sentry.client.config.ts .
COPY ./sentry.server.config.ts .
COPY ./.env.production .
COPY ./.env.staging .
COPY ./csp.config.js .
COPY ./next-seo.config.js .
COPY ./src ./src
COPY ./public ./public
COPY ./scripts ./scripts
COPY ./tsconfig.json .

RUN yarn build && \
  yarn install --production && \
  yarn cache clean && \
  if [ -z "$NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT" ]; then echo "Copy staging values"; cp .env.staging .env.production; fi

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
COPY --from=builder /app/next-seo.config.js .
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.next ./.next

USER 1001

CMD ["yarn", "start"]
