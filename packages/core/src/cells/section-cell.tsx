import { getMiddleCenterBias } from "../internal/data-grid/render/data-grid-lib.js";
import { InnerGridCellKind, type SectionCell } from "../internal/data-grid/data-grid-types.js";
import type { BaseDrawArgs, InternalCellRenderer, PrepResult } from "./cell-types.js";

type SectionCellDrawData = SectionCell & {
    readonly titleOffset?: number;
};

export const sectionCellRenderer: InternalCellRenderer<SectionCell> = {
    getAccessibilityString: c => c.title,
    kind: InnerGridCellKind.Section,
    needsHover: false,
    needsHoverPosition: false,
    drawPrep: prepSectionCell,
    measure: () => 120,
    draw: a => {
        const { ctx, rect, theme, cell } = a;
        const titleOffset = (cell as SectionCellDrawData).titleOffset ?? 0;
        const { x, y, width, height } = rect;

        ctx.fillStyle = theme.bgGroupHeader ?? theme.bgHeader;
        ctx.fillRect(x, y, width, height);

        ctx.strokeStyle = theme.borderColor;
        ctx.beginPath();
        ctx.moveTo(x, y + height - 0.5);
        ctx.lineTo(x + width, y + height - 0.5);
        ctx.stroke();

        if (cell.title !== "") {
            ctx.fillStyle = theme.textGroupHeader ?? theme.textDark;
            ctx.font = theme.headerFontFull;
            ctx.fillText(
                cell.title,
                x + titleOffset + theme.cellHorizontalPadding * 2,
                y + height / 2 + getMiddleCenterBias(ctx, ctx.font)
            );
        }
    },
    onPaste: () => undefined,
};

function prepSectionCell(args: BaseDrawArgs, lastPrep: PrepResult | undefined): Partial<PrepResult> {
    const { ctx } = args;
    const result: Partial<PrepResult> = lastPrep ?? {};
    ctx.textAlign = "left";
    result.deprep = deprepSectionCell;
    return result;
}

function deprepSectionCell(args: Pick<BaseDrawArgs, "ctx">) {
    const { ctx } = args;
    ctx.textAlign = "start";
}
