import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { evaluateConditions, evaluateSingleCondition } from "./conditions.js";
import type { EvaluableCondition } from "./conditions.js";
import type { StepContext } from "./template.js";

function condition(overrides: Partial<EvaluableCondition> = {}): EvaluableCondition {
  return {
    sourceType: "Trigger",
    sourceStepId: null,
    fieldPath: "value",
    operator: "Equals",
    comparisonValue: null,
    logicGate: "And",
    ...overrides,
  };
}

const ctx = (triggerPayload: unknown, previousSteps: StepContext["previousSteps"] = []) => ({
  triggerPayload,
  previousSteps,
});

describe("evaluateSingleCondition – operators", () => {
  test("Equals / NotEquals compare strictly", () => {
    assert.equal(
      evaluateSingleCondition(condition({ operator: "Equals", comparisonValue: 5 }), ctx({ value: 5 })),
      true,
    );
    // Strict: the string "5" is not the number 5.
    assert.equal(
      evaluateSingleCondition(condition({ operator: "Equals", comparisonValue: 5 }), ctx({ value: "5" })),
      false,
    );
    assert.equal(
      evaluateSingleCondition(condition({ operator: "NotEquals", comparisonValue: 5 }), ctx({ value: 6 })),
      true,
    );
  });

  test("Contains works on strings and arrays", () => {
    assert.equal(
      evaluateSingleCondition(
        condition({ operator: "Contains", comparisonValue: "ell" }),
        ctx({ value: "hello" }),
      ),
      true,
    );
    assert.equal(
      evaluateSingleCondition(
        condition({ operator: "Contains", comparisonValue: 2 }),
        ctx({ value: [1, 2, 3] }),
      ),
      true,
    );
    // Neither string nor array -> false rather than throwing.
    assert.equal(
      evaluateSingleCondition(
        condition({ operator: "Contains", comparisonValue: "x" }),
        ctx({ value: 42 }),
      ),
      false,
    );
  });

  test("NotContains is the inverse and defaults to true for absent values", () => {
    assert.equal(
      evaluateSingleCondition(
        condition({ operator: "NotContains", comparisonValue: "zzz" }),
        ctx({ value: "hello" }),
      ),
      true,
    );
    assert.equal(
      evaluateSingleCondition(
        condition({ operator: "NotContains", comparisonValue: "x" }),
        ctx({}),
      ),
      true,
    );
  });

  test("GreaterThan / LessThan coerce numerically", () => {
    assert.equal(
      evaluateSingleCondition(
        condition({ operator: "GreaterThan", comparisonValue: 10 }),
        ctx({ value: 11 }),
      ),
      true,
    );
    assert.equal(
      evaluateSingleCondition(
        condition({ operator: "LessThan", comparisonValue: 10 }),
        ctx({ value: "9" }),
      ),
      true,
    );
    // NaN comparisons are always false.
    assert.equal(
      evaluateSingleCondition(
        condition({ operator: "GreaterThan", comparisonValue: 10 }),
        ctx({ value: "abc" }),
      ),
      false,
    );
  });

  test("Exists / NotExists distinguish null and undefined from falsy values", () => {
    assert.equal(evaluateSingleCondition(condition({ operator: "Exists" }), ctx({ value: 0 })), true);
    assert.equal(evaluateSingleCondition(condition({ operator: "Exists" }), ctx({ value: "" })), true);
    assert.equal(evaluateSingleCondition(condition({ operator: "Exists" }), ctx({ value: null })), false);
    assert.equal(evaluateSingleCondition(condition({ operator: "Exists" }), ctx({})), false);
    assert.equal(evaluateSingleCondition(condition({ operator: "NotExists" }), ctx({})), true);
  });

  test("reads nested field paths", () => {
    assert.equal(
      evaluateSingleCondition(
        condition({ fieldPath: "a.b.c", operator: "Equals", comparisonValue: "deep" }),
        ctx({ a: { b: { c: "deep" } } }),
      ),
      true,
    );
  });
});

describe("evaluateSingleCondition – sources", () => {
  test("StepOutput reads the referenced step's output", () => {
    const result = evaluateSingleCondition(
      condition({
        sourceType: "StepOutput",
        sourceStepId: "step-a",
        fieldPath: "status",
        operator: "Equals",
        comparisonValue: 200,
      }),
      ctx({}, [{ stepId: "step-a", outputPayload: { status: 200 } }]),
    );

    assert.equal(result, true);
  });

  test("StepOutput with an unresolved sourceStepId evaluates against undefined", () => {
    // This is the failure mode the sourceStepPosition wiring exists to prevent:
    // a null sourceStepId can never match anything.
    const result = evaluateSingleCondition(
      condition({
        sourceType: "StepOutput",
        sourceStepId: null,
        fieldPath: "status",
        operator: "Exists",
      }),
      ctx({}, [{ stepId: "step-a", outputPayload: { status: 200 } }]),
    );

    assert.equal(result, false);
  });
});

describe("evaluateConditions – combination", () => {
  test("no conditions means matched", () => {
    assert.deepEqual(evaluateConditions([], ctx({})), { matched: true, evaluated: 0 });
  });

  test("And requires both", () => {
    const conditions = [
      condition({ fieldPath: "a", operator: "Exists" }),
      condition({ fieldPath: "b", operator: "Exists", logicGate: "And" }),
    ];

    assert.equal(evaluateConditions(conditions, ctx({ a: 1, b: 2 })).matched, true);
    assert.equal(evaluateConditions(conditions, ctx({ a: 1 })).matched, false);
  });

  test("Or requires either", () => {
    const conditions = [
      condition({ fieldPath: "a", operator: "Exists" }),
      condition({ fieldPath: "b", operator: "Exists", logicGate: "Or" }),
    ];

    assert.equal(evaluateConditions(conditions, ctx({ b: 2 })).matched, true);
    assert.equal(evaluateConditions(conditions, ctx({})).matched, false);
  });

  test("the first condition's own logicGate is ignored", () => {
    // There is no accumulator before the first condition, so its gate cannot
    // apply. An 'Or' first condition must not make the whole set match.
    const conditions = [
      condition({ fieldPath: "a", operator: "Exists", logicGate: "Or" }),
      condition({ fieldPath: "b", operator: "Exists", logicGate: "And" }),
    ];

    assert.equal(evaluateConditions(conditions, ctx({ b: 2 })).matched, false);
  });

  test("combines strictly left-to-right with no precedence", () => {
    // A(false) or B(true) and C(false) evaluates as ((false or true) and false)
    // = false. With 'and' binding tighter it would be false too, so use a case
    // that distinguishes: A(true) and B(false) or C(true) => ((true and false)
    // or true) = true, whereas precedence rules would give true as well.
    // The distinguishing case: A(false) and B(true) or C(true)
    //   left-to-right: ((false and true) or true) = true
    const conditions = [
      condition({ fieldPath: "a", operator: "Exists" }),
      condition({ fieldPath: "b", operator: "Exists", logicGate: "And" }),
      condition({ fieldPath: "c", operator: "Exists", logicGate: "Or" }),
    ];

    assert.equal(evaluateConditions(conditions, ctx({ b: 1, c: 1 })).matched, true);

    // And the reverse ordering shows the accumulator really is sequential:
    //   A(true) or B(true) and C(false) => ((true or true) and false) = false
    const reordered = [
      condition({ fieldPath: "a", operator: "Exists" }),
      condition({ fieldPath: "b", operator: "Exists", logicGate: "Or" }),
      condition({ fieldPath: "c", operator: "Exists", logicGate: "And" }),
    ];

    assert.equal(evaluateConditions(reordered, ctx({ a: 1, b: 1 })).matched, false);
  });

  test("reports how many conditions were evaluated", () => {
    const conditions = [condition({ operator: "Exists" }), condition({ operator: "Exists" })];
    assert.equal(evaluateConditions(conditions, ctx({ value: 1 })).evaluated, 2);
  });
});
