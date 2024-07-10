"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingCellRenderer = void 0;
const color_parser_js_1 = require("../internal/data-grid/color-parser.js");
const data_grid_lib_js_1 = require("../internal/data-grid/render/data-grid-lib.js");
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
// returns a "random" number between -1 and 1
function getRandomNumber(x, y) {
    let seed = x * 49632 + y * 325176;
    // Inline Xorshift algorithm
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;
    // eslint-disable-next-line unicorn/number-literal-case
    return (seed / 4294967295) * 2;
}
exports.loadingCellRenderer = {
    getAccessibilityString: () => "",
    kind: data_grid_types_js_1.GridCellKind.Loading,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    measure: () => 120,
    draw: a => {
        const { cell, col, row, ctx, rect, theme } = a;
        if (cell.skeletonWidth === undefined || cell.skeletonWidth === 0) {
            return;
        }
        let width = cell.skeletonWidth;
        if (cell.skeletonWidthVariability !== undefined && cell.skeletonWidthVariability > 0) {
            width += Math.round(getRandomNumber(col, row) * cell.skeletonWidthVariability);
        }
        const hpad = theme.cellHorizontalPadding;
        if (width + hpad * 2 >= rect.width) {
            width = rect.width - hpad * 2 - 1;
        }
        const rectHeight = cell.skeletonHeight ?? Math.min(18, rect.height - 2 * theme.cellVerticalPadding);
        (0, data_grid_lib_js_1.roundedRect)(ctx, rect.x + hpad, rect.y + (rect.height - rectHeight) / 2, width, rectHeight, theme.roundingRadius ?? 3);
        ctx.fillStyle = (0, color_parser_js_1.withAlpha)(theme.textDark, 0.1);
        ctx.fill();
    },
    onPaste: () => undefined,
};
//# sourceMappingURL=loading-cell.js.map