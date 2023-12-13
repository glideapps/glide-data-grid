import { GridCellKind, type LoadingCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";

export const loadingCellRenderer: InternalCellRenderer<LoadingCell> = {
    getAccessibilityString: () => "",
    kind: GridCellKind.Loading,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    measure: () => 120,
    draw: () => undefined,
    onPaste: () => undefined,
};
