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

    test("Smoke test compact selection remove", () => {
        const sel = CompactSelection.fromSingleSelection([3, 8]);

        expect([...sel]).toEqual([3, 4, 5, 6, 7])

        // Remove entire selection

        expect([...sel.remove([3, 8])]).toEqual([])
        expect(sel.remove([3, 8]).length).toBe(0)

        expect([...sel.remove([2, 9])]).toEqual([])
        expect(sel.remove([2, 9]).length).toBe(0)

        // Remove ends of selection

        expect([...sel.remove([2, 6])]).toEqual([6, 7])
        expect(sel.remove([2, 6]).length).toBe(1)

        expect([...sel.remove([5, 9])]).toEqual([3, 4])
        expect(sel.remove([5, 9]).length).toBe(1)

        expect([...sel.remove([2, 3])]).toEqual([3, 4, 5, 6, 7])
        expect(sel.remove([2, 3]).length).toBe(1)

        expect([...sel.remove([8, 9])]).toEqual([3, 4, 5, 6, 7])
        expect(sel.remove([8, 9]).length).toBe(1)

        expect([...sel.remove(3)]).toEqual([4, 5, 6, 7])
        expect(sel.remove(3).length).toBe(1)

        expect([...sel.remove(7)]).toEqual([3, 4, 5, 6])
        expect(sel.remove(7).length).toBe(1)

        // Remove middle of selection

        expect([...sel.remove([4, 7])]).toEqual([3, 7])
        expect(sel.remove([4, 7]).length).toBe(2)

        expect([...sel.remove(5)]).toEqual([3, 4, 6, 7])
        expect(sel.remove(5).length).toBe(2)

        // Remove nothing from selection

        expect([...sel.remove([1, 2])]).toEqual([3, 4, 5, 6, 7])
        expect(sel.remove([1, 2]).length).toBe(1)

        expect([...sel.remove([8, 9])]).toEqual([3, 4, 5, 6, 7])
        expect(sel.remove([8, 9]).length).toBe(1)
    })
});
