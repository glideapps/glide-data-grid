import { Theme } from "..";
import isArray from "lodash/isArray";
import { assertNever, proveType } from "../common/support";
import React from "react";

export interface GridSelection {
    readonly cell: readonly [number, number];
    readonly range: Readonly<Rectangle>;
}

export type GridMouseEventArgs =
    | GridMouseCellEventArgs
    | GridMouseHeaderEventArgs
    | GridMouseOutOfBoundsEventArgs
    | GridMouseGroupHeaderEventArgs;

interface BaseGridMouseEventArgs {
    readonly shiftKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly isTouch: boolean;
    readonly isEdge: boolean;
}

interface GridMouseCellEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "cell";
    readonly location: readonly [number, number];
    readonly bounds: Rectangle;
}

interface GridMouseHeaderEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "header";
    readonly location: readonly [number, undefined];
    readonly bounds: Rectangle;
}

interface GridMouseGroupHeaderEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "group-header";
    readonly location: readonly [number, undefined];
    readonly bounds: Rectangle;
}

interface GridMouseOutOfBoundsEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "out-of-bounds";
    readonly location: readonly [number, number];
    readonly direction: readonly [-1 | 0 | 1, -1 | 0 | 1];
}

export interface GridKeyEventArgs {
    readonly bounds: Rectangle | undefined;
    readonly key: string;
    readonly keyCode: number;
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

export interface GridColumn {
    readonly width: number;
    readonly title: string;
    readonly group?: string;
    readonly icon?: GridColumnIcon | string;
    readonly overlayIcon?: GridColumnIcon | string;
    readonly hasMenu?: boolean;
    readonly style?: "normal" | "highlight";
    readonly themeOverride?: Partial<Theme>;
}

export type ReadWriteGridCell = TextCell | NumberCell | MarkdownCell | UriCell;

export type EditableGridCell = TextCell | ImageCell | BooleanCell | MarkdownCell | UriCell | NumberCell;

export type EditableGridCellKind = EditableGridCell["kind"];

function isTruthy(x: any): boolean {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return x ? true : false;
}

/**
 * Attempts to copy data between grid cells of any kind.
 */
export function lossyCopyData<T extends EditableGridCell>(source: EditableGridCell, target: T): EditableGridCell {
    const sourceData = source.data;
    if (typeof sourceData === typeof target.data) {
        return {
            ...target,
            data: sourceData as any,
        };
    } else if (target.kind === GridCellKind.Uri) {
        if (isArray(sourceData)) {
            return {
                ...target,
                data: sourceData[0],
            };
        }
        return {
            ...target,
            data: sourceData?.toString() ?? "",
        };
    } else if (target.kind === GridCellKind.Boolean) {
        if (isArray(sourceData)) {
            return {
                ...target,
                data: sourceData[0] !== undefined,
            };
        }
        return {
            ...target,
            data: isTruthy(sourceData) ? true : false,
        };
    } else if (target.kind === GridCellKind.Image) {
        if (isArray(sourceData)) {
            return {
                ...target,
                data: [sourceData[0]],
            };
        }
        return {
            ...target,
            data: [sourceData?.toString() ?? ""],
        };
    } else if (target.kind === GridCellKind.Number) {
        return {
            ...target,
            data: 0,
        };
    } else if (target.kind === GridCellKind.Text || target.kind === GridCellKind.Markdown) {
        if (isArray(sourceData)) {
            return {
                ...target,
                data: sourceData[0].toString() ?? "",
            };
        }

        return {
            ...target,
            data: source.data?.toString() ?? "",
        };
    }
    assertNever(target);
}

export function isEditableGridCell(cell: GridCell): cell is EditableGridCell {
    if (
        cell.kind === GridCellKind.Loading ||
        cell.kind === GridCellKind.Bubble ||
        cell.kind === GridCellKind.RowID ||
        cell.kind === GridCellKind.Protected ||
        cell.kind === GridCellKind.Drilldown ||
        cell.kind === GridCellKind.Custom
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
        cell.kind === GridCellKind.Uri
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

export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface BaseGridCell {
    readonly allowOverlay: boolean;
    readonly style?: "normal" | "faded";
}

interface LoadingCell extends BaseGridCell {
    readonly kind: GridCellKind.Loading;
}

interface ProtectedCell extends BaseGridCell {
    readonly kind: GridCellKind.Protected;
}

interface TextCell extends BaseGridCell {
    readonly kind: GridCellKind.Text;
    readonly displayData: string;
    readonly data: string;
    readonly readonly?: boolean;
}

interface NumberCell extends BaseGridCell {
    readonly kind: GridCellKind.Number;
    readonly displayData: string;
    readonly data: number | undefined;
    readonly readonly?: boolean;
}

interface ImageCell extends BaseGridCell {
    readonly kind: GridCellKind.Image;
    readonly data: string[];
    readonly displayData?: string[]; // used for small images for faster scrolling
    readonly allowAdd: boolean;
}

interface BubbleCell extends BaseGridCell {
    readonly kind: GridCellKind.Bubble;
    readonly data: string[];
}

export type ProvideEditorCallback<T extends GridCell> = (
    cell: T
) =>
    | React.FunctionComponent<{
          readonly onChange: (newValue: T) => void;
          readonly onFinishedEditing: () => void;
          readonly isHighlighted: boolean;
          readonly value: T;
      }>
    | undefined;

export interface CustomCell<T extends {} = {}> extends BaseGridCell {
    readonly kind: GridCellKind.Custom;
    readonly data: T;
    readonly copyData: string;
}

export interface DrilldownCellData {
    readonly text: string;
    readonly img?: string;
}

interface DrilldownCell extends BaseGridCell {
    readonly kind: GridCellKind.Drilldown;
    readonly data: readonly DrilldownCellData[];
}

interface BooleanCell extends BaseGridCell {
    readonly kind: GridCellKind.Boolean;
    readonly data: boolean;
    readonly showUnchecked: boolean;
    readonly allowEdit: boolean;
    readonly allowOverlay: false;
}

interface RowIDCell extends BaseGridCell {
    readonly kind: GridCellKind.RowID;
    readonly data: string;
}

interface MarkdownCell extends BaseGridCell {
    readonly kind: GridCellKind.Markdown;
    readonly data: string;
    readonly readonly?: boolean;
}

interface UriCell extends BaseGridCell {
    readonly kind: GridCellKind.Uri;
    readonly data: string;
    readonly readonly?: boolean;
}

export enum InnerGridCellKind {
    NewRow = "new-row",
    Marker = "marker",
}

interface NewRowCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.NewRow;
    readonly hint: string;
    readonly isFirst: boolean;
    readonly allowOverlay: false;
}

interface MarkerCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.Marker;
    readonly allowOverlay: false;
    readonly row: number;
    readonly checked: boolean;
    readonly markerKind: "checkbox" | "number" | "both";
}

export type Slice = readonly [number, number];
export type CompactSelectionRanges = readonly Slice[];

function mergeRanges(input: CompactSelectionRanges) {
    if (input === undefined || input.length === 0) {
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

export class CompactSelection {
    private constructor(private items: CompactSelectionRanges) {}

    static empty = (): CompactSelection => {
        return new CompactSelection([]);
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
        return this.items.slice(-1)[0][1];
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
