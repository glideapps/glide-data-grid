import { drawNewRowCell } from "../internal/data-grid/data-grid-lib.js";
import { InnerGridCellKind, type NewRowCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";

export const newRowCellRenderer: InternalCellRenderer<NewRowCell> = {
    getAccessibilityString: () => "",
    kind: InnerGridCellKind.NewRow,
    needsHover: true,
    needsHoverPosition: false,
    measure: () => 200,
    draw: a => drawNewRowCell(a, a.cell.hint, a.cell.icon),
    onPaste: () => undefined,
};
