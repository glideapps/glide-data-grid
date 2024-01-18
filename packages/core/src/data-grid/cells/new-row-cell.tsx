import { drawNewRowCell } from "../data-grid-lib";
import { InnerGridCellKind, NewRowCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const newRowCellRenderer: InternalCellRenderer<NewRowCell> = {
  getAccessibilityString: (cell) => cell.hint,
  kind: InnerGridCellKind.NewRow,
  needsHover: true,
  needsHoverPosition: false,
  measure: () => 200,
  draw: (args) => {
    return drawNewRowCell(args, args.cell.hint, args.cell.icon);
  },
  onPaste: () => undefined,
  onKeyDown: ({ appendRow, cell, location, key }) => {
    if (
      key === 'Enter' &&
      location.col !== undefined &&
      location.row !== undefined &&
      cell.groupId !== undefined &&
      appendRow !== undefined
    ) {
      appendRow();
    }
  },
};
