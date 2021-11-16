import { drawMarkerRowCell, drawWithLastUpdate } from "../data-grid-lib";
import { InnerGridCellKind, MarkerCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const markerCellRenderer: InternalCellRenderer<MarkerCell> = {
    getAccessibilityString: c => c.row.toString(),
    kind: InnerGridCellKind.Marker,
    needsHover: true,
    needsHoverPosition: false,
    render: (ctx, theme, _col, _row, cell, x, y, w, h, _highlighted, hoverAmount) =>
        drawWithLastUpdate(ctx, cell.lastUpdated, theme, x, y, w, h, () =>
            drawMarkerRowCell(ctx, theme, cell.row, cell.checked, cell.markerKind, x, y, w, h, hoverAmount)
        ),
};
