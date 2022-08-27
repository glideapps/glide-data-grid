import {
    CellArray,
    CompactSelection,
    DataEditorProps,
    DataEditorRef,
    EditableGridCell,
    GridCell,
    GridCellKind,
    Item,
    Rectangle,
} from "@glideapps/glide-data-grid";
import range from "lodash/range.js";
import chunk from "lodash/chunk.js";
import React from "react";

export type RowCallback<T> = (range: Item) => Promise<readonly T[]>;
export type RowToCell<T> = (row: T, col: number) => GridCell;
export type RowEditedCallback<T> = (cell: Item, newVal: EditableGridCell, rowData: T) => T | undefined;
export function useAsyncDataSource<TRowType>(
    pageSize: number,
    maxConcurrency: number,
    getRowData: RowCallback<TRowType>,
    toCell: RowToCell<TRowType>,
    onEdited: RowEditedCallback<TRowType>,
    gridRef: React.MutableRefObject<DataEditorRef | null>
): Pick<DataEditorProps, "getCellContent" | "onVisibleRegionChanged" | "onCellEdited" | "getCellsForSelection"> {
    pageSize = Math.max(pageSize, 1);
    const loadingRef = React.useRef(CompactSelection.empty());
    const dataRef = React.useRef<TRowType[]>([]);

    const [visiblePages, setVisiblePages] = React.useState<Rectangle>({ x: 0, y: 0, width: 0, height: 0 });
    const visiblePagesRef = React.useRef(visiblePages);
    visiblePagesRef.current = visiblePages;

    const onVisibleRegionChanged: NonNullable<DataEditorProps["onVisibleRegionChanged"]> = React.useCallback(r => {
        setVisiblePages(cv => {
            if (r.x === cv.x && r.y === cv.y && r.width === cv.width && r.height === cv.height) return cv;
            return r;
        });
    }, []);

    const getCellContent = React.useCallback<DataEditorProps["getCellContent"]>(
        cell => {
            const [col, row] = cell;
            const rowData: TRowType | undefined = dataRef.current[row];
            if (rowData !== undefined) {
                return toCell(rowData, col);
            }
            return {
                kind: GridCellKind.Loading,
                allowOverlay: false,
            };
        },
        [toCell]
    );

    const loadPage = React.useCallback(
        async (page: number) => {
            loadingRef.current = loadingRef.current.add(page);
            const startIndex = page * pageSize;
            const d = await getRowData([startIndex, (page + 1) * pageSize]);

            const vr = visiblePagesRef.current;

            const damageList: { cell: [number, number] }[] = [];
            const data = dataRef.current;
            for (let i = 0; i < d.length; i++) {
                data[i + startIndex] = d[i];
                for (let col = vr.x; col <= vr.x + vr.width; col++) {
                    damageList.push({
                        cell: [col, i + startIndex],
                    });
                }
            }
            gridRef.current?.updateCells(damageList);
        },
        [getRowData, gridRef, pageSize]
    );

    const getCellsForSelection = React.useCallback(
        (r: Rectangle): (() => Promise<CellArray>) => {
            return async () => {
                const firstPage = Math.max(0, Math.floor(r.y / pageSize));
                const lastPage = Math.floor((r.y + r.height) / pageSize);

                for (const pageChunk of chunk(
                    range(firstPage, lastPage + 1).filter(i => !loadingRef.current.hasIndex(i)),
                    maxConcurrency
                )) {
                    await Promise.all(pageChunk.map(loadPage));
                }

                const result: GridCell[][] = [];

                for (let y = r.y; y < r.y + r.height; y++) {
                    const row: GridCell[] = [];
                    for (let x = r.x; x < r.x + r.width; x++) {
                        row.push(getCellContent([x, y]));
                    }
                    result.push(row);
                }

                return result;
            };
        },
        [getCellContent, loadPage, maxConcurrency, pageSize]
    );

    React.useEffect(() => {
        const r = visiblePages;
        const firstPage = Math.max(0, Math.floor((r.y - pageSize / 2) / pageSize));
        const lastPage = Math.floor((r.y + r.height + pageSize / 2) / pageSize);
        for (const page of range(firstPage, lastPage + 1)) {
            if (loadingRef.current.hasIndex(page)) continue;
            void loadPage(page);
        }
    }, [loadPage, pageSize, visiblePages]);

    const onCellEdited = React.useCallback(
        (cell: Item, newVal: EditableGridCell) => {
            const [, row] = cell;
            const current = dataRef.current[row];
            if (current === undefined) return;

            const result = onEdited(cell, newVal, current);
            if (result !== undefined) {
                dataRef.current[row] = result;
            }
        },
        [onEdited]
    );

    return {
        getCellContent,
        onVisibleRegionChanged,
        onCellEdited,
        getCellsForSelection,
    };
}
