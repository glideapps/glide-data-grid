import React from "react";
import { GrowingEntry } from "../internal/growing-entry/growing-entry.js";
import { drawTextCell, prepTextCell, measureTextCached } from "../internal/data-grid/render/data-grid-lib.js";
import { GridCellKind } from "../internal/data-grid/data-grid-types.js";
export const rowIDCellRenderer = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.RowID,
    needsHover: false,
    needsHoverPosition: false,
    drawPrep: (a, b) => prepTextCell(a, b, a.theme.textLight),
    draw: a => drawTextCell(a, a.cell.data, a.cell.contentAlign),
    measure: (ctx, cell, theme) => measureTextCached(cell.data, ctx, theme.baseFontFull).width + theme.cellHorizontalPadding * 2,
    // eslint-disable-next-line react/display-name
    provideEditor: () => p => {
        const { isHighlighted, onChange, value, validatedSelection } = p;
        return (React.createElement(GrowingEntry, { highlight: isHighlighted, autoFocus: value.readonly !== true, disabled: value.readonly !== false, value: value.data, validatedSelection: validatedSelection, onChange: e => onChange({
                ...value,
                data: e.target.value,
            }) }));
    },
    onPaste: () => undefined,
};
//# sourceMappingURL=row-id-cell.js.map