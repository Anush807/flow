import { httpHandlers } from "./https.js";
import { emailHandlers } from "./email.js";
const registry = new Map();
function registerHandlers(handlers) {
    for (const [key, handler] of Object.entries(handlers)) {
        registry.set(key, handler);
    }
}
registerHandlers(httpHandlers);
registerHandlers(emailHandlers);
export async function executeIntegration(integrationKey, operationKey, input) {
    const key = `${integrationKey}:${operationKey}`;
    const handler = registry.get(key);
    if (!handler) {
        throw new Error(`No handler registered for integration "${integrationKey}", operation "${operationKey}". Registered keys: ${[...registry.keys()].join(", ")}`);
    }
    return handler(input);
}
//# sourceMappingURL=registy.js.map