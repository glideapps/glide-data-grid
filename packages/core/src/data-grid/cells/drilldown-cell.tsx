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
    render: a => drawDrilldownCell(a, a.cell.data),
    getEditor: () => p => {
        const { onKeyDown, value } = p;
        return <DrilldownOverlayEditor drilldowns={value.data} onKeyDown={onKeyDown} />;
    },
};
