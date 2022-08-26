import { GridCellKind, InnerGridCellKind } from "../data-grid-types";
import { booleanCellRenderer } from "./boolean-cell";
import { bubbleCellRenderer } from "./bubble-cell";
import { drilldownCellRenderer } from "./drilldown-cell";
import { imageCellRenderer } from "./image-cell";
import { loadingCellRenderer } from "./loading-cell";
import { markdownCellRenderer } from "./markdown-cell";
import { markerCellRenderer } from "./marker-cell";
import { newRowCellRenderer } from "./new-row-cell";
import { numberCellRenderer } from "./number-cell";
import { protectedCellRenderer } from "./protected-cell";
import { rowIDCellRenderer } from "./row-id-cell";
import { textCellRenderer } from "./text-cell";
import { uriCellRenderer } from "./uri-cell";

// we are giving up type safety here but I cant figure out right now how to do this right.
// const asCollapsed = (x: any) => x as InternalCellRenderer<InnerGridCell>;

// type RendererKinds = InnerGridCellKind | Exclude<GridCellKind, GridCellKind.Custom>;

export const CellRenderers = {
    [InnerGridCellKind.Marker]: markerCellRenderer,
    [InnerGridCellKind.NewRow]: newRowCellRenderer,
    [GridCellKind.Boolean]: booleanCellRenderer,
    [GridCellKind.Bubble]: bubbleCellRenderer,
    [GridCellKind.Drilldown]: drilldownCellRenderer,
    [GridCellKind.Image]: imageCellRenderer,
    [GridCellKind.Loading]: loadingCellRenderer,
    [GridCellKind.Markdown]: markdownCellRenderer,
    [GridCellKind.Number]: numberCellRenderer,
    [GridCellKind.Protected]: protectedCellRenderer,
    [GridCellKind.RowID]: rowIDCellRenderer,
    [GridCellKind.Text]: textCellRenderer,
    [GridCellKind.Uri]: uriCellRenderer,
};
