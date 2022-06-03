ARG NODE_VERSION=16-alpine

# Builder
FROM node:$NODE_VERSION AS builder

WORKDIR /app

COPY package.json yarn.lock /app/

COPY . .

RUN yarn install --frozen-lockfile && yarn build && yarn install --production

# Runner
FROM node:$NODE_VERSION AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_APP_VERSION_COMMIT
ENV NEXT_PUBLIC_APP_VERSION_COMMIT $NEXT_PUBLIC_APP_VERSION_COMMIT
ARG NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT $NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT

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

USER node

CMD ["yarn", "start"]
