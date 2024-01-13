import * as React from "react";
import { styled } from "@linaria/react";

import {
    type CustomCell,
    type CustomRenderer,
    GridCellKind,
    getMiddleCenterBias,
    // type Theme,
    // measureTextCached,
} from "@glideapps/glide-data-grid";

// shamelessly stolen and mutilated from json-markup
const INDENT = "    ";

function style(cssClass: string, extra?: string) {
    let r = 'class="' + cssClass;
    if (extra) r += " " + cssClass + "-" + extra;
    return r + '"';
}

function type(
    doc: unknown
):
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function"
    | "null"
    | "array"
    | "link"
    | "date" {
    if (doc === null) return "null";
    if (Array.isArray(doc)) return "array";
    if (typeof doc === "string" && /^https?:/.test(doc)) return "link";
    if (typeof doc === "object" && typeof (doc as any).toISOString === "function") return "date";

    return typeof doc;
}

function escape(str: string) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightJSON(docString: string) {
    let doc: any;
    try {
        doc = JSON.parse(docString);
    } catch (e: any) {
        return `<span class="json-markup-error">Error: ${e.message}</span>`;
    }
    let indent = "";

    const forEach = function (list: any[], start: string, end: string, fn: (obj: any) => string) {
        if (!list.length) return start + " " + end;

        let out = start + "\n";

        indent += INDENT;
        list.forEach(function (key: string, i: number) {
            out += indent + fn(key) + (i < list.length - 1 ? "," : "") + "\n";
        });
        indent = indent.slice(0, -INDENT.length);

        return out + indent + end;
    };

    function visit(obj: any, depth: number): string {
        if (obj === undefined) return "";

        switch (type(obj)) {
            case "boolean":
                return "<span " + style("json-markup-bool") + ">" + obj + "</span>";

            case "number":
                return "<span " + style("json-markup-number") + ">" + obj + "</span>";

            case "date":
                return '<span class="json-markup-string">"' + escape(obj.toISOString()) + '"</span>';

            case "null":
                return "<span " + style("json-markup-null") + ">null</span>";

            case "string":
                return (
                    "<span " +
                    style("json-markup-string") +
                    '>"' +
                    escape(obj.replace(/\n/g, "\n" + indent)) +
                    '"</span>'
                );

            case "link":
                return (
                    "<span " +
                    style("json-markup-string") +
                    '>"<a href="' +
                    escape(obj) +
                    '">' +
                    escape(obj) +
                    '</a>"</span>'
                );

            case "array":
                return forEach(obj, "[", "]", (o: any) => visit(o, depth + 1));

            case "object": {
                const keys = Object.keys(obj).filter(function (key) {
                    return obj[key] !== undefined;
                });

                return forEach(keys, "{", "}", function (key: string) {
                    return (
                        "<span " +
                        style("json-markup-key", depth.toString()) +
                        '>"' +
                        escape(key) +
                        '":</span> ' +
                        visit(obj[key], depth + 1)
                    );
                });
            }
        }

        return "";
    }

    return "<div " + style("json-markup") + ">" + visit(doc, 0) + "</div>";
}

interface JSONCellProps {
    readonly kind: "json-cell";
    readonly json: string;
    readonly displayJson?: string;
    readonly onDesiredHeightChange?: (newHeight: number) => void;
}

export type JSONCell = CustomCell<JSONCellProps> & { readonly: true };

// const depthShift = 16;

// function isOverIcon(posX: number, posY: number, inset: number, theme: Theme, h: number) {
//     return (
//         posX >= inset + theme.cellHorizontalPadding - 4 &&
//         posX <= inset + theme.cellHorizontalPadding + 18 &&
//         posY >= h / 2 - 9 &&
//         posY <= h / 2 + 9
//     );
// }

// // FIXME: this should be exported
// function getEmHeight(ctx: CanvasRenderingContext2D, fontStyle: string): number {
//     const textMetrics = measureTextCached("ABCi09jgqpy", ctx, fontStyle); // do not question the magic string
//     return textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
// }

const EditorWrap = styled.div`
    font: var(--gdg-editor-font-size) monospace;
    padding-bottom: 4px;
    padding-right: 12px;

    color: #484c61;

    .json-markup-string {
        color: #485e30;
    }

    .json-markup-bool {
        color: #965027;
    }

    .json-markup-null {
        color: #965027;
    }

    .json-markup-number {
        color: #965027;
    }

    .json-markup-key {
        color: #34548a;
    }

    .json-markup-key-1.json-markup-key-1 {
        color: #166775;
    }

    .json-markup-key-2.json-markup-key-2 {
        color: #0f4b6e;
    }

    white-space: pre;
`;

const renderer: CustomRenderer<JSONCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is JSONCell => (c.data as any).kind === "json-cell",
    needsHover: true,
    needsHoverPosition: true,
    // onClick: args => {
    //     const { theme, bounds, posX, posY, cell } = args;
    //     const { height: h } = bounds;
    //     const { canOpen, depth, onClickOpener } = cell.data;

    //     if (!canOpen || onClickOpener === undefined) return;

    //     const overIcon = isOverIcon(posX, posY, depth * depthShift, theme, h);
    //     return overIcon ? onClickOpener(cell) : undefined;
    // },
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { x, y, height: h } = rect;

        // const fontStyle = theme.baseFontFull;
        const json = cell.data.displayJson ?? cell.data.json;

        // const emHeight = getEmHeight(ctx, fontStyle);
        // const lineHeight = measureTextCached("M", ctx).fontBoundingBoxAscent;

        const firstLine = json.split("\n", 1)[0];

        const bias = getMiddleCenterBias(ctx, theme);

        ctx.fillStyle = theme.textDark;
        ctx.fillText(firstLine, x + theme.cellHorizontalPadding + 0.5, y + h / 2 + bias);
    },
    provideEditor: () => {
        // eslint-disable-next-line react/display-name
        return p => (
            <EditorWrap>
                <div dangerouslySetInnerHTML={{ __html: highlightJSON(p.value.data.json) }} />
            </EditorWrap>
        );
    },
};

export default renderer;
