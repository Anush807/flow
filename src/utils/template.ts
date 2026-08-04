/**
 * Shared `{{ … }}` resolution used by both the async worker and the
 * synchronous test runner. These two used to carry byte-identical copies of
 * this logic, which meant every template change had to be made twice.
 */

export type StepContext = {
  triggerPayload: unknown;
  previousSteps: Array<{
    stepId: string;
    outputPayload: unknown;
  }>;
};

export function resolvePath(source: unknown, path: string[]): unknown {
  let current: unknown = source;
  for (const segment of path) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

/**
 * `{{ trigger }}`             → whole trigger payload as JSON
 * `{{ trigger.a.b }}`         → path lookup, String()-ified, "" if missing
 * `{{ steps.<flwStepId>.a }}` → output of a prior successful step
 */
export function resolveTemplate(template: string, context: StepContext): string {
  return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, rawToken: string) => {
    const token = rawToken.trim();

    if (token === "trigger") {
      return JSON.stringify(context.triggerPayload ?? null);
    }

    if (token.startsWith("trigger.")) {
      const value = resolvePath(
        context.triggerPayload,
        token.slice("trigger.".length).split("."),
      );
      return value === undefined ? "" : String(value);
    }

    if (token.startsWith("steps.")) {
      const [, stepId, ...path] = token.split(".");
      const matched = context.previousSteps.find((entry) => entry.stepId === stepId);
      const value = resolvePath(matched?.outputPayload, path);
      return value === undefined ? "" : String(value);
    }

    return "";
  });
}

export function resolveInputMapping(value: unknown, context: StepContext): unknown {
  if (typeof value === "string") return resolveTemplate(value, context);
  if (Array.isArray(value)) return value.map((item) => resolveInputMapping(item, context));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        resolveInputMapping(v, context),
      ]),
    );
  }
  return value;
}
