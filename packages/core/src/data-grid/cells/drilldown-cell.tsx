/* eslint-disable react/display-name */
import * as React from "react";
import DrilldownOverlayEditor from "../../data-grid-overlay-editor/private/drilldown-overlay-editor";
import { drawDrilldownCell } from "../data-grid-lib";
import { GridCellKind, DrilldownCell } from "../data-grid-types";
import type { InternalCellRenderer } from "./cell-types";

export const drilldownCellRenderer: InternalCellRenderer<DrilldownCell> = {
    getAccessibilityString: c => c.data.map(d => d.text).join(", "),
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
