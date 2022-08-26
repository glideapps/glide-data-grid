import * as React from "react";
import type { CustomRenderer } from "../data-grid/cells/cell-types";
import { CustomCell, GridCellKind } from "../data-grid/data-grid-types";
import type { DataEditorProps } from "./data-editor";

export type CustomCellRenderer<T extends CustomCell> = Pick<
    CustomRenderer<T>,
    "isMatch" | "provideEditor" | "onPaste" | "draw"
>;

function inflate<T extends CustomCell>(input: CustomCellRenderer<T>): CustomRenderer<T> {
    return {
        ...input,
        kind: GridCellKind.Custom,
    };
}

/**
 * @deprecated use customRenderers instead.
 * @param cells
 * @returns an object intended to be spread on the DataEditor.
 */
export function useCustomCells(
    cells: readonly CustomCellRenderer<any>[]
): {
    additionalRenderers: NonNullable<DataEditorProps["customRenderers"]>;
} {
    return { additionalRenderers: React.useMemo(() => cells.map(inflate), [cells]) };
}
