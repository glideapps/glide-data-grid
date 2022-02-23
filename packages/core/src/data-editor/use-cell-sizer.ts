import * as React from "react";
import { Theme } from "../common/styles";
import { CellRenderers } from "../data-grid/cells";
import { GridCell, GridCellKind, GridColumn, isSizedGridColumn, SizedGridColumn } from "../data-grid/data-grid-types";
import type { DataEditorProps } from "./data-editor";

const defaultSize = 150;

function measureCell(ctx: CanvasRenderingContext2D, cell: GridCell): number {
    if (cell.kind === GridCellKind.Custom) return defaultSize;

    const r = CellRenderers[cell.kind];
    return r?.measure(ctx, cell) ?? defaultSize;
}

export function useCellSizer(
    columns: readonly GridColumn[],
    rows: number,
    getCellsForSelection: DataEditorProps["getCellsForSelection"],
    theme: Theme
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

    return React.useMemo(() => {
        if (columns.every(isSizedGridColumn)) {
            return columns;
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

        const computeRows = Math.max(1, 10 - Math.floor(columns.length / 10_000));

        const cells = getCellsForSelectionRef.current?.({
            x: 0,
            y: 0,
            width: columns.length,
            height: Math.min(rowsRef.current, computeRows),
        });

        return columns.map((c, colIndex) => {
            if (isSizedGridColumn(c)) return c;

            if (cells === undefined || c.id === undefined) {
                return {
                    ...c,
                    width: defaultSize,
                };
            }

            if (memoMap.current[c.id] !== undefined) {
                return {
                    ...c,
                    width: memoMap.current[c.id],
                };
            }

            const sizes = cells.map(row => row[colIndex]).map(cell => measureCell(ctx, cell));
            sizes.push(ctx.measureText(c.title).width + 16 + (c.icon === undefined ? 0 : 28));
            const average = sizes.reduce((a, b) => a + b) / sizes.length;
            const biggest = sizes.reduce((a, acc) => (a > average * 2 ? acc : Math.max(acc, a)));

            return {
                ...c,
                width: Math.min(500, Math.ceil(biggest)),
            };
        });
    }, [columns, ctx]);
}
