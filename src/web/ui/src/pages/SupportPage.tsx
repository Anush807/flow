import React, { useEffect, useState } from 'react';
import { useFlowsQuery } from '../api/flowApi';
import { useFlowStore } from '../store/useFlowStore';
import { AlertCircle, BookOpen, CheckCircle2, Loader2, Send, Terminal } from 'lucide-react';

interface ReadinessReport {
  status: 'ready' | 'not_ready';
  checks: Record<string, 'ok' | 'unavailable'>;
}

/**
 * Health here is the engine's own readiness probe (`GET /ready`, public and
 * unauthenticated), not a hardcoded "all systems operational" banner.
 */
export const SupportPage: React.FC = () => {
  const { addToast } = useFlowStore();
  const { data: flows } = useFlowsQuery();

  const [readiness, setReadiness] = useState<ReadinessReport | null>(null);
  const [probing, setProbing] = useState(true);

  const [webhookKey, setWebhookKey] = useState('');
  const [testBody, setTestBody] = useState(JSON.stringify({ event: 'test', data: { id: 1 } }, null, 2));
  const [responseLog, setResponseLog] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const probe = async () => {
      try {
        const response = await fetch('/ready');
        const body = (await response.json()) as ReadinessReport;
        if (!cancelled) setReadiness(body);
      } catch {
        if (!cancelled) setReadiness({ status: 'not_ready', checks: { api: 'unavailable' } });
      } finally {
        if (!cancelled) setProbing(false);
      }
    };

    void probe();
    const interval = setInterval(probe, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const webhookFlows = (flows ?? []).filter((flow) => flow.webhookKey);
  const targetUrl = webhookKey ? `${window.location.origin}/webhooks/${webhookKey}` : '';

  const handleTestSend = async () => {
    if (!webhookKey) {
      addToast('Pick a webhook key first', 'error');
      return;
    }

    setSending(true);
    try {
      // Deliberately a bare fetch: webhook ingress is public and must work
      // without the management key, which is exactly what this verifies.
      const response = await fetch(`/webhooks/${webhookKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: testBody,
      });
      const body: unknown = await response.json().catch(() => null);

      setResponseLog(JSON.stringify({ status: response.status, body }, null, 2));
      addToast(response.ok ? 'Webhook delivered' : `Ingress responded ${response.status}`, response.ok ? 'success' : 'error');
    } catch (error) {
      setResponseLog(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }, null, 2));
      addToast('Webhook request failed', 'error');
    } finally {
      setSending(false);
    }
  };

  const healthy = readiness?.status === 'ready';

  return (
    <div className="flex-1 min-h-screen bg-background p-container-padding overflow-y-auto">
      <header className="mb-8">
        <h2 className="font-page-title text-page-title text-on-surface">Support &amp; diagnostics</h2>
        <p className="text-on-surface-variant text-sm mt-1">
          Live dependency health and a tester that posts to real webhook ingress.
        </p>
      </header>

      <div className="max-w-4xl space-y-gutter">
        {/* Readiness */}
        <div
          className={`rounded-xl p-5 flex items-center justify-between border ${
            probing
              ? 'bg-surface-container border-surface-container-high'
              : healthy
                ? 'bg-[#172e1e] border-[#22472d]'
                : 'bg-error/10 border-error/30'
          }`}
        >
          <div className="flex items-center gap-3">
            {probing ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : healthy ? (
              <CheckCircle2 className="w-6 h-6 text-[#4ade80]" />
            ) : (
              <AlertCircle className="w-6 h-6 text-error" />
            )}
            <div>
              <h3
                className={`font-card-title text-card-title ${
                  probing ? 'text-on-surface' : healthy ? 'text-[#4ade80]' : 'text-error'
                }`}
              >
                {probing ? 'Probing dependencies…' : healthy ? 'All dependencies ready' : 'Engine not ready'}
              </h3>
              <p className="text-xs text-on-surface-variant">
                {readiness
                  ? Object.entries(readiness.checks)
                      .map(([name, state]) => `${name}: ${state}`)
                      .join(' · ')
                  : 'GET /ready'}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-on-surface-variant px-3 py-1 rounded-full border border-surface-container-high">
            refreshed every 15s
          </span>
        </div>

        {/* Webhook tester */}
        <div className="bg-surface-container border border-surface-container-high rounded-xl p-6">
          <h3 className="font-card-title text-card-title text-on-surface mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span>Webhook ingress tester</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="label-base">Webhook key</label>
              <select
                value={webhookKey}
                onChange={(event) => setWebhookKey(event.target.value)}
                className="input-base font-code-block cursor-pointer"
              >
                <option value="">Select a flow with a webhook key…</option>
                {webhookFlows.map((flow) => (
                  <option key={flow.id} value={flow.webhookKey ?? ''}>
                    {flow.name} — {flow.webhookKey} {flow.status !== 'active' ? '(not active)' : ''}
                  </option>
                ))}
              </select>
              {targetUrl && (
                <p className="text-xs text-on-surface-variant mt-1 font-code-block">POST {targetUrl}</p>
              )}
            </div>

            <div>
              <label className="label-base">Request body (JSON)</label>
              <textarea
                value={testBody}
                onChange={(event) => setTestBody(event.target.value)}
                className="w-full bg-surface-container-lowest border border-surface-container-high rounded p-3 text-on-surface-variant font-code-block text-code-block h-32 focus:outline-none focus:border-primary"
              />
              <p className="text-xs text-on-surface-variant mt-1">
                Include <code className="font-code-block">idempotencyKey</code> (or send{' '}
                <code className="font-code-block">x-idempotency-key</code>) to exercise duplicate protection.
              </p>
            </div>

            <button
              onClick={handleTestSend}
              disabled={sending}
              className="px-4 py-2 bg-primary-container hover:bg-inverse-primary text-on-primary-container rounded flex items-center gap-2 font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Send webhook</span>
            </button>

            {responseLog && (
              <div>
                <label className="label-base">Response</label>
                <pre className="p-3 bg-surface-container-lowest border border-surface-container-high rounded text-xs font-mono text-[#4ade80] overflow-x-auto">
                  {responseLog}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Reference */}
        <div className="bg-surface-container border border-surface-container-high rounded-xl p-6">
          <h3 className="font-card-title text-card-title text-on-surface mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-tertiary" />
            <span>Templating reference</span>
          </h3>

          <dl className="space-y-3 text-sm">
            <ReferenceRow token="{{ trigger }}" description="The whole trigger payload, as JSON." />
            <ReferenceRow token="{{ trigger.a.b }}" description="Path lookup into the trigger payload; empty string when missing." />
            <ReferenceRow
              token="{{ steps.<stepId>.a.b }}"
              description="Output of an earlier successful step, keyed by its step definition id (visible on the flow detail page)."
            />
          </dl>

          <p className="text-xs text-on-surface-variant mt-4">
            A step's input mapping takes precedence over its config payload. Retries are hand-rolled: a failed
            step goes back to Pending with a growing delay, and the recovery loop re-queues anything the
            worker dropped.
          </p>
        </div>
      </div>
    </div>
  );
};

const ReferenceRow: React.FC<{ token: string; description: string }> = ({ token, description }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
    <dt className="font-code-block text-code-block text-primary shrink-0 min-w-[220px]">{token}</dt>
    <dd className="text-on-surface-variant">{description}</dd>
  </div>
);
