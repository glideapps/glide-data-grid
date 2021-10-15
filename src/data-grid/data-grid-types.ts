import isArray from "lodash/isArray";
import { assertNever, proveType } from "../common/support";
import { HeaderIcon } from "./data-grid-sprites";

export interface GridSelection {
    readonly cell: readonly [number, number];
    readonly range: Readonly<Rectangle>;
}

export type RowSelection = readonly number[];

export type ColumnSelection = readonly number[];

export type GridMouseEventArgs = GridMouseCellEventArgs | GridMouseHeaderEventArgs | GridMouseOutOfBoundsEventArgs;

interface BaseGridMouseEventArgs {
    shiftKey: boolean;
}

interface GridMouseCellEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "cell";
    readonly location: readonly [number, number];
    readonly bounds: Rectangle;
    readonly isEdge: boolean;
}

interface GridMouseHeaderEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "header";
    readonly location: readonly [number, undefined];
    readonly bounds: Rectangle;
    readonly isEdge: boolean;
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
}

export interface GridColumn {
    readonly width: number;
    readonly title: string;
    readonly icon?: HeaderIcon;
    readonly overlayIcon?: HeaderIcon;
    readonly hasMenu?: boolean;
    readonly style?: "normal" | "highlight";
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
        cell.kind === GridCellKind.Image
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
    if (!isEditableGridCell(cell)) return false;

    if (
        cell.kind === GridCellKind.Text ||
        cell.kind === GridCellKind.Number ||
        cell.kind === GridCellKind.Markdown ||
        cell.kind === GridCellKind.Uri
    ) {
        return cell.readonly !== true;
    }
    return true;
}

export type GridCell = EditableGridCell | BubbleCell | RowIDCell | LoadingCell | ProtectedCell | DrilldownCell;

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
    readonly allowAdd: boolean;
}

interface BubbleCell extends BaseGridCell {
    readonly kind: GridCellKind.Bubble;
    readonly data: string[];
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
    readonly allowOverlay: false;
}

interface MarkerCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.Marker;
    readonly allowOverlay: false;
    readonly row: number;
    readonly checked: boolean;
    readonly markerKind: "checkbox" | "number" | "both";
}

export interface CompactSelection {
    items: readonly (readonly [number, number])[];
}
type Slice = CompactSelection["items"][0];

function mergeRanges(input: readonly (readonly [number, number])[] | undefined) {
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

export function addToCompactSelection(
    selection: CompactSelection | undefined,
    index: number | Slice
): CompactSelection {
    if (selection === undefined) {
        return {
            items: [typeof index === "number" ? [index, index + 1] : index],
        };
    }
    // add the splice
    const items = [...selection.items];
    items.push(typeof index === "number" ? [index, index + 1] : index);

    return {
        items: mergeRanges(items),
    };
}

// FIXME: Add support for removing slice
export function removeFromCompactSelection(
    selection: CompactSelection | undefined,
    index: number
): CompactSelection | undefined {
    if (selection === undefined) return undefined;
    const result = [...selection.items];
    for (const [i, slice] of result.entries()) {
        const [start, end] = slice;
        if (start <= index && end > index) {
            const left: Slice = [start, index];
            const right: Slice = [index + 1, end];

            const toAdd: Slice[] = [];
            if (left[0] !== left[1]) {
                toAdd.push(left);
            }
            if (right[0] !== right[1]) {
                toAdd.push(right);
            }

            result.splice(i, 1, ...toAdd);
            break;
        }
    }
    return {
        items: result,
    };
}

export function indexInSelection(selection: CompactSelection | undefined, index: number): boolean {
    if (selection === undefined) return false;
    for (const [start, end] of selection.items) {
        if (index >= start && index < end) return true;
    }
    return false;
}

export function selectionLength(selection: CompactSelection | undefined): number {
    if (selection === undefined || selection.items.length === 0) return 0;

    let len = 0;
    for (const [start, end] of selection.items) {
        len += end - start;
    }

    return len;
}

export function selectionToArray(selection: CompactSelection): number[] {
    const result: number[] = [];
    for (const [start, end] of selection.items) {
        for (let x = start; x < end; x++) {
            result.push(x);
        }
    }

    return result;
}
