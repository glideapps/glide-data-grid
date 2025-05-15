import * as React from "react";
import { type CellArray, type GetCellsThunk, type Item, type Rectangle } from "../data-grid/data-grid-types.js";
import { type ScrollingDataGridProps } from "../scrolling-data-grid/scrolling-data-grid.js";
export interface DataGridSearchProps extends Omit<ScrollingDataGridProps, "prelightCells"> {
    readonly getCellsForSelection?: (selection: Rectangle, abortSignal: AbortSignal) => GetCellsThunk | CellArray;
    /**
     * The search results to display. If not provided glide will use its own internal search provider.
     */
    readonly searchResults?: readonly Item[];
    /**
     * Emitted whenever the search results for the current search field changes.
     * @param results The new search results
     * @param navIndex  The currents selected search result
     */
    readonly onSearchResultsChanged?: (results: readonly Item[], navIndex: number) => void;
    /**
     * Controls the visibility of the search overlay.
     * @group Search
     */
    readonly showSearch?: boolean;
    /**
     * Emitted when the search window close event is triggered.
     * @group Search
     */
    readonly onSearchClose?: () => void;
    /**
     * The current search value.
     * @group Search
     */
    readonly searchValue?: string;
    /**
     * Emitted when the search value changes.
     * @group Search
     * @param newVal The new search value
     */
    readonly onSearchValueChange?: (newVal: string) => void;
    readonly searchInputRef: React.MutableRefObject<HTMLInputElement | null>;
}
declare const DataGridSearch: React.FunctionComponent<DataGridSearchProps>;
export default DataGridSearch;
//# sourceMappingURL=data-grid-search.d.ts.map