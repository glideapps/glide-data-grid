import { deepEqual, maybe } from "./support";
import { describe, test, expect } from "jest-without-globals";

describe("maybe", () => {
    test("Returns when not crashing", () => {
        const result = maybe(() => "success", "fail");

        expect(result).toBe("success");
    });

    test("Returns default value on error", () => {
        const result = maybe(() => {
            throw new Error("Fail");
        }, "fail");

        expect(result).toBe("fail");
    });
});

describe("deepEqual", () => {
    test("Deep equal smoke tests", () => {
        expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(deepEqual([1, 2, 3], [1, 23])).toBe(false);
        expect(deepEqual({ a: "b", c: "d" }, { a: "b", c: "d" })).toBe(true);
        expect(deepEqual({ a: "b", c: "d" }, [1, 2, 3])).toBe(false);
        expect(deepEqual({ a: "b", c: { d: "e" } }, { a: "b", c: { d: "e" } })).toBe(true);
    });
});
