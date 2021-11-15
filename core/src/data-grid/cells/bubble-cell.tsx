/* eslint-disable react/display-name */
import * as React from "react";
import BubblesOverlayEditor from "../../data-grid-overlay-editor/private/bubbles-overlay-editor";
import { drawBubbles } from "../data-grid-lib";
import { GridCellKind, BubbleCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const bubbleCellRenderer: InternalCellRenderer<BubbleCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Bubble,
    needsHover: false,
    needsHoverPosition: false,
    render: (ctx, theme, _col, _row, cell, x, y, w, h, highlighted, hoverAmount) =>
        drawBubbles(ctx, theme, cell.data, x, y, w, h, hoverAmount, highlighted),
    getEditor: () => p => {
        const { onKeyDown, value } = p;
        return <BubblesOverlayEditor bubbles={value.data} onKeyDown={onKeyDown} />;
    },
};
