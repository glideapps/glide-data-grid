import type { GetCellRendererCallback } from "../../cells/cell-types.js";
import type { Theme } from "../../index.js";
import type { HoverValues } from "./animation-manager.js";
import type { MappedGridColumn } from "./data-grid-lib.js";
import type { GroupDetailsCallback, GetRowThemeCallback, Highlight, BlitData } from "./data-grid-render.js";
import type { SpriteManager } from "./data-grid-sprites.js";
import type {
    CompactSelection,
    GridSelection,
    TrailingRowType,
    Item,
    InnerGridCell,
    DrawCustomCellCallback,
    DrawHeaderCallback,
    CellList,
    ImageWindowLoader,
} from "./data-grid-types.js";

export type HoverInfo = readonly [Item, Item];

export interface DragAndDropState {
    src: number;
    dest: number;
}

export interface DrawGridArg {
    readonly canvas: HTMLCanvasElement;
    readonly headerCanvas: HTMLCanvasElement;
    readonly bufferA: HTMLCanvasElement;
    readonly bufferB: HTMLCanvasElement;
    readonly width: number;
    readonly height: number;
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly translateY: number;
    readonly mappedColumns: readonly MappedGridColumn[];
    readonly enableGroups: boolean;
    readonly freezeColumns: number;
    readonly dragAndDropState: DragAndDropState | undefined;
    readonly theme: Theme;
    readonly headerHeight: number;
    readonly groupHeaderHeight: number;
    readonly disabledRows: CompactSelection;
    readonly rowHeight: number | ((index: number) => number);
    readonly verticalBorder: (col: number) => boolean;
    readonly isResizing: boolean;
    readonly resizeCol: number | undefined;
    readonly isFocused: boolean;
    readonly drawFocus: boolean;
    readonly selection: GridSelection;
    readonly fillHandle: boolean;
    readonly fillHandleLocation: "selected-cell" | "selected-range";
    readonly lastRowSticky: TrailingRowType;
    readonly hyperWrapping: boolean;
    readonly rows: number;
    readonly getCellContent: (cell: Item) => InnerGridCell;
    readonly getGroupDetails: GroupDetailsCallback;
    readonly getRowThemeOverride: GetRowThemeCallback | undefined;
    readonly drawCustomCell: DrawCustomCellCallback | undefined;
    readonly drawHeaderCallback: DrawHeaderCallback | undefined;
    readonly prelightCells: CellList | undefined;
    readonly highlightRegions: readonly Highlight[] | undefined;
    readonly imageLoader: ImageWindowLoader;
    readonly lastBlitData: React.MutableRefObject<BlitData | undefined>;
    readonly damage: CellList | undefined;
    readonly hoverValues: HoverValues;
    readonly hoverInfo: HoverInfo | undefined;
    readonly spriteManager: SpriteManager;
    readonly scrolling: boolean;
    readonly touchMode: boolean;
    readonly renderStrategy: "single-buffer" | "double-buffer" | "direct";
    readonly enqueue: (item: Item) => void;
    readonly getCellRenderer: GetCellRendererCallback;
}
