import { CompactSelection, GridCellKind, } from "@glideapps/glide-data-grid";
import range from "lodash/range.js";
import chunk from "lodash/chunk.js";
import React from "react";
export function useAsyncDataSource(pageSize, maxConcurrency, getRowData, toCell, onEdited, gridRef) {
    pageSize = Math.max(pageSize, 1);
    const loadingRef = React.useRef(CompactSelection.empty());
    const dataRef = React.useRef([]);
    const [visiblePages, setVisiblePages] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
    const visiblePagesRef = React.useRef(visiblePages);
    visiblePagesRef.current = visiblePages;
    const onVisibleRegionChanged = React.useCallback(r => {
        setVisiblePages(cv => {
            if (r.x === cv.x && r.y === cv.y && r.width === cv.width && r.height === cv.height)
                return cv;
            return r;
        });
    }, []);
    const getCellContent = React.useCallback(cell => {
        const [col, row] = cell;
        const rowData = dataRef.current[row];
        if (rowData !== undefined) {
            return toCell(rowData, col);
        }
        return {
            kind: GridCellKind.Loading,
            allowOverlay: false,
        };
    }, [toCell]);
    const loadPage = React.useCallback(async (page) => {
        loadingRef.current = loadingRef.current.add(page);
        const startIndex = page * pageSize;
        const d = await getRowData([startIndex, (page + 1) * pageSize]);
        const vr = visiblePagesRef.current;
        const damageList = [];
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
    }, [getRowData, gridRef, pageSize]);
    const getCellsForSelection = React.useCallback((r) => {
        return async () => {
            const firstPage = Math.max(0, Math.floor(r.y / pageSize));
            const lastPage = Math.floor((r.y + r.height) / pageSize);
            for (const pageChunk of chunk(range(firstPage, lastPage + 1).filter(i => !loadingRef.current.hasIndex(i)), maxConcurrency)) {
                await Promise.all(pageChunk.map(loadPage));
            }
            const result = [];
            for (let y = r.y; y < r.y + r.height; y++) {
                const row = [];
                for (let x = r.x; x < r.x + r.width; x++) {
                    row.push(getCellContent([x, y]));
                }
                result.push(row);
            }
            return result;
        };
    }, [getCellContent, loadPage, maxConcurrency, pageSize]);
    React.useEffect(() => {
        const r = visiblePages;
        const firstPage = Math.max(0, Math.floor((r.y - pageSize / 2) / pageSize));
        const lastPage = Math.floor((r.y + r.height + pageSize / 2) / pageSize);
        for (const page of range(firstPage, lastPage + 1)) {
            if (loadingRef.current.hasIndex(page))
                continue;
            void loadPage(page);
        }
    }, [loadPage, pageSize, visiblePages]);
    const onCellEdited = React.useCallback((cell, newVal) => {
        const [, row] = cell;
        const current = dataRef.current[row];
        if (current === undefined)
            return;
        const result = onEdited(cell, newVal, current);
        if (result !== undefined) {
            dataRef.current[row] = result;
        }
    }, [onEdited]);
    return {
        getCellContent,
        onVisibleRegionChanged,
        onCellEdited,
        getCellsForSelection,
    };
}
//# sourceMappingURL=use-async-data-source.js.map