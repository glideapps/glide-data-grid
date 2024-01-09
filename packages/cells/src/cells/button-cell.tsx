import {
    type CustomCell,
    type CustomRenderer,
    getMiddleCenterBias,
    GridCellKind,
    interpolateColors,
    type Rectangle,
    type Theme,
} from "@glideapps/glide-data-grid";
import { roundedRect } from "../draw-fns.js";

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

function getIsHovered(bounds: Rectangle, posX: number | undefined, posY: number | undefined, theme: Theme): boolean {
    const x = Math.floor(bounds.x + theme.cellHorizontalPadding + 1);
    const y = Math.floor(bounds.y + theme.cellVerticalPadding + 1);
    const width = Math.ceil(bounds.width - theme.cellHorizontalPadding * 2 - 1);
    const height = Math.ceil(bounds.height - theme.cellVerticalPadding * 2 - 1);

    return (
        posX !== undefined &&
        posY !== undefined &&
        posX + bounds.x >= x &&
        posX + bounds.x < x + width &&
        posY + bounds.y >= y &&
        posY + bounds.y < y + height
    );
}

const renderer: CustomRenderer<ButtonCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is ButtonCell => (c.data as any).kind === "button-cell",
    needsHoverPosition: true,
    needsHover: true,
    onSelect: a => a.preventDefault(),
    onClick: a => {
        const { cell, theme, bounds, posX, posY } = a;
        if (getIsHovered(bounds, posX, posY, theme)) cell.data.onClick?.();
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
        const { ctx, theme, rect, hoverX, hoverY, frameTime, drawState } = args;
        const { title, backgroundColor, color, borderColor, borderRadius } = cell.data;

        const x = Math.floor(rect.x + theme.cellHorizontalPadding + 1);
        const y = Math.floor(rect.y + theme.cellVerticalPadding + 1);
        const width = Math.ceil(rect.width - theme.cellHorizontalPadding * 2 - 1);
        const height = Math.ceil(rect.height - theme.cellVerticalPadding * 2 - 1);

        if (width <= 0 || height <= 0) return true;

        const isHovered = getIsHovered(rect, hoverX, hoverY, theme);

        interface DrawState {
            readonly hovered: boolean;
            readonly animationStartTime: number;
        }

        // eslint-disable-next-line prefer-const
        let [state, setState] = drawState as [DrawState | undefined, (state: DrawState) => void];

        if (isHovered) args.overrideCursor?.("pointer");

        state ??= { hovered: false, animationStartTime: 0 };

        if (isHovered !== state.hovered) {
            state = { ...state, hovered: isHovered, animationStartTime: frameTime };
            setState(state);
        }

        const progress = Math.min(1, (frameTime - state.animationStartTime) / 200);

        const hoverAmount = isHovered ? progress : 1 - progress;

        if (progress < 1) args.requestAnimationFrame?.();

        if (backgroundColor !== undefined) {
            ctx.beginPath();
            roundedRect(ctx, x, y, width, height, borderRadius ?? theme.roundingRadius ?? 0);
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
        ctx.fillText(title, x + width / 2, y + height / 2 + getMiddleCenterBias(ctx, theme.baseFontFull));
        return true;
    },
    provideEditor: undefined,
};

export default renderer;
