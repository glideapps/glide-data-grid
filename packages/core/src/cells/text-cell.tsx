/* eslint-disable react/display-name */
import * as React from "react";
import { GrowingEntry } from "../internal/growing-entry/growing-entry.js";
import {
    drawTextCell,
    measureTextCached,
    prepTextCell,
    roundedRect,
} from "../internal/data-grid/render/data-grid-lib.js";
import { GridCellKind, type TextCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";
import { withAlpha } from "../index.js";

export const textCellRenderer: InternalCellRenderer<TextCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Text,
    needsHover: textCell => textCell.hoverEffect === true,
    needsHoverPosition: false,
    drawPrep: prepTextCell,
    useLabel: true,
    draw: a => {
        const { cell, hoverAmount, hyperWrapping, ctx, rect, theme, overrideCursor } = a;
        const { displayData, contentAlign, hoverEffect, allowWrapping } = cell;
        if (hoverEffect === true && hoverAmount > 0) {
            ctx.textBaseline = "alphabetic";
            const padX = theme.cellHorizontalPadding;
            const padY = theme.cellVerticalPadding;
            const m = measureTextCached(displayData, ctx, theme.baseFontFull, "alphabetic");
            const maxH = rect.height - padY;
            const h = Math.min(maxH, m.actualBoundingBoxAscent * 2.5);
            ctx.beginPath();
            roundedRect(
                ctx,
                rect.x + padX / 2,
                rect.y + (rect.height - h) / 2 + 1,
                m.width + padX * 3,
                h - 1,
                theme.roundingRadius ?? 4
            );
            ctx.globalAlpha = hoverAmount;
            ctx.fillStyle = withAlpha(theme.textDark, 0.1);
            ctx.fill();

            // restore
            ctx.globalAlpha = 1;
            ctx.fillStyle = theme.textDark;
            ctx.textBaseline = "middle";

            overrideCursor?.("text");
        }
        drawTextCell(a, displayData, contentAlign, allowWrapping, hyperWrapping);
    },
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
