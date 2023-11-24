/* eslint-disable react/display-name */
import * as React from "react";
import BubblesOverlayEditor from "../internal/data-grid-overlay-editor/private/bubbles-overlay-editor.js";
import { drawBubbles } from "../internal/data-grid/data-grid-lib.js";
import { GridCellKind, type BubbleCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";
import { makeAccessibilityStringForArray } from "../common/utils.js";

export const bubbleCellRenderer: InternalCellRenderer<BubbleCell> = {
    getAccessibilityString: c => makeAccessibilityStringForArray(c.data),
    kind: GridCellKind.Bubble,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    measure: (ctx, cell, t) =>
        cell.data.reduce((acc, data) => ctx.measureText(data).width + acc + 20, 0) + 2 * t.cellHorizontalPadding - 4,
    draw: a => drawBubbles(a, a.cell.data),
    provideEditor: () => p => {
        const { value } = p;
        return <BubblesOverlayEditor bubbles={value.data} />;
    },
    onPaste: () => undefined,
};
