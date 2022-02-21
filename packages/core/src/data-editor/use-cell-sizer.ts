import { GridCell, GridCellKind, GridColumn, isSizedGridColumn, SizedGridColumn } from "../data-grid/data-grid-types";
import { DataEditorProps } from "./data-editor";
import * as React from "react";
import { CellRenderers } from "../data-grid/cells";
import { Theme } from "../common/styles";

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

    return React.useMemo(() => {
        if (columns.every(isSizedGridColumn)) {
            return columns;
        }

        const offscreen = document.createElement("canvas");
        const ctx = offscreen.getContext("2d", {
            alpha: false,
        });
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

        const cells = getCellsForSelectionRef.current?.({
            x: 0,
            y: 0,
            width: columns.length,
            height: Math.min(rowsRef.current, 10),
        });

        return columns.map((c, colIndex) => {
            if (isSizedGridColumn(c)) return c;

            if (cells === undefined || c.id === undefined) {
                return {
                    ...c,
                    width: defaultSize,
                };
            }

            const sizes = cells.map(row => row[colIndex]).map(cell => measureCell(ctx, cell));
            sizes.push(ctx.measureText(c.title).width + 16 + (c.icon === undefined ? 0 : 28));
            const average = sizes.reduce((a, b) => a + b) / sizes.length;
            const biggest = sizes.reduce((a, acc) => (a > average * 2 ? acc : Math.max(acc, a)));

            return {
                ...c,
                width: Math.min(500, biggest),
            };
        });
    }, [columns]);
}
