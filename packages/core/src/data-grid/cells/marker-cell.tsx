import { drawMarkerRowCell, prepMarkerRowCell } from "../data-grid-lib";
import { InnerGridCellKind, MarkerCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const markerCellRenderer: InternalCellRenderer<MarkerCell> = {
    getAccessibilityString: c => c.row.toString(),
    kind: InnerGridCellKind.Marker,
    needsHover: true,
    needsHoverPosition: false,
    renderPrep: prepMarkerRowCell,
    measure: () => 44,
    render: a => drawMarkerRowCell(a, a.cell.row, a.cell.checked, a.cell.markerKind),
};
