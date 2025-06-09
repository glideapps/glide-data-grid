import type { Theme } from "../../common/styles.js";
import type React from "react";
import type { CSSProperties } from "react";
import type { SpriteManager } from "./data-grid-sprites.js";
import type { OverlayImageEditorProps } from "../data-grid-overlay-editor/private/image-overlay-editor.js";
import type { ImageWindowLoader } from "./image-window-loader-interface.js";
import type { BaseGridMouseEventArgs } from "./event-args.js";
/** @category Selection */
export interface GridSelection {
    readonly current?: {
        readonly cell: Item;
        readonly range: Readonly<Rectangle>;
        readonly rangeStack: readonly Readonly<Rectangle>[];
    };
    readonly columns: CompactSelection;
    readonly rows: CompactSelection;
}
/** @category Types */
export type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;
/** @category Types */
export declare const BooleanEmpty: null;
/** @category Types */
export declare const BooleanIndeterminate: undefined;
/** @category Types */
export type BooleanEmpty = null;
/** @category Types */
export type BooleanIndeterminate = undefined;
/** @category Types */
export type DrawHeaderCallback = (args: {
    ctx: CanvasRenderingContext2D;
    column: GridColumn;
    columnIndex: number;
    theme: Theme;
    rect: Rectangle;
    hoverAmount: number;
    isSelected: boolean;
    isHovered: boolean;
    hasSelectedCell: boolean;
    spriteManager: SpriteManager;
    menuBounds: Rectangle;
}, drawContent: () => void) => void;
/** @category Types */
export type DrawCellCallback = (args: {
    ctx: CanvasRenderingContext2D;
    cell: GridCell;
    theme: Theme;
    rect: Rectangle;
    col: number;
    row: number;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    highlighted: boolean;
    imageLoader: ImageWindowLoader;
}, drawContent: () => void) => void;
/** @category Cells */
export declare enum GridCellKind {
    Uri = "uri",
    Text = "text",
    Image = "image",
    RowID = "row-id",
    Number = "number",
    Bubble = "bubble",
    Boolean = "boolean",
    Loading = "loading",
    Markdown = "markdown",
    Drilldown = "drilldown",
    Protected = "protected",
    Custom = "custom"
}
/** @category Columns */
export declare enum GridColumnIcon {
    HeaderRowID = "headerRowID",
    HeaderCode = "headerCode",
    HeaderNumber = "headerNumber",
    HeaderString = "headerString",
    HeaderBoolean = "headerBoolean",
    HeaderAudioUri = "headerAudioUri",
    HeaderVideoUri = "headerVideoUri",
    HeaderEmoji = "headerEmoji",
    HeaderImage = "headerImage",
    HeaderUri = "headerUri",
    HeaderPhone = "headerPhone",
    HeaderMarkdown = "headerMarkdown",
    HeaderDate = "headerDate",
    HeaderTime = "headerTime",
    HeaderEmail = "headerEmail",
    HeaderReference = "headerReference",
    HeaderIfThenElse = "headerIfThenElse",
    HeaderSingleValue = "headerSingleValue",
    HeaderLookup = "headerLookup",
    HeaderTextTemplate = "headerTextTemplate",
    HeaderMath = "headerMath",
    HeaderRollup = "headerRollup",
    HeaderJoinStrings = "headerJoinStrings",
    HeaderSplitString = "headerSplitString",
    HeaderGeoDistance = "headerGeoDistance",
    HeaderArray = "headerArray",
    RowOwnerOverlay = "rowOwnerOverlay",
    ProtectedColumnOverlay = "protectedColumnOverlay"
}
/** @category Columns */
export declare enum GridColumnMenuIcon {
    Triangle = "triangle",
    Dots = "dots"
}
/** @category Types */
export type CellArray = readonly (readonly GridCell[])[];
/**
 * This type is used to specify the coordinates of
 * a cell or header within the dataset: positive row
 * numbers identify cells.
 *
 * - `-1`: Header
 * - `-2`: Group header
 * - `0 and higher`: Row index
 *
 * @category Types
 */
export type Item = readonly [col: number, row: number];
export interface BaseGridColumn {
    readonly title: string;
    readonly group?: string;
    readonly icon?: GridColumnIcon | string;
    readonly overlayIcon?: GridColumnIcon | string;
    readonly menuIcon?: GridColumnMenuIcon | string;
    readonly indicatorIcon?: GridColumnIcon | string;
    readonly hasMenu?: boolean;
    readonly grow?: number;
    readonly style?: "normal" | "highlight";
    readonly themeOverride?: Partial<Theme>;
    readonly contentAlign?: "left" | "right" | "center";
    readonly trailingRowOptions?: {
        readonly hint?: string;
        readonly addIcon?: string;
        readonly targetColumn?: number | GridColumn;
        readonly themeOverride?: Partial<Theme>;
        readonly disabled?: boolean;
    };
}
/** @category Columns */
export declare function isSizedGridColumn(c: GridColumn): c is SizedGridColumn;
/** @category Columns */
export interface SizedGridColumn extends BaseGridColumn {
    readonly width: number;
    readonly id?: string;
}
/** @category Columns */
export interface AutoGridColumn extends BaseGridColumn {
    readonly id: string;
}
/** @category Types */
export declare function resolveCellsThunk(thunk: GetCellsThunk | CellArray): Promise<CellArray>;
/** @category Types */
export type GetCellsThunk = () => Promise<CellArray>;
/** @category Columns */
export type GridColumn = SizedGridColumn | AutoGridColumn;
export type InnerColumnExtension = {
    growOffset?: number;
    rowMarker?: "square" | "circle";
    rowMarkerChecked?: BooleanIndeterminate | boolean;
    headerRowMarkerTheme?: Partial<Theme>;
    headerRowMarkerAlwaysVisible?: boolean;
    headerRowMarkerDisabled?: boolean;
};
/** @category Columns */
export type InnerGridColumn = SizedGridColumn & InnerColumnExtension;
/** @category Cells */
export type ReadWriteGridCell = TextCell | NumberCell | MarkdownCell | UriCell | CustomCell | BooleanCell;
/** @category Cells */
export type EditableGridCell = TextCell | ImageCell | BooleanCell | MarkdownCell | UriCell | NumberCell | CustomCell;
/** @category Cells */
export type EditableGridCellKind = EditableGridCell["kind"];
/** @category Cells */
export declare function isEditableGridCell(cell: GridCell): cell is ValidatedGridCell;
/** @category Cells */
export declare function isTextEditableGridCell(cell: GridCell): cell is ReadWriteGridCell;
/** @category Cells */
export declare function isInnerOnlyCell(cell: InnerGridCell): cell is InnerOnlyGridCell;
/** @category Cells */
export declare function isReadWriteCell(cell: GridCell): cell is ReadWriteGridCell;
/** @category Cells */
export type GridCell = EditableGridCell | BubbleCell | RowIDCell | LoadingCell | ProtectedCell | DrilldownCell | CustomCell;
type InnerOnlyGridCell = NewRowCell | MarkerCell;
/** @category Cells */
export type InnerGridCell = GridCell | InnerOnlyGridCell;
/** @category Cells */
export type CellList = readonly Item[];
/** @category Types */
export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function isRectangleEqual(a: Rectangle | undefined, b: Rectangle | undefined): boolean;
export type CellActiviationBehavior = "double-click" | "single-click" | "second-click";
/** @category Cells */
export interface BaseGridCell {
    readonly allowOverlay: boolean;
    readonly lastUpdated?: number;
    readonly style?: "normal" | "faded";
    readonly themeOverride?: Partial<Theme>;
    readonly span?: readonly [start: number, end: number];
    readonly contentAlign?: "left" | "right" | "center";
    readonly cursor?: CSSProperties["cursor"];
    readonly copyData?: string;
    readonly activationBehaviorOverride?: CellActiviationBehavior;
}
/** @category Cells */
export interface LoadingCell extends BaseGridCell {
    readonly kind: GridCellKind.Loading;
    readonly skeletonWidth?: number;
    readonly skeletonHeight?: number;
    readonly skeletonWidthVariability?: number;
}
/** @category Cells */
export interface ProtectedCell extends BaseGridCell {
    readonly kind: GridCellKind.Protected;
}
export interface HoverEffectTheme {
    bgColor: string;
    fullSize: boolean;
}
/** @category Cells */
export interface TextCell extends BaseGridCell {
    readonly kind: GridCellKind.Text;
    readonly displayData: string;
    readonly data: string;
    readonly readonly?: boolean;
    readonly allowWrapping?: boolean;
    readonly hoverEffect?: boolean;
    readonly hoverEffectTheme?: HoverEffectTheme;
}
/** @category Cells */
export interface NumberCell extends BaseGridCell {
    readonly kind: GridCellKind.Number;
    readonly displayData: string;
    readonly data: number | undefined;
    readonly readonly?: boolean;
    readonly fixedDecimals?: number;
    readonly allowNegative?: boolean;
    readonly thousandSeparator?: boolean | string;
    readonly decimalSeparator?: string;
    readonly hoverEffect?: boolean;
    readonly hoverEffectTheme?: HoverEffectTheme;
}
/** @category Cells */
export interface ImageCell extends BaseGridCell {
    readonly kind: GridCellKind.Image;
    readonly data: string[];
    readonly rounding?: number;
    readonly displayData?: string[];
    readonly readonly?: boolean;
}
/** @category Cells */
export interface BubbleCell extends BaseGridCell {
    readonly kind: GridCellKind.Bubble;
    readonly data: string[];
}
/** @category Renderers */
export type SelectionRange = number | readonly [number, number];
/** @category Renderers */
export type ProvideEditorComponent<T extends InnerGridCell> = React.FunctionComponent<{
    readonly onChange: (newValue: T) => void;
    readonly onFinishedEditing: (newValue?: T, movement?: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly isHighlighted: boolean;
    readonly value: T;
    readonly initialValue?: string;
    readonly validatedSelection?: SelectionRange;
    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
    readonly target: Rectangle;
    readonly forceEditMode: boolean;
    readonly isValid?: boolean;
    readonly theme: Theme;
}>;
type ObjectEditorCallbackResult<T extends InnerGridCell> = {
    editor: ProvideEditorComponent<T>;
    deletedValue?: (toDelete: T) => T;
    styleOverride?: CSSProperties;
    disablePadding?: boolean;
    disableStyling?: boolean;
};
/** @category Renderers */
export type ProvideEditorCallbackResult<T extends InnerGridCell> = (ProvideEditorComponent<T> & {
    disablePadding?: boolean;
    disableStyling?: boolean;
}) | ObjectEditorCallbackResult<T> | undefined;
/** @category Renderers */
export declare function isObjectEditorCallbackResult<T extends InnerGridCell>(obj: ProvideEditorCallbackResult<T>): obj is ObjectEditorCallbackResult<T>;
/** @category Renderers */
export type ProvideEditorCallback<T extends InnerGridCell> = (cell: T) => ProvideEditorCallbackResult<T>;
/** @category Cells */
export type ValidatedGridCell = EditableGridCell & {
    selectionRange?: SelectionRange;
};
/** @category Cells */
export interface CustomCell<T extends {} = {}> extends BaseGridCell {
    readonly kind: GridCellKind.Custom;
    readonly data: T;
    readonly copyData: string;
    readonly readonly?: boolean;
}
/** @category Cells */
export interface DrilldownCellData {
    readonly text: string;
    readonly img?: string;
}
/** @category Cells */
export interface DrilldownCell extends BaseGridCell {
    readonly kind: GridCellKind.Drilldown;
    readonly data: readonly DrilldownCellData[];
}
/** @category Cells */
export interface BooleanCell extends BaseGridCell {
    readonly kind: GridCellKind.Boolean;
    readonly data: boolean | BooleanEmpty | BooleanIndeterminate;
    readonly readonly?: boolean;
    readonly allowOverlay: false;
    readonly maxSize?: number;
    readonly hoverEffectIntensity?: number;
}
/** @category Cells */
export declare function booleanCellIsEditable(cell: BooleanCell): boolean;
/** @category Cells */
export interface RowIDCell extends BaseGridCell {
    readonly kind: GridCellKind.RowID;
    readonly data: string;
    readonly readonly?: boolean;
}
/** @category Cells */
export interface MarkdownCell extends BaseGridCell {
    readonly kind: GridCellKind.Markdown;
    readonly data: string;
    readonly readonly?: boolean;
}
/** @category Cells */
export interface UriCell extends BaseGridCell {
    readonly kind: GridCellKind.Uri;
    readonly data: string;
    readonly displayData?: string;
    readonly readonly?: boolean;
    readonly onClickUri?: (args: BaseGridMouseEventArgs & {
        readonly preventDefault: () => void;
    }) => void;
    readonly hoverEffect?: boolean;
}
/** @category Cells */
export declare enum InnerGridCellKind {
    NewRow = "new-row",
    Marker = "marker"
}
export type EditListItem = {
    location: Item;
    value: EditableGridCell;
};
/** @category Cells */
export interface NewRowCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.NewRow;
    readonly hint: string;
    readonly allowOverlay: false;
    readonly icon?: string;
}
/** @category Cells */
export interface MarkerCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.Marker;
    readonly allowOverlay: false;
    readonly row: number;
    readonly drawHandle: boolean;
    readonly checked: boolean;
    readonly checkboxStyle: "square" | "circle";
    readonly markerKind: "checkbox" | "number" | "both" | "checkbox-visible";
}
/** @category Selection */
export type Slice = [start: number, end: number];
/** @category Selection */
export type CompactSelectionRanges = readonly Slice[];
export type FillHandleDirection = "horizontal" | "vertical" | "orthogonal" | "any";
/** @category Selection */
export declare class CompactSelection {
    private readonly items;
    private constructor();
    static empty: () => CompactSelection;
    static fromSingleSelection: (selection: number | Slice) => CompactSelection;
    offset(amount: number): CompactSelection;
    add(selection: number | Slice): CompactSelection;
    remove(selection: number | Slice): CompactSelection;
    first(): number | undefined;
    last(): number | undefined;
    hasIndex(index: number): boolean;
    hasAll(index: Slice): boolean;
    some(predicate: (index: number) => boolean): boolean;
    equals(other: CompactSelection): boolean;
    toArray(): number[];
    get length(): number;
    [Symbol.iterator](): Generator<number, void, unknown>;
}
export {};
//# sourceMappingURL=data-grid-types.d.ts.map