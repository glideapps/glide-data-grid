import { assertNever } from "../common/support";
import type { Theme } from "../data-editor-base";
import { BooleanEmpty, BooleanIndeterminate } from "./data-grid-types";

export function drawCheckbox(
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    checked: boolean | BooleanEmpty | BooleanIndeterminate,
    x: number,
    y: number,
    width: number,
    height: number,
    highlighted: boolean,
    hoverX: number = -20,
    hoverY: number = -20,
    maxSize: number = 32
) {
    const centerX = Math.floor(x + width / 2);
    const centerY = Math.floor(y + height / 2);

    const checkBoxWidth = Math.min(maxSize, height - theme.cellVerticalPadding * 2);

    const hoverHelper = checkBoxWidth / 2;
    const hovered = Math.abs(hoverX - width / 2) < hoverHelper && Math.abs(hoverY - height / 2) < hoverHelper;

    const rectBordRadius = 4;
    const posHelperChecked = checkBoxWidth / 2;

    switch (checked) {
        case true: {
            ctx.beginPath();
            roundedRect(
                ctx,
                centerX - checkBoxWidth / 2,
                centerY - checkBoxWidth / 2,
                checkBoxWidth,
                checkBoxWidth,
                rectBordRadius
            );

            ctx.fillStyle = highlighted ? theme.accentColor : theme.textMedium;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(
                centerX - posHelperChecked + checkBoxWidth / 4.23,
                centerY - posHelperChecked + checkBoxWidth / 1.97
            );
            ctx.lineTo(
                centerX - posHelperChecked + checkBoxWidth / 2.42,
                centerY - posHelperChecked + checkBoxWidth / 1.44
            );
            ctx.lineTo(
                centerX - posHelperChecked + checkBoxWidth / 1.29,
                centerY - posHelperChecked + checkBoxWidth / 3.25
            );

            ctx.strokeStyle = theme.bgCell;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.lineWidth = 1.9;
            ctx.stroke();
            break;
        }

        case BooleanEmpty:
        case false: {
            ctx.beginPath();
            roundedRect(
                ctx,
                centerX - checkBoxWidth / 2 + 0.5,
                centerY - checkBoxWidth / 2 + 0.5,
                checkBoxWidth - 1,
                checkBoxWidth - 1,
                rectBordRadius
            );

            ctx.lineWidth = 1;
            ctx.strokeStyle = hovered ? theme.textDark : theme.textMedium;
            ctx.stroke();
            break;
        }

        case BooleanIndeterminate: {
            ctx.beginPath();
            roundedRect(
                ctx,
                centerX - checkBoxWidth / 2,
                centerY - checkBoxWidth / 2,
                checkBoxWidth,
                checkBoxWidth,
                rectBordRadius
            );

            ctx.fillStyle = hovered ? theme.textMedium : theme.textLight;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(centerX - checkBoxWidth / 3, centerY);
            ctx.lineTo(centerX + checkBoxWidth / 3, centerY);
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

interface CornerRadius {
    tl: number;
    tr: number;
    bl: number;
    br: number;
}

export function roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number | CornerRadius
) {
    if (typeof radius === "number") {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    }

    // restrict radius to a reasonable max
    radius = {
        tl: Math.min(radius.tl, height / 2, width / 2),
        tr: Math.min(radius.tr, height / 2, width / 2),
        bl: Math.min(radius.bl, height / 2, width / 2),
        br: Math.min(radius.br, height / 2, width / 2),
    };

    ctx.moveTo(x + radius.tl, y);
    ctx.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
    ctx.arcTo(x + width, y + height, x + width - radius.br, y + height, radius.br);
    ctx.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
    ctx.arcTo(x, y, x + radius.tl, y, radius.tl);
}
