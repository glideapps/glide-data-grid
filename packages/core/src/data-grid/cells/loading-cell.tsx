import { GridCellKind, LoadingCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const loadingCellRenderer: InternalCellRenderer<LoadingCell> = {
    getAccessibilityString: () => "",
    kind: GridCellKind.Loading,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    render: () => undefined,
};
