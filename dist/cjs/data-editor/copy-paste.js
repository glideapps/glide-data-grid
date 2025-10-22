/* eslint-disable sonarjs/no-duplicate-string */
import { assertNever } from "../common/support.js";
import { BooleanIndeterminate, GridCellKind, } from "../internal/data-grid/data-grid-types.js";
function convertCellToBuffer(cell) {
    if (cell.copyData !== undefined) {
        return {
            formatted: cell.copyData,
            rawValue: cell.copyData,
            format: "string",
            // Do not escape the copy value if it was explicitly specified via copyData:
            doNotEscape: true,
        };
    }
    switch (cell.kind) {
        case GridCellKind.Boolean:
            return {
                formatted: cell.data === true
                    ? "TRUE"
                    : cell.data === false
                        ? "FALSE"
                        : cell.data === BooleanIndeterminate
                            ? "INDETERMINATE"
                            : "",
                rawValue: cell.data,
                format: "boolean",
            };
        case GridCellKind.Custom:
            return {
                formatted: cell.copyData,
                rawValue: cell.copyData,
                format: "string",
            };
        case GridCellKind.Image:
        case GridCellKind.Bubble:
            return {
                formatted: cell.data,
                rawValue: cell.data,
                format: "string-array",
            };
        case GridCellKind.Drilldown:
            return {
                formatted: cell.data.map(x => x.text),
                rawValue: cell.data.map(x => x.text),
                format: "string-array",
            };
        case GridCellKind.Text:
            return {
                formatted: cell.displayData ?? cell.data,
                rawValue: cell.data,
                format: "string",
            };
        case GridCellKind.Uri:
            return {
                formatted: cell.displayData ?? cell.data,
                rawValue: cell.data,
                format: "url",
            };
        case GridCellKind.Markdown:
        case GridCellKind.RowID:
            return {
                formatted: cell.data,
                rawValue: cell.data,
                format: "string",
            };
        case GridCellKind.Number:
            return {
                formatted: cell.displayData,
                rawValue: cell.data,
                format: "number",
            };
        case GridCellKind.Loading:
            return {
                formatted: "#LOADING",
                rawValue: "",
                format: "string",
            };
        case GridCellKind.Protected:
            return {
                formatted: "************",
                rawValue: "",
                format: "string",
            };
        default:
            assertNever(cell);
    }
}
function createBufferFromGridCells(cells, columnIndexes) {
    const copyBuffer = cells.map((row, index) => {
        const mappedIndex = columnIndexes[index];
        return row.map(cell => {
            if (cell.span !== undefined && cell.span[0] !== mappedIndex)
                return {
                    formatted: "",
                    rawValue: "",
                    format: "string",
                };
            return convertCellToBuffer(cell);
        });
    });
    return copyBuffer;
}
function escapeIfNeeded(str, withComma) {
    if ((withComma ? /[\t\n",]/ : /[\t\n"]/).test(str)) {
        str = `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}
function createTextBuffer(copyBuffer) {
    const lines = [];
    for (const row of copyBuffer) {
        const line = [];
        for (const cell of row) {
            if (cell.format === "url") {
                line.push(cell.rawValue?.toString() ?? "");
            }
            else if (cell.format === "string-array") {
                line.push(cell.formatted.map(x => escapeIfNeeded(x, true)).join(","));
            }
            else {
                line.push(cell.doNotEscape === true ? cell.formatted : escapeIfNeeded(cell.formatted, false));
            }
        }
        lines.push(line.join("\t"));
    }
    return lines.join("\n");
}
function formatHtmlTextContent(text) {
    // The following formatting for the `html` variable ensures that when pasting,
    // spaces are preserved in both Google Sheets and Excel. This is done by:
    // 1. Replacing tabs with four spaces for consistency. Also google sheets disallows any tabs.
    // 2. Wrapping each space with a span element to prevent them from being collapsed or ignored during the
    //    paste operation
    return text.replace(/\t/g, "    ").replace(/ {2,}/g, match => "<span> </span>".repeat(match.length));
}
function formatHtmlAttributeContent(attrText) {
    // Escape all quotes, lt, gt, and other special characters
    return ('"' + attrText.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '"');
}
function restoreHtmlEntities(str) {
    // Unescape all quotes, lt, gt, and other special characters
    return str
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
}
function createHtmlBuffer(copyBuffer) {
    const lines = [];
    lines.push(`<style type="text/css"><!--br {mso-data-placement:same-cell;}--></style>`, "<table><tbody>");
    for (const row of copyBuffer) {
        lines.push("<tr>");
        for (const cell of row) {
            const formatStr = `gdg-format="${cell.format}"`;
            if (cell.format === "url") {
                lines.push(`<td ${formatStr}><a href="${cell.rawValue}">${formatHtmlTextContent(cell.formatted)}</a></td>`);
            }
            else {
                if (cell.format === "string-array") {
                    lines.push(`<td ${formatStr}><ol>${cell.formatted
                        .map((x, ind) => `<li gdg-raw-value=${formatHtmlAttributeContent(cell.rawValue[ind])}>` +
                        formatHtmlTextContent(x) +
                        "</li>")
                        .join("")}</ol></td>`);
                }
                else {
                    lines.push(`<td gdg-raw-value=${formatHtmlAttributeContent(cell.rawValue?.toString() ?? "")} ${formatStr}>${formatHtmlTextContent(cell.formatted)}</td>`);
                }
            }
        }
        lines.push("</tr>");
    }
    lines.push("</tbody></table>");
    return lines.join("");
}
// This function encodes grid cells to a table object.
// Each td in the table contains one of 3 things
// - A string directly and the td has a `gdg-raw-value` attribute with the raw value
// - An anchor tag with a href and the text is the formatted value
// - An ordered list with each item containing a `gdg-raw-value` attribute with the raw value
export function getCopyBufferContents(cells, columnIndexes) {
    const copyBuffer = createBufferFromGridCells(cells, columnIndexes);
    const textPlain = createTextBuffer(copyBuffer);
    const textHtml = createHtmlBuffer(copyBuffer);
    return {
        textPlain,
        textHtml,
    };
}
export function decodeHTML(html) {
    const fragment = document.createElement("html");
    // we dont want to retain the pasted non-breaking spaces
    fragment.innerHTML = html.replace(/&nbsp;/g, " ");
    const tableEl = fragment.querySelector("table");
    if (tableEl === null)
        return undefined;
    const walkEl = [tableEl];
    const result = [];
    let current;
    while (walkEl.length > 0) {
        const el = walkEl.pop();
        if (el === undefined)
            break;
        if (el instanceof HTMLTableElement || el.nodeName === "TBODY") {
            walkEl.push(...[...el.children].reverse());
        }
        else if (el instanceof HTMLTableRowElement) {
            if (current !== undefined) {
                result.push(current);
            }
            current = [];
            walkEl.push(...[...el.children].reverse());
        }
        else if (el instanceof HTMLTableCellElement) {
            // be careful not to use innerText here as its behavior is not well defined for non DOM attached nodes
            const clone = el.cloneNode(true);
            // Apple numbers seems to always wrap the cell in a p tag and a font tag. It also puts both <br> and \n
            // linebreak markers in the code. This is both unneeded and causes issues with the paste code.
            const firstTagIsPara = clone.children.length === 1 && clone.children[0].nodeName === "P";
            const para = firstTagIsPara ? clone.children[0] : null;
            const isAppleNumbers = para?.children.length === 1 && para.children[0].nodeName === "FONT";
            const brs = clone.querySelectorAll("br");
            for (const br of brs) {
                br.replaceWith("\n");
            }
            const attributeValue = clone.getAttribute("gdg-raw-value");
            const formatValue = (clone.getAttribute("gdg-format") ?? "string"); // fix me at some point
            if (clone.querySelector("a") !== null) {
                current?.push({
                    // raw value is the href
                    rawValue: clone.querySelector("a")?.getAttribute("href") ?? "",
                    formatted: clone.textContent ?? "",
                    format: formatValue,
                });
            }
            else if (clone.querySelector("ol") !== null) {
                const rawValues = clone.querySelectorAll("li");
                current?.push({
                    rawValue: [...rawValues].map(x => x.getAttribute("gdg-raw-value") ?? ""),
                    formatted: [...rawValues].map(x => x.textContent ?? ""),
                    format: "string-array",
                });
            }
            else if (attributeValue !== null) {
                current?.push({
                    rawValue: restoreHtmlEntities(attributeValue),
                    formatted: clone.textContent ?? "",
                    format: formatValue,
                });
            }
            else {
                let textContent = clone.textContent ?? "";
                if (isAppleNumbers) {
                    // replace any newline not preceded by a newline
                    textContent = textContent.replace(/\n(?!\n)/g, "");
                }
                current?.push({
                    rawValue: textContent ?? "",
                    formatted: textContent ?? "",
                    format: formatValue,
                });
            }
        }
    }
    if (current !== undefined) {
        result.push(current);
    }
    return result;
}
//# sourceMappingURL=copy-paste.js.map