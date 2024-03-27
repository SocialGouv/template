ARG NODE_VERSION=20-alpine3.18@sha256:a7b87c23700cdffb83eba702cd2143ddce421ef7affb1d82d927dbad46224e2e

# Install dependencies only when needed
FROM node:$NODE_VERSION AS builder
RUN apk add --no-cache libc6-compat=1.2.4-r2
WORKDIR /app

COPY yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn fetch --immutable
COPY . .

ARG PRODUCTION
ENV PRODUCTION $PRODUCTION
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL $NEXT_PUBLIC_SITE_URL

ENV NODE_ENV production
WORKDIR /app

RUN yarn postinstall # if you have postinstall script in your package.json
RUN if [ -z "$PRODUCTION" ]; then \
    echo "Overriding .env for staging"; \
    cp .env.staging .env.production; \
    fi && \
    yarn build:export 

RUN yarn fetch-tools production && yarn cache clean

# Production image, copy all the files and run next
FROM ghcr.io/socialgouv/docker/nginx:sha-1d70757 AS runner

COPY --from=builder /app/out /usr/share/nginx/html

# Disable nextjs telemetry
ENV NEXT_TELEMETRY_DISABLED 1
