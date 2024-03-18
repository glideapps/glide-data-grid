import type { FullTheme } from "../../../common/styles.js";
import type { Rectangle, HoverEffectTheme } from "../../../index.js";
import { roundedRect, measureTextCached } from "./data-grid-lib.js";
import { withAlpha } from "../color-parser.js";

export function drawEditHoverIndicator(
    ctx: CanvasRenderingContext2D,
    theme: FullTheme,
    effectTheme: HoverEffectTheme | undefined,
    displayData: string,
    rect: Rectangle,
    hoverAmount: number,
    overrideCursor: ((cursor: React.CSSProperties["cursor"] | undefined) => void) | undefined
) {
    ctx.textBaseline = "alphabetic";

    const effectRect = getHoverEffectRect(ctx, rect, displayData, theme, effectTheme?.fullSize ?? false);

    ctx.beginPath();
    roundedRect(ctx, effectRect.x, effectRect.y, effectRect.width, effectRect.height, theme.roundingRadius ?? 4);
    ctx.globalAlpha = hoverAmount;
    ctx.fillStyle = effectTheme?.bgColor ?? withAlpha(theme.textDark, 0.1);
    ctx.fill();

    // restore
    ctx.globalAlpha = 1;
    ctx.fillStyle = theme.textDark;
    ctx.textBaseline = "middle";

    overrideCursor?.("text");
}

function getHoverEffectRect(
    ctx: CanvasRenderingContext2D,
    cellRect: Rectangle,
    displayData: string,
    theme: FullTheme,
    fullSize: boolean
): Rectangle {
    const padX = theme.cellHorizontalPadding;
    const padY = theme.cellVerticalPadding;

    if (fullSize) {
        return {
            x: cellRect.x + padX / 2,
            y: cellRect.y + padY / 2 + 1,
            width: cellRect.width - padX,
            height: cellRect.height - padY - 1,
        };
    }

    const m = measureTextCached(displayData, ctx, theme.baseFontFull, "alphabetic");
    const maxH = cellRect.height - padY;
    const h = Math.min(maxH, m.actualBoundingBoxAscent * 2.5);
    return {
        x: cellRect.x + padX / 2,
        y: cellRect.y + (cellRect.height - h) / 2 + 1,
        width: m.width + padX * 3,
        height: h - 1,
    };
}
