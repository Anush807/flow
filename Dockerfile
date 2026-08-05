# syntax=docker/dockerfile:1

# Debian, not Alpine: the Prisma schema engine that `migrate deploy` shells out
# to ships as a glibc binary (schema-engine-debian-openssl-3.0.x). A musl base
# would have to fetch a different build at install time.
ARG NODE_VERSION=24-bookworm-slim

# ---------------------------------------------------------------------------
# deps – full dependency tree, used only to build.
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci


# ---------------------------------------------------------------------------
# build – generate the Prisma client, then compile TypeScript.
#
# Order matters: the `prisma-client` generator emits TypeScript into
# /generated/prisma, and tsc pulls those files into the output tree, so
# `prisma generate` has to run first or the build fails on a missing import.
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS build

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json tsconfig.json tsconfig.build.json prisma.config.ts ./
COPY prisma ./prisma
COPY lib ./lib
COPY src ./src

# prisma.config.ts resolves DATABASE_URL eagerly. Generation never opens a
# connection, so a placeholder is enough — the real value is injected at
# runtime and this one never leaves the build stage.
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

RUN npx prisma generate
RUN npm run build


# ---------------------------------------------------------------------------
# console – the web UI bundle.
#
# Its own dependency tree, kept out of the backend's: nothing in `src/web/ui`
# runs in Node at runtime, only the static output ships.
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS console

WORKDIR /app/ui
COPY src/web/ui/package.json src/web/ui/package-lock.json ./
RUN npm ci

COPY src/web/ui ./
RUN npm run build


# ---------------------------------------------------------------------------
# prod-deps – runtime dependency tree only.
#
# --ignore-scripts because the only postinstall that matters here is Prisma's,
# and the generated client is copied in from the build stage already compiled.
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS prod-deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts


# ---------------------------------------------------------------------------
# migrator – one-shot image for `prisma migrate deploy`.
#
# Kept separate from the runtime image, which carries neither the schema, the
# migrations, nor prisma.config.ts — nothing at runtime needs them, because the
# driver adapter talks to Postgres through `pg` and the client is pre-generated.
# Build and run this as a deploy job, before rolling the app:
#
#   docker build --target migrator -t flow-migrate .
#   docker run --rm --env-file .env flow-migrate
# ---------------------------------------------------------------------------
FROM build AS migrator

# The schema engine probes for libssl at startup; without it Prisma warns and
# falls back to an openssl-1.1.x build on every run.
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

# npm ci ran as root; the CLI verifies (and would re-fetch) the engine binary
# on startup and refuses to run if it cannot write there.
RUN chown -R node:node /app/node_modules/@prisma/engines

USER node
CMD ["npx", "prisma", "migrate", "deploy"]


# ---------------------------------------------------------------------------
# runtime – the image that ships.
#
# One image, three processes. The API is the default; the others override the
# command, and all three must run for the system to be correct — without the
# recovery loop a dropped job is never retried.
#
#   api:       (default)
#   worker:    node dist/src/async/worker.js
#   recovery:  node dist/src/recovery/recovery.js
#
# No HEALTHCHECK here: only the API has an HTTP surface to probe, and baking
# one in would mark every worker container unhealthy. The API exposes
# GET /health (liveness, no dependencies) and GET /ready (probes DB + Redis)
# for the orchestrator to point at.
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

# The console bundle. The API process picks it up from ./public and serves it
# on the same origin as /api; the worker and recovery containers simply ignore
# it. Override the location with CONSOLE_DIST_DIR.
COPY --from=console /app/ui/dist ./public

# Drop privileges. `node` (uid 1000) ships with the base image.
USER node

EXPOSE 3000

# Exec form, so node is PID 1 and receives SIGTERM directly — every entrypoint
# installs its own handler and drains in-flight work before exiting.
CMD ["node", "dist/src/index.js"]
