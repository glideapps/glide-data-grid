import { GridCell, GridCellKind, GridColumn, SizedGridColumn } from "../data-grid/data-grid-types";
import { DataEditorProps } from "./data-editor";
import * as React from "react";
import { CellRenderers } from "../data-grid/cells";
import { Theme } from "../common/styles";

function measureCell(ctx: CanvasRenderingContext2D, cell: GridCell): number {
    if (cell.kind === GridCellKind.Custom) return 150;

    const r = CellRenderers[cell.kind];
    return r?.measure(ctx, cell) ?? 150;
}

export function useCellSizer(
    columns: readonly GridColumn[],
    rows: number,
    getCellsForSelection: DataEditorProps["getCellsForSelection"],
    theme: Theme
): readonly SizedGridColumn[] {
    const rowsRef = React.useRef(rows);
    rowsRef.current = rows;
    const getCellsForSelectionRef = React.useRef(getCellsForSelection);
    getCellsForSelectionRef.current = getCellsForSelection;
    const themeRef = React.useRef(theme);
    themeRef.current = theme;
    return React.useMemo(() => {
        if (!columns.some(c => c.width === undefined)) {
            return columns as SizedGridColumn[];
        }

        const offscreen = document.createElement("canvas");
        const ctx = offscreen.getContext("2d", {
            alpha: false,
        });
        if (ctx === null) {
            return columns.map(c => {
                if (c.width !== undefined) return c;

                return {
                    ...c,
                    width: 150,
                };
            }) as SizedGridColumn[];
        }

        ctx.font = `${themeRef.current.baseFontStyle} ${themeRef.current.fontFamily}`;

        const cells = getCellsForSelectionRef.current?.({
            x: 0,
            y: 0,
            width: columns.length,
            height: Math.min(rowsRef.current, 10),
        });

        return columns.map((c, colIndex) => {
            if (c.width !== undefined) return c;

            if (cells === undefined) {
                return {
                    ...c,
                    width: 150,
                };
            }

            const sizes = cells.map(row => row[colIndex]).map(cell => measureCell(ctx, cell));
            sizes.push(ctx.measureText(c.title).width + 16 + (c.icon === undefined ? 0 : 28));
            const average = sizes.reduce((a, b) => a + b) / sizes.length;
            const biggest = sizes.reduce((a, acc) => (a > average * 2 ? acc : Math.max(acc, a)));

            return {
                ...c,
                width: biggest,
            };
        }) as SizedGridColumn[];
    }, [columns]);
}
