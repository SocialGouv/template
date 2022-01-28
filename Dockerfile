# Install dependencies only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat=1.2.2-r7
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build:export

# Production image, copy all the files and run next
FROM ghcr.io/socialgouv/docker/nginx:6.64.2 AS runner

COPY --from=builder /app/out /usr/share/nginx/html