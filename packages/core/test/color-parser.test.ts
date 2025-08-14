/* eslint-disable sonarjs/no-duplicate-string */
import { describe, expect, test } from "vitest";
import {
    blend,
    getLuminance,
    interpolateColors,
    parseToRgba,
    withAlpha,
} from "../src/internal/data-grid/color-parser.js";

describe("interpolateColors", () => {
    test("Smoke test", () => {
        expect(interpolateColors("rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 1)", 0.5)).toEqual("rgba(127, 127, 127, 1)");
    });

    test("Fully transparent inputs do not produce NaN (alpha 0)", () => {
        expect(interpolateColors("rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", 0.5)).toEqual("rgba(0, 0, 0, 0)");
    });

    test("Pre-multiplied alpha behavior with one side transparent", () => {
        // Left transparent, right opaque white
        expect(interpolateColors("rgba(0, 0, 0, 0)", "rgba(255, 255, 255, 1)", 0.5)).toEqual(
            "rgba(255, 255, 255, 0.5)"
        );
        // Right transparent, left opaque white (symmetry check)
        expect(interpolateColors("rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 0)", 0.5)).toEqual(
            "rgba(255, 255, 255, 0.5)"
        );
    });

    test("Clamp outside range: val <= 0 returns left, val >= 1 returns right", () => {
        expect(interpolateColors("rgba(10, 20, 30, 1)", "rgba(200, 210, 220, 1)", -0.25)).toEqual(
            "rgba(10, 20, 30, 1)"
        );
        expect(interpolateColors("rgba(10, 20, 30, 1)", "rgba(200, 210, 220, 1)", 1.25)).toEqual(
            "rgba(200, 210, 220, 1)"
        );
    });
});

describe("parseToRgba", () => {
    test("Smoke test", () => {
        expect(parseToRgba("rgba(255, 255, 255, 1)")).toEqual([255, 255, 255, 1]);
    });
});

describe("withAlpha", () => {
    test("Smoke test", () => {
        expect(withAlpha("rgba(255, 255, 255, 1)", 0.3)).toEqual("rgba(255, 255, 255, 0.3)");
    });
});

describe("blend", () => {
    test("Smoke test", () => {
        expect(blend("rgba(255, 255, 255, 0.2)", "rgba(123, 123, 123, 1)")).toEqual("rgba(149.4, 149.4, 149.4, 1)");
    });
});

describe("getLuminance", () => {
    test("Smoke test", () => {
        expect(getLuminance("rgba(255, 255, 255, 1)")).toEqual(1);
    });

    test("Transparent has zero luminance", () => {
        expect(getLuminance("rgba(0, 0, 0, 0)")).toEqual(0);
        expect(getLuminance("transparent")).toEqual(0);
    });
});
