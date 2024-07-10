"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompactSelection = exports.InnerGridCellKind = exports.booleanCellIsEditable = exports.isObjectEditorCallbackResult = exports.isRectangleEqual = exports.isReadWriteCell = exports.isInnerOnlyCell = exports.isTextEditableGridCell = exports.isEditableGridCell = exports.resolveCellsThunk = exports.isSizedGridColumn = exports.GridColumnMenuIcon = exports.GridColumnIcon = exports.GridCellKind = exports.BooleanIndeterminate = exports.BooleanEmpty = void 0;
const support_js_1 = require("../../common/support.js");
const has_js_1 = __importDefault(require("lodash/has.js"));
/** @category Types */
exports.BooleanEmpty = null;
/** @category Types */
exports.BooleanIndeterminate = undefined;
/** @category Cells */
var GridCellKind;
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
})(GridCellKind || (exports.GridCellKind = GridCellKind = {}));
/** @category Columns */
var GridColumnIcon;
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
})(GridColumnIcon || (exports.GridColumnIcon = GridColumnIcon = {}));
/** @category Columns */
var GridColumnMenuIcon;
(function (GridColumnMenuIcon) {
    GridColumnMenuIcon["Triangle"] = "triangle";
    GridColumnMenuIcon["Dots"] = "dots";
})(GridColumnMenuIcon || (exports.GridColumnMenuIcon = GridColumnMenuIcon = {}));
/** @category Columns */
function isSizedGridColumn(c) {
    return "width" in c && typeof c.width === "number";
}
exports.isSizedGridColumn = isSizedGridColumn;
/** @category Types */
async function resolveCellsThunk(thunk) {
    if (typeof thunk === "object")
        return thunk;
    return await thunk();
}
exports.resolveCellsThunk = resolveCellsThunk;
// All EditableGridCells are inherently ValidatedGridCells, and this is more specific and thus more useful.
/** @category Cells */
function isEditableGridCell(cell) {
    if (cell.kind === GridCellKind.Loading ||
        cell.kind === GridCellKind.Bubble ||
        cell.kind === GridCellKind.RowID ||
        cell.kind === GridCellKind.Protected ||
        cell.kind === GridCellKind.Drilldown) {
        return false;
    }
    (0, support_js_1.proveType)(cell);
    return true;
}
exports.isEditableGridCell = isEditableGridCell;
/** @category Cells */
function isTextEditableGridCell(cell) {
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
    (0, support_js_1.proveType)(cell);
    return true;
}
exports.isTextEditableGridCell = isTextEditableGridCell;
/** @category Cells */
function isInnerOnlyCell(cell) {
    return cell.kind === InnerGridCellKind.Marker || cell.kind === InnerGridCellKind.NewRow;
}
exports.isInnerOnlyCell = isInnerOnlyCell;
/** @category Cells */
function isReadWriteCell(cell) {
    if (!isEditableGridCell(cell) || cell.kind === GridCellKind.Image)
        return false;
    if (cell.kind === GridCellKind.Text ||
        cell.kind === GridCellKind.Number ||
        cell.kind === GridCellKind.Markdown ||
        cell.kind === GridCellKind.Uri ||
        cell.kind === GridCellKind.Custom ||
        cell.kind === GridCellKind.Boolean) {
        return cell.readonly !== true;
    }
    (0, support_js_1.assertNever)(cell, "A cell was passed with an invalid kind");
}
exports.isReadWriteCell = isReadWriteCell;
function isRectangleEqual(a, b) {
    if (a === b)
        return true;
    if (a === undefined || b === undefined)
        return false;
    return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
exports.isRectangleEqual = isRectangleEqual;
/** @category Renderers */
function isObjectEditorCallbackResult(obj) {
    return (0, has_js_1.default)(obj, "editor");
}
exports.isObjectEditorCallbackResult = isObjectEditorCallbackResult;
// Can be written more concisely, not easier to read if more concise.
/** @category Cells */
function booleanCellIsEditable(cell) {
    return !(cell.readonly ?? false);
}
exports.booleanCellIsEditable = booleanCellIsEditable;
/** @category Cells */
var InnerGridCellKind;
(function (InnerGridCellKind) {
    InnerGridCellKind["NewRow"] = "new-row";
    InnerGridCellKind["Marker"] = "marker";
})(InnerGridCellKind || (exports.InnerGridCellKind = InnerGridCellKind = {}));
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
class CompactSelection {
    items;
    constructor(items) {
        this.items = items;
    }
    static empty = () => {
        return emptyCompactSelection ?? (emptyCompactSelection = new CompactSelection([]));
    };
    static fromSingleSelection = (selection) => {
        return CompactSelection.empty().add(selection);
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
exports.CompactSelection = CompactSelection;
//# sourceMappingURL=data-grid-types.js.map