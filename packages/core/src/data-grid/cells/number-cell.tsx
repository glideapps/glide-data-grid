/* eslint-disable react/display-name */
import * as React from "react";
import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, NumberCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

const NumberOverlayEditor = React.lazy(
    async () => await import("../../data-grid-overlay-editor/private/number-overlay-editor")
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
        const { isHighlighted, onChange, onKeyDown, value, validatedSelection } = p;
        return (
            <React.Suspense fallback={null}>
                <NumberOverlayEditor
                    highlight={isHighlighted}
                    disabled={value.readonly === true}
                    value={value.data}
                    onKeyDown={onKeyDown}
                    validatedSelection={validatedSelection}
                    onChange={x =>
                        onChange({
                            ...value,
                            data: Number.isNaN(x.floatValue ?? 0) ? 0 : x.floatValue,
                        })
                    }
                />
            </React.Suspense>
        );
    },
};
