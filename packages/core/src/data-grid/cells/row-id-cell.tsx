import React from "react";
import { GrowingEntry } from "../../growing-entry/growing-entry";
import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, type RowIDCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const rowIDCellRenderer: InternalCellRenderer<RowIDCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.RowID,
    needsHover: false,
    needsHoverPosition: false,
    drawPrep: (a, b) => prepTextCell(a, b, a.theme.textLight),
    draw: a => drawTextCell(a, a.cell.data, a.cell.contentAlign),
    measure: (ctx, cell) => ctx.measureText(cell.data).width + 16,
    // eslint-disable-next-line react/display-name
    provideEditor: () => p => {
        const { isHighlighted, onChange, value, validatedSelection } = p;
        return (
            <GrowingEntry
                highlight={isHighlighted}
                autoFocus={value.readonly !== true}
                disabled={value.readonly !== false}
                value={value.data}
                validatedSelection={validatedSelection}
                onChange={e =>
                    onChange({
                        ...value,
                        data: e.target.value,
                    })
                }
            />
        );
    },
    onPaste: () => undefined,
};
