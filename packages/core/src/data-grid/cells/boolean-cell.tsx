import { drawBoolean } from "../data-grid-lib";
import { GridCellKind, BooleanCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const booleanCellRenderer: InternalCellRenderer<BooleanCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "false",
    kind: GridCellKind.Boolean,
    needsHover: true,
    useLabel: false,
    needsHoverPosition: true,
    measure: () => 50,
    render: a => drawBoolean(a, a.cell.data, a.cell.allowEdit),
    onDelete: c => ({
        ...c,
        data: false,
    }),
    onClick: (cell, x, y, bounds) => {
        if (cell.allowEdit && Math.abs(x - bounds.width / 2) <= 10 && Math.abs(y - bounds.height / 2) <= 10) {
            return {
                ...cell,
                data: !cell.data,
            };
        }
        return undefined;
    },
};
