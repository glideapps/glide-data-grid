export function roundedRect(ctx, x, y, width, height, radius) {
    if (width <= 0 || height <= 0)
        return;
    if (typeof radius === "number" && radius <= 0) {
        ctx.rect(x, y, width, height);
        return;
    }
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
    radius.tl = Math.max(0, radius.tl);
    radius.tr = Math.max(0, radius.tr);
    radius.br = Math.max(0, radius.br);
    radius.bl = Math.max(0, radius.bl);
    ctx.moveTo(x + radius.tl, y);
    ctx.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
    ctx.arcTo(x + width, y + height, x + width - radius.br, y + height, radius.br);
    ctx.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
    ctx.arcTo(x, y, x + radius.tl, y, radius.tl);
}
//# sourceMappingURL=draw-fns.js.map