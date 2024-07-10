/* eslint-disable react/display-name */
import * as React from "react";
import { ImageOverlayEditor } from "../internal/data-grid-overlay-editor/private/image-overlay-editor.js";
import { roundedRect } from "../internal/data-grid/render/data-grid-lib.js";
import { GridCellKind } from "../internal/data-grid/data-grid-types.js";
export const imageCellRenderer = {
    getAccessibilityString: c => c.data.join(", "),
    kind: GridCellKind.Image,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    draw: a => drawImage(a, a.cell.displayData ?? a.cell.data, a.cell.rounding ?? a.theme.roundingRadius ?? 4, a.cell.contentAlign),
    measure: (_ctx, cell) => cell.data.length * 50,
    onDelete: c => ({
        ...c,
        data: [],
    }),
    provideEditor: () => p => {
        const { value, onFinishedEditing, imageEditorOverride } = p;
        const ImageEditor = imageEditorOverride ?? ImageOverlayEditor;
        return (React.createElement(ImageEditor, { urls: value.data, canWrite: value.readonly !== true, onCancel: onFinishedEditing, onChange: newImage => {
                onFinishedEditing({
                    ...value,
                    data: [newImage],
                });
            } }));
    },
    onPaste: (toPaste, cell) => {
        toPaste = toPaste.trim();
        const fragments = toPaste.split(",");
        const uris = fragments
            .map(f => {
            try {
                new URL(f);
                return f;
            }
            catch {
                return undefined;
            }
        })
            .filter(x => x !== undefined);
        if (uris.length === cell.data.length && uris.every((u, i) => u === cell.data[i]))
            return undefined;
        return {
            ...cell,
            data: uris,
        };
    },
};
const itemMargin = 4;
export function drawImage(args, data, rounding, contentAlign) {
    const { rect, col, row, theme, ctx, imageLoader } = args;
    const { x, y, height: h, width: w } = rect;
    const imgHeight = h - theme.cellVerticalPadding * 2;
    const images = [];
    let totalWidth = 0;
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < data.length; index++) {
        const i = data[index];
        if (i.length === 0)
            continue;
        const img = imageLoader.loadOrGetImage(i, col, row);
        if (img !== undefined) {
            images[index] = img;
            const imgWidth = img.width * (imgHeight / img.height);
            totalWidth += imgWidth + itemMargin;
        }
    }
    if (totalWidth === 0)
        return;
    totalWidth -= itemMargin;
    let drawX = x + theme.cellHorizontalPadding;
    if (contentAlign === "right")
        drawX = Math.floor(x + w - theme.cellHorizontalPadding - totalWidth);
    else if (contentAlign === "center")
        drawX = Math.floor(x + w / 2 - totalWidth / 2);
    for (const img of images) {
        if (img === undefined)
            continue; //array is sparse
        const imgWidth = img.width * (imgHeight / img.height);
        if (rounding > 0) {
            ctx.beginPath();
            roundedRect(ctx, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight, rounding);
            ctx.save();
            ctx.clip();
        }
        ctx.drawImage(img, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight);
        if (rounding > 0) {
            ctx.restore();
        }
        drawX += imgWidth + itemMargin;
    }
}
//# sourceMappingURL=image-cell.js.map