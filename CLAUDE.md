# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`Flow` is a Zapier-style backend automation engine: multi-step workflows persisted in Postgres (Prisma), executed asynchronously through Redis + BullMQ, triggerable manually, by webhook, or by queued external event.

The management API sits behind a static API key; webhook ingress is public by design. Three processes make up a deployment: the API (`src/index.ts`), the step worker (`src/async/worker.ts`, which also hosts the event-trigger worker), and the recovery loop (`src/recovery/recovery.ts`).

A web console lives in `src/web/ui` (Vite + React). It is not a fourth process: it is a static bundle the API process serves, talking to a console-shaped API at `/api` behind the same key.

## Commands

```bash
npm install
npx prisma generate          # REQUIRED after clone or any schema.prisma change — client is gitignored
npm run dev                  # API server (src/index.ts) on $PORT
npm run dev:worker           # step worker AND event-trigger worker (see note below)
npm run dev:recovery         # recovery loop
npm run dev:all              # all three of the above via concurrently
npm test                     # node:test via tsx
npm run typecheck            # tsc --noEmit, includes *.test.ts
npm run build                # tsc -p tsconfig.build.json (excludes tests)

npm run install:ui           # dependencies for the console (separate tree)
npm run dev:ui               # console dev server on :5173, proxying /api to the API
npm run dev:console          # dev:all + the console
npm run build:ui             # -> src/web/ui/dist, which the API process then serves
```

Prisma migrations are applied with `npx prisma migrate deploy` / `dev`; `prisma.config.ts` supplies `DATABASE_URL` (the `datasource db` block in `schema.prisma` deliberately has no `url`).

### Testing

`npm test` runs Node's built-in test runner over `src/**/*.test.ts` through the tsx loader. The suite is deliberately dependency-free — no DB, no Redis — because the logic worth testing was extracted for exactly that reason:

- `src/utils/template.test.ts` — `{{ … }}` resolution
- `src/utils/conditions.test.ts` — operators and left-to-right gate combination
- `src/utils/retry.test.ts` — backoff curve and the exhaustion boundary
- `src/services/step-traversal.test.ts` — branch selection, merge-up, generation scoping
- `src/validations/index.test.ts` — request schemas

Anything needing real infrastructure stays a manual script:

- `src/test/test-https.ts`, `src/test/test-email.ts` — exercise one integration handler directly.
- `src/test/test-branching.ts` — end-to-end; needs the API server **and** worker running.
- `script/seed-workflow.ts` — **wipes all flow/execution tables** and seeds sample flows.

### Configuration

All env access goes through `src/config.ts`, which validates with zod at import time and throws on a bad value — no `process.env` reads scattered through the code. `API_KEY` is **required in production**; without it the process refuses to boot rather than serving an unauthenticated management API.

## Architecture

### Execution model: a chain of one-step jobs, not a loop

There is no orchestrator holding execution state. Each BullMQ job in `step-execution-worker` processes exactly one `FlwExecutionSteps` row. On success, `onSuccessFunction` (`src/async/worker.ts`) resolves the next step definition, creates its `FlwExecutionSteps` row **in the same transaction**, then enqueues it. `FlwExecutionSteps` rows are therefore created lazily, one at a time — only the `FlwSteps` definitions exist upfront. When no next step resolves, the parent `FlwExecutions` is marked `Success`.

**Keep transactions to the writes that need atomicity.** Definition lookups and branch traversal run *outside* the transaction — they read immutable rows, and holding a transaction open across several round trips blows Prisma's 5s default on a remote database (this turned every trigger into a 500 against a hosted Postgres). Each `$transaction` call also passes an explicit timeout rather than inheriting the default. What is actually protected:

- `createExecutionForFlow` — an execution is never created without its first step and its dedupe record.
- `onSuccessFunction` — a step is never marked `Success` without its successor existing to carry the execution forward.

Three mechanisms keep this safe, and they interact:

1. **Claim guard** — `claimStep()` does `updateMany({ where: { id, status: "Pending" } })`. A count of 0 means another worker already took it. This is the *only* thing preventing double execution.
2. **Retries are hand-rolled, not BullMQ's.** Queues are configured `attempts: 1`. `failureHandler` sets the step back to `Pending` with `nextRetryAt`, then re-enqueues with a BullMQ `delay`. Max 5 retries, backoff `5000 * 2^retryCount` ms. Exceeding it fails both the step and the whole execution. Every transition it writes is guarded on the step still being `Running` — `processStep` funnels *all* post-claim throws here, including ones raised after the success transaction committed, and the guard is what stops a succeeded step from being resurrected.
3. **Recovery** (`src/recovery/recovery.ts`) polls for `Pending` steps whose `nextRetryAt` has elapsed and whose execution is still `Pending`/`Running`, and re-enqueues them, plus `Running` executions idle >5min with no `Running` step. It does not dedupe against in-flight jobs — it relies on the claim guard. Without recovery running, a dropped job is lost.

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

`sourceType: "StepOutput"` conditions carry a caller-facing `sourceStepPosition`, which `buildConditionRows` (`src/services/flow-service.ts`) resolves to the stored `sourceStepId` the worker reads: first against the step's own level, then against the root level (how a branch condition refers back to the main-line step it hangs off). A position matching no step rejects the create/update.

### Templating and integrations

`inputMapping` takes precedence over `configPayload`. Strings are scanned for `{{ … }}`:

- `{{ trigger }}` → whole trigger payload as JSON
- `{{ trigger.a.b }}` → path lookup, `String()`-ified, `""` if missing
- `{{ steps.<flwStepId>.a.b }}` → output of a prior successful step, keyed by **step definition UUID**

The resolver lives in `src/utils/template.ts` and is shared by `src/async/worker.ts` and `src/services/test-services.ts`.

Integrations are a flat `Map` keyed `"integrationKey:operationKey"` (`src/integrations/registry.ts`). To add one: export a `Record<string, IntegrationHandler>` from a new file in `src/integrations/` and `registerHandlers(...)` it. Currently: `http:request`, `http:respond`, `email:send`, plus passthrough trigger handlers `event:event.receive` / `event:webhook.receive`.

### Triggering and idempotency

`createExecutionForFlow` throws `"Flow not active"` unless `status === "Active"` — Draft flows cannot be triggered by any path.

Duplicate protection uses the globally-unique `ProcessedEvents.eventKey`, namespaced per flow: `${flwId}:${sourceEventKey}` or `${flwId}:manual:${idempotencyKey}`. Callers build `sourceEventKey` as `webhook:${key}` (from `x-idempotency-key` / `x-flow-event-key` header or `body.idempotencyKey`) or `event:${eventKey}:${idempotencyKey}`. The race is closed by catching Prisma `P2002` and returning the existing execution.

**The event-trigger worker has no process of its own** — `src/async/worker.ts` starts it by importing `eventTriggerWorker` from `../triggers/events.js` on line 1. `npm run dev:worker` runs both.

### Definition generations

`FlwSteps.deletedAt` is a soft delete, and it doubles as a version marker. Replacing a flow's steps stamps every current step with one shared timestamp and creates the new ones with `deletedAt: null`. Consequences to preserve:

- Read/render queries filter `deletedAt: null` — the API only ever shows the current definition.
- **Traversal filters `deletedAt: <the current step's own value>`**, so an execution that started before a replacement finishes on the definition it began with instead of falling off a vanished chain.
- `createStepsRecursive`'s fetch-back after `createMany` must keep its `deletedAt: null` filter, or retired generations sharing the same `(flwId, parentStepId, branchIndex)` come back and misalign the level.

### API surface (`src/api.ts`, mounted at `/flow`)

Everything under `/flow` requires the management API key (`Authorization: Bearer` or `x-api-key`) and is rate limited per IP. Webhook ingress and the health probes are public. Several routes have duplicate aliases; both spellings are live.

| Route | Notes |
|---|---|
| `GET /health` · `GET /ready` | public; liveness does not touch dependencies, readiness probes DB + Redis |
| `POST /flow` · `POST /flow/create` | create; requires `steps` **or** `nodeType` |
| `GET /flow` · `GET /flow/:id` · `PATCH /flow/:id` | list takes `?limit=&offset=` (cap 100) |
| `POST /flow/:id/trigger` · `POST /flow/flows/:id/trigger` | |
| `POST /flow/:id/test` | synchronous dry-run via `test-services.ts` — no DB writes, no queue, **ignores branches** |
| `POST /flow/events/:eventKey/emit` | enqueues to `external-event-trigger`, returns 202 |
| `GET /flow/:id/executions` | paginated, returns `{ data, pagination: { limit, offset, total } }` |
| `GET /flow/executions/:executionId` · `GET /flow/dashboard/summary` | |
| `DELETE /flow/:id` | **destructive** — see `deleteFlowDefinition` below |
| `POST /webhooks/:webhookKey` (in `src/index.ts`) · `POST /flow/webhook/:webhookKey` | **public**, rate limited per webhook key + IP |

`PATCH /flow/:id` **with `steps`** replaces the definition non-destructively: the previous steps are superseded (see "Definition generations") and executions, execution steps and processed events are all preserved. Flow-level conditions are replaced; step-level conditions stay attached to the superseded steps.

`deleteFlowDefinition` is the one destructive write in the codebase: it removes the flow, its steps, conditions, executions, execution steps and processed events in a single transaction. It **refuses** a flow with an execution still `Pending`/`Running`, because the worker holds job references to rows that would vanish. Archiving (`status: "Archived"`) is the non-destructive alternative and is what the console offers alongside it.

Errors map through `errorResponse` in `src/utils/error-response.ts`, shared by both routers — 400 for validation (with an `issues` array), 404 for missing, 409 for inactive/no-steps/in-flight and for a Prisma `P2002` on `eventKey`/`webhookKey`, 500 otherwise.

### Console API (`src/routes/console.ts`, mounted at `/api`)

The web console's own surface, behind the same API key and rate limit. It is a *second face on the same services* — every write goes through `flow-service` / `execution-service` — that shapes responses for a browser: lowercase statuses, relative timestamps, payloads as JSON **strings** (the console edits them in textareas), everything enveloped as `{ data, pagination? }`.

| Route | Notes |
|---|---|
| `GET /api/stats` · `GET /api/settings` · `GET /api/integrations` | settings is non-secret config + live queue depth (degrades to `queue: null` if Redis is slow); integrations lists the registry keys |
| `GET /api/flows` | `?search=&status=&limit=&offset=`; `status=failing` is derived, not a column, so it filters after mapping |
| `GET/POST /api/flows` · `PUT /api/flows/:id` · `DELETE /api/flows/:id` | PUT (not PATCH) because the console submits the whole form |
| `POST /api/flows/:id/test` · `POST /api/flows/:id/emit` | dry run vs. real execution |
| `GET /api/executions` · `GET /api/executions/:id` · `POST /api/executions/:id/rerun` | rerun replays the original trigger payload as a **new** execution against the current definition |

Two supporting modules: `src/services/console-view.ts` is pure (formatting, status mapping, step ordering, JSON-text parsing) and unit tested; `src/services/console-service.ts` holds the console-only Prisma queries. Keep mapping logic on the pure side.

There is no session system: the console asks the operator for the management key on first load, keeps it in `localStorage`, and sends it as `x-api-key` (`src/web/ui/src/store/useAuthStore.ts`). A dev server booted without `API_KEY` accepts everything and the prompt never appears.

The bundle itself is served by `mountConsoleStatic` (`src/routes/console-static.ts`) from `src/web/ui/dist`, `./public`, or `CONSOLE_DIST_DIR`. It is mounted after the API routers, and its history fallback deliberately skips `/api`, `/flow`, `/webhooks`, `/health` and `/ready` so an API typo stays a JSON 404.

## Conventions

- **ESM + `nodenext`**: every relative import needs an explicit `.js` extension, including from `.ts` sources.
- **Prisma client is generated to `/generated/prisma`** (gitignored) — import from `../../generated/prisma/client.js`, never `@prisma/client`.
- `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` are on. This is why the codebase spreads conditionally (`...(x !== undefined ? { x } : {})`) instead of passing `undefined`, and null-checks every array index. Match it.
- `verbatimModuleSyntax` is on — type-only imports must use `import type`.
- `dns.setDefaultResultOrder("ipv4first")` is set in each entrypoint and in `lib/prisma.ts`; keep it in any new one.
- Zod schemas in `src/validations/index.ts` gate all request bodies; the recursive `flowStepSchema.branches` uses `z.lazy` with an `any` cast.
- **No `console.*` and no direct `process.env`.** Log through `createLogger(component)` (`src/utils/logger.ts`) — JSON lines, with `flwId` / `executionId` / `stepExecutionId` on anything execution-related. Read config through `src/config.ts`.
- Logic worth testing lives outside the worker: `src/utils/conditions.ts`, `src/utils/retry.ts` and `src/services/step-traversal.ts` are pure. `step-traversal` runs against a `StepReader` interface; `src/async/worker.ts` supplies the Prisma-backed one via `prismaStepReader`. Keep new traversal rules on that side of the boundary.

## Known breakage / stale docs

Do not trust these; fix them if the task touches them.

- `src/web/ui/` is the console and has its own `package.json`, `node_modules` and `tsconfig.json`. It is excluded from the root `tsconfig.json` and from `npm run build`; check it with `npm --prefix src/web/ui run lint`. (The mock-data prototype that used to sit in `src/web/` has been deleted.)
- The `FlwDataRecord` model exists in `schema.prisma` and has a migration, but nothing in the codebase reads or writes it.
