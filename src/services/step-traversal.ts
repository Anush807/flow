import { evaluateConditions } from "../utils/conditions.js";
import type { EvaluableCondition } from "../utils/conditions.js";
import type { StepContext } from "../utils/template.js";

/**
 * Branch traversal, expressed against a narrow reader interface rather than a
 * Prisma transaction client. That keeps the "which step runs next" rules – the
 * most intricate logic in the engine – testable without a database.
 */

export type TraversableStep = {
  id: string;
  flwId: string;
  parentStepId: string | null;
  branchIndex: number;
  position: number;
  /**
   * Definition generation. `null` is the live definition; a timestamp is the
   * generation retired by one PATCH. Traversal never crosses generations.
   */
  deletedAt: Date | null;
};

export type BranchCandidate = TraversableStep & {
  FlwConditions: EvaluableCondition[];
};

export type StepReader = {
  /** Children of `parentStepId` within the same generation, ordered by branchIndex then position. */
  findChildren(parent: TraversableStep): Promise<BranchCandidate[]>;
  /** Next step at the same (parentStepId, branchIndex) and generation with a greater position. */
  findNextSibling(step: TraversableStep): Promise<TraversableStep | null>;
  findStepById(stepId: string): Promise<TraversableStep | null>;
};

export async function findNextStep(
  reader: StepReader,
  current: TraversableStep,
  context: StepContext,
): Promise<TraversableStep | null> {
  const children = await reader.findChildren(current);

  if (children.length > 0) {
    // Group children by branchIndex – each group is one branch.
    const branches = new Map<number, BranchCandidate[]>();
    for (const child of children) {
      const existing = branches.get(child.branchIndex);
      if (existing) {
        existing.push(child);
      } else {
        branches.set(child.branchIndex, [child]);
      }
    }

    // Evaluate branches in index order; first match wins (exclusive).
    const sortedBranches = [...branches.entries()].sort((a, b) => a[0] - b[0]);
    for (const [, branchSteps] of sortedBranches) {
      const firstStep = branchSteps[0];
      if (!firstStep) continue;

      const conditions = firstStep.FlwConditions;
      // A branch with no conditions is the default arm.
      if (conditions.length === 0 || evaluateConditions(conditions, context).matched) {
        return firstStep;
      }
    }

    // No branch matched – skip the branch point entirely.
    return findNextAfterStep(reader, current);
  }

  return findNextAfterStep(reader, current);
}

export async function findNextAfterStep(
  reader: StepReader,
  step: TraversableStep,
): Promise<TraversableStep | null> {
  const nextSibling = await reader.findNextSibling(step);
  if (nextSibling) return nextSibling;

  // Inside a branch with nothing left: walk up to the parent and continue
  // after it. This upward walk is what merges branches back into the main line.
  if (step.parentStepId) {
    const parentStep = await reader.findStepById(step.parentStepId);
    if (parentStep) {
      return findNextAfterStep(reader, parentStep);
    }
  }

  return null;
}
