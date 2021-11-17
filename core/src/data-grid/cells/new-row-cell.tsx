import { drawNewRowCell } from "../data-grid-lib";
import { InnerGridCellKind, NewRowCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const newRowCellRenderer: InternalCellRenderer<NewRowCell> = {
    getAccessibilityString: () => "",
    kind: InnerGridCellKind.NewRow,
    needsHover: true,
    needsHoverPosition: false,
    render: a => drawNewRowCell(a, a.cell.hint, a.cell.isFirst),
};
