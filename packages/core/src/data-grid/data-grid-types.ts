import { Theme } from "../common/styles";
import { assertNever, proveType } from "../common/support";
import has from "lodash/has";
import React, { CSSProperties } from "react";
import ImageWindowLoader from "../common/image-window-loader";
import { SpriteManager } from "./data-grid-sprites";

// Thoughts:
// rows/columns are called out as selected, but when selected they must also be added
// to the range. Handling delete events may have different desired outcomes depending on
// how the range came to be selected. The rows/columns properties retain this essential
// information.
export interface GridSelection {
    readonly current?: {
        readonly cell: Item;
        readonly range: Readonly<Rectangle>;
        readonly rangeStack: readonly Readonly<Rectangle>[]; // lowest to highest, does not include range
    };
    readonly columns: CompactSelection;
    readonly rows: CompactSelection;
}

export type GridMouseEventArgs =
    | GridMouseCellEventArgs
    | GridMouseHeaderEventArgs
    | GridMouseOutOfBoundsEventArgs
    | GridMouseGroupHeaderEventArgs;

interface PreventableEvent {
    preventDefault: () => void;
}
export interface CellClickedEventArgs extends GridMouseCellEventArgs, PreventableEvent {}

export interface HeaderClickedEventArgs extends GridMouseHeaderEventArgs, PreventableEvent {}

export interface GroupHeaderClickedEventArgs extends GridMouseGroupHeaderEventArgs, PreventableEvent {}

interface PositionableMouseEventArgs {
    readonly localEventX: number;
    readonly localEventY: number;
}

interface BaseGridMouseEventArgs {
    readonly shiftKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly isTouch: boolean;
    readonly isLongTouch?: boolean;
    readonly isEdge: boolean;
    readonly button: number;
}

export interface GridMouseCellEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: "cell";
    readonly location: Item;
    readonly bounds: Rectangle;
    readonly isFillHandle: boolean;
}

export interface GridMouseHeaderEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: "header";
    readonly location: readonly [number, -1];
    readonly bounds: Rectangle;
    readonly group: string;
}

export interface GridMouseGroupHeaderEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: "group-header";
    readonly location: readonly [number, -2];
    readonly bounds: Rectangle;
    readonly group: string;
}

export interface GridMouseOutOfBoundsEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "out-of-bounds";
    readonly location: Item;
    readonly direction: readonly [-1 | 0 | 1, -1 | 0 | 1];
}

export interface GridKeyEventArgs {
    readonly bounds: Rectangle | undefined;
    readonly key: string;
    readonly keyCode: number;
    readonly altKey: boolean;
    readonly shiftKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly cancel: () => void;
}

interface DragHandler {
    readonly setData: (mime: string, payload: string) => void;
    readonly setDragImage: (image: Element, x: number, y: number) => void;
}

export type GridDragEventArgs = GridMouseEventArgs & DragHandler;

export type DrawCustomCellCallback = (args: {
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
}) => boolean;

export type DrawHeaderCallback = (args: {
    ctx: CanvasRenderingContext2D;
    column: GridColumn;
    theme: Theme;
    rect: Rectangle;
    hoverAmount: number;
    isSelected: boolean;
    isHovered: boolean;
    hasSelectedCell: boolean;
    spriteManager: SpriteManager;
    menuBounds: Rectangle;
}) => boolean;

export enum GridCellKind {
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
    Custom = "custom",
}

export enum GridColumnIcon {
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
    ProtectedColumnOverlay = "protectedColumnOverlay",
}

export type CellArray = readonly (readonly GridCell[])[];

export type Item = readonly [number, number];

interface BaseGridColumn {
    readonly title: string;
    readonly group?: string;
    readonly icon?: GridColumnIcon | string;
    readonly overlayIcon?: GridColumnIcon | string;
    readonly hasMenu?: boolean;
    readonly style?: "normal" | "highlight";
    readonly themeOverride?: Partial<Theme>;
    readonly trailingRowOptions?: {
        readonly hint?: string;
        readonly addIcon?: string;
        readonly targetColumn?: number | GridColumn;
    };
}

export function isSizedGridColumn(c: GridColumn): c is SizedGridColumn {
    return "width" in c;
}

export interface SizedGridColumn extends BaseGridColumn {
    readonly width: number;
    readonly id?: string;
}

interface AutoGridColumn extends BaseGridColumn {
    readonly id: string;
}

export async function resolveCellsThunk(thunk: GetCellsThunk | CellArray): Promise<CellArray> {
    if (typeof thunk === "object") return thunk;
    return await thunk();
}

export type GetCellsThunk = () => Promise<CellArray>;

export type GridColumn = SizedGridColumn | AutoGridColumn;

// export type SizedGridColumn = Omit<GridColumn, "width"> & { readonly width: number };

export type ReadWriteGridCell = TextCell | NumberCell | MarkdownCell | UriCell | CustomCell;

export type EditableGridCell = TextCell | ImageCell | BooleanCell | MarkdownCell | UriCell | NumberCell | CustomCell;

export type EditableGridCellKind = EditableGridCell["kind"];

export function isEditableGridCell(cell: GridCell): cell is EditableGridCell {
    if (
        cell.kind === GridCellKind.Loading ||
        cell.kind === GridCellKind.Bubble ||
        cell.kind === GridCellKind.RowID ||
        cell.kind === GridCellKind.Protected ||
        cell.kind === GridCellKind.Drilldown
    ) {
        return false;
    }

    proveType<EditableGridCell>(cell);
    return true;
}

export function isTextEditableGridCell(cell: GridCell): cell is ReadWriteGridCell {
    if (
        cell.kind === GridCellKind.Loading ||
        cell.kind === GridCellKind.Bubble ||
        cell.kind === GridCellKind.RowID ||
        cell.kind === GridCellKind.Protected ||
        cell.kind === GridCellKind.Drilldown ||
        cell.kind === GridCellKind.Boolean ||
        cell.kind === GridCellKind.Image ||
        cell.kind === GridCellKind.Custom
    ) {
        return false;
    }

    proveType<ReadWriteGridCell>(cell);
    return true;
}

export function isInnerOnlyCell(cell: InnerGridCell): cell is InnerOnlyGridCell {
    return cell.kind === InnerGridCellKind.Marker || cell.kind === InnerGridCellKind.NewRow;
}

export function isReadWriteCell(cell: GridCell): cell is ReadWriteGridCell {
    if (!isEditableGridCell(cell) || cell.kind === GridCellKind.Image || cell.kind === GridCellKind.Boolean)
        return false;

    if (
        cell.kind === GridCellKind.Text ||
        cell.kind === GridCellKind.Number ||
        cell.kind === GridCellKind.Markdown ||
        cell.kind === GridCellKind.Uri ||
        cell.kind === GridCellKind.Custom
    ) {
        return cell.readonly !== true;
    }
    assertNever(cell);
}

export type GridCell =
    | EditableGridCell
    | BubbleCell
    | RowIDCell
    | LoadingCell
    | ProtectedCell
    | DrilldownCell
    | CustomCell;

type InnerOnlyGridCell = NewRowCell | MarkerCell;
export type InnerGridCell = GridCell | InnerOnlyGridCell;

export type CellList = readonly Item[];

export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface BaseGridCell {
    readonly allowOverlay: boolean;
    readonly lastUpdated?: number;
    readonly style?: "normal" | "faded";
    readonly themeOverride?: Partial<Theme>;
    readonly span?: Item;
}

export interface LoadingCell extends BaseGridCell {
    readonly kind: GridCellKind.Loading;
}

export interface ProtectedCell extends BaseGridCell {
    readonly kind: GridCellKind.Protected;
}

export interface TextCell extends BaseGridCell {
    readonly kind: GridCellKind.Text;
    readonly displayData: string;
    readonly data: string;
    readonly readonly?: boolean;
}

export interface NumberCell extends BaseGridCell {
    readonly kind: GridCellKind.Number;
    readonly displayData: string;
    readonly data: number | undefined;
    readonly readonly?: boolean;
}

export interface ImageCell extends BaseGridCell {
    readonly kind: GridCellKind.Image;
    readonly data: string[];
    readonly displayData?: string[]; // used for small images for faster scrolling
    readonly allowAdd: boolean;
}

export interface BubbleCell extends BaseGridCell {
    readonly kind: GridCellKind.Bubble;
    readonly data: string[];
}

export type ProvideEditorComponent<T extends GridCell> = React.FunctionComponent<{
    readonly onChange: (newValue: T) => void;
    readonly onFinishedEditing: (newValue?: T) => void;
    readonly isHighlighted: boolean;
    readonly value: T;
    readonly initialValue?: string;
}>;

type ObjectEditorCallbackResult<T extends GridCell> = {
    editor: ProvideEditorComponent<T>;
    deletedValue?: (toDelete: T) => T;
    styleOverride?: CSSProperties;
    disablePadding?: boolean;
    disableStyling?: boolean;
};

type ProvideEditorCallbackResult<T extends GridCell> =
    | (ProvideEditorComponent<T> & {
          disablePadding?: boolean;
          disableStyling?: boolean;
      })
    | ObjectEditorCallbackResult<T>
    | undefined;

export function isObjectEditorCallbackResult<T extends GridCell>(
    obj: ProvideEditorCallbackResult<T>
): obj is ObjectEditorCallbackResult<T> {
    if (has(obj, "editor")) {
        return true;
    }
    return false;
}

export type ProvideEditorCallback<T extends GridCell> = (cell: T) => ProvideEditorCallbackResult<T>;

export interface CustomCell<T extends {} = {}> extends BaseGridCell {
    readonly kind: GridCellKind.Custom;
    readonly data: T;
    readonly copyData: string;
    readonly readonly?: boolean;
}

export interface DrilldownCellData {
    readonly text: string;
    readonly img?: string;
}

export interface DrilldownCell extends BaseGridCell {
    readonly kind: GridCellKind.Drilldown;
    readonly data: readonly DrilldownCellData[];
}

export interface BooleanCell extends BaseGridCell {
    readonly kind: GridCellKind.Boolean;
    // true -> checked
    // false -> unchecked
    // undefined -> indeterminate
    // null -> empty
    readonly data: boolean | null | undefined;
    readonly showUnchecked: boolean;
    readonly allowEdit: boolean;
    readonly allowOverlay: false;
}

export interface RowIDCell extends BaseGridCell {
    readonly kind: GridCellKind.RowID;
    readonly data: string;
    readonly readonly?: boolean;
}

export interface MarkdownCell extends BaseGridCell {
    readonly kind: GridCellKind.Markdown;
    readonly data: string;
    readonly readonly?: boolean;
}

export interface UriCell extends BaseGridCell {
    readonly kind: GridCellKind.Uri;
    readonly data: string;
    readonly readonly?: boolean;
}

export enum InnerGridCellKind {
    NewRow = "new-row",
    Marker = "marker",
}

export interface NewRowCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.NewRow;
    readonly hint: string;
    readonly allowOverlay: false;
    readonly icon?: string;
}

export interface MarkerCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.Marker;
    readonly allowOverlay: false;
    readonly row: number;
    readonly checked: boolean;
    readonly markerKind: "checkbox" | "number" | "both";
}

export type Slice = Item;
export type CompactSelectionRanges = readonly Slice[];

function mergeRanges(input: CompactSelectionRanges) {
    if (input.length === 0) {
        return [];
    }
    const ranges = [...input];

    const stack: [number, number][] = [];

    ranges.sort(function (a, b) {
        return a[0] - b[0];
    });

    stack.push([...ranges[0]]);

    ranges.slice(1).forEach(range => {
        const top = stack[stack.length - 1];

        if (top[1] < range[0]) {
            stack.push([...range]);
        } else if (top[1] < range[1]) {
            top[1] = range[1];
        }
    });

    return stack;
}

let emptyCompactSelection: CompactSelection | undefined;

export class CompactSelection {
    private constructor(private readonly items: CompactSelectionRanges) {}

    static empty = (): CompactSelection => {
        return emptyCompactSelection ?? (emptyCompactSelection = new CompactSelection([]));
    };

    static fromSingleSelection = (selection: number | Slice) => {
        return CompactSelection.empty().add(selection);
    };

    offset = (amount: number): CompactSelection => {
        if (amount === 0) return this;
        const newItems = this.items.map(x => [x[0] + amount, x[1] + amount] as const);
        return new CompactSelection(newItems);
    };

    add = (selection: number | Slice): CompactSelection => {
        const slice: Slice = typeof selection === "number" ? [selection, selection + 1] : selection;

        const newItems = mergeRanges([...this.items, slice]);

        return new CompactSelection(newItems);
    };

    // TODO: Support removing a slice
    remove = (selection: number): CompactSelection => {
        const items = [...this.items];

        for (const [i, slice] of items.entries()) {
            const [start, end] = slice;

            if (start <= selection && end > selection) {
                const left: Slice = [start, selection];
                const right: Slice = [selection + 1, end];

                const toAdd: Slice[] = [];
                if (left[0] !== left[1]) {
                    toAdd.push(left);
                }
                if (right[0] !== right[1]) {
                    toAdd.push(right);
                }

                items.splice(i, 1, ...toAdd);
                break;
            }
        }
        return new CompactSelection(items);
    };

    first = (): number | undefined => {
        if (this.items.length === 0) return undefined;
        return this.items[0][0];
    };

    last = (): number | undefined => {
        if (this.items.length === 0) return undefined;
        return this.items.slice(-1)[0][1] - 1;
    };

    hasIndex = (index: number): boolean => {
        for (let i = 0; i < this.items.length; i++) {
            const [start, end] = this.items[i];
            if (index >= start && index < end) return true;
        }
        return false;
    };

    hasAll = (index: Slice): boolean => {
        for (let x = index[0]; x < index[1]; x++) {
            if (!this.hasIndex(x)) return false;
        }
        return true;
    };

    some = (predicate: (index: number) => boolean): boolean => {
        for (const i of this) {
            if (predicate(i)) return true;
        }
        return false;
    };

    equals = (other: CompactSelection): boolean => {
        if (other === this) return true;

        if (other.items.length !== this.items.length) return false;

        for (let i = 0; i < this.items.length; i++) {
            const left = other.items[i];
            const right = this.items[i];

            if (left[0] !== right[0] || left[1] !== right[1]) return false;
        }

        return true;
    };

    get length(): number {
        let len = 0;
        for (const [start, end] of this.items) {
            len += end - start;
        }

        return len;
    }

    *[Symbol.iterator]() {
        for (const [start, end] of this.items) {
            for (let x = start; x < end; x++) {
                yield x;
            }
        }
    }
}
