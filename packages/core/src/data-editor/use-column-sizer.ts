import * as React from "react";
import { Theme } from "../common/styles";
import type { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import { CellRenderers } from "../data-grid/cells";
import {
    CellArray,
    GridCell,
    GridCellKind,
    GridColumn,
    isSizedGridColumn,
    resolveCellsThunk,
    SizedGridColumn,
    AutoGridColumn,
} from "../data-grid/data-grid-types";

const defaultSize = 150;

function measureCell(ctx: CanvasRenderingContext2D, cell: GridCell): number {
    if (cell.kind === GridCellKind.Custom) return defaultSize;

    const r = CellRenderers[cell.kind];
    return r?.measure(ctx, cell) ?? defaultSize;
}

function measureColumn(
    ctx: CanvasRenderingContext2D,
    c: AutoGridColumn,
    colIndex: number,
    selectedData: CellArray,
    minColumnWidth: number,
    maxColumnWidth: number
): SizedGridColumn {
    let sizes: number[] = [];
    if (selectedData !== undefined) {
        sizes.push(...selectedData.map(row => row[colIndex]).map(cell => measureCell(ctx, cell)));
    }
    sizes.push(ctx.measureText(c.title).width + 16 + (c.icon === undefined ? 0 : 28));
    const average = sizes.reduce((a, b) => a + b) / sizes.length;
    if (sizes.length > 5) {
        // Filter out outliers
        sizes = sizes.filter(a => a < average * 2);
    }
    const biggest = Math.max(...sizes);
    const final = Math.max(minColumnWidth, Math.min(maxColumnWidth, Math.ceil(biggest)));

    return {
        ...c,
        width: final,
    };
}

export function useColumnSizer(
    columns: readonly GridColumn[],
    rows: number,
    getCellsForSelection: DataGridSearchProps["getCellsForSelection"],
    clientWidth: number,
    minColumnWidth: number,
    maxColumnWidth: number,
    theme: Theme,
    abortController: AbortController
): readonly SizedGridColumn[] {
    const rowsRef = React.useRef(rows);
    const getCellsForSelectionRef = React.useRef(getCellsForSelection);
    const themeRef = React.useRef(theme);
    rowsRef.current = rows;
    getCellsForSelectionRef.current = getCellsForSelection;
    themeRef.current = theme;

    const [ctx] = React.useState(() => {
        const offscreen = document.createElement("canvas");
        return offscreen.getContext("2d", { alpha: false });
    });

    const memoMap = React.useRef<Record<string, number>>({});

    const lastColumns = React.useRef<typeof columns>();
    const [selectedData, setSelectionData] = React.useState<CellArray | undefined>();

    React.useLayoutEffect(() => {
        const getCells = getCellsForSelectionRef.current;
        if (getCells === undefined || columns.every(isSizedGridColumn)) return;
        let computeRows = Math.max(1, 10 - Math.floor(columns.length / 10_000));
        let tailRows = 0;
        if (computeRows < rowsRef.current && computeRows > 1) {
            computeRows--;
            tailRows = 1;
        }

        const computeArea = {
            x: 0,
            y: 0,
            width: columns.length,
            height: Math.min(rowsRef.current, computeRows),
        };

        const tailComputeArea = {
            x: 0,
            y: rowsRef.current - 1,
            width: columns.length,
            height: 1,
        };
        const fn = async () => {
            const getResult = getCells(computeArea, abortController.signal);
            const tailGetResult = tailRows > 0 ? getCells(tailComputeArea, abortController.signal) : undefined;
            let toSet: CellArray;
            if (typeof getResult === "object") {
                toSet = getResult;
            } else {
                toSet = await resolveCellsThunk(getResult);
            }
            if (tailGetResult !== undefined) {
                if (typeof tailGetResult === "object") {
                    toSet = [...toSet, ...tailGetResult];
                } else {
                    toSet = [...toSet, ...(await resolveCellsThunk(tailGetResult))];
                }
            }
            lastColumns.current = columns;
            setSelectionData(toSet);
        };
        void fn();
    }, [abortController.signal, columns]);

    return React.useMemo(() => {
        const getRaw = (): SizedGridColumn[] => {
            if (columns.every(isSizedGridColumn)) {
                return [...columns];
            }

            if (ctx === null) {
                return columns.map(c => {
                    if (isSizedGridColumn(c)) return c;

                    return {
                        ...c,
                        width: defaultSize,
                    };
                });
            }

            ctx.font = `${themeRef.current.baseFontStyle} ${themeRef.current.fontFamily}`;

            return columns.map((c, colIndex) => {
                if (isSizedGridColumn(c)) return c;

                if (memoMap.current[c.id] !== undefined) {
                    return {
                        ...c,
                        width: memoMap.current[c.id],
                    };
                }

                if (selectedData === undefined || lastColumns.current !== columns || c.id === undefined) {
                    return {
                        ...c,
                        width: defaultSize,
                    };
                }

                const r = measureColumn(ctx, c, colIndex, selectedData, minColumnWidth, maxColumnWidth);
                memoMap.current[c.id] = r.width;
                return r;
            });
        };

        const raw = getRaw();
        let totalWidth = 0;
        let totalGrow = 0;
        const distribute: number[] = [];
        for (let i = 0; i < raw.length; i++) {
            const c = raw[i];
            totalWidth += c.width;
            if (c.grow !== undefined && c.grow > 0) {
                totalGrow += c.grow;
                distribute.push(i);
            }
        }
        if (totalWidth < clientWidth && distribute.length > 0) {
            const extra = clientWidth - totalWidth;
            let remaining = extra;
            for (let di = 0; di < distribute.length; di++) {
                const i = distribute[di];
                const weighted = (raw[i].grow ?? 0) / totalGrow;
                const toAdd =
                    di === distribute.length - 1 ? remaining : Math.min(remaining, Math.floor(extra * weighted));
                raw[i] = {
                    ...raw[i],
                    width: raw[i].width + toAdd,
                };
                remaining -= toAdd;
            }
        }
        return raw;
    }, [columns, ctx, clientWidth, maxColumnWidth, minColumnWidth, selectedData]);
}
