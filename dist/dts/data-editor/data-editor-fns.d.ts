import type { DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";
import { type GridCell, type GridSelection } from "../internal/data-grid/data-grid-types.js";
import { type CopyBuffer } from "./copy-paste.js";
export declare function expandSelection(newVal: GridSelection, getCellsForSelection: DataGridSearchProps["getCellsForSelection"], rowMarkerOffset: number, spanRangeBehavior: "allowPartial" | "default", abortController: AbortController): GridSelection;
export declare function unquote(str: string): CopyBuffer;
export declare function copyToClipboard(cells: readonly (readonly GridCell[])[], columnIndexes: readonly number[], e?: ClipboardEvent): void;
/**
 * Checkbox behavior:
 *
 * true + click -> unchecked
 * false + click -> checked
 * indeterminate + click -> checked
 * empty + click -> checked
 */
export declare function toggleBoolean(data: boolean | null | undefined): boolean | null | undefined;
//# sourceMappingURL=data-editor-fns.d.ts.map