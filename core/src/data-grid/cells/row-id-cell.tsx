import { drawTextCell } from "../data-grid-lib";
import { GridCellKind, RowIDCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const rowIDCellRenderer: InternalCellRenderer<RowIDCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.RowID,
    needsHover: false,
    needsHoverPosition: false,
    render: (ctx, theme, _col, _row, cell, x, y, w, h, _highlighted, hoverAmount) =>
        drawTextCell(ctx, theme, cell.data, x, y, w, h, hoverAmount, theme.textLight),
};
