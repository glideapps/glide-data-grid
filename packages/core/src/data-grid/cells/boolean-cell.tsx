import { drawCheckbox } from "../data-grid-drawing";
import { getSquareWidth, getSquareXPosFromAlign, getSquareBB, pointIsWithinBB } from "../../common/utils";
import {
    GridCellKind,
    BooleanCell,
    booleanCellIsEditable,
    BooleanEmpty,
    BooleanIndeterminate,
} from "../data-grid-types";
import type { BaseDrawArgs, InternalCellRenderer } from "./cell-types";

/**
 * Checkbox behavior:
 *
 * true + click -> unchecked
 * false + click -> checked
 * indeterminate + click -> checked
 * empty + click -> checked
 */
export function toggleBoolean(data: boolean | null | undefined): boolean | null | undefined {
    return data !== true;
}

const defaultCellMaxSize = 20;

export const booleanCellRenderer: InternalCellRenderer<BooleanCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "false",
    kind: GridCellKind.Boolean,
    needsHover: true,
    needsHoverPosition: true,
    measure: () => 50,
    draw: a => drawBoolean(a, a.cell.data, booleanCellIsEditable(a.cell), a.cell.maxSize ?? defaultCellMaxSize),
    onDelete: c => ({
        ...c,
        data: false,
    }),
    onClick: e => {
        const { cell, posX: pointerX, posY: pointerY, bounds, theme } = e;
        const { width, height, x: cellX, y: cellY } = bounds;
        const maxWidth = cell.maxSize ?? defaultCellMaxSize;
        const cellCenterY = Math.floor(bounds.y + height / 2);
        const checkBoxWidth = getSquareWidth(maxWidth, height, theme.cellVerticalPadding);
        const posX = getSquareXPosFromAlign(
            cell.contentAlign ?? "center",
            cellX,
            width,
            theme.cellHorizontalPadding,
            checkBoxWidth
        );
        const bb = getSquareBB(posX, cellCenterY, checkBoxWidth);
        const checkBoxClicked = pointIsWithinBB(cellX + pointerX, cellY + pointerY, bb);

        if (booleanCellIsEditable(cell) && checkBoxClicked) {
            return {
                ...cell,
                data: toggleBoolean(cell.data),
            };
        }
        return undefined;
    },
    onPaste: (toPaste, cell) => {
        let newVal: boolean | BooleanEmpty | BooleanIndeterminate = BooleanEmpty;
        if (toPaste.toLowerCase() === "true") {
            newVal = true;
        } else if (toPaste.toLowerCase() === "false") {
            newVal = false;
        } else if (toPaste.toLowerCase() === "indeterminate") {
            newVal = BooleanIndeterminate;
        }
        return newVal === cell.data
            ? undefined
            : {
                  ...cell,
                  data: newVal,
              };
    },
};

function drawBoolean(
    args: BaseDrawArgs,
    data: boolean | BooleanEmpty | BooleanIndeterminate,
    canEdit: boolean,
    maxSize?: number
) {
    if (!canEdit && data === BooleanEmpty) {
        return;
    }
    const {
        ctx,
        hoverAmount,
        theme,
        rect,
        highlighted,
        hoverX,
        hoverY,
        cell: { contentAlign },
    } = args;
    const { x, y, width: w, height: h } = rect;

    const hoverEffect = 0.35;

    let alpha = canEdit ? 1 - hoverEffect + hoverEffect * hoverAmount : 0.4;
    if (data === BooleanEmpty) {
        alpha *= hoverAmount;
    }
    if (alpha === 0) {
        return;
    }
    ctx.globalAlpha = alpha;

    drawCheckbox(ctx, theme, data, x, y, w, h, highlighted, hoverX, hoverY, maxSize, contentAlign);

    ctx.globalAlpha = 1;
}
