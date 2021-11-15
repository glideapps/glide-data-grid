/* eslint-disable react/display-name */
import * as React from "react";
import DrilldownOverlayEditor from "../../data-grid-overlay-editor/private/drilldown-overlay-editor";
import { drawDrilldownCell } from "../data-grid-lib";
import { GridCellKind, DrilldownCell } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";

export const drilldownCellRenderer: InternalCellRenderer<DrilldownCell> = {
    getAccessibilityString: c => c.data.map(d => d.text).join(", "),
    kind: GridCellKind.Drilldown,
    needsHover: false,
    needsHoverPosition: false,
    render: (ctx, theme, col, row, cell, x, y, w, h, _highlighted, hoverAmount, _hoverX, _hoverY, imageLoader) =>
        drawDrilldownCell(ctx, theme, cell.data, col, row, x, y, w, h, hoverAmount, imageLoader),
    getEditor: () => p => {
        const { onKeyDown, value } = p;
        return <DrilldownOverlayEditor drilldowns={value.data} onKeyDown={onKeyDown} />;
    },
};
