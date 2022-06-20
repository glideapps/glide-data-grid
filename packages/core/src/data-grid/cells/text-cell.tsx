/* eslint-disable react/display-name */
import * as React from "react";
import GrowingEntry from "../../growing-entry/growing-entry";
import { drawTextCell, prepTextCell } from "../data-grid-lib";
import { GridCellKind, TextCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const textCellRenderer: InternalCellRenderer<TextCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Text,
    needsHover: false,
    needsHoverPosition: false,
    renderPrep: prepTextCell,
    useLabel: true,
    render: a => drawTextCell(a, a.cell.displayData, a.cell.contentAlign, a.cell.allowWrapping, a.hyperWrapping),
    measure: (ctx, cell) => ctx.measureText(cell.displayData).width + 16,
    onDelete: c => ({
        ...c,
        data: "",
    }),
    getEditor: () => p => {
        const { isHighlighted, onChange, onKeyDown, value, isValid } = p;
        return (
            <GrowingEntry
                highlight={isHighlighted}
                autoFocus={value.readonly !== true}
                disabled={value.readonly === true}
                onKeyDown={onKeyDown}
                altNewline={true}
                value={value.data}
                isValid={isValid}
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
