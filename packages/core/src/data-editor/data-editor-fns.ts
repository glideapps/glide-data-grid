import { assertNever } from "../common/support";
import type { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import {
    BooleanEmpty,
    BooleanIndeterminate,
    GridCell,
    GridCellKind,
    GridSelection,
    Rectangle,
} from "../data-grid/data-grid-types";

export function expandSelection(
    newVal: GridSelection,
    getCellsForSelection: DataGridSearchProps["getCellsForSelection"],
    rowMarkerOffset: number,
    spanRangeBehavior: "allowPartial" | "default",
    abortController: AbortController
): GridSelection {
    const origVal = newVal;
    if (spanRangeBehavior === "allowPartial" || newVal.current === undefined) return newVal;
    if (getCellsForSelection !== undefined) {
        let isFilled = false;
        do {
            if (newVal?.current === undefined) break;
            const r: Rectangle = newVal.current?.range;
            const cells: (readonly GridCell[])[] = [];
            if (r.width > 2) {
                const leftCells = getCellsForSelection(
                    {
                        x: r.x,
                        y: r.y,
                        width: 1,
                        height: r.height,
                    },
                    abortController.signal
                );

                if (typeof leftCells === "function") {
                    return origVal;
                }

                cells.push(...leftCells);

                const rightCells = getCellsForSelection(
                    {
                        x: r.x + r.width - 1,
                        y: r.y,
                        width: 1,
                        height: r.height,
                    },
                    abortController.signal
                );

                if (typeof rightCells === "function") {
                    return origVal;
                }

                cells.push(...rightCells);
            } else {
                const rCells = getCellsForSelection(
                    {
                        x: r.x,
                        y: r.y,
                        width: r.width,
                        height: r.height,
                    },
                    abortController.signal
                );
                if (typeof rCells === "function") {
                    return origVal;
                }
                cells.push(...rCells);
            }

            let left = r.x - rowMarkerOffset;
            let right = r.x + r.width - 1 - rowMarkerOffset;
            for (const row of cells) {
                for (const cell of row) {
                    if (cell.span === undefined) continue;
                    left = Math.min(cell.span[0], left);
                    right = Math.max(cell.span[1], right);
                }
            }

            if (left === r.x - rowMarkerOffset && right === r.x + r.width - 1 - rowMarkerOffset) {
                isFilled = true;
            } else {
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
    }
    return newVal;
}

function descape(s: string): string {
    if (s.startsWith('"') && s.endsWith('"')) {
        s = s.slice(1, -1).replace(/""/g, '"');
    }
    return s;
}

export function unquote(str: string): string[][] {
    const enum State {
        None,
        inString,
        inStringPostQuote,
    }

    const result: string[][] = [];
    let current: string[] = [];

    let start = 0;
    let state = State.None;
    str = str.replace(/\r\n/g, "\n");
    let index = 0;
    for (const char of str) {
        switch (state) {
            case State.None:
                if (char === "\t" || char === "\n") {
                    current.push(str.slice(start, index));
                    start = index + 1;

                    if (char === "\n") {
                        result.push(current);
                        current = [];
                    }
                } else if (char === `"`) {
                    state = State.inString;
                }
                break;
            case State.inString:
                if (char === `"`) {
                    state = State.inStringPostQuote;
                }
                break;
            case State.inStringPostQuote:
                if (char === '"') {
                    state = State.inString;
                } else if (char === "\t" || char === "\n") {
                    current.push(descape(str.slice(start, index)));
                    start = index + 1;

                    if (char === "\n") {
                        result.push(current);
                        current = [];
                    }
                    state = State.None;
                } else {
                    state = State.None;
                }
                break;
        }

        index++;
    }
    if (start < str.length) {
        current.push(descape(str.slice(start, str.length)));
    }
    result.push(current);
    return result;
}

export function decodeHTML(tableEl: HTMLTableElement): string[][] | undefined {
    const walkEl: Element[] = [tableEl];
    const result: string[][] = [];
    let current: string[] | undefined;

    while (walkEl.length > 0) {
        const el = walkEl.pop();

        if (el === undefined) break;

        if (el instanceof HTMLTableElement || el.nodeName === "TBODY") {
            walkEl.push(...[...el.children].reverse());
        } else if (el instanceof HTMLTableRowElement) {
            if (current !== undefined) {
                result.push(current);
            }
            current = [];
            walkEl.push(...[...el.children].reverse());
        } else if (el instanceof HTMLTableCellElement) {
            current?.push(el.innerText ?? el.textContent ?? "");
        }
    }

    if (current !== undefined) {
        result.push(current);
    }

    return result;
}

function escape(str: string, actuallyEscape: boolean): string {
    if (!actuallyEscape) return str;
    if (/[\t\n",]/.test(str)) {
        str = `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

const formatBoolean = (val: boolean | BooleanEmpty | BooleanIndeterminate): string => {
    switch (val) {
        case true:
            return "TRUE";

        case false:
            return "FALSE";

        case BooleanIndeterminate:
            return "INDETERMINATE";

        case BooleanEmpty:
            return "";

        default:
            assertNever(val, `A boolean was formated with invalid type: ${typeof val}`);
    }
};

export function formatCell(
    cell: GridCell,
    index: number,
    raw: boolean,
    columnIndexes: readonly number[],
    escapeValues: boolean
) {
    const colIndex = columnIndexes[index];
    if (cell.span !== undefined && cell.span[0] !== colIndex) return "";
    if (cell.copyData !== undefined) {
        return escape(cell.copyData, escapeValues);
    }
    switch (cell.kind) {
        case GridCellKind.Text:
        case GridCellKind.Number:
            return escape(raw ? cell.data?.toString() ?? "" : cell.displayData, escapeValues);
        case GridCellKind.Markdown:
        case GridCellKind.RowID:
        case GridCellKind.Uri:
            return escape(cell.data, escapeValues);
        case GridCellKind.Image:
        case GridCellKind.Bubble:
            if (cell.data.length === 0) return "";
            return cell.data.reduce((pv, cv) => `${escape(pv, escapeValues)},${escape(cv, escapeValues)}`);
        case GridCellKind.Boolean:
            return formatBoolean(cell.data);
        case GridCellKind.Loading:
            return raw ? "" : "#LOADING";
        case GridCellKind.Protected:
            return raw ? "" : "************";
        case GridCellKind.Drilldown:
            if (cell.data.length === 0) return "";
            return cell.data
                .map(i => i.text)
                .reduce((pv, cv) => `${escape(pv, escapeValues)},${escape(cv, escapeValues)}`);
        case GridCellKind.Custom:
            return escape(cell.copyData, escapeValues);
        default:
            assertNever(cell, `A cell was passed with an invalid kind: ${(cell as any).kind}`);
    }
}

export function formatForCopy(cells: readonly (readonly GridCell[])[], columnIndexes: readonly number[]): string {
    return cells.map(row => row.map((a, b) => formatCell(a, b, false, columnIndexes, true)).join("\t")).join("\n");
}

export function copyToClipboard(
    cells: readonly (readonly GridCell[])[],
    columnIndexes: readonly number[],
    e?: ClipboardEvent
) {
    const str = formatForCopy(cells, columnIndexes);

    const styleTag = `<style type="text/css"><!--br {mso-data-placement:same-cell;}--></style>`;

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const copyWithWriteText = (s: string) => {
        void window.navigator.clipboard?.writeText(s);
    };

    const copyWithWrite = (s: string, html: string): boolean => {
        if (window.navigator.clipboard?.write === undefined) return false;
        void window.navigator.clipboard.write([
            new ClipboardItem({
                // eslint-disable-next-line sonarjs/no-duplicate-string
                "text/plain": new Blob([s], { type: "text/plain" }),
                "text/html": new Blob([`${styleTag}<table>${html}</table>`], {
                    type: "text/html",
                }),
            }),
        ]);
        return true;
    };

    const copyWithClipboardData = (s: string, html: string) => {
        try {
            if (e === undefined || e.clipboardData === null) throw new Error("No clipboard data");

            // The following formatting for the `formattedHtml` variable ensures that when pasting,
            // spaces are preserved in both Google Sheets and Excel. This is done by:
            // 1. Replacing tabs with four spaces for consistency. Also google sheets disallows any tabs.
            // 2. Wrapping each space with a span element to prevent them from being collapsed or ignored during the
            //    paste operation.
            const formattedHtml = `${styleTag}<table>${html
                .replace(/\t/g, "    ")
                .replace(/ /g, "<span>&nbsp;</span>")}</table>`;

            // This might fail if we had to await the thunk
            e?.clipboardData?.setData("text/plain", s);
            e?.clipboardData?.setData("text/html", formattedHtml);
        } catch {
            if (!copyWithWrite(s, html)) {
                copyWithWriteText(s);
            }
        }
    };

    if (window.navigator.clipboard?.write !== undefined || e?.clipboardData !== undefined) {
        const rootEl = document.createElement("tbody");

        for (const row of cells) {
            const rowEl = document.createElement("tr");

            for (const [i, cell] of row.entries()) {
                const cellEl = document.createElement("td");
                if (cell.kind === GridCellKind.Uri) {
                    const link = document.createElement("a");
                    link.href = cell.data;
                    link.innerText = cell.data;
                    cellEl.append(link);
                } else {
                    cellEl.innerText = formatCell(cell, i, true, columnIndexes, false);
                }
                rowEl.append(cellEl);
            }

            rootEl.append(rowEl);
        }
        void copyWithClipboardData(str, rootEl.outerHTML);
    } else {
        void copyWithWriteText(str);
    }

    e?.preventDefault();
}
