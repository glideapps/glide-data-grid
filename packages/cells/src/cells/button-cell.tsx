import { CustomCell, CustomRenderer, getMiddleCenterBias, GridCellKind } from "@glideapps/glide-data-grid";
import { roundedRect } from "../draw-fns";

interface ButtonCellProps {
    readonly kind: "button-cell";
    readonly title: string;
    readonly onClick?: () => void;
    readonly backgroundColor?: string;
    readonly color?: string;
    readonly borderColor?: string;
    readonly borderRadius?: number;
}

export type ButtonCell = CustomCell<ButtonCellProps> & { readonly: true };

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
        const { ctx, theme } = args;

        const font = `800 12px ${theme.fontFamily}`;
        ctx.font = font;
        ctx.textAlign = "center";

        return {
            font,
            deprep: a => {
                a.ctx.font = `${theme.baseFontStyle} ${theme.fontFamily}`;
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

        ctx.globalAlpha = 0.7 + 0.3 * hoverAmount;

        roundedRect(ctx, x, y, width, height, borderRadius ?? 0);

        ctx.fillStyle = backgroundColor ?? theme.accentColor;
        ctx.fill();

        if (borderColor !== undefined) {
            ctx.beginPath();
            roundedRect(ctx, x + 0.5, y + 0.5, width - 1, height - 1, borderRadius ?? 0);
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.fillStyle = color ?? theme.accentFg;
        ctx.fillText(title, x + width / 2, y + height / 2 + getMiddleCenterBias(ctx, `800 12px ${theme.fontFamily}`));
        ctx.globalAlpha = 1;
        return true;
    },
    provideEditor: undefined,
};

export default renderer;
