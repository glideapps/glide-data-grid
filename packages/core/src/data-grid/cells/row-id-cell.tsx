import React from "react";
import GrowingEntry from "../../growing-entry/growing-entry";
import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, RowIDCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const rowIDCellRenderer: InternalCellRenderer<RowIDCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.RowID,
    needsHover: false,
    needsHoverPosition: false,
    renderPrep: (a, b) => prepTextCell(a, b, a.theme.textLight),
    render: a => drawTextCell(a, a.cell.data, a.cell.contentAlign),
    measure: (ctx, cell) => ctx.measureText(cell.data).width + 16,
    // eslint-disable-next-line react/display-name
    getEditor: () => p => {
        const { isHighlighted, onChange, onKeyDown, value } = p;
        return (
            <GrowingEntry
                highlight={isHighlighted}
                autoFocus={value.readonly !== true}
                disabled={value.readonly !== false}
                onKeyDown={onKeyDown}
                value={value.data}
                onChange={e =>
                    onChange({
                        ...value,
                        data: e.target.value,
                    })
                }
            />
        );
    },
};
