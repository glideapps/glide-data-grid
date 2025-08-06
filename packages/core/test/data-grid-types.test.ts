import { GridCellKind, isTextEditableGridCell } from "../src/internal/data-grid/data-grid-types.js";
import { isEditableGridCell } from "../src/index.js";
import { sprites } from "../src/internal/data-grid/sprites.js";
import { expect, describe, test } from "vitest";

describe("data-grid-types", () => {
    test("Smoke test type checks", () => {
        expect(
            isEditableGridCell({
                kind: GridCellKind.Loading,
                allowOverlay: false,
            })
        ).toBe(false);

        expect(
            isEditableGridCell({
                kind: GridCellKind.Text,
                data: "Test",
                displayData: "Test",
                allowOverlay: false,
            })
        ).toBe(true);

        expect(
            isTextEditableGridCell({
                kind: GridCellKind.Loading,
                allowOverlay: false,
            })
        ).toBe(false);

        expect(
            isTextEditableGridCell({
                kind: GridCellKind.Text,
                data: "Test",
                displayData: "Test",
                allowOverlay: false,
            })
        ).toBe(true);
    });






    test("Load sprites", () => {
        const keys = Object.keys(sprites) as (keyof typeof sprites)[];
        for (const k of keys) {
            const cb = sprites[k];
            cb({
                bgColor: "red",
                fgColor: "blue",
            });
        }
    });

});
