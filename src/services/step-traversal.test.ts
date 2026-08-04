import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { findNextStep } from "./step-traversal.js";
import type { BranchCandidate, StepReader, TraversableStep } from "./step-traversal.js";
import type { EvaluableCondition } from "../utils/conditions.js";
import type { StepContext } from "../utils/template.js";

type FakeStep = TraversableStep & { FlwConditions: EvaluableCondition[] };

/**
 * In-memory StepReader over a flat list of step rows – mirrors what the Prisma
 * adapter does, including the generation (deletedAt) scoping.
 */
function fakeReader(steps: FakeStep[]): StepReader {
  return {
    async findChildren(parent) {
      return steps
        .filter(
          (s) =>
            s.parentStepId === parent.id &&
            (s.deletedAt?.getTime() ?? null) === (parent.deletedAt?.getTime() ?? null),
        )
        .sort((a, b) => a.branchIndex - b.branchIndex || a.position - b.position) as BranchCandidate[];
    },
    async findNextSibling(step) {
      return (
        steps
          .filter(
            (s) =>
              s.flwId === step.flwId &&
              s.parentStepId === step.parentStepId &&
              s.branchIndex === step.branchIndex &&
              s.position > step.position &&
              (s.deletedAt?.getTime() ?? null) === (step.deletedAt?.getTime() ?? null),
          )
          .sort((a, b) => a.position - b.position)[0] ?? null
      );
    },
    async findStepById(stepId) {
      return steps.find((s) => s.id === stepId) ?? null;
    },
  };
}

function step(
  id: string,
  position: number,
  overrides: Partial<FakeStep> = {},
): FakeStep {
  return {
    id,
    flwId: "flow-1",
    parentStepId: null,
    branchIndex: 0,
    position,
    deletedAt: null,
    FlwConditions: [],
    ...overrides,
  };
}

function exists(fieldPath: string): EvaluableCondition {
  return {
    sourceType: "Trigger",
    sourceStepId: null,
    fieldPath,
    operator: "Exists",
    comparisonValue: null,
    logicGate: "And",
  };
}

const emptyContext: StepContext = { triggerPayload: {}, previousSteps: [] };

describe("linear traversal", () => {
  test("advances to the next sibling by position", async () => {
    const steps = [step("a", 1), step("b", 2), step("c", 3)];
    const next = await findNextStep(fakeReader(steps), steps[0]!, emptyContext);
    assert.equal(next?.id, "b");
  });

  test("returns null at the end of the flow", async () => {
    const steps = [step("a", 1), step("b", 2)];
    const next = await findNextStep(fakeReader(steps), steps[1]!, emptyContext);
    assert.equal(next, null);
  });

  test("skips gaps in position numbering", async () => {
    const steps = [step("a", 1), step("b", 5)];
    const next = await findNextStep(fakeReader(steps), steps[0]!, emptyContext);
    assert.equal(next?.id, "b");
  });
});

describe("branching", () => {
  test("takes the first branch whose conditions match", async () => {
    const branchPoint = step("bp", 1);
    const steps = [
      branchPoint,
      step("b0", 1, { parentStepId: "bp", branchIndex: 0, FlwConditions: [exists("high")] }),
      step("b1", 1, { parentStepId: "bp", branchIndex: 1, FlwConditions: [exists("low")] }),
    ];

    const next = await findNextStep(fakeReader(steps), branchPoint, {
      triggerPayload: { low: true },
      previousSteps: [],
    });

    assert.equal(next?.id, "b1");
  });

  test("branching is exclusive – a lower branchIndex wins even if both match", async () => {
    const branchPoint = step("bp", 1);
    const steps = [
      branchPoint,
      step("b0", 1, { parentStepId: "bp", branchIndex: 0, FlwConditions: [exists("x")] }),
      step("b1", 1, { parentStepId: "bp", branchIndex: 1, FlwConditions: [exists("x")] }),
    ];

    const next = await findNextStep(fakeReader(steps), branchPoint, {
      triggerPayload: { x: true },
      previousSteps: [],
    });

    assert.equal(next?.id, "b0");
  });

  test("a branch with no conditions acts as the default arm", async () => {
    const branchPoint = step("bp", 1);
    const steps = [
      branchPoint,
      step("b0", 1, { parentStepId: "bp", branchIndex: 0, FlwConditions: [exists("never")] }),
      step("b1", 1, { parentStepId: "bp", branchIndex: 1 }),
    ];

    const next = await findNextStep(fakeReader(steps), branchPoint, emptyContext);
    assert.equal(next?.id, "b1");
  });

  test("only the FIRST step of a branch gates entry", async () => {
    const branchPoint = step("bp", 1);
    const steps = [
      branchPoint,
      step("b0first", 1, { parentStepId: "bp", branchIndex: 0 }),
      // An unmatchable condition on a later step must not stop branch selection.
      step("b0second", 2, {
        parentStepId: "bp",
        branchIndex: 0,
        FlwConditions: [exists("never")],
      }),
    ];

    const next = await findNextStep(fakeReader(steps), branchPoint, emptyContext);
    assert.equal(next?.id, "b0first");
  });

  test("falls through past the branch point when no branch matches", async () => {
    const branchPoint = step("bp", 1);
    const steps = [
      branchPoint,
      step("after", 2),
      step("b0", 1, { parentStepId: "bp", branchIndex: 0, FlwConditions: [exists("never")] }),
    ];

    const next = await findNextStep(fakeReader(steps), branchPoint, emptyContext);
    assert.equal(next?.id, "after");
  });

  test("branch conditions can read a prior step's output", async () => {
    const branchPoint = step("bp", 1);
    const steps = [
      branchPoint,
      step("b0", 1, {
        parentStepId: "bp",
        branchIndex: 0,
        FlwConditions: [
          {
            sourceType: "StepOutput",
            sourceStepId: "bp",
            fieldPath: "status",
            operator: "Equals",
            comparisonValue: 200,
            logicGate: "And",
          },
        ],
      }),
    ];

    const next = await findNextStep(fakeReader(steps), branchPoint, {
      triggerPayload: {},
      previousSteps: [{ stepId: "bp", outputPayload: { status: 200 } }],
    });

    assert.equal(next?.id, "b0");
  });
});

describe("merging back to the main line", () => {
  test("the last step of a branch continues after the branch point", async () => {
    const steps = [
      step("bp", 1),
      step("after", 2),
      step("b0", 1, { parentStepId: "bp", branchIndex: 0 }),
    ];

    const branchStep = steps[2]!;
    const next = await findNextStep(fakeReader(steps), branchStep, emptyContext);
    assert.equal(next?.id, "after");
  });

  test("walks up through nested branches until it finds a sibling", async () => {
    const steps = [
      step("root1", 1),
      step("root2", 2),
      step("outer", 1, { parentStepId: "root1", branchIndex: 0 }),
      step("inner", 1, { parentStepId: "outer", branchIndex: 0 }),
    ];

    // inner has no sibling; outer has no sibling; root1's sibling is root2.
    const next = await findNextStep(fakeReader(steps), steps[3]!, emptyContext);
    assert.equal(next?.id, "root2");
  });

  test("returns null when the walk up reaches the end of the flow", async () => {
    const steps = [
      step("root1", 1),
      step("b0", 1, { parentStepId: "root1", branchIndex: 0 }),
    ];

    const next = await findNextStep(fakeReader(steps), steps[1]!, emptyContext);
    assert.equal(next, null);
  });
});

describe("definition generations", () => {
  test("an in-flight execution stays on the generation it started with", async () => {
    const retiredAt = new Date("2026-01-01T00:00:00Z");

    const steps = [
      // Superseded generation.
      step("old1", 1, { deletedAt: retiredAt }),
      step("old2", 2, { deletedAt: retiredAt }),
      // Current generation, entirely different shape.
      step("new1", 1),
    ];

    const next = await findNextStep(fakeReader(steps), steps[0]!, emptyContext);
    assert.equal(next?.id, "old2", "must not jump onto the replacement definition");
  });

  test("new executions traverse the live generation only", async () => {
    const retiredAt = new Date("2026-01-01T00:00:00Z");
    const steps = [
      step("old1", 1, { deletedAt: retiredAt }),
      step("old2", 2, { deletedAt: retiredAt }),
      step("new1", 1),
      step("new2", 2),
    ];

    const next = await findNextStep(fakeReader(steps), steps[2]!, emptyContext);
    assert.equal(next?.id, "new2");
  });

  test("branch children are scoped to the parent's generation", async () => {
    const retiredAt = new Date("2026-01-01T00:00:00Z");
    const oldBranchPoint = step("bp", 1, { deletedAt: retiredAt });
    const steps = [
      oldBranchPoint,
      step("oldChild", 1, { parentStepId: "bp", branchIndex: 0, deletedAt: retiredAt }),
      // Same parent id is impossible in practice, but proves the filter is on
      // deletedAt rather than on parentStepId alone.
      step("newChild", 1, { parentStepId: "bp", branchIndex: 0 }),
    ];

    const next = await findNextStep(fakeReader(steps), oldBranchPoint, emptyContext);
    assert.equal(next?.id, "oldChild");
  });
});
