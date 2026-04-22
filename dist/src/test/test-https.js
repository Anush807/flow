// test-http.ts
import { httpHandlers } from "../integrations/https.js";
const handler = httpHandlers["http:request"];
if (!handler) {
    throw new Error("http:request handler is not registered");
}
const result = await handler({
    url: "https://jsonplaceholder.typicode.com/todos/1",
    method: "GET",
});
console.log(result.outputPayload);
//# sourceMappingURL=test-https.js.map