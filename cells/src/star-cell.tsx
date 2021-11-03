import { CustomCell } from "@glideapps/glide-data-grid";
import { CustomCellRenderer } from "./types";
import * as React from "react";

interface StarCellProps {
    readonly kind: "star-cell";
    readonly rating: number;
}

export type StarCell = CustomCell<StarCellProps>;

const starPoints = [
    [50, 5],
    [61.23, 39.55],
    [97.55, 39.55],
    [68.16, 60.9],
    [79.39, 95.45],
    [50, 74.1],
    [20.61, 95.45],
    [31.84, 60.9],
    [2.45, 39.55],
    [38.77, 39.55],
];

function pathStar(ctx: CanvasRenderingContext2D, center: readonly [number, number], size: number) {
    let moved = false;
    for (const p of starPoints) {
        const x = (p[0] - 50) * (size / 100) + center[0];
        const y = (p[1] - 50) * (size / 100) + center[1];

        if (moved) {
            ctx.lineTo(x, y);
        } else {
            ctx.moveTo(x, y);
            moved = true;
        }
    }

    ctx.closePath();
}

const renderer: CustomCellRenderer<StarCell> = {
    isMatch: (cell: CustomCell): cell is StarCell => (cell.data as any).kind === "star-cell",
    draw: (ctx, cell, theme, rect, hoverAmount) => {
        const { rating } = cell.data;
        const padX = theme.cellHorizontalPadding;
        let drawX = padX;
        const stars = Math.min(5, Math.ceil(rating));
        drawX += 8;
        ctx.beginPath();
        for (let i = 0; i < stars; i++) {
            pathStar(ctx, [drawX, rect.y + rect.height / 2], 16);
            drawX += 18;
        }
        ctx.fillStyle = theme.textDark;
        ctx.globalAlpha = 0.6 + 0.4 * hoverAmount;
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
    },
    provideEditor: () => {
        // eslint-disable-next-line react/display-name
        return p => (
            <input
                value={p.value.data.rating}
                onChange={e => {
                    const newNumber = Number.parseInt(e.target.value) ?? p.value.data.rating;
                    p.onChange({
                        ...p.value,
                        data: {
                            ...p.value.data,
                            rating: newNumber,
                        },
                        copyData: newNumber.toString(),
                    });
                }}
            />
        );
    },
};

export default renderer;
