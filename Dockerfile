ARG NODE_VERSION=16-alpine

# Builder
FROM node:$NODE_VERSION AS builder

ARG NEXT_PUBLIC_APP_VERSION_COMMIT
ENV NEXT_PUBLIC_APP_VERSION_COMMIT $NEXT_PUBLIC_APP_VERSION_COMMIT
ARG NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ENV NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT $NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST $NEXT_PUBLIC_HOST

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
ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST $NEXT_PUBLIC_HOST

# To set staging public environment value in production environment
RUN if [ -z "$NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT" ]; then echo "Copy staging values"; cp .env.staging .env.production; fi

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
