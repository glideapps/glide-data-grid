import { assertNever } from "../../../common/support.js";
import { getSquareBB, getSquareWidth, getSquareXPosFromAlign, pointIsWithinBB } from "../../../common/utils.js";
import { BooleanEmpty, BooleanIndeterminate } from "../data-grid-types.js";
import { roundedRect } from "./data-grid-lib.js";
export function drawCheckbox(ctx, theme, checked, x, y, width, height, highlighted, hoverX = -20, hoverY = -20, maxSize = undefined, alignment = "center", style = "square") {
    const centerY = Math.floor(y + height / 2);
    const rectBordRadius = style === "circle" ? 10_000 : (theme.roundingRadius ?? 4);
    let checkBoxWidth = getSquareWidth(maxSize ?? theme.checkboxMaxSize, height, theme.cellVerticalPadding);
    let checkBoxHalfWidth = checkBoxWidth / 2;
    const posX = getSquareXPosFromAlign(alignment, x, width, theme.cellHorizontalPadding, checkBoxWidth);
    const bb = getSquareBB(posX, centerY, checkBoxWidth);
    const hovered = pointIsWithinBB(x + hoverX, y + hoverY, bb);
    switch (checked) {
        case true: {
            ctx.beginPath();
            roundedRect(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
            if (style === "circle") {
                checkBoxHalfWidth *= 0.8;
                checkBoxWidth *= 0.8;
            }
            ctx.fillStyle = highlighted ? theme.accentColor : theme.textMedium;
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(posX - checkBoxHalfWidth + checkBoxWidth / 4.23, centerY - checkBoxHalfWidth + checkBoxWidth / 1.97);
            ctx.lineTo(posX - checkBoxHalfWidth + checkBoxWidth / 2.42, centerY - checkBoxHalfWidth + checkBoxWidth / 1.44);
            ctx.lineTo(posX - checkBoxHalfWidth + checkBoxWidth / 1.29, centerY - checkBoxHalfWidth + checkBoxWidth / 3.25);
            ctx.strokeStyle = theme.rowMarkerIcon ?? theme.bgCell;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.lineWidth = 1.9;
            ctx.stroke();
            break;
        }
        case BooleanEmpty:
        case false: {
            ctx.beginPath();
            roundedRect(ctx, posX - checkBoxWidth / 2 + 0.5, centerY - checkBoxWidth / 2 + 0.5, checkBoxWidth - 1, checkBoxWidth - 1, rectBordRadius);
            ctx.lineWidth = 1;
            ctx.strokeStyle = hovered ? theme.textDark : theme.textMedium;
            ctx.stroke();
            break;
        }
        case BooleanIndeterminate: {
            ctx.beginPath();
            roundedRect(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
            ctx.fillStyle = hovered ? theme.textMedium : theme.textLight;
            ctx.fill();
            if (style === "circle") {
                checkBoxHalfWidth *= 0.8;
                checkBoxWidth *= 0.8;
            }
            ctx.beginPath();
            ctx.moveTo(posX - checkBoxWidth / 3, centerY);
            ctx.lineTo(posX + checkBoxWidth / 3, centerY);
            ctx.strokeStyle = theme.bgCell;
            ctx.lineCap = "round";
            ctx.lineWidth = 1.9;
            ctx.stroke();
            break;
        }
        default:
            assertNever(checked);
    }
}
//# sourceMappingURL=draw-checkbox.js.map