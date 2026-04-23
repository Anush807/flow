/**
 * Test script for branching support.
 *
 * Prerequisites:
 *   - API server running on PORT (default 5000)
 *   - Worker running (npm run dev:worker)
 *
 * Run:  npx tsx src/test/test-branching.ts
 */

const BASE = `http://localhost:${process.env["PORT"] ?? "5000"}`;

async function json(url: string, opts?: RequestInit) {
  const res = await fetch(url, {
    ...opts,
    headers: { "Content-Type": "application/json", ...opts?.headers },
  });
  return { status: res.status, body: await res.json() };
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("=== Test 1: Create a flow with branches ===\n");

  // Flow:
  //   Step 1 (http:respond) — runs always
  //   Step 2 (http:respond) — has 2 branches:
  //     Branch 0: condition trigger.type == "urgent" → email:send
  //     Branch 1: no condition (default)             → http:respond
  //   Step 3 (http:respond) — runs after the branch merges

  const createRes = await json(`${BASE}/flow`, {
    method: "POST",
    body: JSON.stringify({
      name: "Branching Test Flow",
      status: "Active",
      steps: [
        {
          type: "Action",
          integrationKey: "http",
          operationKey: "respond",
          name: "Step 1 - always runs",
          inputMapping: { statusCode: 200, body: { msg: "step1 done" } },
        },
        {
          type: "Action",
          integrationKey: "http",
          operationKey: "respond",
          name: "Step 2 - branch point",
          inputMapping: { statusCode: 200, body: { msg: "step2 done" } },
          branches: [
            {
              conditions: [
                {
                  sourceType: "Trigger",
                  fieldPath: "type",
                  operator: "Equals",
                  comparisonValue: "urgent",
                },
              ],
              steps: [
                {
                  type: "Action",
                  integrationKey: "http",
                  operationKey: "respond",
                  name: "Branch 0 - urgent path",
                  inputMapping: { statusCode: 200, body: { msg: "urgent branch" } },
                },
              ],
            },
            {
              steps: [
                {
                  type: "Action",
                  integrationKey: "http",
                  operationKey: "respond",
                  name: "Branch 1 - default path",
                  inputMapping: { statusCode: 200, body: { msg: "default branch" } },
                },
              ],
            },
          ],
        },
        {
          type: "Action",
          integrationKey: "http",
          operationKey: "respond",
          name: "Step 3 - after branch merge",
          inputMapping: { statusCode: 200, body: { msg: "step3 done - merged" } },
        },
      ],
    }),
  });

  console.log("Create response:", createRes.status);
  const flow = (createRes.body as any).data;
  const flowId = flow.id;
  console.log("Flow ID:", flowId);
  console.log("Steps:", JSON.stringify(flow.FlwSteps, null, 2));

  // ---- Test 2: Trigger with type=urgent (should take branch 0) ----

  console.log("\n=== Test 2: Trigger with type=urgent ===\n");

  const triggerUrgent = await json(`${BASE}/flow/${flowId}/trigger`, {
    method: "POST",
    body: JSON.stringify({ triggerPayload: { type: "urgent", message: "HELP!" } }),
  });
  console.log("Trigger response:", triggerUrgent.status, triggerUrgent.body);

  const urgentExecId = (triggerUrgent.body as any).data.executionId;

  // Wait for worker to process
  await sleep(5000);

  const urgentExec = await json(`${BASE}/flow/executions/${urgentExecId}`);
  console.log("Urgent execution status:", (urgentExec.body as any).data.status);
  console.log(
    "Steps executed:",
    (urgentExec.body as any).data.FlwExecutionSteps.map((s: any) => ({
      status: s.status,
      output: s.outputPayload,
    })),
  );

  // ---- Test 3: Trigger with type=normal (should take branch 1 — default) ----

  console.log("\n=== Test 3: Trigger with type=normal (default branch) ===\n");

  const triggerNormal = await json(`${BASE}/flow/${flowId}/trigger`, {
    method: "POST",
    body: JSON.stringify({ triggerPayload: { type: "normal", message: "hello" } }),
  });
  console.log("Trigger response:", triggerNormal.status, triggerNormal.body);

  const normalExecId = (triggerNormal.body as any).data.executionId;

  await sleep(5000);

  const normalExec = await json(`${BASE}/flow/executions/${normalExecId}`);
  console.log("Normal execution status:", (normalExec.body as any).data.status);
  console.log(
    "Steps executed:",
    (normalExec.body as any).data.FlwExecutionSteps.map((s: any) => ({
      status: s.status,
      output: s.outputPayload,
    })),
  );

  console.log("\n=== Done ===");
}

void main().catch(console.error);
