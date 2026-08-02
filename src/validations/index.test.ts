import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  createFlowSchema,
  emitEventSchema,
  paginationSchema,
  updateFlowSchema,
} from "./index.js";

const minimalStep = { type: "Action", integrationKey: "http", operationKey: "respond" };

describe("createFlowSchema", () => {
  test("accepts a flow with steps", () => {
    const result = createFlowSchema.safeParse({ name: "f", steps: [minimalStep] });
    assert.equal(result.success, true);
  });

  test("accepts the nodeType shorthand", () => {
    const result = createFlowSchema.safeParse({ name: "f", nodeType: "Action" });
    assert.equal(result.success, true);
  });

  test("rejects a flow with neither steps nor nodeType", () => {
    const result = createFlowSchema.safeParse({ name: "f" });
    assert.equal(result.success, false);
  });

  test("rejects an empty steps array", () => {
    const result = createFlowSchema.safeParse({ name: "f", steps: [] });
    assert.equal(result.success, false);
  });

  test("rejects a blank name", () => {
    assert.equal(createFlowSchema.safeParse({ name: "", steps: [minimalStep] }).success, false);
  });

  test("requires sourceStepPosition for StepOutput conditions", () => {
    const withPosition = createFlowSchema.safeParse({
      name: "f",
      steps: [
        {
          ...minimalStep,
          conditions: [
            { sourceType: "StepOutput", sourceStepPosition: 1, fieldPath: "a", operator: "Equals" },
          ],
        },
      ],
    });
    assert.equal(withPosition.success, true);

    const withoutPosition = createFlowSchema.safeParse({
      name: "f",
      steps: [
        {
          ...minimalStep,
          conditions: [{ sourceType: "StepOutput", fieldPath: "a", operator: "Equals" }],
        },
      ],
    });
    assert.equal(withoutPosition.success, false);
  });

  test("Trigger-sourced conditions need no position", () => {
    const result = createFlowSchema.safeParse({
      name: "f",
      steps: [
        {
          ...minimalStep,
          conditions: [{ sourceType: "Trigger", fieldPath: "a", operator: "Exists" }],
        },
      ],
    });
    assert.equal(result.success, true);
  });

  test("rejects an unknown operator", () => {
    const result = createFlowSchema.safeParse({
      name: "f",
      steps: [
        {
          ...minimalStep,
          conditions: [{ sourceType: "Trigger", fieldPath: "a", operator: "Sorta" }],
        },
      ],
    });
    assert.equal(result.success, false);
  });

  test("accepts nested branches", () => {
    const result = createFlowSchema.safeParse({
      name: "f",
      steps: [
        {
          ...minimalStep,
          branches: [
            {
              conditions: [{ sourceType: "Trigger", fieldPath: "a", operator: "Exists" }],
              steps: [{ ...minimalStep, branches: [{ steps: [minimalStep] }] }],
            },
          ],
        },
      ],
    });
    assert.equal(result.success, true);
  });

  test("rejects a branch with no steps", () => {
    const result = createFlowSchema.safeParse({
      name: "f",
      steps: [{ ...minimalStep, branches: [{ steps: [] }] }],
    });
    assert.equal(result.success, false);
  });
});

describe("updateFlowSchema", () => {
  test("requires at least one field", () => {
    assert.equal(updateFlowSchema.safeParse({}).success, false);
  });

  test("accepts a status-only update", () => {
    assert.equal(updateFlowSchema.safeParse({ status: "Active" }).success, true);
  });

  test("allows clearing eventKey with null", () => {
    assert.equal(updateFlowSchema.safeParse({ eventKey: null }).success, true);
  });

  test("rejects an unknown status", () => {
    assert.equal(updateFlowSchema.safeParse({ status: "Sleeping" }).success, false);
  });
});

describe("paginationSchema", () => {
  test("defaults to a bounded first page", () => {
    const result = paginationSchema.parse({});
    assert.deepEqual(result, { limit: 25, offset: 0 });
  });

  test("coerces numeric query strings", () => {
    assert.deepEqual(paginationSchema.parse({ limit: "10", offset: "20" }), {
      limit: 10,
      offset: 20,
    });
  });

  test("rejects a limit above the cap so a client cannot ask for everything", () => {
    assert.equal(paginationSchema.safeParse({ limit: "1000" }).success, false);
  });

  test("rejects a negative offset and a zero limit", () => {
    assert.equal(paginationSchema.safeParse({ offset: "-1" }).success, false);
    assert.equal(paginationSchema.safeParse({ limit: "0" }).success, false);
  });
});

describe("emitEventSchema", () => {
  test("accepts an empty body", () => {
    assert.equal(emitEventSchema.safeParse({}).success, true);
  });

  test("rejects a blank idempotencyKey", () => {
    assert.equal(emitEventSchema.safeParse({ idempotencyKey: "" }).success, false);
  });
});
