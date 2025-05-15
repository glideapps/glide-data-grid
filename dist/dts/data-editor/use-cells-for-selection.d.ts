import type { DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";
import { type CellArray } from "../internal/data-grid/data-grid-types.js";
import type { DataEditorProps } from "./data-editor.js";
type CellsForSelectionCallback = NonNullable<DataGridSearchProps["getCellsForSelection"]>;
export declare function useCellsForSelection(getCellsForSelectionIn: CellsForSelectionCallback | true | undefined, getCellContent: DataEditorProps["getCellContent"], rowMarkerOffset: number, abortController: AbortController, rows: number): readonly [((selection: import("../internal/data-grid/data-grid-types.js").Rectangle, abortSignal: AbortSignal) => CellArray | import("../internal/data-grid/data-grid-types.js").GetCellsThunk) | undefined, ((selection: import("../internal/data-grid/data-grid-types.js").Rectangle, abortSignal: AbortSignal) => CellArray | import("../internal/data-grid/data-grid-types.js").GetCellsThunk) | undefined];
export {};
//# sourceMappingURL=use-cells-for-selection.d.ts.map