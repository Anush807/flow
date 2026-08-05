import React, { useState } from 'react';
import { KeyRound, Loader2, ShieldAlert } from 'lucide-react';
import { useStatsQuery } from '../api/flowApi';
import { useAuthStore } from '../store/useAuthStore';

/**
 * The console's front door.
 *
 * There is no login: the engine authenticates with one static management key.
 * So the gate simply makes the first API call and reacts to what comes back –
 * 401 means "ask for the key", anything else means the operator is in. A
 * development server booted without `API_KEY` accepts every request, and the
 * gate then never shows.
 */
export const ApiKeyGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { apiKey, setApiKey, rejected } = useAuthStore();
  const probe = useStatsQuery();
  const [draft, setDraft] = useState('');

  const unauthorized = rejected || (probe.isError && isUnauthorized(probe.error));

  if (probe.isLoading && !unauthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-on-surface-variant gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        Connecting to the engine...
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-6">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setApiKey(draft);
            void probe.refetch();
          }}
          className="w-full max-w-md bg-surface-container border border-surface-container-high rounded-xl p-6 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container/20 border border-primary-container/40 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-card-title text-card-title text-on-surface">Management API key</h1>
              <p className="text-xs text-on-surface-variant">
                The console talks to the same API as any other client.
              </p>
            </div>
          </div>

          {apiKey && (
            <div className="flex items-start gap-2 rounded border border-error/30 bg-error/10 p-3 text-sm text-error">
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
              <span>That key was rejected. Check `API_KEY` on the API server.</span>
            </div>
          )}

          <div>
            <label className="label-base" htmlFor="apiKey">
              API key
            </label>
            <input
              id="apiKey"
              type="password"
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Paste the value of API_KEY"
              className="input-base font-code-block"
            />
            <p className="text-xs text-on-surface-variant mt-2">
              Stored in this browser only, and sent as <code className="font-code-block">x-api-key</code>.
            </p>
          </div>

          <button
            type="submit"
            disabled={!draft.trim()}
            className="bg-primary-container text-on-primary-container hover:bg-inverse-primary disabled:opacity-40 disabled:cursor-not-allowed rounded px-4 py-2.5 font-medium transition-colors cursor-pointer"
          >
            Connect
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

function isUnauthorized(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    (error as { response?: { status?: number } }).response?.status === 401
  );
}
