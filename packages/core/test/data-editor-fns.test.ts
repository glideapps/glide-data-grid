/* eslint-disable sonarjs/no-duplicate-string */
import { CompactSelection, type GridSelection } from "../src/index.js";
import { expandSelection, unquote } from "../src/data-editor/data-editor-fns.js"; // Adjust the import path to your setup
import { vi, expect, describe, it, afterEach } from "vitest";

describe("unquote", () => {
    it("should correctly unquote single line string without quotes", () => {
        const input = "hello\tworld";
        const output = unquote(input);
        expect(output).toEqual([
            [
                { rawValue: "hello", formatted: "hello", format: "string" },
                { rawValue: "world", formatted: "world", format: "string" },
            ],
        ]);
    });

    it("should correctly unquote single line string with quotes", () => {
        const input = `"hello"\t"world"`;
        const output = unquote(input);
        expect(output).toEqual([
            [
                { rawValue: "hello", formatted: "hello", format: "string" },
                { rawValue: "world", formatted: "world", format: "string" },
            ],
        ]);
    });

    it("should handle double quotes correctly", () => {
        const input = `"he""llo"\t"wo""rld"`;
        const output = unquote(input);
        expect(output).toEqual([
            [
                { rawValue: `he"llo`, formatted: `he"llo`, format: "string" },
                { rawValue: `wo"rld`, formatted: `wo"rld`, format: "string" },
            ],
        ]);
    });

    it("should correctly unquote multi line strings", () => {
        const input = `"hello"\t"world"\n"foo"\t"bar"`;
        const output = unquote(input);
        expect(output).toEqual([
            [
                { rawValue: "hello", formatted: "hello", format: "string" },
                { rawValue: "world", formatted: "world", format: "string" },
            ],
            [
                { rawValue: "foo", formatted: "foo", format: "string" },
                { rawValue: "bar", formatted: "bar", format: "string" },
            ],
        ]);
    });

    it("should handle empty strings correctly", () => {
        const input = "";
        const output = unquote(input);
        expect(output).toEqual([[]]);
    });

    it("should correctly unquote strings containing tabs within quotes", () => {
        const input = `"hello\tworld"\tfoo`;
        const output = unquote(input);
        expect(output).toEqual([
            [
                { rawValue: "hello\tworld", formatted: "hello\tworld", format: "string" },
                { rawValue: "foo", formatted: "foo", format: "string" },
            ],
        ]);
    });

    it("should correctly unquote strings containing newlines within quotes", () => {
        const input = `"hello\nworld"\tfoo`;
        const output = unquote(input);
        expect(output).toEqual([
            [
                { rawValue: "hello\nworld", formatted: "hello\nworld", format: "string" },
                { rawValue: "foo", formatted: "foo", format: "string" },
            ],
        ]);
    });

    it("should correctly unquote multi-line strings where newlines are within quotes", () => {
        const input = `"start"\t"middle\npart"\t"end"`;
        const output = unquote(input);
        expect(output).toEqual([
            [
                { rawValue: "start", formatted: "start", format: "string" },
                { rawValue: "middle\npart", formatted: "middle\npart", format: "string" },
                { rawValue: "end", formatted: "end", format: "string" },
            ],
        ]);
    });
});

describe("expandSelection", () => {
    const getCellsForSelection = vi.fn();
    const abortController = new AbortController();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should return the original selection if spanRangeBehavior is allowPartial", () => {
        const selection: GridSelection = {
            current: {
                cell: [0, 0],
                range: {
                    x: 0,
                    y: 0,
                    width: 1,
                    height: 1,
                },
                rangeStack: [],
            },
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
        };
        const result = expandSelection(selection, getCellsForSelection, 0, "allowPartial", abortController);
        expect(result).toEqual(selection);
    });

    it("should return the original selection if current selection is undefined", () => {
        const selection = {
            current: undefined,
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
        };
        const result = expandSelection(selection, getCellsForSelection, 0, "default", abortController);
        expect(result).toEqual(selection);
    });

    it("should return the original selection if getCellsForSelection returns a function", () => {
        const selection: GridSelection = {
            current: {
                cell: [0, 0],
                range: {
                    x: 0,
                    y: 0,
                    width: 1,
                    height: 1,
                },
                rangeStack: [],
            },
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
        };
        getCellsForSelection.mockReturnValue(() => ({}));
        const result = expandSelection(selection, getCellsForSelection, 0, "default", abortController);
        expect(result).toEqual(selection);
        expect(getCellsForSelection).toHaveBeenCalledTimes(1);
    });
});
