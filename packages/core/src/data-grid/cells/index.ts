import type { InnerGridCell } from "../data-grid-types";
import { booleanCellRenderer } from "./boolean-cell";
import { bubbleCellRenderer } from "./bubble-cell";
import type { InternalCellRenderer } from "./cell-types";
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

export const CellRenderers = [
    markerCellRenderer,
    newRowCellRenderer,
    booleanCellRenderer,
    bubbleCellRenderer,
    drilldownCellRenderer,
    imageCellRenderer,
    loadingCellRenderer,
    markdownCellRenderer,
    numberCellRenderer,
    protectedCellRenderer,
    rowIDCellRenderer,
    textCellRenderer,
    uriCellRenderer,
] as InternalCellRenderer<InnerGridCell>[];
