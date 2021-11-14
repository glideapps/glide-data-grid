import { GridCellKind, InnerGridCell, InnerGridCellKind } from "../data-grid-types";
import { InternalCellRenderer } from "./cell-types";
import { numberCellRenderer } from "./number-cell";

type CellRenderersType<T extends InnerGridCell> = Record<T["kind"], InternalCellRenderer<T>>;
export const CellRenderers: CellRenderersType<InnerGridCell> = {
    [InnerGridCellKind.NewRow]: {
        kind: InnerGridCellKind.NewRow,
        getAccessibilityString: () => "",
        needsHover: true,
        needsHoverPosition: false,
        render: () => void,
    },
    [GridCellKind.Number]: numberCellRenderer,
};