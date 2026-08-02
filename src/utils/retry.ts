/**
 * Retry scheduling, kept pure so the backoff curve and the exhaustion boundary
 * are testable without a queue or a database.
 */

export type RetryPlan =
  | { kind: "retry"; retryCount: number; delayMs: number; nextRetryAt: Date }
  | { kind: "exhausted"; retryCount: number };

export function planRetry(
  currentRetryCount: number,
  options: { maxRetries: number; baseDelayMs: number; now?: number },
): RetryPlan {
  const retryCount = currentRetryCount + 1;

  if (retryCount > options.maxRetries) {
    return { kind: "exhausted", retryCount };
  }

  // The incremented count drives the exponent, so with the 5s default the
  // curve is 10s, 20s, 40s, 80s, 160s rather than starting at the base delay.
  const delayMs = options.baseDelayMs * Math.pow(2, retryCount);

  return {
    kind: "retry",
    retryCount,
    delayMs,
    nextRetryAt: new Date((options.now ?? Date.now()) + delayMs),
  };
}
