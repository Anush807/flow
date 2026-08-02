# Flow

`Flow` is a backend automation engine in the spirit of Zapier:

- define multi-step workflows
- trigger them manually, by webhook, or by queued external events
- execute steps asynchronously through Redis + BullMQ workers
- persist execution history, outputs, retries, and failures in Postgres via Prisma

## Current Product Surface

- Flow definitions with ordered steps
- **Conditional branching** (exclusive if/else branches within flows)
- Flow lifecycle status: `Draft`, `Active`, `Paused`, `Archived`
- Manual flow execution
- Webhook-triggered execution
- External event-triggered execution
- Integration registry with:
  - `http:request`
  - `http:respond`
  - `email:send`
- Execution tracking with step outputs and retry metadata
- Duplicate-trigger protection via idempotency keys / processed events
- Recovery loop for retryable or stale pending work

## Branching

Steps can define `branches` — an array of conditional paths. After the step executes, the worker evaluates each branch's conditions in order and takes the **first match** (exclusive branching). Steps within a branch run sequentially. When a branch completes, execution continues with the next step after the branch point.

```json
{
  "steps": [
    { "type": "Action", "integrationKey": "http", "operationKey": "request", "name": "Fetch data" },
    {
      "type": "Action", "integrationKey": "http", "operationKey": "respond", "name": "Branch point",
      "branches": [
        {
          "conditions": [{ "sourceType": "Trigger", "fieldPath": "priority", "operator": "Equals", "comparisonValue": "high" }],
          "steps": [{ "type": "Action", "integrationKey": "email", "operationKey": "send", "name": "Send urgent email" }]
        },
        {
          "steps": [{ "type": "Action", "integrationKey": "http", "operationKey": "respond", "name": "Default handling" }]
        }
      ]
    },
    { "type": "Action", "integrationKey": "http", "operationKey": "respond", "name": "Runs after branch merges" }
  ]
}
```

Branches can be nested (branches within branches) up to 3 levels deep.

## Core Runtime

- API server: `src/index.ts`
- Flow API: `src/api.ts`
- Step worker: `src/async/worker.ts`
- Event trigger worker: `src/triggers/events.ts` (started by the step worker – it has no process of its own)
- Recovery service: `src/recovery/recovery.ts`
- Prisma schema: `prisma/schema.prisma`

## Authentication

Everything under `/flow` is the management API and requires the API key:

```bash
curl -H "Authorization: Bearer $API_KEY" http://localhost:3000/flow
# or: -H "x-api-key: $API_KEY"
```

Webhook ingress (`POST /webhooks/:webhookKey`) is **public** — third-party producers cannot hold the management credential, so those endpoints are authenticated by the unguessable key in the URL instead. `GET /health` and `GET /ready` are public too.

`API_KEY` is required when `NODE_ENV=production`; the process refuses to start without it rather than serving an unauthenticated API.

## Operations

- `GET /health` — liveness. Does not touch Postgres or Redis, so a dependency blip won't get the container restarted into the same blip.
- `GET /ready` — readiness. Probes Postgres and Redis, returns 503 when either is down.
- Logs are JSON lines on stdout/stderr. Execution-related lines carry `flwId`, `executionId` and `stepExecutionId` so a run can be reconstructed across the API, worker and recovery loop.
- All three processes handle `SIGTERM`/`SIGINT`: the API stops accepting connections and drains in-flight requests before releasing Postgres and Redis.
- Rate limits are counted in Redis, so the budget is shared across replicas. The limiter fails open if Redis is unreachable.

## Environment

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://...

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

# Management API credential (required in production, min 16 chars)
API_KEY=

WORKER_CONCURRENCY=10
RECOVERY_INTERVAL_MS=15000
RECOVERY_BATCH_SIZE=50

STEP_MAX_RETRIES=5
STEP_RETRY_BASE_DELAY_MS=5000

RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MANAGEMENT_MAX=120
RATE_LIMIT_INGRESS_MAX=600

LOG_LEVEL=info
```

Config is validated by zod at startup (`src/config.ts`); a bad value fails the boot with a precise message instead of surfacing later inside a step handler.

For email actions:

```env
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM=test@example.com
```

## Dev Commands

```bash
npm install
npx prisma generate
npm run dev
```

Run the long-lived services in separate terminals:

```bash
npm run dev:worker      # step worker + event-trigger worker
npm run dev:recovery
```

Or all of them at once:

```bash
npm run dev:all
```

## Tests

```bash
npm test          # node:test over src/**/*.test.ts, no DB or Redis needed
npm run typecheck # tsc --noEmit, includes test files
```

## Build

```bash
npm run build     # excludes *.test.ts
npm start         # node dist/src/index.js
```

## Editing a live flow

`PATCH /flow/:id` with `steps` replaces the flow definition **without destroying execution history**. The previous steps are superseded rather than deleted, which means:

- past executions still resolve the steps they actually ran
- an execution already in flight finishes on the definition it started with
- the API renders only the current definition

## Notes

- Schema changes require applying the Prisma migrations in `prisma/migrations/`
- The workers should be running for asynchronous steps to execute
- Recovery should be running in any environment where retries matter
