import { drawProtectedCell } from "../data-grid-lib";
import { GridCellKind, ProtectedCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const protectedCellRenderer: InternalCellRenderer<ProtectedCell> = {
    getAccessibilityString: () => "",
    measure: () => 108,
    kind: GridCellKind.Protected,
    needsHover: false,
    needsHoverPosition: false,
    render: drawProtectedCell,
};
