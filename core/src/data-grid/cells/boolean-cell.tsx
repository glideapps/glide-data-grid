import { drawBoolean } from "../data-grid-lib";
import { GridCellKind, BooleanCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const booleanCellRenderer: InternalCellRenderer<BooleanCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "false",
    kind: GridCellKind.Boolean,
    needsHover: true,
    needsHoverPosition: true,
    render: (ctx, theme, _col, _row, cell, x, y, w, h, highlighted, hoverAmount, hoverX, hoverY) =>
        drawBoolean(ctx, theme, cell.data, x, y, w, h, hoverAmount, highlighted, cell.allowEdit, hoverX, hoverY),
    onDelete: c => ({
        ...c,
        data: false,
    }),
    onClick: (cell, x, y, bounds) => {
        if (Math.abs(x - bounds.width / 2) <= 10 && Math.abs(y - bounds.height / 2) <= 10) {
            return {
                ...cell,
                data: !cell.data,
            };
        }
        return undefined;
    },
};
