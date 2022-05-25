import * as React from "react";
import ImageWindowLoader from "../common/image-window-loader";
import { Theme } from "../common/styles";
import { CustomCell, GridCell, GridCellKind, ProvideEditorCallback, Rectangle } from "../data-grid/data-grid-types";
import { DataEditorProps } from "./data-editor";

type DrawCallback = NonNullable<DataEditorProps["drawCell"]>;

export interface DrawArgs {
    ctx: CanvasRenderingContext2D;
    theme: Theme;
    rect: Rectangle;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    col: number;
    row: number;
    highlighted: boolean;
    imageLoader: ImageWindowLoader;
}

export type CustomCellRenderer<T extends CustomCell> = {
    isMatch: (cell: CustomCell) => cell is T;
    draw: (args: DrawArgs, cell: T) => boolean;
    provideEditor: ProvideEditorCallback<T>;
    onPaste?: (val: string, cellData: T["data"]) => T["data"];
};

export function useCustomCells(
    cells: readonly CustomCellRenderer<any>[]
): {
    drawCell: DrawCallback;
    provideEditor: ProvideEditorCallback<GridCell>;
    coercePasteValue: NonNullable<DataEditorProps["coercePasteValue"]>;
} {
    const drawCell = React.useCallback<DrawCallback>(
        args => {
            const { cell } = args;
            if (cell.kind !== GridCellKind.Custom) return false;
            for (const c of cells) {
                if (c.isMatch(cell)) {
                    return c.draw(args, cell as any);
                }
            }
            return false;
        },
        [cells]
    );

    const provideEditor = React.useCallback<ProvideEditorCallback<GridCell>>(
        cell => {
            if (cell.kind !== GridCellKind.Custom) return undefined;

            for (const c of cells) {
                if (c.isMatch(cell)) {
                    return c.provideEditor(cell as any) as ReturnType<ProvideEditorCallback<GridCell>>;
                }
            }

            return undefined;
        },
        [cells]
    );

    const coercePasteValue = React.useCallback<NonNullable<DataEditorProps["coercePasteValue"]>>(
        (val, cell) => {
            if (cell.kind !== GridCellKind.Custom) return undefined;

            for (const c of cells) {
                if (c.isMatch(cell)) {
                    if (c.onPaste === undefined) {
                        return undefined;
                    }
                    return {
                        ...cell,
                        data: c.onPaste(val, cell.data),
                    };
                }
            }
        },
        [cells]
    );

    return { drawCell, provideEditor, coercePasteValue };
}
