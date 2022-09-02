import {
    CustomCell,
    CustomRenderer,
    getMiddleCenterBias,
    GridCellKind,
    interpolateColors,
} from "@glideapps/glide-data-grid";
import { roundedRect } from "../draw-fns";

type PackedColor = string | readonly [normal: string, hover: string];

interface ButtonCellProps {
    readonly kind: "button-cell";
    readonly title: string;
    readonly onClick?: () => void;
    readonly backgroundColor?: PackedColor;
    readonly color?: PackedColor;
    readonly borderColor?: PackedColor;
    readonly borderRadius?: number;
}

export type ButtonCell = CustomCell<ButtonCellProps> & { readonly: true };

function unpackColor(color: PackedColor, theme: Record<string, any>, hoverAmount: number): string {
    if (typeof color === "string") {
        if (theme[color] !== undefined) return theme[color];
        return color;
    }

    let [normal, hover] = color;
    if (theme[normal] !== undefined) normal = theme[normal];
    if (theme[hover] !== undefined) hover = theme[hover];
    return interpolateColors(normal, hover, hoverAmount);
}

const renderer: CustomRenderer<ButtonCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is ButtonCell => (c.data as any).kind === "button-cell",
    needsHover: true,
    onSelect: a => a.preventDefault(),
    onClick: a => {
        a.cell.data.onClick?.();
        return undefined;
    },
    drawPrep: args => {
        const { ctx } = args;

        ctx.textAlign = "center";

        return {
            deprep: a => {
                a.ctx.textAlign = "start";
            },
        };
    },
    draw: (args, cell) => {
        const { ctx, theme, rect, hoverAmount } = args;
        const { title, backgroundColor, color, borderColor, borderRadius } = cell.data;

        const x = Math.floor(rect.x + theme.cellHorizontalPadding);
        const y = Math.floor(rect.y + theme.cellVerticalPadding + 1);
        const width = Math.ceil(rect.width - theme.cellHorizontalPadding * 2 + 1);
        const height = Math.ceil(rect.height - theme.cellVerticalPadding * 2 - 1);

        if (backgroundColor !== undefined) {
            ctx.beginPath();
            roundedRect(ctx, x, y, width, height, borderRadius ?? 0);
            ctx.fillStyle = unpackColor(backgroundColor, theme, hoverAmount);
            ctx.fill();
        }

        if (borderColor !== undefined) {
            ctx.beginPath();
            roundedRect(ctx, x + 0.5, y + 0.5, width - 1, height - 1, borderRadius ?? 0);
            ctx.strokeStyle = unpackColor(borderColor, theme, hoverAmount);
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.fillStyle = unpackColor(color ?? theme.accentColor, theme, hoverAmount);
        ctx.fillText(title, x + width / 2, y + height / 2 + getMiddleCenterBias(ctx, `800 12px ${theme.fontFamily}`));
        return true;
    },
    provideEditor: undefined,
};

export default renderer;
