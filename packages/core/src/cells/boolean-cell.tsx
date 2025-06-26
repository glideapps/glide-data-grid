import type { FullTheme } from "../common/styles.js";
import { getSquareWidth, getSquareXPosFromAlign, getSquareBB, pointIsWithinBB } from "../common/utils.js";
import { toggleBoolean } from "../data-editor/data-editor-fns.js";
import {
    GridCellKind,
    type BooleanCell,
    booleanCellIsEditable,
    BooleanEmpty,
    BooleanIndeterminate,
    type Rectangle,
} from "../internal/data-grid/data-grid-types.js";
import { drawCheckbox } from "../internal/data-grid/render/draw-checkbox.js";
import type { BaseDrawArgs, InternalCellRenderer } from "./cell-types.js";

const defaultCellMaxSize = 20;

function isOverEditableRegion(e: {
    readonly cell: BooleanCell;
    readonly posX: number;
    readonly posY: number;
    readonly bounds: Rectangle;
    readonly theme: FullTheme;
}): boolean {
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

    return booleanCellIsEditable(cell) && checkBoxClicked;
}

export const booleanCellRenderer: InternalCellRenderer<BooleanCell> = {
    getAccessibilityString: c => c.data?.toString() ?? "false",
    kind: GridCellKind.Boolean,
    needsHover: true,
    useLabel: false,
    needsHoverPosition: true,
    measure: () => 50,
    draw: a =>
        drawBoolean(
            a,
            a.cell.data,
            booleanCellIsEditable(a.cell),
            a.cell.maxSize ?? a.theme.checkboxMaxSize ?? defaultCellMaxSize,
            a.cell.hoverEffectIntensity ?? 0.35
        ),
    onDelete: c => ({
        ...c,
        data: false,
    }),
    onSelect: e => {
        if (isOverEditableRegion(e)) {
            e.preventDefault();
        }
    },
    onClick: e => {
        if (isOverEditableRegion(e)) {
            return {
                ...e.cell,
                data: toggleBoolean(e.cell.data),
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
    maxSize: number,
    hoverEffectIntensity: number
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

    // Don't set the global alpha unnecessarily
    let shouldRestoreAlpha = false;
    if (hoverEffectIntensity > 0) {
        let alpha = canEdit ? 1 - hoverEffectIntensity + hoverEffectIntensity * hoverAmount : 0.4;
        if (data === BooleanEmpty) {
            alpha *= hoverAmount;
        }
        if (alpha === 0) {
            return;
        }

        if (alpha < 1) {
            shouldRestoreAlpha = true;
            ctx.globalAlpha = alpha;
        }
    }

    drawCheckbox(ctx, theme, data, x, y, w, h, highlighted, hoverX, hoverY, maxSize, contentAlign);

    if (shouldRestoreAlpha) {
        ctx.globalAlpha = 1;
    }
}
