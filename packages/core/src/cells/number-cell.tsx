/* eslint-disable react/display-name */
import * as React from "react";
import { drawTextCell, prepTextCell } from "../internal/data-grid/data-grid-lib.js";
import { GridCellKind, type NumberCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";

const NumberOverlayEditor = React.lazy(
    async () => await import("../internal/data-grid-overlay-editor/private/number-overlay-editor.js")
);

export const numberCellRenderer: InternalCellRenderer<NumberCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Number,
    needsHover: false,
    needsHoverPosition: false,
    useLabel: true,
    drawPrep: prepTextCell,
    draw: a => drawTextCell(a, a.cell.displayData, a.cell.contentAlign),
    measure: (ctx, cell) => ctx.measureText(cell.displayData).width + 16,
    onDelete: c => ({
        ...c,
        data: undefined,
    }),
    provideEditor: () => p => {
        const { isHighlighted, onChange, value, validatedSelection } = p;
        const isBigInt = typeof value.data === "bigint";

        return (
            <React.Suspense fallback={null}>
                <NumberOverlayEditor
                    highlight={isHighlighted}
                    disabled={value.readonly === true}
                    value={value.data}
                    fixedDecimals={isBigInt ? 0 : value.fixedDecimals}
                    allowNegative={value.allowNegative}
                    thousandSeparator={value.thousandSeparator}
                    decimalSeparator={value.decimalSeparator}
                    validatedSelection={validatedSelection}
                    onChange={x =>
                        onChange({
                            ...value,
                            data: isBigInt ? BigInt(x.value ?? 0) : Number.isNaN(x.floatValue ?? 0) ? 0 : x.floatValue,
                        })
                    }
                />
            </React.Suspense>
        );
    },
    onPaste: (toPaste, cell, details) => {
        const isBigInt = typeof cell.data === "bigint";

        try {
            const newNumber = isBigInt
                ? BigInt(typeof details.rawValue === "string" ? details.rawValue : toPaste)
                : typeof details.rawValue === "number"
                ? details.rawValue
                : Number.parseFloat(typeof details.rawValue === "string" ? details.rawValue : toPaste);
            if (Number.isNaN(newNumber) || cell.data === newNumber) return undefined;
            return { ...cell, data: newNumber, displayData: details.formattedString ?? cell.displayData };
        } catch {
            return undefined;
        }
    },
};
