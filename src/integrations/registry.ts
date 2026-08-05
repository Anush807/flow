import type { IntegrationHandler, IntegrationInput, IntegrationOutput } from "../types/index.js";
import { httpHandlers } from "./https.js";
import { emailHandlers } from "./email.js";

const registry = new Map<string, IntegrationHandler>();

function registerHandlers(handlers: Record<string, IntegrationHandler>) {
  for (const [key, handler] of Object.entries(handlers)) {
    registry.set(key, handler);
  }
}

const triggerHandlers: Record<string, IntegrationHandler> = {
  "event:event.receive": async (input) => {
    return { outputPayload: input };
  },
  "event:webhook.receive": async (input) => {
    return { outputPayload: input };
  },  
};

registerHandlers(triggerHandlers);
registerHandlers(httpHandlers);
registerHandlers(emailHandlers);

/**
 * Every `integrationKey:operationKey` the worker can execute. The console
 * builds its step editor from this instead of asking the operator to type a
 * key that may not resolve until the step actually runs.
 */
export function listRegisteredOperations(): Array<{
  key: string;
  integrationKey: string;
  operationKey: string;
}> {
  return [...registry.keys()]
    .map((key) => {
      const separator = key.indexOf(":");
      return {
        key,
        integrationKey: key.slice(0, separator),
        operationKey: key.slice(separator + 1),
      };
    })
    .sort((a, b) => a.key.localeCompare(b.key));
}

export async function executeIntegration(
  integrationKey: string,
  operationKey: string,
  input: IntegrationInput,
): Promise<IntegrationOutput> {
  const key = `${integrationKey}:${operationKey}`;
  const handler = registry.get(key);

  if (!handler) {
    throw new Error(
      `No handler registered for integration "${integrationKey}", operation "${operationKey}". Registered keys: ${[...registry.keys()].join(", ")}`,
    );
  }

  return handler(input);
}