import { describe, it, expect, afterEach } from "vitest";
import { renderHook, cleanup } from "@testing-library/react-hooks";
import {
    expandRowGroups,
    flattenRowGroups,
    useRowGroupingInner,
    type RowGroupingOptions,
} from "../src/data-editor/row-grouping.js";
import { getRowGroupingForPath, updateRowGroupingByPath } from "../src/data-editor/row-grouping-api.js";

describe("expandRowGroups", () => {
    it("expands an empty array of groups", () => {
        const input: any[] = [];
        const output = expandRowGroups(input);
        expect(output).toEqual([]);
    });

    it("expands a single group without subGroups", () => {
        const input = [{ headerIndex: 0, isCollapsed: false }];
        const expected = [{ headerIndex: 0, isCollapsed: false, depth: 0, path: [0] }];
        const output = expandRowGroups(input);
        expect(output).toEqual(expected);
    });

    it("expands multiple groups without subGroups", () => {
        const input = [
            { headerIndex: 0, isCollapsed: false },
            { headerIndex: 2, isCollapsed: true },
        ];
        const expected = [
            { headerIndex: 0, isCollapsed: false, depth: 0, path: [0] },
            { headerIndex: 2, isCollapsed: true, depth: 0, path: [1] },
        ];
        const output = expandRowGroups(input);
        expect(output).toEqual(expected);
    });

    it("expands groups with nested subGroups", () => {
        const input = [
            {
                headerIndex: 0,
                isCollapsed: false,
                subGroups: [
                    { headerIndex: 1, isCollapsed: false },
                    {
                        headerIndex: 2,
                        isCollapsed: true,
                        subGroups: [{ headerIndex: 3, isCollapsed: false }],
                    },
                ],
            },
        ];
        const expected = [
            {
                depth: 0,
                headerIndex: 0,
                isCollapsed: false,
                path: [0],
                subGroups: [
                    {
                        depth: 1,
                        headerIndex: 1,
                        isCollapsed: false,
                        path: [0, 0],
                    },
                    {
                        depth: 1,
                        headerIndex: 2,
                        isCollapsed: true,
                        path: [0, 1],
                        subGroups: [
                            {
                                depth: 2,
                                headerIndex: 3,
                                isCollapsed: false,
                                path: [0, 1, 0],
                            },
                        ],
                    },
                ],
            },
        ];
        const output = expandRowGroups(input);
        expect(output).toEqual(expected);
    });

    it("sorts groups and subGroups by headerIndex", () => {
        const input = [
            {
                headerIndex: 2,
                isCollapsed: true,
                subGroups: [{ headerIndex: 4, isCollapsed: false }],
            },
            { headerIndex: 0, isCollapsed: false },
        ];
        const expected = [
            {
                depth: 0,
                headerIndex: 0,
                isCollapsed: false,
                path: [1],
            },
            {
                depth: 0,
                headerIndex: 2,
                isCollapsed: true,
                path: [0],
                subGroups: [
                    {
                        depth: 1,
                        headerIndex: 4,
                        isCollapsed: false,
                        path: [0, 0],
                    },
                ],
            },
        ];
        const output = expandRowGroups(input);
        expect(output).toEqual(expected);
    });
});

describe("flattenRowGroups", () => {
    it("flattens a simple list of row groups without subGroups", () => {
        const rowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 5, isCollapsed: true },
            ],
            height: 30, // This property is ignored by flattenRowGroups but included for completeness
        };
        const totalRows = 10;
        const expected = [
            { rowIndex: 0, headerIndex: 0, isCollapsed: false, depth: 0, path: [0], rows: 4, contentIndex: 0 },
            { rowIndex: 5, headerIndex: 5, isCollapsed: true, depth: 0, path: [1], rows: 4, contentIndex: 4 },
        ];
        const output = flattenRowGroups(rowGroupingOptions, totalRows);
        expect(output).toEqual(expected);
    });

    it("flattens row groups with nested subGroups", () => {
        const rowGroupingOptions = {
            groups: [
                {
                    headerIndex: 0,
                    isCollapsed: false,
                    subGroups: [
                        { headerIndex: 2, isCollapsed: false },
                        {
                            headerIndex: 4,
                            isCollapsed: true,
                            subGroups: [{ headerIndex: 6, isCollapsed: false }],
                        },
                    ],
                },
            ],
            height: 30,
        };
        const totalRows = 10;
        const expected = [
            { rowIndex: 0, headerIndex: 0, isCollapsed: false, depth: 0, path: [0], rows: 1, contentIndex: 0 },
            { rowIndex: 2, headerIndex: 2, isCollapsed: false, depth: 1, path: [0, 0], rows: 1, contentIndex: 1 },
            { rowIndex: 4, headerIndex: 4, isCollapsed: true, depth: 1, path: [0, 1], rows: 1, contentIndex: 2 },
        ];
        const output = flattenRowGroups(rowGroupingOptions, totalRows);
        expect(output).toEqual(expected);
    });

    it("correctly calculates rows for each group, accounting for collapsed states", () => {
        const rowGroupingOptions = {
            groups: [
                {
                    headerIndex: 0,
                    isCollapsed: false,
                    subGroups: [
                        { headerIndex: 1, isCollapsed: true },
                        { headerIndex: 3, isCollapsed: false },
                    ],
                },
                { headerIndex: 5, isCollapsed: true },
            ],
            height: 30,
        };
        const totalRows = 7;
        const expected = [
            { rowIndex: 0, headerIndex: 0, isCollapsed: false, depth: 0, path: [0], rows: 0, contentIndex: 0 },
            { rowIndex: 1, headerIndex: 1, isCollapsed: true, depth: 1, path: [0, 0], rows: 1, contentIndex: 0 },
            { rowIndex: 2, headerIndex: 3, isCollapsed: false, depth: 1, path: [0, 1], rows: 1, contentIndex: 1 },
            { rowIndex: 4, headerIndex: 5, isCollapsed: true, depth: 0, path: [1], rows: 1, contentIndex: 2 },
        ];
        const output = flattenRowGroups(rowGroupingOptions, totalRows);
        expect(output).toEqual(expected);
    });
});

describe("useRowGroupingInner - getRowThemeOverride", () => {
    afterEach(async () => {
        await cleanup();
    });

    it("returns undefined for getRowThemeOverride when no themeOverride is provided and no row grouping options", () => {
        const { result } = renderHook(() => useRowGroupingInner(undefined, 5, 20, undefined));

        const themeOverride = result.current.getRowThemeOverride?.(0);
        expect(themeOverride).toBeUndefined();
    });

    it("applies provided themeOverride for group headers", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [{ headerIndex: 0, isCollapsed: false }],
            height: 30,
            themeOverride: { bgCell: "red" },
        };

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, 5, 20, undefined));

        const themeOverride = result.current.getRowThemeOverride?.(0);
        expect(themeOverride).toEqual({ bgCell: "red" });
    });

    it("returns correct theme for non-group-header rows according to getRowThemeOverrideIn", () => {
        const rowGroupingOptions = {
            groups: [{ headerIndex: 0, isCollapsed: false }],
            height: 30,
        };

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const getRowThemeOverrideIn = (row: number) => ({ bgCell: row % 2 === 0 ? "blue" : "green" });

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, 5, 20, getRowThemeOverrideIn));

        // Assuming row 1 is not a group header
        const themeOverride = result.current.getRowThemeOverride?.(1);
        expect(themeOverride).toEqual({ bgCell: "green" });
    });

    it("returns correct theme for non-group-header rows when some groups collapsed according to getRowThemeOverrideIn", () => {
        const rowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 3, isCollapsed: true },
                { headerIndex: 5, isCollapsed: false },
            ],
            height: 30,
        };

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const getRowThemeOverrideIn = (row: number) => ({ bgCell: row % 2 === 0 ? "blue" : "green" });

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, 10, 20, getRowThemeOverrideIn));

        const getRowThemeOverride = result.current.getRowThemeOverride;

        // Assuming row 1 is not a group header
        expect(getRowThemeOverride?.(1)).toEqual({ bgCell: "green" });
        expect(getRowThemeOverride?.(2)).toEqual({ bgCell: "blue" });
        expect(getRowThemeOverride?.(5)).toEqual({ bgCell: "green" });
    });
});

describe("useRowGroupingInner - rowHeight", () => {
    afterEach(async () => {
        await cleanup();
    });

    it("applies provided group row height for group headers", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 3, isCollapsed: false },
                { headerIndex: 5, isCollapsed: false },
            ],
            height: 30,
        };

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, 5, 20, undefined));

        expect(typeof result.current.rowHeight).toBe("function");

        // Assuming row 1 is not a group header
        const rowHeightFn = result.current.rowHeight as (row: number) => number;
        expect(rowHeightFn(0)).toEqual(rowGroupingOptions.height);
        expect(rowHeightFn(3)).toEqual(rowGroupingOptions.height);
        expect(rowHeightFn(5)).toEqual(rowGroupingOptions.height);
    });

    it("applies provided group row height for group headers when some are collapsed", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 3, isCollapsed: true },
                { headerIndex: 5, isCollapsed: false },
            ],
            height: 30,
        };

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, 5, 20, undefined));

        expect(typeof result.current.rowHeight).toBe("function");

        // Assuming row 1 is not a group header
        const rowHeightFn = result.current.rowHeight as (row: number) => number;
        expect(rowHeightFn(0)).toEqual(rowGroupingOptions.height);
        expect(rowHeightFn(3)).toEqual(rowGroupingOptions.height);
        expect(rowHeightFn(4)).toEqual(rowGroupingOptions.height);
    });

    it("returns correct height for non-group-header rows", () => {
        const rowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 3, isCollapsed: false },
                { headerIndex: 5, isCollapsed: false },
            ],
            height: 30,
        };

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const getRowHeightIn = (row: number) => (row % 2 === 0 ? 20 : 40);

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, 10, getRowHeightIn, undefined));

        expect(typeof result.current.rowHeight).toBe("function");
        const rowHeightFn = result.current.rowHeight as (row: number) => number;

        // Assuming row 1 is not a group header
        expect(rowHeightFn(1)).toEqual(40);
        expect(rowHeightFn(2)).toEqual(20);
        expect(rowHeightFn(5)).toEqual(rowGroupingOptions.height);
    });

    it("returns correct height for non-group-header rows when some groups collapsed", () => {
        const rowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 3, isCollapsed: true },
                { headerIndex: 5, isCollapsed: false },
            ],
            height: 30,
        };

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const getRowHeightIn = (row: number) => (row % 2 === 0 ? 20 : 40);

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, 10, getRowHeightIn, undefined));

        expect(typeof result.current.rowHeight).toBe("function");
        const rowHeightFn = result.current.rowHeight as (row: number) => number;

        // Assuming row 1 is not a group header
        expect(rowHeightFn(1)).toEqual(40);
        expect(rowHeightFn(2)).toEqual(20);
        expect(rowHeightFn(5)).toEqual(40); // this will be the first row of the third group
    });
});

describe("useRowGroupingInner - rows", () => {
    afterEach(async () => {
        await cleanup();
    });

    it("calculates rows correctly with no row grouping options", () => {
        const totalRows = 5;
        const { result } = renderHook(() => useRowGroupingInner(undefined, totalRows, 20, undefined));

        expect(result.current.rows).toBe(totalRows);
    });

    it("calculates rows correctly with uncollapsed groups", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 2, isCollapsed: false },
            ],
            height: 30,
        };
        const totalRows = 5;
        // Each group adds 1 to the row count for the header, and every row is counted
        const expectedRows = totalRows;

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, totalRows, 20, undefined));

        expect(result.current.rows).toBe(expectedRows);
    });

    it("calculates rows correctly with collapsed groups", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: true },
                { headerIndex: 2, isCollapsed: true },
            ],
            height: 30,
        };
        const totalRows = 5;
        // When groups are collapsed, only the group headers are counted
        const expectedRows = rowGroupingOptions.groups.length;

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, totalRows, 20, undefined));

        expect(result.current.rows).toBe(expectedRows);
    });

    it("calculates rows correctly with mixed collapsed and uncollapsed groups", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 2, isCollapsed: true },
            ],
            height: 30,
        };
        const totalRows = 5;
        const expectedRows = 3;

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, totalRows, 20, undefined));

        expect(result.current.rows).toBe(expectedRows);
    });

    it("calculates rows correctly with mixed collapsed and uncollapsed groups, including subgroups", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                {
                    headerIndex: 0,
                    isCollapsed: false,
                    subGroups: [
                        { headerIndex: 1, isCollapsed: true },
                        { headerIndex: 3, isCollapsed: false, subGroups: [{ headerIndex: 4, isCollapsed: true }] },
                    ],
                },
                { headerIndex: 5, isCollapsed: true },
            ],
            height: 30,
        };
        const totalRows = 10;
        const expectedRows = 5;

        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, totalRows, 20, undefined));

        expect(result.current.rows).toBe(expectedRows);
    });
});

describe("useRowGroupingInner - rowNumberMapper", () => {
    afterEach(async () => {
        await cleanup();
    });

    it("maps row numbers correctly without any row grouping", () => {
        const totalRows = 10;
        const { result } = renderHook(() => useRowGroupingInner(undefined, totalRows, 20, undefined));

        for (let i = 0; i < totalRows; i++) {
            expect(result.current.rowNumberMapper(i)).toBe(i);
        }
    });

    it("maps row numbers correctly with uncollapsed groups", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: false },
                { headerIndex: 3, isCollapsed: false },
            ],
            height: 30,
        };
        const totalRows = 5;
        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, totalRows, 20, undefined));

        // Example assertion for a specific row, adjust as necessary for your logic
        // Assuming row 2 in the UI corresponds to row 2 in data since groups are not collapsing any rows
        expect(result.current.rowNumberMapper(2)).toBe(1);
    });

    it("maps row numbers correctly with collapsed groups", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                { headerIndex: 0, isCollapsed: true },
                { headerIndex: 3, isCollapsed: true },
            ],
            height: 30,
        };
        const totalRows = 5;
        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, totalRows, 20, undefined));

        // When groups are collapsed, the rowNumberMapper might map visual rows to different data rows
        // For example, after collapsing, visual row 1 (second row) might still correspond to data row 1 if it's before the first collapsed header
        expect(result.current.rowNumberMapper(1)).toBe(undefined);
    });

    it("maps row numbers correctly with mixed collapsed and uncollapsed groups, including subgroups", () => {
        const rowGroupingOptions: RowGroupingOptions = {
            groups: [
                {
                    headerIndex: 0,
                    isCollapsed: false,
                    subGroups: [
                        { headerIndex: 1, isCollapsed: true },
                        { headerIndex: 4, isCollapsed: false },
                    ],
                },
                { headerIndex: 6, isCollapsed: true },
            ],
            height: 30,
        };
        const totalRows = 10;
        const { result } = renderHook(() => useRowGroupingInner(rowGroupingOptions, totalRows, 20, undefined));

        // Assuming row 5 in the UI might correspond to a different data row depending on the grouping logic
        // This assertion needs to be adjusted based on your specific logic for handling subgroups and collapsed states
        expect(result.current.rowNumberMapper(5)).toBe(5); // Adjust this based on expected logic
    });
});

describe("updateRowGroupingByPath", () => {
    it("updates a top-level group correctly", () => {
        const rowGrouping = [
            { headerIndex: 0, isCollapsed: false },
            { headerIndex: 1, isCollapsed: false },
        ];
        const path = [1, -1];
        const update = { isCollapsed: true };
        const updatedGrouping = updateRowGroupingByPath(rowGrouping, path, update);

        expect(updatedGrouping[1].isCollapsed).toBe(true);
        expect(updatedGrouping[0].isCollapsed).toBe(false); // Ensure other groups are unchanged
    });

    it("updates a nested subgroup correctly", () => {
        const rowGrouping = [
            {
                headerIndex: 0,
                isCollapsed: false,
                subGroups: [{ headerIndex: 1, isCollapsed: false }],
            },
        ];
        const path = [0, 0, -1];
        const update = { isCollapsed: true };
        const updatedGrouping = updateRowGroupingByPath(rowGrouping, path, update);

        expect(updatedGrouping[0].subGroups?.[0].isCollapsed).toBe(true);
    });

    it("does not alter groups when given a non-existent path", () => {
        const rowGrouping = [{ headerIndex: 0, isCollapsed: false }];
        const path = [1, -1]; // Non-existent path
        const update = { isCollapsed: true };
        const updatedGrouping = updateRowGroupingByPath(rowGrouping, path, update);

        expect(updatedGrouping).toEqual(rowGrouping);
    });
});

describe("getRowGroupingForPath", () => {
    it("retrieves a top-level group correctly", () => {
        const rowGrouping = [
            { headerIndex: 0, isCollapsed: false },
            { headerIndex: 1, isCollapsed: true },
        ];
        const path = [1, -1];
        const group = getRowGroupingForPath(rowGrouping, path);

        expect(group).toEqual({ headerIndex: 1, isCollapsed: true });
    });

    it("retrieves a nested subgroup correctly", () => {
        const rowGrouping = [
            {
                headerIndex: 0,
                isCollapsed: false,
                subGroups: [{ headerIndex: 1, isCollapsed: true }],
            },
        ];
        const path = [0, 0, -1];
        const group = getRowGroupingForPath(rowGrouping, path);

        expect(group).toEqual({ headerIndex: 1, isCollapsed: true });
    });

    it("handles non-existent paths appropriately", () => {
        const rowGrouping = [{ headerIndex: 0, isCollapsed: false }];
        const path = [1, -1]; // Non-existent path

        const group = getRowGroupingForPath(rowGrouping, path);

        expect(group).toBeUndefined();
    });
});
