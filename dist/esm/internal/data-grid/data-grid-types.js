import has from "lodash/has.js";
import { assertNever, proveType } from "../../common/support.js";
/** @category Types */
export const BooleanEmpty = null;
/** @category Types */
export const BooleanIndeterminate = undefined;
/** @category Cells */
export var GridCellKind;
(function (GridCellKind) {
    GridCellKind["Uri"] = "uri";
    GridCellKind["Text"] = "text";
    GridCellKind["Image"] = "image";
    GridCellKind["RowID"] = "row-id";
    GridCellKind["Number"] = "number";
    GridCellKind["Bubble"] = "bubble";
    GridCellKind["Boolean"] = "boolean";
    GridCellKind["Loading"] = "loading";
    GridCellKind["Markdown"] = "markdown";
    GridCellKind["Drilldown"] = "drilldown";
    GridCellKind["Protected"] = "protected";
    GridCellKind["Custom"] = "custom";
})(GridCellKind || (GridCellKind = {}));
/** @category Columns */
export var GridColumnIcon;
(function (GridColumnIcon) {
    GridColumnIcon["HeaderRowID"] = "headerRowID";
    GridColumnIcon["HeaderCode"] = "headerCode";
    GridColumnIcon["HeaderNumber"] = "headerNumber";
    GridColumnIcon["HeaderString"] = "headerString";
    GridColumnIcon["HeaderBoolean"] = "headerBoolean";
    GridColumnIcon["HeaderAudioUri"] = "headerAudioUri";
    GridColumnIcon["HeaderVideoUri"] = "headerVideoUri";
    GridColumnIcon["HeaderEmoji"] = "headerEmoji";
    GridColumnIcon["HeaderImage"] = "headerImage";
    GridColumnIcon["HeaderUri"] = "headerUri";
    GridColumnIcon["HeaderPhone"] = "headerPhone";
    GridColumnIcon["HeaderMarkdown"] = "headerMarkdown";
    GridColumnIcon["HeaderDate"] = "headerDate";
    GridColumnIcon["HeaderTime"] = "headerTime";
    GridColumnIcon["HeaderEmail"] = "headerEmail";
    GridColumnIcon["HeaderReference"] = "headerReference";
    GridColumnIcon["HeaderIfThenElse"] = "headerIfThenElse";
    GridColumnIcon["HeaderSingleValue"] = "headerSingleValue";
    GridColumnIcon["HeaderLookup"] = "headerLookup";
    GridColumnIcon["HeaderTextTemplate"] = "headerTextTemplate";
    GridColumnIcon["HeaderMath"] = "headerMath";
    GridColumnIcon["HeaderRollup"] = "headerRollup";
    GridColumnIcon["HeaderJoinStrings"] = "headerJoinStrings";
    GridColumnIcon["HeaderSplitString"] = "headerSplitString";
    GridColumnIcon["HeaderGeoDistance"] = "headerGeoDistance";
    GridColumnIcon["HeaderArray"] = "headerArray";
    GridColumnIcon["RowOwnerOverlay"] = "rowOwnerOverlay";
    GridColumnIcon["ProtectedColumnOverlay"] = "protectedColumnOverlay";
})(GridColumnIcon || (GridColumnIcon = {}));
/** @category Columns */
export var GridColumnMenuIcon;
(function (GridColumnMenuIcon) {
    GridColumnMenuIcon["Triangle"] = "triangle";
    GridColumnMenuIcon["Dots"] = "dots";
})(GridColumnMenuIcon || (GridColumnMenuIcon = {}));
/** @category Columns */
export function isSizedGridColumn(c) {
    return "width" in c && typeof c.width === "number";
}
/** @category Types */
export async function resolveCellsThunk(thunk) {
    if (typeof thunk === "object")
        return thunk;
    return await thunk();
}
// All EditableGridCells are inherently ValidatedGridCells, and this is more specific and thus more useful.
/** @category Cells */
export function isEditableGridCell(cell) {
    if (cell.kind === GridCellKind.Loading ||
        cell.kind === GridCellKind.Bubble ||
        cell.kind === GridCellKind.RowID ||
        cell.kind === GridCellKind.Protected ||
        cell.kind === GridCellKind.Drilldown) {
        return false;
    }
    proveType(cell);
    return true;
}
/** @category Cells */
export function isTextEditableGridCell(cell) {
    if (cell.kind === GridCellKind.Loading ||
        cell.kind === GridCellKind.Bubble ||
        cell.kind === GridCellKind.RowID ||
        cell.kind === GridCellKind.Protected ||
        cell.kind === GridCellKind.Drilldown ||
        cell.kind === GridCellKind.Boolean ||
        cell.kind === GridCellKind.Image ||
        cell.kind === GridCellKind.Custom) {
        return false;
    }
    proveType(cell);
    return true;
}
/** @category Cells */
export function isInnerOnlyCell(cell) {
    return cell.kind === InnerGridCellKind.Marker || cell.kind === InnerGridCellKind.NewRow;
}
/** @category Cells */
export function isReadWriteCell(cell) {
    if (!isEditableGridCell(cell) || cell.kind === GridCellKind.Image)
        return false;
    switch (cell.kind) {
        case GridCellKind.Text:
        case GridCellKind.Number:
        case GridCellKind.Markdown:
        case GridCellKind.Uri:
        case GridCellKind.Custom:
        case GridCellKind.Boolean:
            return cell.readonly !== true;
        default:
            assertNever(cell, "A cell was passed with an invalid kind");
    }
}
export function isRectangleEqual(a, b) {
    if (a === b)
        return true;
    if (a === undefined || b === undefined)
        return false;
    return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
/** @category Renderers */
export function isObjectEditorCallbackResult(obj) {
    return has(obj, "editor");
}
// Can be written more concisely, not easier to read if more concise.
/** @category Cells */
export function booleanCellIsEditable(cell) {
    return !(cell.readonly ?? false);
}
/** @category Cells */
export var InnerGridCellKind;
(function (InnerGridCellKind) {
    InnerGridCellKind["NewRow"] = "new-row";
    InnerGridCellKind["Marker"] = "marker";
})(InnerGridCellKind || (InnerGridCellKind = {}));
/**
 * Default configuration used when `fillHandle` is simply `true`.
 */
export const DEFAULT_FILL_HANDLE = {
    shape: "square",
    size: 4,
    offsetX: -2,
    offsetY: -2,
    outline: 0,
};
function mergeRanges(input) {
    if (input.length === 0) {
        return [];
    }
    const ranges = [...input];
    const stack = [];
    ranges.sort(function (a, b) {
        return a[0] - b[0];
    });
    stack.push([...ranges[0]]);
    for (const range of ranges.slice(1)) {
        const top = stack[stack.length - 1];
        if (top[1] < range[0]) {
            stack.push([...range]);
        }
        else if (top[1] < range[1]) {
            top[1] = range[1];
        }
    }
    return stack;
}
let emptyCompactSelection;
/** @category Selection */
export class CompactSelection {
    items;
    constructor(items) {
        this.items = items;
    }
    static create = (items) => {
        return new CompactSelection(mergeRanges(items));
    };
    static empty = () => {
        return emptyCompactSelection ?? (emptyCompactSelection = new CompactSelection([]));
    };
    static fromSingleSelection = (selection) => {
        return CompactSelection.empty().add(selection);
    };
    static fromArray = (items) => {
        if (items.length === 0)
            return CompactSelection.empty();
        const slices = items.map(s => [s, s + 1]);
        const newItems = mergeRanges(slices);
        return new CompactSelection(newItems);
    };
    offset(amount) {
        if (amount === 0)
            return this;
        const newItems = this.items.map(x => [x[0] + amount, x[1] + amount]);
        return new CompactSelection(newItems);
    }
    add(selection) {
        const slice = typeof selection === "number" ? [selection, selection + 1] : selection;
        const newItems = mergeRanges([...this.items, slice]);
        return new CompactSelection(newItems);
    }
    remove(selection) {
        const items = [...this.items];
        const selMin = typeof selection === "number" ? selection : selection[0];
        const selMax = typeof selection === "number" ? selection + 1 : selection[1];
        for (const [i, slice] of items.entries()) {
            const [start, end] = slice;
            // Remove part of slice that intersects removed selection.
            if (start <= selMax && selMin <= end) {
                const toAdd = [];
                if (start < selMin) {
                    toAdd.push([start, selMin]);
                }
                if (selMax < end) {
                    toAdd.push([selMax, end]);
                }
                items.splice(i, 1, ...toAdd);
            }
        }
        return new CompactSelection(items);
    }
    first() {
        if (this.items.length === 0)
            return undefined;
        return this.items[0][0];
    }
    last() {
        if (this.items.length === 0)
            return undefined;
        return this.items.slice(-1)[0][1] - 1;
    }
    hasIndex(index) {
        for (let i = 0; i < this.items.length; i++) {
            const [start, end] = this.items[i];
            if (index >= start && index < end)
                return true;
        }
        return false;
    }
    hasAll(index) {
        for (let x = index[0]; x < index[1]; x++) {
            if (!this.hasIndex(x))
                return false;
        }
        return true;
    }
    some(predicate) {
        for (const i of this) {
            if (predicate(i))
                return true;
        }
        return false;
    }
    equals(other) {
        if (other === this)
            return true;
        if (other.items.length !== this.items.length)
            return false;
        for (let i = 0; i < this.items.length; i++) {
            const left = other.items[i];
            const right = this.items[i];
            if (left[0] !== right[0] || left[1] !== right[1])
                return false;
        }
        return true;
    }
    // Really old JS wont have access to the iterator and babel will stop people using it
    // when trying to support browsers so old we don't support them anyway. What goes on
    // between an engineer and their bundler in the privacy of their CI server is none of
    // my business anyway.
    toArray() {
        const result = [];
        for (const [start, end] of this.items) {
            for (let x = start; x < end; x++) {
                result.push(x);
            }
        }
        return result;
    }
    get length() {
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
//# sourceMappingURL=data-grid-types.js.map