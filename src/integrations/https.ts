import type { IntegrationHandler } from "../types/index.js";

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
let responseBody: unknown;
try {
  response = await fetch(url, init);

  // Reading the body has to stay inside the timeout window – a server that
  // sends headers and then stalls would otherwise hang the step forever.
  const contentType = response.headers.get("content-type") ?? "";
  responseBody = contentType.includes("application/json")
    ? await response.json()
    : await response.text();
} catch (err) {
  if ((err as Error).name === "AbortError") {
    throw new Error(`http:request timed out after ${timeoutMs}ms – URL: ${url}`);
  }
  throw err;
} finally {
  clearTimeout(timer);
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