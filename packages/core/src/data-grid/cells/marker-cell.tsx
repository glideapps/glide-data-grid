import { deprepMarkerRowCell, drawMarkerRowCell, prepMarkerRowCell } from "../data-grid-lib";
import { InnerGridCellKind, MarkerCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const markerCellRenderer: InternalCellRenderer<MarkerCell> = {
    getAccessibilityString: c => c.row.toString(),
    kind: InnerGridCellKind.Marker,
    needsHover: true,
    needsHoverPosition: false,
    renderPrep: prepMarkerRowCell,
    renderDeprep: deprepMarkerRowCell,
    measure: () => 44,
    render: a => drawMarkerRowCell(a, a.cell.row, a.cell.checked, a.cell.markerKind, a.cell.drawHandle),
    onClick: (cell, x, y, bounds) => {
        const { width, height } = bounds;

        const centerX = cell.drawHandle ? 7 + (width - 7) / 2 : width / 2;
        const centerY = height / 2;

        if (Math.abs(x - centerX) <= 10 && Math.abs(y - centerY) <= 10) {
            return {
                ...cell,
                checked: !cell.checked,
            };
        }
        return undefined;
    },
};
