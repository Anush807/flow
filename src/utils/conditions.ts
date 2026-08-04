import { resolvePath } from "./template.js";
import type { StepContext } from "./template.js";

/**
 * Condition evaluation, kept free of Prisma and Redis so it can be tested
 * directly. The types are structural, so Prisma rows are assignable without
 * tests needing to construct full database records.
 */

export type ConditionOperator =
  | "Equals"
  | "NotEquals"
  | "Contains"
  | "NotContains"
  | "GreaterThan"
  | "LessThan"
  | "Exists"
  | "NotExists";

export type ConditionLogicGate = "And" | "Or";

export type EvaluableCondition = {
  sourceType: "Trigger" | "StepOutput";
  sourceStepId: string | null;
  fieldPath: string;
  operator: ConditionOperator;
  comparisonValue: unknown;
  logicGate: ConditionLogicGate;
};

export type ConditionResult = {
  matched: boolean;
  evaluated: number;
};

export function evaluateSingleCondition(
  condition: EvaluableCondition,
  context: StepContext,
): boolean {
  const sourcePayload =
    condition.sourceType === "Trigger"
      ? context.triggerPayload
      : context.previousSteps.find((entry) => entry.stepId === condition.sourceStepId)
          ?.outputPayload;

  const actualValue = resolvePath(sourcePayload, condition.fieldPath.split("."));
  const expectedValue =
    condition.comparisonValue === null || condition.comparisonValue === undefined
      ? undefined
      : condition.comparisonValue;

  switch (condition.operator) {
    case "Equals":
      return actualValue === expectedValue;
    case "NotEquals":
      return actualValue !== expectedValue;
    case "Contains":
      if (typeof actualValue === "string" && typeof expectedValue === "string") {
        return actualValue.includes(expectedValue);
      }
      if (Array.isArray(actualValue)) {
        return actualValue.includes(expectedValue);
      }
      return false;
    case "NotContains":
      if (typeof actualValue === "string" && typeof expectedValue === "string") {
        return !actualValue.includes(expectedValue);
      }
      if (Array.isArray(actualValue)) {
        return !actualValue.includes(expectedValue);
      }
      return true;
    case "GreaterThan":
      return Number(actualValue) > Number(expectedValue);
    case "LessThan":
      return Number(actualValue) < Number(expectedValue);
    case "Exists":
      return actualValue !== undefined && actualValue !== null;
    case "NotExists":
      return actualValue === undefined || actualValue === null;
    default: {
      const operator: never = condition.operator;
      throw new Error(`Unsupported condition operator: ${operator as string}`);
    }
  }
}

export function combineConditionResults(
  accumulator: boolean,
  nextResult: boolean,
  logicGate: ConditionLogicGate,
): boolean {
  if (logicGate === "Or") {
    return accumulator || nextResult;
  }

  return accumulator && nextResult;
}

/**
 * Combines left-to-right using each condition's own logicGate against the
 * running accumulator. There is deliberately no operator precedence and no
 * grouping – `A or B and C` evaluates as `(A or B) and C`.
 */
export function evaluateConditions(
  conditions: EvaluableCondition[],
  context: StepContext,
): ConditionResult {
  if (conditions.length === 0) {
    return { matched: true, evaluated: 0 };
  }

  const [firstCondition, ...restConditions] = conditions;
  if (!firstCondition) {
    return { matched: true, evaluated: 0 };
  }

  let matched = evaluateSingleCondition(firstCondition, context);

  for (const condition of restConditions) {
    matched = combineConditionResults(
      matched,
      evaluateSingleCondition(condition, context),
      condition.logicGate,
    );
  }

  return {
    matched,
    evaluated: conditions.length,
  };
}
