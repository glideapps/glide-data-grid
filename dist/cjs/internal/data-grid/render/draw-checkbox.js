"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCheckbox = void 0;
const support_js_1 = require("../../../common/support.js");
const utils_js_1 = require("../../../common/utils.js");
const data_grid_lib_js_1 = require("./data-grid-lib.js");
const data_grid_types_js_1 = require("../data-grid-types.js");
function drawCheckbox(ctx, theme, checked, x, y, width, height, highlighted, hoverX = -20, hoverY = -20, maxSize = 32, alignment = "center", style = "square") {
    const centerY = Math.floor(y + height / 2);
    const rectBordRadius = style === "circle" ? 10000 : theme.roundingRadius ?? 4;
    let checkBoxWidth = (0, utils_js_1.getSquareWidth)(maxSize, height, theme.cellVerticalPadding);
    let checkBoxHalfWidth = checkBoxWidth / 2;
    const posX = (0, utils_js_1.getSquareXPosFromAlign)(alignment, x, width, theme.cellHorizontalPadding, checkBoxWidth);
    const bb = (0, utils_js_1.getSquareBB)(posX, centerY, checkBoxWidth);
    const hovered = (0, utils_js_1.pointIsWithinBB)(x + hoverX, y + hoverY, bb);
    switch (checked) {
        case true: {
            ctx.beginPath();
            (0, data_grid_lib_js_1.roundedRect)(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
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
        case data_grid_types_js_1.BooleanEmpty:
        case false: {
            ctx.beginPath();
            (0, data_grid_lib_js_1.roundedRect)(ctx, posX - checkBoxWidth / 2 + 0.5, centerY - checkBoxWidth / 2 + 0.5, checkBoxWidth - 1, checkBoxWidth - 1, rectBordRadius);
            ctx.lineWidth = 1;
            ctx.strokeStyle = hovered ? theme.textDark : theme.textMedium;
            ctx.stroke();
            break;
        }
        case data_grid_types_js_1.BooleanIndeterminate: {
            ctx.beginPath();
            (0, data_grid_lib_js_1.roundedRect)(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
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
            (0, support_js_1.assertNever)(checked);
    }
}
exports.drawCheckbox = drawCheckbox;
//# sourceMappingURL=draw-checkbox.js.map