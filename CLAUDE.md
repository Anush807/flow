# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`Flow` is a Zapier-style backend automation engine: multi-step workflows persisted in Postgres (Prisma), executed asynchronously through Redis + BullMQ, triggerable manually, by webhook, or by queued external event.

## Commands

```bash
npm install
npx prisma generate          # REQUIRED after clone or any schema.prisma change — client is gitignored
npm run dev                  # API server (src/index.ts) on $PORT
npm run dev:worker           # step worker AND event-trigger worker (see note below)
npm run dev:all              # both of the above via concurrently
npx tsx src/recovery/recovery.ts   # recovery loop (npm run dev:recovery is broken, see Known breakage)
```

Prisma migrations are applied with `npx prisma migrate deploy` / `dev`; `prisma.config.ts` supplies `DATABASE_URL` (the `datasource db` block in `schema.prisma` deliberately has no `url`).

### Testing

There is no test runner. `src/test/*.ts` are manual scripts run with `npx tsx`:

- `src/test/test-https.ts`, `src/test/test-email.ts` — exercise one integration handler directly, no DB or Redis needed.
- `src/test/test-branching.ts` — end-to-end; needs the API server **and** worker running.
- `script/seed-workflow.ts` — **wipes all flow/execution tables** and seeds sample flows.

## Architecture

### Execution model: a chain of one-step jobs, not a loop

There is no orchestrator holding execution state. Each BullMQ job in `step-execution-worker` processes exactly one `FlwExecutionSteps` row. On success, `onSuccessFunction` (`src/async/worker.ts`) resolves the next step definition, creates its `FlwExecutionSteps` row **in the same transaction**, then enqueues it. `FlwExecutionSteps` rows are therefore created lazily, one at a time — only the `FlwSteps` definitions exist upfront. When no next step resolves, the parent `FlwExecutions` is marked `Success`.

Three mechanisms keep this safe, and they interact:

1. **Claim guard** — `claimStep()` does `updateMany({ where: { id, status: "Pending" } })`. A count of 0 means another worker already took it. This is the *only* thing preventing double execution.
2. **Retries are hand-rolled, not BullMQ's.** Queues are configured `attempts: 1`. `failureHandler` sets the step back to `Pending` with `nextRetryAt`, then re-enqueues with a BullMQ `delay`. Max 5 retries, backoff `5000 * 2^retryCount` ms. Exceeding it fails both the step and the whole execution.
3. **Recovery** (`src/recovery/recovery.ts`) polls for `Pending` steps whose `nextRetryAt` has elapsed and re-enqueues them, plus `Running` executions idle >5min with no `Running` step. It does not dedupe against in-flight jobs — it relies on the claim guard. Without recovery running, a dropped job is lost.

### Branching

Branches are a self-relation on `FlwSteps`: `parentStepId` + `branchIndex` + `position`. Root steps are `parentStepId: null, branchIndex: 0`. Traversal lives in `findNextStep` / `findNextAfterStep`:

- Children of the current step = branch point. Group by `branchIndex`, evaluate the *first step's* conditions of each branch in index order, **first match wins** (exclusive). A branch with no conditions acts as the default.
- No match → fall through to `findNextAfterStep`.
- `findNextAfterStep` finds the next sibling at the same `(parentStepId, branchIndex)`; if none and inside a branch, it walks **up** to the parent and continues after it. That upward walk is what makes branches "merge" back into the main line.
- Branch-level `conditions` in the create payload are merged into the first step of that branch at write time (`createStepsRecursive` in `src/services/flow-service.ts`).
- Creation recurses arbitrarily deep, but read queries (`flowStepsInclude()`) hardcode **3 levels** of `childSteps` — deeper branches execute but won't appear in API responses.

### Conditions

Two scopes, different failure semantics:

- **Flow-level** (`FlwConditions.flwStepId === null`) — evaluated only on the first root step (`position === 1 && parentStepId === null`). Failing stops the run: `stopExecutionByCondition` marks step and execution `Success` (not `Failed`).
- **Step-level** — failing marks that step `Success` with `{ skipped: true }` and the chain continues.

Conditions combine left-to-right using each condition's own `logicGate` against the running accumulator — no operator precedence, no grouping.

### Templating and integrations

`inputMapping` takes precedence over `configPayload`. Strings are scanned for `{{ … }}`:

- `{{ trigger }}` → whole trigger payload as JSON
- `{{ trigger.a.b }}` → path lookup, `String()`-ified, `""` if missing
- `{{ steps.<flwStepId>.a.b }}` → output of a prior successful step, keyed by **step definition UUID**

Note this resolver is **duplicated** in `src/async/worker.ts` and `src/services/test-services.ts` — changes must be made in both.

Integrations are a flat `Map` keyed `"integrationKey:operationKey"` (`src/integrations/registry.ts`). To add one: export a `Record<string, IntegrationHandler>` from a new file in `src/integrations/` and `registerHandlers(...)` it. Currently: `http:request`, `http:respond`, `email:send`, plus passthrough trigger handlers `event:event.receive` / `event:webhook.receive`.

### Triggering and idempotency

`createExecutionForFlow` throws `"Flow not active"` unless `status === "Active"` — Draft flows cannot be triggered by any path.

Duplicate protection uses the globally-unique `ProcessedEvents.eventKey`, namespaced per flow: `${flwId}:${sourceEventKey}` or `${flwId}:manual:${idempotencyKey}`. Callers build `sourceEventKey` as `webhook:${key}` (from `x-idempotency-key` / `x-flow-event-key` header or `body.idempotencyKey`) or `event:${eventKey}:${idempotencyKey}`. The race is closed by catching Prisma `P2002` and returning the existing execution.

**The event-trigger worker has no process of its own** — `src/async/worker.ts` starts it via the bare side-effect `import "../triggers/events.js"` on line 1. `npm run dev:worker` runs both.

### API surface (`src/api.ts`, mounted at `/flow`)

Several routes have duplicate aliases; both spellings are live.

| Route | Notes |
|---|---|
| `POST /flow` · `POST /flow/create` | create; requires `steps` **or** `nodeType` |
| `GET /flow` · `GET /flow/:id` · `PATCH /flow/:id` | |
| `POST /flow/:id/trigger` · `POST /flow/flows/:id/trigger` | |
| `POST /flow/:id/test` | synchronous dry-run via `test-services.ts` — no DB writes, no queue, **ignores branches** |
| `POST /flow/events/:eventKey/emit` | enqueues to `external-event-trigger`, returns 202 |
| `GET /flow/:id/executions` · `GET /flow/executions/:executionId` · `GET /flow/dashboard/summary` | |
| `POST /webhooks/:webhookKey` (in `src/index.ts`) · `POST /flow/webhook/:webhookKey` | |

`PATCH /flow/:id` **with `steps`** deletes every execution, execution step, processed event and condition for that flow before recreating the definition. It is destructive, not a patch.

## Conventions

- **ESM + `nodenext`**: every relative import needs an explicit `.js` extension, including from `.ts` sources.
- **Prisma client is generated to `/generated/prisma`** (gitignored) — import from `../../generated/prisma/client.js`, never `@prisma/client`.
- `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` are on. This is why the codebase spreads conditionally (`...(x !== undefined ? { x } : {})`) instead of passing `undefined`, and null-checks every array index. Match it.
- `verbatimModuleSyntax` is on — type-only imports must use `import type`.
- `dns.setDefaultResultOrder("ipv4first")` is set in each entrypoint and in `lib/prisma.ts`; keep it in any new one.
- Zod schemas in `src/validations/index.ts` gate all request bodies; the recursive `flowStepSchema.branches` uses `z.lazy` with an `any` cast.

## Known breakage / stale docs

Do not trust these; fix them if the task touches them.

- `npm run build` **fails**. The root `tsconfig.json` doesn't exclude `src/web`, so `tsc` pulls the Vite app into the Node build — 30 errors, all from `src/web/**`. Backend sources type-check clean on their own.
- `npm start` runs `node dist/index.js`, but with no `rootDir` set the output lands at `dist/src/index.js`.
- `npm run dev:recovery` points at `src/recovery.ts`, which does not exist (the file is `src/recovery/recovery.ts`).
- `README.md` references `src/worker.ts`, `src/recovery.ts` and an `npm run dev:event-trigger` script — all wrong; see "Core Runtime" there with skepticism.
- `src/web/` is a self-contained AI-Studio-generated React/Vite prototype with its own `package.json` and `node_modules`. It renders **mock data from `src/web/src/data.ts`** and makes no calls to this backend. Its README is Google boilerplate.
- The `FlwDataRecord` model exists in `schema.prisma` and has a migration, but nothing in the codebase reads or writes it.
