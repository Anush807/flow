# Flow console

The web console for the Flow engine. It is a plain Vite + React SPA that talks
to the API process over `/api` — see `src/routes/console.ts` at the repo root
for the endpoints it consumes.

There is no data of its own: every screen is a view over the same services the
management API uses.

## Running it

From the repo root:

```bash
npm run install:ui     # once
npm run dev            # the API server, on $PORT (default 3000)
npm run dev:worker     # nothing executes without this
npm run dev:ui         # this console, on http://localhost:5173
```

Vite proxies `/api`, `/webhooks`, `/health` and `/ready` to the API server, so
the browser stays on one origin and no CORS setup is needed. Point it somewhere
else with `VITE_API_TARGET`.

## Authentication

The engine has one credential: the management API key (`API_KEY` on the server).
The console asks for it on first load, keeps it in `localStorage`, and sends it
as `x-api-key`. A development server booted without `API_KEY` accepts every
request and the prompt never appears.

## Building for production

```bash
npm run build:ui       # from the repo root -> src/web/ui/dist
```

The API process serves that directory itself when it exists, so the console and
the API share an origin in production too. Point elsewhere with
`CONSOLE_DIST_DIR`.
