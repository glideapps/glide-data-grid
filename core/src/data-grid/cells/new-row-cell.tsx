import { drawNewRowCell } from "../data-grid-lib";
import { InnerGridCellKind, NewRowCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const newRowCellRenderer: InternalCellRenderer<NewRowCell> = {
    getAccessibilityString: () => "",
    kind: InnerGridCellKind.NewRow,
    needsHover: true,
    needsHoverPosition: false,
    render: (ctx, theme, _col, _row, cell, x, y, w, h, _highlighted, hoverAmount) =>
        drawNewRowCell(ctx, theme, cell.hint, cell.isFirst, x, y, w, h, hoverAmount),
};
