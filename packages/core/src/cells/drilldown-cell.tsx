/* eslint-disable react/display-name */
import * as React from "react";
import DrilldownOverlayEditor from "../internal/data-grid-overlay-editor/private/drilldown-overlay-editor.js";
import { drawDrilldownCell } from "../internal/data-grid/data-grid-lib.js";
import { GridCellKind, type DrilldownCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";
import { makeAccessibilityStringForArray } from "../common/utils.js";

export const drilldownCellRenderer: InternalCellRenderer<DrilldownCell> = {
    getAccessibilityString: c => makeAccessibilityStringForArray(c.data.map(d => d.text)),
    kind: GridCellKind.Drilldown,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    measure: (ctx, cell, t) =>
        cell.data.reduce(
            (acc, data) => ctx.measureText(data.text).width + acc + 20 + (data.img !== undefined ? 18 : 0),
            0
        ) +
        2 * t.cellHorizontalPadding -
        4,
    draw: a => drawDrilldownCell(a, a.cell.data),
    provideEditor: () => p => {
        const { value } = p;
        return <DrilldownOverlayEditor drilldowns={value.data} />;
    },
    onPaste: () => undefined,
};
