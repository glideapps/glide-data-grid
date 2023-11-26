import { drawNewRowCell } from "../data-grid-lib";
import { InnerGridCellKind, type NewRowCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const newRowCellRenderer: InternalCellRenderer<NewRowCell> = {
    getAccessibilityString: () => "",
    kind: InnerGridCellKind.NewRow,
    needsHover: true,
    needsHoverPosition: false,
    measure: () => 200,
    draw: a => drawNewRowCell(a, a.cell.hint, a.cell.icon),
    onPaste: () => undefined,
};
