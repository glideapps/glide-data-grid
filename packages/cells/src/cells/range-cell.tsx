import { CustomCell } from "@glideapps/glide-data-grid";
import * as React from "react";
import { CustomCellRenderer } from "../types";

interface RangeCellProps {
    readonly kind: "range-cell";
    readonly value: number;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    readonly label?: string;
    readonly readonly?: boolean;
}

function roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) {
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.arcTo(x, y, x + radius, y, radius);
}

export type RangeCell = CustomCell<RangeCellProps>;

const RANGE_WIDTH = 80;
const RANGE_HEIGHT = 8;
// Sure.
const GRADIENT_EPSILON = 0.0001;
const TEXT_Y_OFFSET = 5;

const renderer: CustomCellRenderer<RangeCell> = {
    isMatch: (c): c is RangeCell => (c.data as any).kind === "range-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { min, max, value, label } = cell.data;

        const height = rect.height - 2 * theme.cellVerticalPadding;
        const x = rect.x + theme.cellHorizontalPadding;
        const y = rect.y + height / 2;

        const rangeSize = max - min;
        const fillRatio = (value - min) / rangeSize;

        const gradient = ctx.createLinearGradient(x, y, x + RANGE_WIDTH, y);

        gradient.addColorStop(0, theme.accentColor);
        gradient.addColorStop(fillRatio, theme.accentColor);
        gradient.addColorStop(fillRatio + GRADIENT_EPSILON, theme.bgBubble);
        gradient.addColorStop(1, theme.bgBubble);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        roundedRect(ctx, x, y, RANGE_WIDTH, RANGE_HEIGHT, RANGE_HEIGHT / 2);
        ctx.fill();

        if (label !== undefined) {
            ctx.font = `12px ${theme.fontFamily}`;
            ctx.fillStyle = theme.textDark;
            ctx.fillText(label, x + RANGE_WIDTH + RANGE_HEIGHT, y + TEXT_Y_OFFSET);
        }

        return true;
    },
    provideEditor: () => {
        // eslint-disable-next-line react/display-name
        return p => {
            const { data } = p.value;

            const strValue = data.value.toString();
            const strMin = data.min.toString();
            const strMax = data.max.toString();
            const strStep = data.step.toString();

            const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                p.onChange({
                    ...p.value,
                    data: {
                        ...data,
                        value: Number(e.target.value),
                    },
                });
            };

            return <input type="range" value={strValue} min={strMin} max={strMax} step={strStep} onChange={onChange} />;
        };
    },
};

export default renderer;
