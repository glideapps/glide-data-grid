/* eslint-disable react/display-name */
import * as React from "react";
import { GrowingEntry } from "../internal/growing-entry/growing-entry.js";
import { drawTextCell, prepTextCell } from "../internal/data-grid/render/data-grid-lib.js";
import { GridCellKind, type TextCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";

export const textCellRenderer: InternalCellRenderer<TextCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Text,
    needsHover: false,
    needsHoverPosition: false,
    drawPrep: prepTextCell,
    useLabel: true,
    draw: a => (drawTextCell(a, a.cell.displayData, a.cell.contentAlign, a.cell.allowWrapping, a.hyperWrapping), true),
    measure: (ctx, cell, t) => {
        const lines = cell.displayData.split("\n", cell.allowWrapping === true ? undefined : 1);
        let maxLineWidth = 0;
        for (const line of lines) {
            maxLineWidth = Math.max(maxLineWidth, ctx.measureText(line).width);
        }
        return maxLineWidth + 2 * t.cellHorizontalPadding;
    },
    onDelete: c => ({
        ...c,
        data: "",
    }),
    provideEditor: cell => ({
        disablePadding: cell.allowWrapping === true,
        editor: p => {
            const { isHighlighted, onChange, value, validatedSelection } = p;
            return (
                <GrowingEntry
                    style={cell.allowWrapping === true ? { padding: "3px 8.5px" } : undefined}
                    highlight={isHighlighted}
                    autoFocus={value.readonly !== true}
                    disabled={value.readonly === true}
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
    }),
    onPaste: (toPaste, cell, details) =>
        toPaste === cell.data
            ? undefined
            : { ...cell, data: toPaste, displayData: details.formattedString ?? cell.displayData },
};
