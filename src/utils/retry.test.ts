import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { planRetry } from "./retry.js";

const options = { maxRetries: 5, baseDelayMs: 5_000, now: 1_000_000 };

describe("planRetry", () => {
  test("schedules an exponentially growing delay", () => {
    const delays = [0, 1, 2, 3, 4].map((count) => {
      const plan = planRetry(count, options);
      assert.equal(plan.kind, "retry");
      return plan.kind === "retry" ? plan.delayMs : -1;
    });

    assert.deepEqual(delays, [10_000, 20_000, 40_000, 80_000, 160_000]);
  });

  test("increments the retry count", () => {
    const plan = planRetry(2, options);
    assert.equal(plan.retryCount, 3);
  });

  test("nextRetryAt is now + delay", () => {
    const plan = planRetry(0, options);
    assert.equal(plan.kind, "retry");
    if (plan.kind === "retry") {
      assert.equal(plan.nextRetryAt.getTime(), options.now + 10_000);
    }
  });

  test("the last allowed attempt still retries", () => {
    // maxRetries 5 means retryCount 5 is permitted; 6 is not.
    assert.equal(planRetry(4, options).kind, "retry");
  });

  test("exhausts one attempt past the maximum", () => {
    const plan = planRetry(5, options);
    assert.equal(plan.kind, "exhausted");
    assert.equal(plan.retryCount, 6);
  });

  test("maxRetries of 0 exhausts immediately", () => {
    assert.equal(planRetry(0, { ...options, maxRetries: 0 }).kind, "exhausted");
  });

  test("respects a custom base delay", () => {
    const plan = planRetry(0, { ...options, baseDelayMs: 100 });
    assert.equal(plan.kind === "retry" && plan.delayMs, 200);
  });
});
