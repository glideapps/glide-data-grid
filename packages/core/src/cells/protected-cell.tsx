import { drawProtectedCell } from "../internal/data-grid/data-grid-lib.js";
import { GridCellKind, type ProtectedCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";

export const protectedCellRenderer: InternalCellRenderer<ProtectedCell> = {
    getAccessibilityString: () => "",
    measure: () => 108,
    kind: GridCellKind.Protected,
    needsHover: false,
    needsHoverPosition: false,
    draw: drawProtectedCell,
    onPaste: () => undefined,
};
