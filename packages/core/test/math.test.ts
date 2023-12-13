import { expect, describe, it } from "vitest";
import type { Rectangle } from "../src/internal/data-grid/data-grid-types.js";
import { getClosestRect } from "../src/common/math.js";

describe("getClosestRect", () => {
    const testRect: Rectangle = { x: 10, y: 10, width: 5, height: 5 };

    it("should return undefined for a point inside the rectangle", () => {
        expect(getClosestRect(testRect, 12, 12)).to.be.undefined;
    });

    it("should return a correct rectangle for a point to the left", () => {
        expect(getClosestRect(testRect, 5, 12)).to.deep.equal({ x: 5, y: 10, width: 5, height: 5 });
    });

    it("should return a correct rectangle for a point to the right", () => {
        expect(getClosestRect(testRect, 20, 12)).to.deep.equal({ x: 15, y: 10, width: 6, height: 5 });
    });

    it("should return a correct rectangle for a point above", () => {
        expect(getClosestRect(testRect, 12, 5)).to.deep.equal({ x: 10, y: 5, width: 5, height: 5 });
    });

    it("should return a correct rectangle for a point below", () => {
        expect(getClosestRect(testRect, 12, 20)).to.deep.equal({ x: 10, y: 15, width: 5, height: 6 });
    });

    it("should return a correct rectangle for a diagonal upper-left point", () => {
        expect(getClosestRect(testRect, 5, 5)).to.deep.equal({ x: 5, y: 10, width: 5, height: 5 });
    });

    it("should return a correct rectangle for a far-away point", () => {
        expect(getClosestRect(testRect, 100, 100)).to.deep.equal({ x: 10, y: 15, width: 5, height: 86 });
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
                10
            )
        ).to.deep.equal({ x: 11, y: 10, width: 10, height: 1 });
    });
});
