import { describe, it, expect, afterEach } from "vitest";
import { renderHook, cleanup } from "@testing-library/react-hooks";
import { useRowGrouping } from "../src/data-editor/row-grouping-api.js";
import type { RowGroupingOptions } from "../src/data-editor/row-grouping.js";

describe("useRowGrouping - mapper", () => {
    afterEach(async () => {
        await cleanup();
    });

    it("calculates rows correctly with no row grouping options", () => {
        const totalRows = 5;
        const { result } = renderHook(() => useRowGrouping(undefined, totalRows));

        expect(result.current.mapper(0)).toEqual({
            path: [ 0 ],
            originalIndex: 0,
            isGroupHeader: false,
            groupIndex: 0,
            contentIndex: 0,
            groupRows: -1
        });
        expect(result.current.mapper(1)).toEqual({
            path: [ 1 ],
            originalIndex: 1,
            isGroupHeader: false,
            groupIndex: 1,
            contentIndex: 1,
            groupRows: -1
        });
    });

    it("calculates rows correctly with uncollapsed groups - rowIndex is a group header", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 2, isCollapsed: false },
            ],
            height: 30,
        };
        const totalRows = 5;

        const { result } = renderHook(() => useRowGrouping(rowGroupingOptions, totalRows));

        expect(result.current.mapper(0)).toEqual({
            path: [ 0, -1 ],
            originalIndex: 0,
            isGroupHeader: true,
            groupIndex: -1,
            contentIndex: -1,
            groupRows: 1
        });
    });

    it("calculates rows correctly with uncollapsed groups - rowIndex is a regular row", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 2, isCollapsed: false },
            ],
            height: 30,
        };
        const totalRows = 5;

        const { result } = renderHook(() => useRowGrouping(rowGroupingOptions, totalRows));

        expect(result.current.mapper(1)).toEqual({
            path: [ 0, 0 ],
            originalIndex: 1,
            isGroupHeader: false,
            groupIndex: 0,
            contentIndex: 0,
            groupRows: 1
        });
    });

});
