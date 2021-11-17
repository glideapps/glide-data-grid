/* eslint-disable react/display-name */
import * as React from "react";
import NumberOverlayEditor from "../../data-grid-overlay-editor/private/number-overlay-editor";
import { drawTextCell } from "../data-grid-lib";
import { GridCellKind, NumberCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const numberCellRenderer: InternalCellRenderer<NumberCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Number,
    needsHover: false,
    needsHoverPosition: false,
    render: a => drawTextCell(a, a.cell.displayData),
    onDelete: c => ({
        ...c,
        data: undefined,
    }),
    getEditor: () => p => {
        const { isHighlighted, onChange, onKeyDown, value } = p;
        return (
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
        );
    },
};
