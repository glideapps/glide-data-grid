/* eslint-disable react/display-name */
import * as React from "react";
import UriOverlayEditor from "../internal/data-grid-overlay-editor/private/uri-overlay-editor.js";
import {
    drawTextCell,
    getMeasuredTextCache,
    measureTextCached,
    prepTextCell,
} from "../internal/data-grid/data-grid-lib.js";
import {
    GridCellKind,
    type BaseGridCell,
    type Rectangle,
    type UriCell,
} from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";
import { blend } from "../internal/data-grid/color-parser.js";
import type { Theme } from "../common/styles.js";
import { pointInRect } from "../internal/data-grid/data-grid-render.js";

function getTextRect(
    metrics: TextMetrics,
    rect: Rectangle,
    theme: Theme,
    contentAlign: BaseGridCell["contentAlign"]
): Rectangle {
    let x = theme.cellHorizontalPadding;
    const y = rect.height / 2 - metrics.actualBoundingBoxAscent / 2;
    const width = metrics.width;
    const height = metrics.actualBoundingBoxAscent;

    if (contentAlign === "right") {
        x = rect.width - width - theme.cellHorizontalPadding;
    } else if (contentAlign === "center") {
        x = rect.width / 2 - width / 2;
    }

    return { x, y, width, height };
}

export const uriCellRenderer: InternalCellRenderer<UriCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: GridCellKind.Uri,
    needsHover: true,
    needsHoverPosition: true,
    useLabel: true,
    drawPrep: prepTextCell,
    draw: a => {
        const { cell, theme, overrideCursor, hoverX, hoverY, rect, ctx, highlighted } = a;
        const txt = cell.displayData ?? cell.data;
        if (overrideCursor !== undefined && cell.hoverEffect === true && hoverX !== undefined && hoverY !== undefined) {
            const m = measureTextCached(txt, ctx, `${theme.baseFontStyle} ${theme.fontFamily}`);
            const textRect = getTextRect(m, rect, theme, cell.contentAlign);

            const { x, y, width: w, height: h } = textRect;

            // check if hoverX and hoverY inside the box
            if (hoverX >= x - 4 && hoverX <= x - 4 + w + 8 && hoverY >= y - 4 && hoverY <= y - 4 + h + 8) {
                overrideCursor("pointer");
                const underlineOffset = 4;

                ctx.beginPath();
                ctx.moveTo(rect.x + x, Math.floor(rect.y + y + h + underlineOffset) + 0.5);
                ctx.lineTo(rect.x + x + w, Math.floor(rect.y + y + h + underlineOffset) + 0.5);

                ctx.strokeStyle = theme.textDark;
                ctx.stroke();

                ctx.save();
                ctx.fillStyle = highlighted ? blend(theme.accentLight, theme.bgCell) : theme.bgCell;
                drawTextCell({ ...a, rect: { ...rect, x: rect.x - 1 } }, txt, cell.contentAlign);
                drawTextCell({ ...a, rect: { ...rect, x: rect.x - 2 } }, txt, cell.contentAlign);
                drawTextCell({ ...a, rect: { ...rect, x: rect.x + 1 } }, txt, cell.contentAlign);
                drawTextCell({ ...a, rect: { ...rect, x: rect.x + 2 } }, txt, cell.contentAlign);
                ctx.restore();
            }
        }

        drawTextCell(a, txt, cell.contentAlign);
    },
    onClick: a => {
        const { cell, bounds, posX, posY, theme } = a;
        const txt = cell.displayData ?? cell.data;
        if (cell.hoverEffect !== true || cell.onClickUri === undefined) return;

        const m = getMeasuredTextCache(txt, `${theme.baseFontStyle} ${theme.fontFamily}`);
        if (m === undefined) return;
        const textRect = getTextRect(m, bounds, theme, cell.contentAlign);
        const didClick = pointInRect(
            {
                x: textRect.x - 4,
                y: textRect.y - 4,
                width: textRect.width + 8,
                height: textRect.height + 8,
            },
            posX,
            posY
        );
        if (didClick) {
            cell.onClickUri(a);
        }
        return undefined;
    },
    measure: (ctx, cell, theme) =>
        ctx.measureText(cell.displayData ?? cell.data).width + theme.cellHorizontalPadding * 2,
    onDelete: c => ({
        ...c,
        data: "",
    }),
    provideEditor: () => p => {
        const { onChange, value, forceEditMode, validatedSelection } = p;
        return (
            <UriOverlayEditor
                forceEditMode={forceEditMode}
                uri={value.data}
                preview={value.displayData ?? value.data}
                validatedSelection={validatedSelection}
                readonly={value.readonly === true}
                onChange={e =>
                    onChange({
                        ...value,
                        data: e.target.value,
                    })
                }
            />
        );
    },
    onPaste: (toPaste, cell, details) =>
        toPaste === cell.data
            ? undefined
            : { ...cell, data: toPaste, displayData: details.formattedString ?? cell.displayData },
};
