import { drawCheckbox } from "../data-grid-drawing";
import { getMiddleCenterBias } from "../data-grid-lib";
import { InnerGridCellKind, MarkerCell } from "../data-grid-types";
import type { BaseDrawArgs, InternalCellRenderer, PrepResult } from "./cell-types";

export const markerCellRenderer: InternalCellRenderer<MarkerCell> = {
    getAccessibilityString: c => c.row.toString(),
    kind: InnerGridCellKind.Marker,
    needsHover: true,
    needsHoverPosition: false,
    drawPrep: prepMarkerRowCell,
    measure: () => 44,
    draw: a => drawMarkerRowCell(a, a.cell.row, a.cell.checked, a.cell.markerKind, a.cell.drawHandle),
    onClick: e => {
        const { bounds, cell, posX: x, posY: y } = e;
        const { width, height } = bounds;

        const centerX = cell.drawHandle ? 7 + (width - 7) / 2 : width / 2;
        const centerY = height / 2;

        if (Math.abs(x - centerX) <= 10 && Math.abs(y - centerY) <= 10) {
            return {
                ...cell,
                checked: !cell.checked,
            };
        }
        return undefined;
    },
    onPaste: () => undefined,
};

function prepMarkerRowCell(args: BaseDrawArgs, lastPrep: PrepResult | undefined): Partial<PrepResult> {
    const { ctx, theme } = args;
    const newFont = `9px ${theme.fontFamily}`;
    const result: Partial<PrepResult> = lastPrep ?? {};
    if (result?.font !== newFont) {
        ctx.font = newFont;
        result.font = newFont;
    }
    result.deprep = deprepMarkerRowCell;
    ctx.textAlign = "center";
    return result;
}

function deprepMarkerRowCell(args: Pick<BaseDrawArgs, "ctx">) {
    const { ctx } = args;
    ctx.textAlign = "start";
}

function drawMarkerRowCell(
    args: BaseDrawArgs,
    index: number,
    checked: boolean,
    markerKind: "checkbox" | "both" | "number" | "checkbox-visible",
    drawHandle: boolean
) {
    const { ctx, rect, hoverAmount, theme } = args;
    const { x, y, width, height } = rect;
    const checkedboxAlpha = checked ? 1 : markerKind === "checkbox-visible" ? 0.6 + 0.4 * hoverAmount : hoverAmount;
    if (markerKind !== "number" && checkedboxAlpha > 0) {
        ctx.globalAlpha = checkedboxAlpha;
        const offsetAmount = 7 * (checked ? hoverAmount : 1);
        drawCheckbox(
            ctx,
            theme,
            checked,
            drawHandle ? x + offsetAmount : x,
            y,
            drawHandle ? width - offsetAmount : width,
            height,
            true,
            undefined,
            undefined,
            18
        );
        if (drawHandle) {
            ctx.globalAlpha = hoverAmount;
            ctx.beginPath();
            for (const xOffset of [3, 6]) {
                for (const yOffset of [-5, -1, 3]) {
                    ctx.rect(x + xOffset, y + height / 2 + yOffset, 2, 2);
                }
            }

            ctx.fillStyle = theme.textLight;
            ctx.fill();
            ctx.beginPath();
        }
        ctx.globalAlpha = 1;
    }
    if (markerKind === "number" || (markerKind === "both" && !checked)) {
        const text = index.toString();

        const start = x + width / 2;
        if (markerKind === "both" && hoverAmount !== 0) {
            ctx.globalAlpha = 1 - hoverAmount;
        }
        ctx.fillStyle = theme.textLight;
        ctx.fillText(text, start, y + height / 2 + getMiddleCenterBias(ctx, `9px ${theme.fontFamily}`));
        if (hoverAmount !== 0) {
            ctx.globalAlpha = 1;
        }
    }
}
