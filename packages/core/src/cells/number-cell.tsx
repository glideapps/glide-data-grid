/* eslint-disable react/display-name */
import * as React from "react";
import { drawTextCell, prepTextCell } from "../internal/data-grid/render/data-grid-lib.js";
import { GridCellKind, type NumberCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";
import { drawEditHoverIndicator } from "../internal/data-grid/render/draw-edit-hover-indicator.js";

const NumberOverlayEditor = React.lazy(
    async () => await import("../internal/data-grid-overlay-editor/private/number-overlay-editor.js")
);

function parseToNumberOrBigInt(str: string): number | bigint | undefined {
    const trimmed = str.trim();
    if (trimmed === "") return undefined;

    // Check if it's a plain integer string.
    if (/^-?\d+$/.test(trimmed)) {
        try {
            const big = BigInt(trimmed);
            if (big >= BigInt(Number.MIN_SAFE_INTEGER) && big <= BigInt(Number.MAX_SAFE_INTEGER)) {
                return Number(big);
            }
            return big;
        } catch {
            return undefined;
        }
    }

    // Otherwise, try to parse as a float.
    const num = Number.parseFloat(trimmed);
    return Number.isNaN(num) ? undefined : num;
}

export const numberCellRenderer: InternalCellRenderer<NumberCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Number,
    needsHover: cell => cell.hoverEffect === true,
    needsHoverPosition: false,
    useLabel: true,
    drawPrep: prepTextCell,
    draw: a => {
        const { hoverAmount, cell, ctx, theme, rect, overrideCursor } = a;
        const { hoverEffect, displayData, hoverEffectTheme } = cell;

        if (hoverEffect === true && hoverAmount > 0) {
            drawEditHoverIndicator(ctx, theme, hoverEffectTheme, displayData, rect, hoverAmount, overrideCursor);
        }
        drawTextCell(a, a.cell.displayData, a.cell.contentAlign);
    },
    measure: (ctx, cell, theme) => ctx.measureText(cell.displayData).width + theme.cellHorizontalPadding * 2,
    onDelete: c => ({
        ...c,
        data: undefined,
    }),
    provideEditor: () => p => {
        const { isHighlighted, onChange, value, validatedSelection } = p;
        return (
            <React.Suspense fallback={null}>
                <NumberOverlayEditor
                    highlight={isHighlighted}
                    disabled={value.readonly === true}
                    value={
                        typeof value.data === "bigint"
                            ? value.data <= BigInt(Number.MAX_SAFE_INTEGER) &&
                              value.data >= BigInt(Number.MIN_SAFE_INTEGER)
                                ? Number(value.data)
                                : undefined
                            : value.data
                    }
                    fixedDecimals={value.fixedDecimals}
                    allowNegative={value.allowNegative}
                    thousandSeparator={value.thousandSeparator}
                    decimalSeparator={value.decimalSeparator}
                    validatedSelection={validatedSelection}
                    onChange={x => {
                        const newNumber = parseToNumberOrBigInt(x.value);
                        onChange({
                            ...value,
                            data: newNumber,
                        });
                    }}
                />
            </React.Suspense>
        );
    },
    onPaste: (toPaste, cell, details) => {
        let newNumber: number | bigint | undefined;

        if (typeof details.rawValue === "number" || typeof details.rawValue === "bigint") {
            newNumber = details.rawValue;
        } else {
            const strVal = typeof details.rawValue === "string" ? details.rawValue : toPaste;
            newNumber = parseToNumberOrBigInt(strVal);
        }

        if (
            newNumber === undefined ||
            (typeof newNumber === "number" && Number.isNaN(newNumber)) ||
            cell.data === newNumber
        )
            return undefined;
        return { ...cell, data: newNumber, displayData: details.formattedString ?? cell.displayData };
    },
};
