import { drawProtectedCell, drawWithLastUpdate } from "../data-grid-lib";
import { GridCellKind, ProtectedCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const protectedCellRenderer: InternalCellRenderer<ProtectedCell> = {
    getAccessibilityString: () => "",
    kind: GridCellKind.Protected,
    needsHover: false,
    needsHoverPosition: false,
    render: (ctx, theme, _col, _row, cell, x, y, w, h, highlighted, hoverAmount) =>
        drawWithLastUpdate(ctx, cell.lastUpdated, theme, x, y, w, h, () =>
            drawProtectedCell(ctx, theme, x, y, w, h, hoverAmount, !highlighted)
        ),
};
