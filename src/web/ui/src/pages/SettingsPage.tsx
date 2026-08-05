import React, { useState } from 'react';
import { useSettingsQuery } from '../api/flowApi';
import { useFlowStore } from '../store/useFlowStore';
import { useAuthStore } from '../store/useAuthStore';
import { Key, Layers, Loader2, RefreshCw, Save, ShieldCheck, Timer } from 'lucide-react';

/**
 * Read-only by design. Every value on this page comes from the API process's
 * validated environment (`src/config.ts`) — the console cannot change them,
 * because the worker and recovery loop read the same variables at boot and
 * would not see an edit made here. The one thing it does own is the API key
 * this browser uses.
 */
export const SettingsPage: React.FC = () => {
  const { addToast } = useFlowStore();
  const { apiKey, setApiKey, clearApiKey } = useAuthStore();
  const { data: settings, isLoading } = useSettingsQuery();

  const [draftKey, setDraftKey] = useState('');

  return (
    <div className="flex-1 min-h-screen bg-background p-container-padding overflow-y-auto">
      <header className="mb-8">
        <h2 className="font-page-title text-page-title text-on-surface">Settings</h2>
        <p className="text-on-surface-variant text-sm mt-1">
          Runtime configuration as the API process actually booted with, plus the credential this browser
          uses.
        </p>
      </header>

      <div className="max-w-4xl space-y-gutter">
        {/* Credential */}
        <section className="bg-surface-container border border-surface-container-high rounded-xl p-6">
          <h3 className="font-card-title text-card-title text-on-surface mb-1 flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            <span>Management API key</span>
          </h3>
          <p className="text-sm text-on-surface-variant mb-4">
            Sent as <code className="font-code-block">x-api-key</code> with every console request and stored
            in this browser's localStorage. It is never returned by the API.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setApiKey(draftKey);
              setDraftKey('');
              addToast('API key updated', 'success');
            }}
            className="flex flex-col sm:flex-row gap-3 items-start"
          >
            <div className="flex-1 w-full">
              <label className="label-base" htmlFor="consoleKey">
                Replace key
              </label>
              <input
                id="consoleKey"
                type="password"
                value={draftKey}
                onChange={(event) => setDraftKey(event.target.value)}
                placeholder={apiKey ? '•'.repeat(24) : 'No key set (server may be unauthenticated)'}
                className="input-base font-code-block"
              />
            </div>

            <div className="flex gap-2 sm:pt-7">
              <button
                type="submit"
                disabled={!draftKey.trim()}
                className="px-4 py-2 bg-primary-container text-on-primary-container hover:bg-inverse-primary disabled:opacity-40 disabled:cursor-not-allowed rounded flex items-center gap-2 transition-colors cursor-pointer text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  clearApiKey();
                  addToast('API key removed from this browser', 'info');
                }}
                className="px-4 py-2 border border-surface-variant text-on-surface-variant hover:bg-surface-container-high rounded transition-colors cursor-pointer text-sm font-medium"
              >
                Forget
              </button>
            </div>
          </form>
        </section>

        {isLoading || !settings ? (
          <div className="p-12 flex justify-center items-center text-on-surface-variant">
            <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
            Loading runtime configuration...
          </div>
        ) : (
          <>
            <section className="bg-surface-container border border-surface-container-high rounded-xl p-6">
              <h3 className="font-card-title text-card-title text-on-surface mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-tertiary" />
                <span>Worker &amp; retries</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ReadOnlyField label="Concurrency" value={String(settings.worker.concurrency)} />
                <ReadOnlyField label="Max step retries" value={String(settings.worker.stepMaxRetries)} />
                <ReadOnlyField
                  label="Retry base delay"
                  value={`${settings.worker.stepRetryBaseDelayMs} ms`}
                  hint={`doubling: ${retryCurve(settings.worker.stepRetryBaseDelayMs, settings.worker.stepMaxRetries)}`}
                />
              </div>
            </section>

            <section className="bg-surface-container border border-surface-container-high rounded-xl p-6">
              <h3 className="font-card-title text-card-title text-on-surface mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                <span>Step queue</span>
              </h3>

              {settings.queue ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(settings.queue).map(([name, count]) => (
                    <div
                      key={name}
                      className="bg-surface-container-lowest border border-surface-container-high rounded p-4"
                    >
                      <p className="text-xs uppercase tracking-wider text-on-surface-variant mb-1">{name}</p>
                      <p className="font-stat-number text-stat-number text-on-surface">{count}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-error">
                  Redis did not answer in time. The API stays up without it, but nothing will execute until
                  it is back.
                </p>
              )}
            </section>

            <section className="bg-surface-container border border-surface-container-high rounded-xl p-6">
              <h3 className="font-card-title text-card-title text-on-surface mb-4 flex items-center gap-2">
                <Timer className="w-5 h-5 text-tertiary" />
                <span>Recovery &amp; limits</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReadOnlyField label="Recovery interval" value={`${settings.recovery.intervalMs} ms`} />
                <ReadOnlyField label="Recovery batch size" value={String(settings.recovery.batchSize)} />
                <ReadOnlyField
                  label="Management rate limit"
                  value={`${settings.rateLimits.managementMax} / ${settings.rateLimits.windowMs / 1000}s`}
                />
                <ReadOnlyField
                  label="Ingress rate limit"
                  value={`${settings.rateLimits.ingressMax} / ${settings.rateLimits.windowMs / 1000}s`}
                />
              </div>
            </section>

            <section className="bg-surface-container border border-surface-container-high rounded-xl p-6">
              <h3 className="font-card-title text-card-title text-on-surface mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Environment</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ReadOnlyField label="NODE_ENV" value={settings.environment} />
                <ReadOnlyField label="Log level" value={settings.logLevel} />
                <ReadOnlyField label="Auth required" value={settings.authRequired ? 'yes' : 'no'} />
                <ReadOnlyField label="SMTP configured" value={settings.emailConfigured ? 'yes' : 'no'} />
              </div>

              <p className="text-xs text-on-surface-variant mt-4">
                These are read from the server's environment at boot. Change them where the processes are
                configured, then restart — the worker and recovery loop read the same values.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

function retryCurve(baseMs: number, maxRetries: number): string {
  return Array.from({ length: Math.min(maxRetries, 4) }, (_, index) => {
    const ms = baseMs * 2 ** (index + 1);
    return ms >= 1000 ? `${ms / 1000}s` : `${ms}ms`;
  }).join(' → ');
}

const ReadOnlyField: React.FC<{ label: string; value: string; hint?: string }> = ({
  label,
  value,
  hint,
}) => (
  <div>
    <label className="label-base">{label}</label>
    <div className="input-base font-code-block bg-surface-container-lowest text-on-surface">{value}</div>
    {hint && <p className="text-xs text-on-surface-variant mt-1">{hint}</p>}
  </div>
);
