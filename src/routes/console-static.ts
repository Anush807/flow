import fs from "node:fs";
import path from "node:path";
import express from "express";
import { config } from "../config.js";
import { createLogger } from "../utils/logger.js";

const log = createLogger("console-static");

/**
 * Where the built console lives. `npm run build:ui` writes to
 * `src/web/ui/dist`; a container image that copies the bundle somewhere else
 * points at it with CONSOLE_DIST_DIR.
 */
function resolveDistDir(): string | null {
  const candidates = [
    ...(config.CONSOLE_DIST_DIR ? [config.CONSOLE_DIST_DIR] : []),
    path.resolve(process.cwd(), "src/web/ui/dist"),
    path.resolve(process.cwd(), "public"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, "index.html"))) {
      return candidate;
    }
  }

  return null;
}

/**
 * Serves the console SPA from the API process when it has been built.
 *
 * Only the shell is public – it is static JS and CSS that holds no data. Every
 * byte it renders comes from `/api`, which is behind the management API key,
 * so an unauthenticated visitor gets a page that can ask for the key and
 * nothing more.
 *
 * Mount after the API routers and before the JSON 404 handler: the history
 * fallback must not swallow an unknown `/api` path and turn a typo into an
 * HTML page.
 */
export function mountConsoleStatic(app: express.Application): void {
  const distDir = resolveDistDir();

  if (!distDir) {
    log.info("Console bundle not found – UI not served (run `npm run build:ui`)");
    return;
  }

  log.info("Serving console UI", { distDir });

  // Hashed asset filenames can be cached hard; index.html must not be, or a
  // deploy leaves browsers pinned to a bundle that no longer exists.
  app.use(
    express.static(distDir, {
      index: false,
      maxAge: "1y",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    }),
  );

  const indexHtml = path.join(distDir, "index.html");

  app.get(/^\/(?!api\/|flow\/|webhooks\/|health$|ready$).*/, (req, res, next) => {
    // Client-side routes only. Anything asking for JSON falls through to the
    // 404 handler so an API mistake still reads as an API mistake.
    if (!req.accepts("html")) {
      next();
      return;
    }

    res.sendFile(indexHtml, (error) => {
      if (error) next(error);
    });
  });
}
