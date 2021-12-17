import { describe, test, expect } from "jest-without-globals";
import { GridCellKind, isTextEditableGridCell } from "./data-grid-types";
import { CompactSelection, isEditableGridCell } from "..";

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

    test("Smoke test compact selection", () => {
        const sel = CompactSelection.fromSingleSelection([3, 5]);

        expect(sel.length).toBe(2);

        expect(sel.first()).toBe(3);

        expect(sel.last()).toBe(4);

        expect(sel.offset(2).first()).toBe(5);

        expect(sel.hasAll([1, 4])).toBe(false);
        expect(sel.hasAll([3, 4])).toBe(true);

        expect(sel.remove(4).length).toBe(1);

        expect([...sel]).toEqual([3, 4]);
        expect([...sel.add([4, 9]).remove(5)]).toEqual([3, 4, 6, 7, 8]);

        expect(CompactSelection.empty().first()).toBeUndefined();
        expect(CompactSelection.empty().last()).toBeUndefined();
        expect(CompactSelection.empty().add(5).length).toBe(1);
    });
});
