import type { IntegrationHandler } from "../types/index.js";

// ----------------------------------------------------------------
// http:request
// input:
//   url        string   (required)
//   method     string   GET | POST | PUT | PATCH | DELETE  (default GET)
//   headers    object   key/value pairs  (optional)
//   body       unknown  request body     (optional)
//   timeoutMs  number   (default 30000)
// ----------------------------------------------------------------
const httpRequest: IntegrationHandler = async (input) => {
  const url = input["url"];
  if (typeof url !== "string" || !url) {
    throw new Error("http:request requires a non-empty string field 'url'");
  }

  const method = typeof input["method"] === "string" ? input["method"].toUpperCase() : "GET";
  const headers = (input["headers"] ?? {}) as Record<string, string>;
  const body = input["body"];
  const timeoutMs = typeof input["timeoutMs"] === "number" ? input["timeoutMs"] : 30_000;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
const init: RequestInit = {
  method,
  headers: {
    "Content-Type": "application/json",
    ...headers,
  },
  signal: controller.signal,
};

if (body !== undefined && method !== "GET" && method !== "HEAD") {
  init.body = JSON.stringify(body);
}

let response: Response;
try {
  response = await fetch(url, init);
} catch (err) {
  if ((err as Error).name === "AbortError") {
    throw new Error(`http:request timed out after ${timeoutMs}ms – URL: ${url}`);
  }
  throw err;
} finally {
  clearTimeout(timer);
}
  const contentType = response.headers.get("content-type") ?? "";
  let responseBody: unknown;
  if (contentType.includes("application/json")) {
    responseBody = await response.json();
  } else {
    responseBody = await response.text();
  }

  if (!response.ok) {
    throw new Error(
      `http:request failed – status ${response.status} ${response.statusText} from ${url} – body: ${JSON.stringify(responseBody)}`,
    );
  }

  return {
    outputPayload: {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody,
    },
  };
};

// ----------------------------------------------------------------
// http:respond  (used when the workflow was triggered by a webhook
//               and you want to send a custom response back –
//               stores the intended response in outputPayload for
//               the trigger layer to pick up if it is still waiting)
// input:
//   statusCode  number   (default 200)
//   body        unknown  (optional)
//   headers     object   (optional)
// ----------------------------------------------------------------
const httpRespond: IntegrationHandler = async (input) => {
  const statusCode = typeof input["statusCode"] === "number" ? input["statusCode"] : 200;
  const body = input["body"] ?? null;
  const headers = (input["headers"] ?? {}) as Record<string, string>;

  return {
    outputPayload: {
      statusCode,
      headers,
      body,
    },
  };
};

export const httpHandlers: Record<string, IntegrationHandler> = {
  "http:request": httpRequest,
  "http:respond": httpRespond,
};