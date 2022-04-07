ARG NODE_VERSION=16-alpine

# Install dependencies only when needed
FROM node:$NODE_VERSION AS prepare
RUN apk add --no-cache libc6-compat=1.2.2-r7
WORKDIR /app
COPY package.json yarn.lock ./

# Keep yarn install cache when bumping version and dependencies still the sames
RUN node -e " \
  const package = JSON.parse(fs.readFileSync('/app/package.json')); \
  const packageZero = { ...package, version: '0.0.0' };  \
  fs.writeFileSync('/app/package.json', JSON.stringify(packageZero));"

FROM node:$NODE_VERSION as deps
WORKDIR /app
COPY --from=prepare /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps as run-tests
ENV NODE_ENV dev
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA
WORKDIR /app
COPY . .
RUN yarn lint
RUN yarn test 

FROM cypress/browsers:node16.13.2-chrome97-ff96 as run-e2e-tests
ENV NODE_ENV dev
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA

WORKDIR /app
COPY --from=prepare /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn test:e2e:headless

# Rebuild the source code only when needed
FROM node:$NODE_VERSION AS builder
ARG PRODUCTION
ENV NODE_ENV production
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN if [ -z "$PRODUCTION" ]; then \
      echo "Overriding .env for staging"; \
      cp .env.staging .env.production; \
    fi && \
    yarn build:export 

# Production image, copy all the files and run next
FROM ghcr.io/socialgouv/docker/nginx:6.70.1 AS runner

COPY --from=builder --chown=101:101 /app/out /usr/share/nginx/html

# Rootless container
USER 101
ENV PORT=3000

# Disable nextjs telemetry
ENV NEXT_TELEMETRY_DISABLED 1