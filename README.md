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
- Step worker: `src/worker.ts`
- Event trigger worker: `src/triggers/events.ts`
- Recovery service: `src/recovery.ts`
- Prisma schema: `prisma/schema.prisma`

## Environment

Minimum expected environment variables:

```env
PORT=5000
DATABASE_URL=postgresql://...
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
WORKER_CONCURRENCY=10
RECOVERY_INTERVAL_MS=15000
RECOVERY_BATCH_SIZE=50
```

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
npm run dev:worker
npm run dev:event-trigger
npm run dev:recovery
```

## Build

```bash
npm run build
```

## Main API Endpoints

```text
POST   /flow
GET    /flow
GET    /flow/:id
PATCH  /flow/:id
POST   /flow/:id/trigger
GET    /flow/:id/executions
GET    /flow/executions/:executionId
GET    /flow/dashboard/summary
POST   /flow/events/:eventKey/emit
POST   /webhooks/:webhookKey
```

## Trigger Idempotency

- Manual trigger: send `idempotencyKey` in the request body
- Webhook trigger: send `x-idempotency-key` or `x-flow-event-key`
- External event trigger: send `idempotencyKey` in the event payload routed through `/flow/events/:eventKey/emit`

Duplicate requests return the existing execution instead of creating a second one.

## Notes

- Schema changes require applying the Prisma migrations in `prisma/migrations/`
- The workers should be running for asynchronous steps to execute
- Recovery should be running in any environment where retries matter
