import { assertNever } from "../../common/support";
import { drawBoolean } from "../data-grid-lib";
import { GridCellKind, BooleanCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

/**
 * Checkbox behavior:
 *
 * true + click -> unchecked
 * false + click -> checked
 * indeterminate + click -> checked
 * empty + click -> empty
 */
export function toggleBoolean(data: boolean | null | undefined): boolean | null | undefined {
    switch (data) {
        case true:
            return false;
        case false:
            return true;
        case undefined:
            return true;
        case null:
            return null;
        default:
            assertNever(data);
    }
}

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
        if (
            cell.allowEdit &&
            cell.data !== null &&
            Math.abs(x - bounds.width / 2) <= 10 &&
            Math.abs(y - bounds.height / 2) <= 10
        ) {
            return {
                ...cell,
                data: toggleBoolean(cell.data),
            };
        }
        return undefined;
    },
};
