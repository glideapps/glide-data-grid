import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, RowIDCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const rowIDCellRenderer: InternalCellRenderer<RowIDCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.RowID,
    needsHover: false,
    needsHoverPosition: false,
    renderPrep: a => prepTextCell(a, a.theme.textLight),
    render: a => drawTextCell(a, a.cell.data),
};
