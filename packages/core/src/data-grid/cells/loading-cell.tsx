import { GridCellKind, LoadingCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

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
