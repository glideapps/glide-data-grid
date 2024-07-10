"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleBoolean = exports.copyToClipboard = exports.unquote = exports.expandSelection = void 0;
const copy_paste_js_1 = require("./copy-paste.js");
function expandSelection(newVal, getCellsForSelection, rowMarkerOffset, spanRangeBehavior, abortController) {
    const origVal = newVal;
    if (spanRangeBehavior === "allowPartial" || newVal.current === undefined || getCellsForSelection === undefined)
        return newVal;
    let isFilled = false;
    do {
        if (newVal?.current === undefined)
            break;
        const r = newVal.current?.range;
        const cells = [];
        if (r.width > 2) {
            const leftCells = getCellsForSelection({
                x: r.x,
                y: r.y,
                width: 1,
                height: r.height,
            }, abortController.signal);
            if (typeof leftCells === "function") {
                return origVal;
            }
            cells.push(...leftCells);
            const rightCells = getCellsForSelection({
                x: r.x + r.width - 1,
                y: r.y,
                width: 1,
                height: r.height,
            }, abortController.signal);
            if (typeof rightCells === "function") {
                return origVal;
            }
            cells.push(...rightCells);
        }
        else {
            const rCells = getCellsForSelection({
                x: r.x,
                y: r.y,
                width: r.width,
                height: r.height,
            }, abortController.signal);
            if (typeof rCells === "function") {
                return origVal;
            }
            cells.push(...rCells);
        }
        let left = r.x - rowMarkerOffset;
        let right = r.x + r.width - 1 - rowMarkerOffset;
        for (const row of cells) {
            for (const cell of row) {
                if (cell.span === undefined)
                    continue;
                left = Math.min(cell.span[0], left);
                right = Math.max(cell.span[1], right);
            }
        }
        if (left === r.x - rowMarkerOffset && right === r.x + r.width - 1 - rowMarkerOffset) {
            isFilled = true;
        }
        else {
            newVal = {
                current: {
                    cell: newVal.current.cell ?? [0, 0],
                    range: {
                        x: left + rowMarkerOffset,
                        y: r.y,
                        width: right - left + 1,
                        height: r.height,
                    },
                    rangeStack: newVal.current.rangeStack,
                },
                columns: newVal.columns,
                rows: newVal.rows,
            };
        }
    } while (!isFilled);
    return newVal;
}
exports.expandSelection = expandSelection;
function descape(s) {
    if (s.startsWith('"') && s.endsWith('"')) {
        s = s.slice(1, -1).replace(/""/g, '"');
    }
    return s;
}
function unquote(str) {
    const result = [];
    let current = [];
    let start = 0;
    let state = 0 /* State.None */;
    str = str.replace(/\r\n/g, "\n");
    let index = 0;
    for (const char of str) {
        switch (state) {
            case 0 /* State.None */:
                if (char === "\t" || char === "\n") {
                    current.push(str.slice(start, index));
                    start = index + 1;
                    if (char === "\n") {
                        result.push(current);
                        current = [];
                    }
                }
                else if (char === `"`) {
                    state = 1 /* State.inString */;
                }
                break;
            case 1 /* State.inString */:
                if (char === `"`) {
                    state = 2 /* State.inStringPostQuote */;
                }
                break;
            case 2 /* State.inStringPostQuote */:
                if (char === '"') {
                    state = 1 /* State.inString */;
                }
                else if (char === "\t" || char === "\n") {
                    current.push(descape(str.slice(start, index)));
                    start = index + 1;
                    if (char === "\n") {
                        result.push(current);
                        current = [];
                    }
                    state = 0 /* State.None */;
                }
                else {
                    state = 0 /* State.None */;
                }
                break;
        }
        index++;
    }
    if (start < str.length) {
        current.push(descape(str.slice(start, str.length)));
    }
    result.push(current);
    return result.map(r => r.map(c => ({ rawValue: c, formatted: c, format: "string" })));
}
exports.unquote = unquote;
function copyToClipboard(cells, columnIndexes, e) {
    const copyBuffer = (0, copy_paste_js_1.getCopyBufferContents)(cells, columnIndexes);
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const copyWithWriteText = (s) => {
        void window.navigator.clipboard?.writeText(s);
    };
    const copyWithWrite = (s, html) => {
        if (window.navigator.clipboard?.write === undefined)
            return false;
        void window.navigator.clipboard.write([
            new ClipboardItem({
                // eslint-disable-next-line sonarjs/no-duplicate-string
                "text/plain": new Blob([s], { type: "text/plain" }),
                "text/html": new Blob([html], {
                    type: "text/html",
                }),
            }),
        ]);
        return true;
    };
    const copyWithClipboardData = (s, html) => {
        try {
            if (e === undefined || e.clipboardData === null)
                throw new Error("No clipboard data");
            // This might fail if we had to await the thunk
            e?.clipboardData?.setData("text/plain", s);
            e?.clipboardData?.setData("text/html", html);
        }
        catch {
            if (!copyWithWrite(s, html)) {
                copyWithWriteText(s);
            }
        }
    };
    if (window.navigator.clipboard?.write !== undefined || e?.clipboardData !== undefined) {
        void copyWithClipboardData(copyBuffer.textPlain, copyBuffer.textHtml);
    }
    else {
        void copyWithWriteText(copyBuffer.textPlain);
    }
    e?.preventDefault();
}
exports.copyToClipboard = copyToClipboard;
/**
 * Checkbox behavior:
 *
 * true + click -> unchecked
 * false + click -> checked
 * indeterminate + click -> checked
 * empty + click -> checked
 */
function toggleBoolean(data) {
    return data !== true;
}
exports.toggleBoolean = toggleBoolean;
//# sourceMappingURL=data-editor-fns.js.map