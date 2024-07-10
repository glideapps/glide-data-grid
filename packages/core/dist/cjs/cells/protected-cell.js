"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedCellRenderer = void 0;
const utils_js_1 = require("../common/utils.js");
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
exports.protectedCellRenderer = {
    getAccessibilityString: () => "",
    measure: () => 108,
    kind: data_grid_types_js_1.GridCellKind.Protected,
    needsHover: false,
    needsHoverPosition: false,
    draw: drawProtectedCell,
    onPaste: () => undefined,
};
function drawProtectedCell(args) {
    const { ctx, theme, rect } = args;
    const { x, y, height: h } = rect;
    ctx.beginPath();
    const radius = 2.5;
    let xStart = x + theme.cellHorizontalPadding + radius;
    const center = y + h / 2;
    const p = Math.cos((0, utils_js_1.degreesToRadians)(30)) * radius;
    const q = Math.sin((0, utils_js_1.degreesToRadians)(30)) * radius;
    for (let i = 0; i < 12; i++) {
        ctx.moveTo(xStart, center - radius);
        ctx.lineTo(xStart, center + radius);
        ctx.moveTo(xStart + p, center - q);
        ctx.lineTo(xStart - p, center + q);
        ctx.moveTo(xStart - p, center - q);
        ctx.lineTo(xStart + p, center + q);
        xStart += 8;
    }
    ctx.lineWidth = 1.1;
    ctx.lineCap = "square";
    ctx.strokeStyle = theme.textLight;
    ctx.stroke();
}
//# sourceMappingURL=protected-cell.js.map