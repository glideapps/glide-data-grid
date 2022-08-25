/* eslint-disable react/display-name */
import * as React from "react";
import GrowingEntry from "../../growing-entry/growing-entry";
import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, TextCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const textCellRenderer: InternalCellRenderer<TextCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Text,
    needsHover: false,
    needsHoverPosition: false,
    drawPrep: prepTextCell,
    useLabel: true,
    draw: a => drawTextCell(a, a.cell.displayData, a.cell.contentAlign, a.cell.allowWrapping, a.hyperWrapping),
    measure: (ctx, cell, t) => {
        const lines = cell.displayData.split("\n").slice(0, cell.allowWrapping === true ? undefined : 1);
        return Math.max(...lines.map(l => ctx.measureText(l).width + 2 * t.cellHorizontalPadding));
    },
    onDelete: c => ({
        ...c,
        data: "",
    }),
    provideEditor: () => p => {
        const { isHighlighted, onChange, onKeyDown, value, validatedSelection } = p;
        return (
            <GrowingEntry
                highlight={isHighlighted}
                autoFocus={value.readonly !== true}
                disabled={value.readonly === true}
                onKeyDown={onKeyDown}
                altNewline={true}
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
    onPaste: (toPaste, cell) => (toPaste === cell.data ? undefined : { ...cell, data: toPaste }),
};
