import { type CustomCell, parseToRgba, type Item, type CustomRenderer, GridCellKind } from "@glideapps/glide-data-grid";

interface SparklineCellProps {
    readonly kind: "sparkline-cell";
    readonly graphKind?: "line" | "bar";
    readonly values: readonly number[];
    readonly displayValues?: readonly string[];
    readonly yAxis: Item;
    readonly color?: string;
}

export type SparklineCell = CustomCell<SparklineCellProps>;

const renderer: CustomRenderer<SparklineCell> = {
    kind: GridCellKind.Custom,
    isMatch: (cell: CustomCell): cell is SparklineCell => (cell.data as any).kind === "sparkline-cell",
    needsHover: true,
    needsHoverPosition: true,
    draw: (args, cell) => {
        const { ctx, theme, rect, hoverAmount, hoverX } = args;
        // eslint-disable-next-line prefer-const
        let { values, yAxis, color, graphKind = "line", displayValues } = cell.data;
        const [minY, maxY] = yAxis;
        if (values.length === 0) return true;

        values = values.map(x => Math.min(1, Math.max(0, (x - minY) / (maxY - minY))));
        const padX = theme.cellHorizontalPadding;
        const drawX = padX + rect.x;

        const y = rect.y + 3;
        const height = rect.height - 6;
        const width = rect.width - padX * 2;

        const delta = maxY - minY;
        const zeroY = maxY <= 0 ? y : minY >= 0 ? y + height : y + height * (maxY / delta);
        // draw zero
        if (minY <= 0 && maxY >= 0) {
            ctx.beginPath();
            ctx.moveTo(drawX, zeroY);
            ctx.lineTo(drawX + width, zeroY);

            ctx.globalAlpha = 0.4;
            ctx.lineWidth = 1;
            ctx.strokeStyle = theme.textLight;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        if (graphKind === "bar") {
            ctx.beginPath();
            const margin = 2;
            const spacing = (values.length - 1) * margin;
            const barWidth = (width - spacing) / values.length;

            let x = drawX;
            for (const val of values) {
                const barY = y + height - val * height;
                ctx.moveTo(x, zeroY);
                ctx.lineTo(x + barWidth, zeroY);
                ctx.lineTo(x + barWidth, barY);
                ctx.lineTo(x, barY);

                x += barWidth + margin;
            }
            ctx.fillStyle = cell.data.color ?? theme.accentColor;
            ctx.fill();
        } else {
            if (values.length === 1) values = [values[0], values[0]];
            // draw line
            ctx.beginPath();

            const xStep = (rect.width - 16) / (values.length - 1);
            const points = values.map((val, ind) => {
                return {
                    x: drawX + xStep * ind,
                    y: y + height - val * height,
                };
            });
            ctx.moveTo(points[0].x, points[0].y);

            let i: number;
            for (i = 1; i < points.length - 2; i++) {
                const xControl = (points[i].x + points[i + 1].x) / 2;
                const yControl = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, xControl, yControl);
            }
            ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);

            ctx.strokeStyle = color ?? theme.accentColor;
            ctx.lineWidth = 1 + hoverAmount * 0.5;
            ctx.stroke();

            ctx.lineTo(rect.x + rect.width - padX, zeroY);
            ctx.lineTo(rect.x + padX, zeroY);
            ctx.closePath();

            ctx.globalAlpha = 0.2 + 0.2 * hoverAmount;
            const grad = ctx.createLinearGradient(0, y, 0, y + height * 1.4);
            grad.addColorStop(0, color ?? theme.accentColor);

            const [r, g, b] = parseToRgba(color ?? theme.accentColor);
            grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.globalAlpha = 1;

            if (hoverX !== undefined && graphKind === "line" && displayValues !== undefined) {
                ctx.beginPath();
                const closest = Math.min(values.length - 1, Math.max(0, Math.round((hoverX - padX) / xStep)));
                ctx.moveTo(drawX + closest * xStep, rect.y + 1);
                ctx.lineTo(drawX + closest * xStep, rect.y + rect.height);

                ctx.lineWidth = 1;
                ctx.strokeStyle = theme.textLight;
                ctx.stroke();

                ctx.save();
                ctx.font = `8px ${theme.fontFamily}`;
                ctx.fillStyle = theme.textMedium;
                ctx.textBaseline = "top";
                ctx.fillText(displayValues[closest], drawX, rect.y + theme.cellVerticalPadding);
                ctx.restore();
            }
        }

        return true;
    },
    provideEditor: () => undefined,
    onPaste: (_v, d) => d,
};

export default renderer;
