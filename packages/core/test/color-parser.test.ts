/* eslint-disable sonarjs/no-duplicate-string */
import {
    blend,
    interpolateColors,
    parseToRgba,
    withAlpha,
    toHex,
    getLuminance,
} from "../src/internal/data-grid/color-parser.js";
import { expect, describe, test } from "vitest";

describe("interpolateColors", () => {
    test("Smoke test", () => {
        expect(interpolateColors("rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 1)", 0.5)).toEqual("rgba(127, 127, 127, 1)");
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

describe("toHex", () => {
    test("Smoke test", () => {
        expect(toHex("rgba(255, 255, 255, 1)")).toEqual("#ffffff");
    });
});

describe("getLuminance", () => {
    test("Smoke test", () => {
        expect(getLuminance("rgba(255, 255, 255, 1)")).toEqual(1);
    });
});
