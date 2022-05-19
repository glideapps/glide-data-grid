/* eslint-disable react/display-name */
import * as React from "react";
import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, NumberCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

const NumberOverlayEditor = React.lazy(
    async () => await import("../../data-grid-overlay-editor/private/number-overlay-editor")
);

export const numberCellRenderer: InternalCellRenderer<NumberCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Number,
    needsHover: false,
    needsHoverPosition: false,
    useLabel: true,
    renderPrep: prepTextCell,
    render: a => drawTextCell(a, a.cell.displayData, a.cell),
    measure: (ctx, cell) => ctx.measureText(cell.displayData).width + 16,
    onDelete: c => ({
        ...c,
        data: undefined,
    }),
    getEditor: () => p => {
        const { isHighlighted, onChange, onKeyDown, value } = p;
        return (
            <React.Suspense fallback={null}>
                <NumberOverlayEditor
                    highlight={isHighlighted}
                    disabled={value.readonly === true}
                    value={value.data}
                    onKeyDown={onKeyDown}
                    onChange={x =>
                        onChange({
                            ...value,
                            data: x.floatValue,
                        })
                    }
                />
            </React.Suspense>
        );
    },
};
