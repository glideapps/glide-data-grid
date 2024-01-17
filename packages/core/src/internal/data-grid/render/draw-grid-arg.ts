import type { GetCellRendererCallback } from "../../../cells/cell-types.js";
import type { RenderStateProvider } from "../../../common/render-state-provider.js";
import type { FullTheme } from "../../../common/styles.js";
import type { HoverValues } from "../animation-manager.js";
import type { MappedGridColumn } from "./data-grid-lib.js";
import type { BlitData } from "./data-grid-render.blit.js";
import type { SpriteManager } from "../data-grid-sprites.js";
import type {
    CompactSelection,
    GridSelection,
    Item,
    InnerGridCell,
    DrawHeaderCallback,
    CellList,
    DrawCellCallback,
} from "../data-grid-types.js";
import type { CellSet } from "../cell-set.js";
import type { EnqueueCallback } from "../use-animation-queue.js";
import type { ImageWindowLoader } from "../image-window-loader-interface.js";
import type { GroupDetailsCallback, GetRowThemeCallback, Highlight } from "./data-grid-render.cells.js";

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
    readonly theme: FullTheme;
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
    readonly freezeTrailingRows: number;
    readonly hasAppendRow: boolean;
    readonly hyperWrapping: boolean;
    readonly rows: number;
    readonly getCellContent: (cell: Item) => InnerGridCell;
    readonly overrideCursor: (cursor: React.CSSProperties["cursor"]) => void;
    readonly getGroupDetails: GroupDetailsCallback;
    readonly getRowThemeOverride: GetRowThemeCallback | undefined;
    readonly drawHeaderCallback: DrawHeaderCallback | undefined;
    readonly drawCellCallback: DrawCellCallback | undefined;
    readonly prelightCells: CellList | undefined;
    readonly highlightRegions: readonly Highlight[] | undefined;
    readonly imageLoader: ImageWindowLoader;
    readonly lastBlitData: React.MutableRefObject<BlitData | undefined>;
    readonly damage: CellSet | undefined;
    readonly hoverValues: HoverValues;
    readonly hoverInfo: HoverInfo | undefined;
    readonly spriteManager: SpriteManager;
    readonly maxScaleFactor: number;
    readonly touchMode: boolean;
    readonly renderStrategy: "single-buffer" | "double-buffer" | "direct";
    readonly enqueue: EnqueueCallback;
    readonly renderStateProvider: RenderStateProvider;
    readonly getCellRenderer: GetCellRendererCallback;
    readonly minimumCellWidth: number;
}
