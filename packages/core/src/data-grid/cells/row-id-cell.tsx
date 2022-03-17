import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, RowIDCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const rowIDCellRenderer: InternalCellRenderer<RowIDCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.RowID,
    needsHover: false,
    needsHoverPosition: false,
    renderPrep: (a, b) => prepTextCell(a, b, a.theme.textLight),
    render: a => drawTextCell(a, a.cell.data),
    measure: (ctx, cell) => ctx.measureText(cell.data).width + 16,
};
