import * as React from "react";
import type { AdditionalRenderer } from "../data-grid/cells/cell-types";
import { CustomCell, GridCellKind } from "../data-grid/data-grid-types";
import type { DataEditorProps } from "./data-editor";

export type CustomCellRenderer<T extends CustomCell> = Pick<
    AdditionalRenderer<T>,
    "isMatch" | "provideEditor" | "onPaste" | "draw"
>;

function inflate<T extends CustomCell>(input: CustomCellRenderer<T>): AdditionalRenderer<T> {
    return {
        ...input,
        kind: GridCellKind.Custom,
    };
}

export function useCustomCells(
    cells: readonly CustomCellRenderer<any>[]
): {
    additionalRenderers: NonNullable<DataEditorProps["additionalRenderers"]>;
} {
    return { additionalRenderers: React.useMemo(() => cells.map(inflate), [cells]) };
}
