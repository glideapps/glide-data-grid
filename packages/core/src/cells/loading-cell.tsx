import { withAlpha } from "../internal/data-grid/color-parser.js";
import { roundedRect } from "../internal/data-grid/data-grid-lib.js";
import { GridCellKind, type LoadingCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";

// returns a "random" number between -1 and 1
function getRandomNumber(x: number, y: number): number {
    let seed = x * 49_632 + y * 325_176;

    // Inline Xorshift algorithm
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;

    // eslint-disable-next-line unicorn/number-literal-case
    return (seed / 0xff_ff_ff_ff) * 2;
}

export const loadingCellRenderer: InternalCellRenderer<LoadingCell> = {
    getAccessibilityString: () => "",
    kind: GridCellKind.Loading,
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
        const rectHeight = cell.skeletonHeight ?? Math.min(18, rect.height - 2 * theme.cellVerticalPadding);

        roundedRect(ctx, rect.x + hpad, rect.y + (rect.height - rectHeight) / 2, width, rectHeight, 3);
        ctx.fillStyle = withAlpha(theme.textDark, 0.1);
        ctx.fill();
    },
    onPaste: () => undefined,
};
