import * as React from "react";
import clamp from "lodash/clamp.js";
import {
    CompactSelection,
    type GridSelection,
    type Rectangle,
    type Slice,
} from "../internal/data-grid/data-grid-types.js";

export interface RowSectionBase {
    readonly row: number;
}

export interface RowSectionPlacement<T extends RowSectionBase> {
    readonly section: T;
    readonly row: number;
}

function mapCompactSelection(
    selection: CompactSelection,
    mapSlice: (slice: Slice) => readonly Slice[]
): CompactSelection {
    if (selection.length === 0) return selection;
    return CompactSelection.create(selection.items.flatMap(mapSlice));
}

export function useRowSections<T extends RowSectionBase>(sections: readonly T[] | undefined, rowCount: number) {
    const normalizedSections = React.useMemo(() => {
        if (sections === undefined || sections.length === 0) return [];
        return sections
            .map((section, index) => ({
                ...section,
                row: clamp(Math.floor(section.row), 0, rowCount),
                sourceIndex: index,
            }))
            .sort((a, b) => a.row - b.row || a.sourceIndex - b.sourceIndex);
    }, [rowCount, sections]);

    const sectionRows = React.useMemo<readonly RowSectionPlacement<T>[]>(
        () =>
            normalizedSections.map((section, index) => ({
                section,
                row: section.row + index,
            })),
        [normalizedSections]
    );

    const visualRowCount = rowCount + sectionRows.length;

    const getSectionForRow = React.useCallback(
        (row: number): T | undefined => {
            for (const { section, row: sectionRow } of sectionRows) {
                if (row === sectionRow) return section;
                if (row < sectionRow) return undefined;
            }
            return undefined;
        },
        [sectionRows]
    );

    const visualRowToDataRow = React.useCallback(
        (row: number): number | undefined => {
            let offset = 0;
            for (const { row: sectionRow } of sectionRows) {
                if (row === sectionRow) return undefined;
                if (row < sectionRow) return row - offset;
                offset++;
            }
            return row - sectionRows.length;
        },
        [sectionRows]
    );

    const dataRowToVisualRow = React.useCallback(
        (row: number): number => {
            let offset = 0;
            for (const section of normalizedSections) {
                if (section.row > row) break;
                offset++;
            }
            return row + offset;
        },
        [normalizedSections]
    );

    const isDataRow = React.useCallback((row: number) => visualRowToDataRow(row) !== undefined, [visualRowToDataRow]);

    const visualSliceToDataSlices = React.useCallback(
        (slice: Slice): readonly Slice[] => {
            if (sectionRows.length === 0) return [slice];

            const [start, end] = slice;
            const slices: Slice[] = [];
            let current = start;

            for (const { row: sectionRow } of sectionRows) {
                if (sectionRow < current) continue;
                if (sectionRow >= end) break;

                if (current < sectionRow) {
                    const dataStart = visualRowToDataRow(current);
                    const dataEnd = visualRowToDataRow(sectionRow - 1);
                    if (dataStart !== undefined && dataEnd !== undefined) {
                        slices.push([dataStart, dataEnd + 1]);
                    }
                }
                current = sectionRow + 1;
            }

            if (current < end) {
                const dataStart = visualRowToDataRow(current);
                const dataEnd = visualRowToDataRow(end - 1);
                if (dataStart !== undefined && dataEnd !== undefined) {
                    slices.push([dataStart, dataEnd + 1]);
                }
            }

            return slices;
        },
        [sectionRows, visualRowToDataRow]
    );

    const dataSliceToVisualSlices = React.useCallback(
        (slice: Slice): readonly Slice[] => {
            if (sectionRows.length === 0) return [slice];

            const [start, end] = slice;
            const slices: Slice[] = [];
            let current = start;

            for (const section of normalizedSections) {
                if (section.row <= current) continue;
                if (section.row >= end) break;

                slices.push([dataRowToVisualRow(current), dataRowToVisualRow(section.row - 1) + 1]);
                current = section.row;
            }

            if (current < end) {
                slices.push([dataRowToVisualRow(current), dataRowToVisualRow(end - 1) + 1]);
            }

            return slices;
        },
        [dataRowToVisualRow, normalizedSections, sectionRows.length]
    );

    const visualRowsToDataRows = React.useCallback(
        (selection: CompactSelection) => mapCompactSelection(selection, visualSliceToDataSlices),
        [visualSliceToDataSlices]
    );

    const dataRowsToVisualRows = React.useCallback(
        (selection: CompactSelection) => mapCompactSelection(selection, dataSliceToVisualSlices),
        [dataSliceToVisualSlices]
    );

    const getVisualRowSelection = React.useCallback(
        (selection: number | Slice): CompactSelection => {
            if (sectionRows.length === 0) return CompactSelection.fromSingleSelection(selection);

            const start = typeof selection === "number" ? selection : selection[0];
            const end = typeof selection === "number" ? selection + 1 : selection[1];
            return CompactSelection.create(visualSliceToDataSlices([start, end]).flatMap(dataSliceToVisualSlices));
        },
        [dataSliceToVisualSlices, sectionRows.length, visualSliceToDataSlices]
    );

    const dataRectToVisualRect = React.useCallback(
        (rect: Rectangle): Rectangle => {
            if (sectionRows.length === 0 || rect.height <= 0) return rect;
            const start = dataRowToVisualRow(rect.y);
            const end = dataRowToVisualRow(rect.y + rect.height - 1) + 1;
            return {
                ...rect,
                y: start,
                height: end - start,
            };
        },
        [dataRowToVisualRow, sectionRows.length]
    );

    const visualRectToDataRect = React.useCallback(
        (rect: Rectangle): Rectangle | undefined => {
            if (sectionRows.length === 0) return rect;
            if (rect.height <= 0) return undefined;

            let start = rect.y;
            const end = rect.y + rect.height;
            while (start < end && visualRowToDataRow(start) === undefined) {
                start++;
            }
            if (start >= end) return undefined;

            let last = end - 1;
            while (last >= start && visualRowToDataRow(last) === undefined) {
                last--;
            }
            if (last < start) return undefined;

            const dataStart = visualRowToDataRow(start);
            const dataEnd = visualRowToDataRow(last);
            if (dataStart === undefined || dataEnd === undefined) return undefined;

            return {
                ...rect,
                y: dataStart,
                height: dataEnd - dataStart + 1,
            };
        },
        [sectionRows.length, visualRowToDataRow]
    );

    const dataSelectionToVisualSelection = React.useCallback(
        (selection: GridSelection): GridSelection => {
            if (sectionRows.length === 0) return selection;

            return {
                current:
                    selection.current === undefined
                        ? undefined
                        : {
                              cell: [selection.current.cell[0], dataRowToVisualRow(selection.current.cell[1])],
                              range: dataRectToVisualRect(selection.current.range),
                              rangeStack: selection.current.rangeStack.map(dataRectToVisualRect),
                          },
                rows: dataRowsToVisualRows(selection.rows),
                columns: selection.columns,
            };
        },
        [dataRectToVisualRect, dataRowToVisualRow, dataRowsToVisualRows, sectionRows.length]
    );

    const visualSelectionToDataSelection = React.useCallback(
        (selection: GridSelection): GridSelection => {
            if (sectionRows.length === 0) return selection;

            const currentDataRow =
                selection.current === undefined ? undefined : visualRowToDataRow(selection.current.cell[1]);
            const currentRange =
                selection.current === undefined ? undefined : visualRectToDataRect(selection.current.range);

            return {
                current:
                    selection.current === undefined || currentDataRow === undefined || currentRange === undefined
                        ? undefined
                        : {
                              cell: [selection.current.cell[0], currentDataRow],
                              range: currentRange,
                              rangeStack: selection.current.rangeStack.flatMap(r => {
                                  const dataRect = visualRectToDataRect(r);
                                  return dataRect === undefined ? [] : [dataRect];
                              }),
                          },
                rows: visualRowsToDataRows(selection.rows),
                columns: selection.columns,
            };
        },
        [sectionRows.length, visualRectToDataRect, visualRowToDataRow, visualRowsToDataRows]
    );

    return {
        dataRowToVisualRow,
        dataSelectionToVisualSelection,
        getSectionForRow,
        getVisualRowSelection,
        isDataRow,
        sectionRows,
        visualRectToDataRect,
        visualRowCount,
        visualRowToDataRow,
        visualSelectionToDataSelection,
    };
}
