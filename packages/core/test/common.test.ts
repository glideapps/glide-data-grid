import { renderHook } from "@testing-library/react-hooks";
import { useResizeDetector } from "../src/common/resize-detector";
import { maybe, deepEqual } from "../src/common/support";
import { makeAccessibilityStringForArray } from "../src/common/utils";

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

describe("resizeDetector", () => {
    test("Smoke test", () => {
        const { result } = renderHook(() => useResizeDetector());
        expect(result.current.width === undefined && result.current.height === undefined);
    });
});

describe("makeAccessibilityStringForArray", () => {
    it("should return an empty string for an empty array", () => {
        expect(makeAccessibilityStringForArray([])).toBe("");
    });

    it("should join array elements with a comma and a space", () => {
        const input = ["a", "b", "c"];
        const output = "a, b, c";
        expect(makeAccessibilityStringForArray(input)).toBe(output);
    });

    it("should stop joining when total character count exceeds 10,000", () => {
        const singleStr = "a".repeat(5000); // Each string has 5000 'a' characters
        const input = [singleStr, singleStr, "b"]; // Two strings of 5000 'a' and one 'b'
        const output = singleStr + ", " + singleStr; // Only two strings of 5000 'a' should be joined
        expect(makeAccessibilityStringForArray(input)).toBe(output);
    });

    it("should handle large arrays without exceeding the 10,000 character limit", () => {
        const input = Array.from({ length: 10_000 }).fill("a") as string[]; // 10,000 'a' strings
        const output = Array.from({ length: 10_000 }).fill("a").join(", "); // Should join all since it doesn't exceed the limit
        expect(makeAccessibilityStringForArray(input)).toBe(output);
    });

    it("should return a string without trailing comma if limit is hit", () => {
        const singleStr = "a".repeat(4999); // Each string has 4999 'a' characters
        const input = [singleStr, singleStr, "b", "c", "d"]; // Two strings of 4999 'a' and one 'b'
        const output = singleStr + ", " + singleStr + ", b, c"; // Only two strings of 4999 'a' should be joined without the 'b'
        expect(makeAccessibilityStringForArray(input)).toBe(output);
    });
});
