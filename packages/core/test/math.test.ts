import { expect, describe, it } from "vitest";
import type { Rectangle } from "../src/internal/data-grid/data-grid-types.js";
import { getClosestRect, hugRectToTarget, splitRectIntoRegions } from "../src/common/math.js";

describe("getClosestRect", () => {
    const testRect: Rectangle = { x: 10, y: 10, width: 5, height: 5 };

    it("should return undefined for a point inside the rectangle", () => {
        expect(getClosestRect(testRect, 12, 12, "orthogonal")).to.be.undefined;
    });

    it("should return a correct rectangle for a point to the left", () => {
        expect(getClosestRect(testRect, 5, 12, "orthogonal")).to.deep.equal({ x: 5, y: 10, width: 5, height: 5 });
    });

    it("should return a correct rectangle for a point to the right", () => {
        expect(getClosestRect(testRect, 20, 12, "orthogonal")).to.deep.equal({ x: 15, y: 10, width: 6, height: 5 });
    });

    it("should return a correct rectangle for a point above", () => {
        expect(getClosestRect(testRect, 12, 5, "orthogonal")).to.deep.equal({ x: 10, y: 5, width: 5, height: 5 });
    });

    it("should return a correct rectangle for a point below", () => {
        expect(getClosestRect(testRect, 12, 20, "orthogonal")).to.deep.equal({ x: 10, y: 15, width: 5, height: 6 });
    });

    it("should return a correct rectangle for a diagonal upper-left point", () => {
        expect(getClosestRect(testRect, 5, 5, "orthogonal")).to.deep.equal({ x: 5, y: 10, width: 5, height: 5 });
    });

    it("should return a correct rectangle for a far-away point", () => {
        expect(getClosestRect(testRect, 100, 100, "orthogonal")).to.deep.equal({ x: 10, y: 15, width: 5, height: 86 });
    });

    it("should work with single cell starting rect", () => {
        expect(
            getClosestRect(
                {
                    x: 10,
                    y: 10,
                    width: 1,
                    height: 1,
                },
                20,
                10,
                "orthogonal"
            )
        ).to.deep.equal({ x: 11, y: 10, width: 10, height: 1 });
    });
});

describe("hugRectToTarget", () => {
    it("should return the same rectangle if it is within boundaries", () => {
        const rect = { x: 10, y: 10, width: 50, height: 50 };
        const result = hugRectToTarget(rect, 100, 100, 5);
        expect(result).toEqual(rect);
    });

    it("should return undefined if the rectangle is completely outside the boundaries", () => {
        const rect = { x: 150, y: 150, width: 50, height: 50 };
        const result = hugRectToTarget(rect, 100, 100, 5);
        expect(result).toBeUndefined();
    });

    it("should adjust the rectangle correctly when it partially overlaps the boundaries", () => {
        const rect = { x: -10, y: -10, width: 80, height: 80 };
        const expected = { x: -10, y: -10, width: 80, height: 80 };
        const result = hugRectToTarget(rect, 100, 100, 10);
        expect(result).toEqual(expected);
    });

    it("should handle different mod values correctly", () => {
        const rect = { x: -15, y: -15, width: 105, height: 105 };
        const expected = { x: -7, y: -7, width: 97, height: 97 };
        const result = hugRectToTarget(rect, 100, 100, 8);
        expect(result).toEqual(expected);
    });

    it("should return undefined if the rectangle is too big for the boundaries", () => {
        const rect = { x: -5, y: -5, width: 111, height: 111 };
        const result = hugRectToTarget(rect, 100, 100, 10);
        expect(result).toBeUndefined();
    });
});

describe("splitRectIntoRegions", () => {
    const splitIndices = [2, 2, 8, 8] as const;
    const width = 100;
    const height = 100;
    const splitLocations = [20, 20, 80, 80] as const;

    it("returns an empty array for non-positive dimension rectangles", () => {
        const rect = { x: 0, y: 0, width: 0, height: 0 };
        const result = splitRectIntoRegions(rect, splitIndices, width, height, splitLocations);
        expect(result).toEqual([]);
    });

    it("returns no regions for a rectangle not overlapping the split indices", () => {
        const rect = { x: 30, y: 30, width: 10, height: 10 };
        const result = splitRectIntoRegions(rect, splitIndices, width, height, splitLocations);
        expect(result).toEqual([
            {
                clip: {
                    height: 21,
                    width: 21,
                    x: 80,
                    y: 80,
                },
                rect: {
                    height: 10,
                    width: 10,
                    x: 30,
                    y: 30,
                },
            },
        ]);
    });

    it("returns correct regions for a rectangle partially overlapping the top left split index", () => {
        const rect = { x: 1, y: 1, width: 4, height: 4 };
        const result = splitRectIntoRegions(rect, splitIndices, width, height, splitLocations);
        expect(result.length).toBe(4);
        expect(result[0].rect).toEqual({ x: 2, y: 2, width: 3, height: 3 });
        expect(result[0].clip).toEqual({ x: 20, y: 20, width: 61, height: 61 });
        expect(result[1].rect).toEqual({ x: 1, y: 1, width: 1, height: 1 });
        expect(result[1].clip).toEqual({ x: 0, y: 0, width: 21, height: 21 });
        expect(result[2].rect).toEqual({ x: 2, y: 1, width: 3, height: 1 });
        expect(result[2].clip).toEqual({ x: 20, y: 0, width: 61, height: 21 });
        expect(result[3].rect).toEqual({ x: 1, y: 2, width: 1, height: 3 });
        expect(result[3].clip).toEqual({ x: 0, y: 20, width: 21, height: 61 });
    });

    it("returns correct regions for a rectangle overlapping all split indices", () => {
        const rect = { x: 1, y: 1, width: 9, height: 9 };
        const result = splitRectIntoRegions(rect, splitIndices, width, height, splitLocations);
        expect(result.length).toBe(9);
        // Here you might want to check each region individually for correctness
    });

    it("returns correct regions for a rectangle overlapping the center region only", () => {
        const rect = { x: 3, y: 3, width: 4, height: 4 };
        const result = splitRectIntoRegions(rect, splitIndices, width, height, splitLocations);
        expect(result.length).toBe(1);
        expect(result[0].rect).toEqual({ x: 3, y: 3, width: 4, height: 4 });
        expect(result[0].clip).toEqual({ x: 20, y: 20, width: 61, height: 61 });
    });
});
