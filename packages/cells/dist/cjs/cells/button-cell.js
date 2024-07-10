"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glide_data_grid_1 = require("@glideapps/glide-data-grid");
const draw_fns_js_1 = require("../draw-fns.js");
function unpackColor(color, theme, hoverAmount) {
    if (typeof color === "string") {
        if (theme[color] !== undefined)
            return theme[color];
        return color;
    }
    let [normal, hover] = color;
    if (theme[normal] !== undefined)
        normal = theme[normal];
    if (theme[hover] !== undefined)
        hover = theme[hover];
    return (0, glide_data_grid_1.interpolateColors)(normal, hover, hoverAmount);
}
function getIsHovered(bounds, posX, posY, theme) {
    const x = Math.floor(bounds.x + theme.cellHorizontalPadding + 1);
    const y = Math.floor(bounds.y + theme.cellVerticalPadding + 1);
    const width = Math.ceil(bounds.width - theme.cellHorizontalPadding * 2 - 1);
    const height = Math.ceil(bounds.height - theme.cellVerticalPadding * 2 - 1);
    return (posX !== undefined &&
        posY !== undefined &&
        posX + bounds.x >= x &&
        posX + bounds.x < x + width &&
        posY + bounds.y >= y &&
        posY + bounds.y < y + height);
}
const renderer = {
    kind: glide_data_grid_1.GridCellKind.Custom,
    isMatch: (c) => c.data.kind === "button-cell",
    needsHoverPosition: true,
    needsHover: true,
    onSelect: a => a.preventDefault(),
    onClick: a => {
        const { cell, theme, bounds, posX, posY } = a;
        if (getIsHovered(bounds, posX, posY, theme))
            cell.data.onClick?.();
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
        if (width <= 0 || height <= 0)
            return true;
        const isHovered = getIsHovered(rect, hoverX, hoverY, theme);
        // eslint-disable-next-line prefer-const
        let [state, setState] = drawState;
        if (isHovered)
            args.overrideCursor?.("pointer");
        state ??= { hovered: false, animationStartTime: 0 };
        if (isHovered !== state.hovered) {
            state = { ...state, hovered: isHovered, animationStartTime: frameTime };
            setState(state);
        }
        const progress = Math.min(1, (frameTime - state.animationStartTime) / 200);
        const hoverAmount = isHovered ? progress : 1 - progress;
        if (progress < 1)
            args.requestAnimationFrame?.();
        if (backgroundColor !== undefined) {
            ctx.beginPath();
            (0, draw_fns_js_1.roundedRect)(ctx, x, y, width, height, borderRadius ?? theme.roundingRadius ?? 0);
            ctx.fillStyle = unpackColor(backgroundColor, theme, hoverAmount);
            ctx.fill();
        }
        if (borderColor !== undefined) {
            ctx.beginPath();
            (0, draw_fns_js_1.roundedRect)(ctx, x + 0.5, y + 0.5, width - 1, height - 1, borderRadius ?? theme.roundingRadius ?? 0);
            ctx.strokeStyle = unpackColor(borderColor, theme, hoverAmount);
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        ctx.fillStyle = unpackColor(color ?? theme.accentColor, theme, hoverAmount);
        ctx.fillText(title, x + width / 2, y + height / 2 + (0, glide_data_grid_1.getMiddleCenterBias)(ctx, theme.baseFontFull));
        return true;
    },
    provideEditor: undefined,
};
exports.default = renderer;
//# sourceMappingURL=button-cell.js.map