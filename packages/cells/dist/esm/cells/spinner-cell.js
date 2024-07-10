import { GridCellKind } from "@glideapps/glide-data-grid";
const renderer = {
    kind: GridCellKind.Custom,
    isMatch: (cell) => cell.data.kind === "spinner-cell",
    draw: args => {
        const { ctx, theme, rect, requestAnimationFrame } = args;
        const progress = (window.performance.now() % 1000) / 1000;
        const x = rect.x + rect.width / 2;
        const y = rect.y + rect.height / 2;
        ctx.beginPath();
        ctx.arc(x, y, Math.min(12, rect.height / 6), Math.PI * 2 * progress, Math.PI * 2 * progress + Math.PI * 1.5);
        ctx.strokeStyle = theme.textMedium;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.lineWidth = 1;
        requestAnimationFrame();
        return true;
    },
    provideEditor: () => undefined,
};
export default renderer;
//# sourceMappingURL=spinner-cell.js.map