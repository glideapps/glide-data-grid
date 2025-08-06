import { CompactSelection, type CompactSelectionRanges } from "../src/internal/data-grid/data-grid-types.js";
import { expect, describe, test } from "vitest";

describe("CompactSelection", () => {
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

    test("Compact selection equals", () => {
        const sel = CompactSelection.fromSingleSelection([3, 5]);
        const other = CompactSelection.fromSingleSelection([3, 5]);

        expect(sel.equals(other)).toBe(true);
        expect(sel.equals(sel)).toBe(true);
        expect(sel.equals(CompactSelection.fromSingleSelection([3, 6]))).toBe(false);
        expect(sel.equals(CompactSelection.fromSingleSelection([4, 6]))).toBe(false);

        expect(sel.some(x => x > 3)).toBe(true);
    });

    test("Compact selection toArray", () => {
        const sel = CompactSelection.fromSingleSelection([3, 5]);
        expect(sel.toArray()).toEqual([3, 4]);
    });

    test("Smoke test compact selection remove", () => {
        const sel = CompactSelection.fromSingleSelection([3, 8]);

        expect([...sel]).toEqual([3, 4, 5, 6, 7]);

        // Remove entire selection

        expect([...sel.remove([3, 8])]).toEqual([]);
        expect(sel.remove([3, 8]).length).toBe(0);

        expect([...sel.remove([2, 9])]).toEqual([]);
        expect(sel.remove([2, 9]).length).toBe(0);

        // Remove ends of selection

        expect([...sel.remove([2, 6])]).toEqual([6, 7]);
        expect(sel.remove([2, 6]).length).toBe(2);

        expect([...sel.remove([5, 9])]).toEqual([3, 4]);
        expect(sel.remove([5, 9]).length).toBe(2);

        expect([...sel.remove([2, 3])]).toEqual([3, 4, 5, 6, 7]);
        expect(sel.remove([2, 3]).length).toBe(5);

        expect([...sel.remove([8, 9])]).toEqual([3, 4, 5, 6, 7]);
        expect(sel.remove([8, 9]).length).toBe(5);

        expect([...sel.remove(3)]).toEqual([4, 5, 6, 7]);
        expect(sel.remove(3).length).toBe(4);

        expect([...sel.remove(7)]).toEqual([3, 4, 5, 6]);
        expect(sel.remove(7).length).toBe(4);

        // Remove end and start of 2 different slices
        const altSel = CompactSelection.fromSingleSelection([0, 5]).add([8, 12]);
        expect([...altSel]).toEqual([0, 1, 2, 3, 4, 8, 9, 10, 11]);
        expect([...altSel.remove([3, 10])]).toEqual([0, 1, 2, 10, 11]);

        // Remove middle of selection

        expect([...sel.remove([4, 7])]).toEqual([3, 7]);
        expect(sel.remove([4, 7]).length).toBe(2);

        expect([...sel.remove(5)]).toEqual([3, 4, 6, 7]);
        expect(sel.remove(5).length).toBe(4);

        // Remove nothing from selection

        expect([...sel.remove([1, 2])]).toEqual([3, 4, 5, 6, 7]);
        expect(sel.remove([1, 2]).length).toBe(5);

        expect([...sel.remove([8, 9])]).toEqual([3, 4, 5, 6, 7]);
        expect(sel.remove([8, 9]).length).toBe(5);
    });

    test("Round trip: single range selection", () => {
        const original = CompactSelection.fromSingleSelection([3, 8]);
        const recreated = CompactSelection.create(original.items);
        
        expect(recreated.equals(original)).toBe(true);
        expect(recreated.items).toEqual(original.items);
        expect([...recreated]).toEqual([3, 4, 5, 6, 7]);
    });

    test("Round trip: multiple non-overlapping ranges", () => {
        const original = CompactSelection.empty()
            .add([1, 3])
            .add([5, 8])
            .add([10, 12]);
        const recreated = CompactSelection.create(original.items);
        
        expect(recreated.equals(original)).toBe(true);
        expect(recreated.items).toEqual([[1, 3], [5, 8], [10, 12]]);
        expect([...recreated]).toEqual([1, 2, 5, 6, 7, 10, 11]);
    });

    test("Round trip: overlapping ranges get merged", () => {
        const original = CompactSelection.create([[1, 5], [3, 8], [7, 10]]);
        const recreated = CompactSelection.create(original.items);
        
        expect(recreated.equals(original)).toBe(true);
        expect(recreated.items).toEqual([[1, 10]]); // Should be merged into a single range
        expect([...recreated]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test("Round trip: empty selection", () => {
        const original = CompactSelection.empty();
        const recreated = CompactSelection.create(original.items);
        
        expect(recreated.equals(original)).toBe(true);
        expect(recreated.items).toEqual([]);
        expect([...recreated]).toEqual([]);
    });

    test("Round trip: single indices", () => {
        const original = CompactSelection.empty()
            .add(5)
            .add(10)
            .add(15);
        const recreated = CompactSelection.create(original.items);
        
        expect(recreated.equals(original)).toBe(true);
        expect(recreated.items).toEqual([[5, 6], [10, 11], [15, 16]]);
        expect([...recreated]).toEqual([5, 10, 15]);
    });

    test("Round trip: adjacent ranges get merged", () => {
        const original = CompactSelection.create([[1, 3], [3, 5], [5, 7]]);
        expect(original.items).toEqual([[1, 7]]); // Should be merged into a single range
        
        const recreated = CompactSelection.create(original.items);
        expect(recreated.equals(original)).toBe(true);
    });

    test("Round trip: complex selection with modifications", () => {
        const original = CompactSelection.fromSingleSelection([0, 20])
            .remove([5, 10])
            .remove([15, 18]);
        const recreated = CompactSelection.create(original.items);
        
        expect(recreated.equals(original)).toBe(true);
        expect(recreated.items).toEqual([[0, 5], [10, 15], [18, 20]]);
    });

    test("Round trip: JSON serialization persistence", () => {
        const original = CompactSelection.empty()
            .add([2, 5])
            .add([8, 12])
            .add(15)
            .add([20, 25]);
        
        // Simulate persistence through JSON serialization
        const serialized = JSON.stringify(original.items);
        const deserialized = JSON.parse(serialized) as CompactSelectionRanges;
        const restored = CompactSelection.create(deserialized);
        
        expect(restored.equals(original)).toBe(true);
        expect(restored.items).toEqual(original.items);
        expect([...restored]).toEqual([...original]);
    });

    test("CompactSelection.create merges overlapping ranges", () => {
        // Test automatic merging during creation
        const sel = CompactSelection.create([[1, 3], [2, 5], [4, 7], [10, 12]]);
        expect(sel.items).toEqual([[1, 7], [10, 12]]);
        expect([...sel]).toEqual([1, 2, 3, 4, 5, 6, 10, 11]);
    });

    test("CompactSelection.create handles edge cases", () => {
        // Empty array
        const empty = CompactSelection.create([]);
        expect(empty.items).toEqual([]);
        expect(empty.length).toBe(0);

        // Single range
        const single = CompactSelection.create([[5, 8]]);
        expect(single.items).toEqual([[5, 8]]);
        expect([...single]).toEqual([5, 6, 7]);

        // Adjacent ranges
        const adjacent = CompactSelection.create([[1, 3], [3, 5], [5, 7]]);
        expect(adjacent.items).toEqual([[1, 7]]);
        expect([...adjacent]).toEqual([1, 2, 3, 4, 5, 6]);
    });
});