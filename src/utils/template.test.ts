import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { resolveInputMapping, resolvePath, resolveTemplate } from "./template.js";
import type { StepContext } from "./template.js";

const context: StepContext = {
  triggerPayload: { body: { title: "hello", count: 7, nested: { deep: true } }, list: [1, 2] },
  previousSteps: [
    { stepId: "step-a", outputPayload: { status: 200, body: { ok: true } } },
    { stepId: "step-b", outputPayload: null },
  ],
};

describe("resolvePath", () => {
  test("walks nested objects", () => {
    assert.equal(resolvePath({ a: { b: { c: 1 } } }, ["a", "b", "c"]), 1);
  });

  test("returns undefined instead of throwing on a missing branch", () => {
    assert.equal(resolvePath({ a: 1 }, ["a", "b", "c"]), undefined);
    assert.equal(resolvePath(null, ["a"]), undefined);
    assert.equal(resolvePath(undefined, ["a"]), undefined);
  });

  test("does not walk into primitives", () => {
    assert.equal(resolvePath({ a: "str" }, ["a", "length"]), undefined);
  });
});

describe("resolveTemplate", () => {
  test("{{ trigger }} serialises the whole payload", () => {
    assert.equal(
      resolveTemplate("{{ trigger }}", { triggerPayload: { a: 1 }, previousSteps: [] }),
      '{"a":1}',
    );
  });

  test("{{ trigger }} with no payload serialises null", () => {
    assert.equal(
      resolveTemplate("{{ trigger }}", { triggerPayload: null, previousSteps: [] }),
      "null",
    );
  });

  test("resolves trigger paths and stringifies", () => {
    assert.equal(resolveTemplate("{{ trigger.body.title }}", context), "hello");
    assert.equal(resolveTemplate("{{ trigger.body.count }}", context), "7");
  });

  test("missing trigger paths resolve to empty string, not 'undefined'", () => {
    assert.equal(resolveTemplate("{{ trigger.body.nope }}", context), "");
    assert.equal(resolveTemplate("x{{ trigger.a.b.c }}y", context), "xy");
  });

  test("resolves prior step output by step definition id", () => {
    assert.equal(resolveTemplate("{{ steps.step-a.status }}", context), "200");
    assert.equal(resolveTemplate("{{ steps.step-a.body.ok }}", context), "true");
  });

  test("unknown step id resolves to empty string", () => {
    assert.equal(resolveTemplate("{{ steps.nope.status }}", context), "");
  });

  test("tolerates whitespace inside the braces", () => {
    assert.equal(resolveTemplate("{{trigger.body.title}}", context), "hello");
    assert.equal(resolveTemplate("{{    trigger.body.title    }}", context), "hello");
  });

  test("unknown token kinds resolve to empty string", () => {
    assert.equal(resolveTemplate("{{ bogus.path }}", context), "");
  });

  test("substitutes every occurrence, mixed with literal text", () => {
    assert.equal(
      resolveTemplate("{{ trigger.body.title }}/{{ trigger.body.count }}", context),
      "hello/7",
    );
  });

  test("leaves strings without templates untouched", () => {
    assert.equal(resolveTemplate("plain text", context), "plain text");
  });
});

describe("resolveInputMapping", () => {
  test("recurses through objects and arrays and preserves non-strings", () => {
    const resolved = resolveInputMapping(
      {
        url: "https://example.com/{{ trigger.body.title }}",
        retries: 3,
        enabled: true,
        missing: null,
        items: ["{{ trigger.body.count }}", { nested: "{{ steps.step-a.status }}" }],
      },
      context,
    );

    assert.deepEqual(resolved, {
      url: "https://example.com/hello",
      retries: 3,
      enabled: true,
      missing: null,
      items: ["7", { nested: "200" }],
    });
  });

  test("returns primitives unchanged", () => {
    assert.equal(resolveInputMapping(42, context), 42);
    assert.equal(resolveInputMapping(null, context), null);
  });
});
