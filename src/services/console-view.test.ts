import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  formatDuration,
  orderStepsForDisplay,
  parsePayloadField,
  relativeTime,
  toConsoleExecution,
  toConsoleFlowStatus,
  toFlowStatus,
  toFlowStepInputs,
  type ExecutionStepRow,
  type StepRow,
} from "./console-view.js";

function step(overrides: Partial<StepRow> & { id: string }): StepRow {
  return {
    name: null,
    position: 1,
    type: "Action",
    integrationKey: "http",
    operationKey: "request",
    configPayload: null,
    inputMapping: null,
    parentStepId: null,
    branchIndex: 0,
    ...overrides,
  };
}

describe("formatDuration", () => {
  test("scales the unit with the magnitude", () => {
    const at = (ms: number) => new Date(1_000_000 + ms);
    const start = at(0);

    assert.equal(formatDuration(start, at(450)), "450ms");
    assert.equal(formatDuration(start, at(1_500)), "1.5s");
    assert.equal(formatDuration(start, at(95_000)), "1m 35s");
  });

  test("an unfinished span is unknown, not zero", () => {
    assert.equal(formatDuration(new Date(), null), "—");
    assert.equal(formatDuration(null, new Date()), "—");
  });
});

describe("relativeTime", () => {
  const now = new Date("2026-08-05T12:00:00Z");
  const ago = (ms: number) => new Date(now.getTime() - ms);

  test("describes the distance in the largest sensible unit", () => {
    assert.equal(relativeTime(ago(2_000), now), "Just now");
    assert.equal(relativeTime(ago(30_000), now), "30s ago");
    assert.equal(relativeTime(ago(60_000), now), "1 min ago");
    assert.equal(relativeTime(ago(5 * 60_000), now), "5 mins ago");
    assert.equal(relativeTime(ago(3 * 3_600_000), now), "3 hrs ago");
    assert.equal(relativeTime(ago(2 * 86_400_000), now), "2 days ago");
  });

  test("falls back to a date past a month", () => {
    assert.equal(relativeTime(ago(60 * 86_400_000), now), "2026-06-06");
  });

  test("never run is not a duration", () => {
    assert.equal(relativeTime(null, now), "Never run");
  });
});

describe("flow status", () => {
  test("an Active flow whose last run failed reads as failing", () => {
    assert.equal(toConsoleFlowStatus("Active", "Failed"), "failing");
  });

  test("a failed run on a paused flow does not", () => {
    assert.equal(toConsoleFlowStatus("Paused", "Failed"), "paused");
  });

  test("no runs yet is just the flow's own status", () => {
    assert.equal(toConsoleFlowStatus("Draft", null), "draft");
    assert.equal(toConsoleFlowStatus("Active", "Success"), "active");
  });

  test("failing maps back to the status it is derived from", () => {
    assert.equal(toFlowStatus("failing"), "Active");
    assert.equal(toFlowStatus("archived"), "Archived");
    assert.equal(toFlowStatus("nonsense"), undefined);
  });
});

describe("orderStepsForDisplay", () => {
  test("puts each branch directly after the step it hangs off", () => {
    const root1 = step({ id: "r1", position: 1 });
    const root2 = step({ id: "r2", position: 2 });
    const branchA = step({ id: "a1", position: 1, parentStepId: "r1", branchIndex: 0 });
    const branchB = step({ id: "b1", position: 1, parentStepId: "r1", branchIndex: 1 });

    const ordered = orderStepsForDisplay([root2, branchB, root1, branchA]);

    assert.deepEqual(
      ordered.map((s) => s.id),
      ["r1", "a1", "b1", "r2"],
    );
    assert.deepEqual(
      ordered.map((s) => s.depth),
      [0, 1, 1, 0],
    );
  });

  test("renders orphans instead of dropping them", () => {
    const orphan = step({ id: "orphan", parentStepId: "missing-parent" });
    const ordered = orderStepsForDisplay([step({ id: "r1" }), orphan]);

    assert.deepEqual(
      ordered.map((s) => s.id),
      ["r1", "orphan"],
    );
  });

  test("a parentStepId cycle terminates", () => {
    const a = step({ id: "a", parentStepId: "b" });
    const b = step({ id: "b", parentStepId: "a" });

    assert.equal(orderStepsForDisplay([a, b]).length, 2);
  });
});

describe("toFlowStepInputs", () => {
  test("parses payload text into the objects the engine stores", () => {
    const [parsed] = toFlowStepInputs([
      {
        name: "  Send mail  ",
        type: "Action",
        integrationKey: "email",
        operationKey: "send",
        configPayload: '{"to":"a@b.c"}',
        inputMapping: "",
      },
    ]);

    assert.deepEqual(parsed, {
      name: "Send mail",
      type: "Action",
      integrationKey: "email",
      operationKey: "send",
      configPayload: { to: "a@b.c" },
    });
  });

  test("blames the step number for unparseable JSON", () => {
    assert.throws(
      () =>
        toFlowStepInputs([
          { type: "Action", integrationKey: "http" },
          { type: "Action", integrationKey: "http", configPayload: "{oops" },
        ]),
      /Step 2: configPayload must be valid JSON/,
    );
  });

  test("blank is absent, not empty object", () => {
    assert.equal(parsePayloadField("   ", "configPayload", 1), undefined);
    assert.equal(parsePayloadField(undefined, "configPayload", 1), undefined);
  });
});

describe("toConsoleExecution", () => {
  const now = new Date("2026-08-05T12:00:00Z");

  function executionStep(overrides: Partial<ExecutionStepRow> & { id: string }): ExecutionStepRow {
    return {
      status: "Success",
      retryCount: 0,
      error: null,
      outputPayload: null,
      errorPayload: null,
      startedAt: new Date("2026-08-05T11:59:00Z"),
      finishedAt: new Date("2026-08-05T11:59:00.120Z"),
      FlwSteps: step({ id: "def-1", name: "Fetch" }),
      ...overrides,
    };
  }

  test("surfaces the first failed step's error on the execution", () => {
    const execution = toConsoleExecution(
      {
        id: "exe-1",
        flwId: "flw-1",
        status: "Failed",
        triggerPayload: { a: 1 },
        triggeredAt: new Date("2026-08-05T11:58:00Z"),
        startedAt: new Date("2026-08-05T11:59:00Z"),
        finishedAt: new Date("2026-08-05T11:59:02Z"),
        Flw: { name: "Billing" },
        FlwExecutionSteps: [
          executionStep({ id: "es-1" }),
          executionStep({ id: "es-2", status: "Failed", error: "HTTP 500" }),
        ],
      },
      now,
    );

    assert.equal(execution.status, "failed");
    assert.equal(execution.flowName, "Billing");
    assert.equal(execution.errorMessage, "HTTP 500");
    assert.equal(execution.stepCount, 2);
    // Timed from the trigger (11:58:00), not from the first claim (11:59:00),
    // so the minute spent waiting for a worker is included.
    assert.equal(execution.duration, "1m 2s");
    assert.equal(execution.triggerPayload, '{\n  "a": 1\n}');
  });

  test("the execution step row owns the id, not the definition it ran", () => {
    const execution = toConsoleExecution(
      {
        id: "exe-2",
        flwId: "flw-1",
        status: "Running",
        triggerPayload: null,
        triggeredAt: now,
        startedAt: now,
        finishedAt: null,
        FlwExecutionSteps: [executionStep({ id: "es-9", finishedAt: null, status: "Running" })],
      },
      now,
    );

    assert.equal(execution.steps[0]?.id, "es-9");
    assert.equal(execution.steps[0]?.name, "Fetch");
    assert.equal(execution.steps[0]?.status, "running");
    assert.equal(execution.steps[0]?.duration, "—");
    assert.equal(execution.flowName, "Unknown flow");
  });
});
