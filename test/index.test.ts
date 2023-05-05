import { merge, clone, recursive } from "../src/index";
import { describe, it, expect } from "vitest";

describe("merge", () => {
  it("merges two objects", () => {
    expect(merge({ a: 1 }, { b: 2 })).toStrictEqual({ a: 1, b: 2 });
  });

  it("merges nested levels", () => {
    expect(merge({ a: 1 }, { b: { c: { d: 2 } } })).toStrictEqual({
      a: 1,
      b: { c: { d: 2 } },
    });
  });
  it("clones the target", () => {
    let input = {
      a: 1,
      b: {
        c: {
          d: 2,
          e: ["x", "y", { z: { w: ["k"] } }],
        },
      },
      f: null,
      g: undefined,
      h: true,
    };

    let original = {
      a: 1,
      b: {
        c: {
          d: 2,
          e: ["x", "y", { z: { w: ["k"] } }],
        },
      },
      f: null,
      g: undefined,
      h: true,
    };

    let output = merge(true, input);

    input.b.c.d++;
    (input.b.c.e[2] as any).z.w = null;
    (input as any).h = null;

    expect(output).toStrictEqual(original);

    input = original;

    output = merge(true, input, { a: 2 });

    expect(output.a).toBe(2);
    expect(input.a).toBe(1);
  });

  it("ignores the sources", () => {
    expect(merge()).toStrictEqual({});
    expect(merge(undefined)).toStrictEqual({});
    expect(merge([])).toStrictEqual({});
    expect(merge(true)).toStrictEqual({});
    expect(
      merge(null, true, [0, 1, 2], 3, { a: 1 }, function () {}, undefined, {
        b: 2,
      })
    ).toStrictEqual({ a: 1, b: 2 });
  });

  it("is safe", () => {
    expect(
      merge({}, JSON.parse('{"__proto__": {"evil": true}}'))
    ).toStrictEqual({});
    expect(({} as any).evil).toBeUndefined();
  });
});

describe("clone", () => {
  it("clones the input", () => {
    const object1 = { a: 1, b: { c: 2 } };
    const object2 = clone(object1);

    expect(object1).toStrictEqual(object2);
    expect(object1 === object2).toBeFalsy();
    expect(object1.b === object2.b).toBeFalsy();
  });

  it("clones each item of the array", () => {
    const object1 = [{ a: 1, b: { c: 2 } }];
    const object2 = clone(object1);

    expect(object1).toStrictEqual(object2);
    expect(object1 === object2).toBeFalsy();
    expect(object1[0] === object2[0]).toBeFalsy();
    expect(object1[0].b === object2[0].b).toBeFalsy();
  });

  it("returns the same input", () => {
    expect(clone(null)).toBeNull();
    expect(clone(undefined)).toBeUndefined();
    expect(clone(1)).toBe(1);
    expect(clone("str")).toBe("str");
  });
});

describe("recursive", () => {
  it("merges recursively", () => {
    expect(recursive({ a: { b: 1 } }, { a: { c: 1 } })).toStrictEqual({
      a: { b: 1, c: 1 },
    });

    expect(recursive({ a: { b: 1, c: 1 } }, { a: { b: 2 } })).toStrictEqual({
      a: { b: 2, c: 1 },
    });

    expect(
      recursive({ a: { b: [1, 2, 3], c: 1 } }, { a: { b: ["a"] } })
    ).toStrictEqual({ a: { b: ["a"], c: 1 } });

    expect(
      recursive({ a: { b: { b: 2 }, c: 1 } }, { a: { b: 2 } })
    ).toStrictEqual({
      a: { b: 2, c: 1 },
    });
  });

  it("clones recursively", function () {
    const test1 = { a: { b: 1 } };

    expect(recursive(true, test1, { a: { c: 1 } })).toStrictEqual({
      a: { b: 1, c: 1 },
    });

    expect(test1).toStrictEqual({ a: { b: 1 } });

    const test2 = { a: { b: 1, c: 1 } };

    expect(recursive(true, test2, { a: { b: 2 } })).toStrictEqual({
      a: { b: 2, c: 1 },
    });

    expect(test2).toStrictEqual({ a: { b: 1, c: 1 } });

    const test3 = { a: { b: [1, 2, 3], c: 1 } };

    expect(recursive(true, test3, { a: { b: ["a"] } })).toStrictEqual({
      a: { b: ["a"], c: 1 },
    });

    expect(test3).toStrictEqual({ a: { b: [1, 2, 3], c: 1 } });

    const test4 = { a: { b: { b: 2 }, c: 1 } };

    expect(recursive(true, test4, { a: { b: 2 } })).toStrictEqual({
      a: { b: 2, c: 1 },
    });

    expect(test4).toStrictEqual({ a: { b: { b: 2 }, c: 1 } });
  });

  it("is safe", function () {
    const payload = '{"__proto__": {"a": true}}';
    expect(recursive({}, JSON.parse(payload))).toStrictEqual({});
    expect(({} as any)["a"]).toBeUndefined();
    expect(recursive({ deep: {} }, JSON.parse(payload))).toStrictEqual({
      deep: {},
    });
    expect(({} as any)["b"]).toBeUndefined();
  });
});
