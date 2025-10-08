import {
    type CustomCell,
    measureTextCached,
    type CustomRenderer,
    getMiddleCenterBias,
    GridCellKind,
    getEmHeight,
} from "@glideapps/glide-data-grid";
import * as React from "react";
import { roundedRect } from "../draw-fns.js";

function adaptFontSize(font: string, percentage: number): string {
    const regex = /(\d+\.?\d*)\s*(px|rem|em|%|pt)/;
    const match = font.match(regex);

    if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2];
        const scaledValue = value * percentage;
        return font.replace(regex, `${Number(scaledValue.toPrecision(3))}${unit}`);
    }

    return font;
}

interface RangeCellProps {
    readonly kind: "range-cell";
    readonly value: number;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    readonly label?: string;
    readonly measureLabel?: string;
    /* The color of the range, fallback to theme.accentColor. */
    readonly color?: string;
}

export type RangeCell = CustomCell<RangeCellProps>;

const inputStyle: React.CSSProperties = {
    marginRight: 8,
};

const wrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
};

const renderer: CustomRenderer<RangeCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is RangeCell => (c.data as any).kind === "range-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { min, max, value, label, measureLabel, color } = cell.data;

        const x = rect.x + theme.cellHorizontalPadding;
        const yMid = rect.y + rect.height / 2;

        const rangeSize = max - min;
        const fillRatio = (value - min) / rangeSize;
        // Only use 90% of the base font size for the label
        const labelFont = `${adaptFontSize(theme.baseFontStyle, 0.9)} ${theme.fontFamily}`;

        const emHeight = getEmHeight(ctx, labelFont);
        const rangeHeight = emHeight / 2;

        ctx.save();
        let labelWidth = 0;
        if (label !== undefined) {
            ctx.font = labelFont; // fixme this is slow
            labelWidth = measureTextCached(measureLabel ?? label, ctx, labelFont).width + theme.cellHorizontalPadding;
        }

        const rangeWidth = rect.width - theme.cellHorizontalPadding * 2 - labelWidth;

        if (rangeWidth >= rangeHeight) {
            const gradient = ctx.createLinearGradient(x, yMid, x + rangeWidth, yMid);

            const fillColor = color ?? theme.accentColor;
            gradient.addColorStop(0, fillColor);
            gradient.addColorStop(fillRatio, fillColor);
            gradient.addColorStop(fillRatio, theme.bgBubble);
            gradient.addColorStop(1, theme.bgBubble);

            ctx.beginPath();
            ctx.fillStyle = gradient;
            roundedRect(ctx, x, yMid - rangeHeight / 2, rangeWidth, rangeHeight, rangeHeight / 2);
            ctx.fill();

            ctx.beginPath();
            roundedRect(
                ctx,
                x + 0.5,
                yMid - rangeHeight / 2 + 0.5,
                rangeWidth - 1,
                rangeHeight - 1,
                (rangeHeight - 1) / 2
            );
            ctx.strokeStyle = theme.accentLight;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        if (label !== undefined) {
            ctx.textAlign = "right";
            ctx.fillStyle = theme.textDark;
            ctx.fillText(
                label,
                rect.x + rect.width - theme.cellHorizontalPadding,
                yMid + getMiddleCenterBias(ctx, labelFont)
            );
        }

        ctx.restore();

        return true;
    },
    provideEditor: () => {
        // eslint-disable-next-line react/display-name
        return p => {
            const { data, readonly } = p.value;

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

            return (
                <label style={wrapperStyle}>
                    <input
                        style={inputStyle}
                        type="range"
                        value={strValue}
                        min={strMin}
                        max={strMax}
                        step={strStep}
                        onChange={onChange}
                        disabled={readonly}
                    />
                    {strValue}
                </label>
            );
        };
    },
    onPaste: (v, d) => {
        let num = Number.parseFloat(v);
        num = Number.isNaN(num) ? d.value : Math.max(d.min, Math.min(d.max, num));
        return {
            ...d,
            value: num,
        };
    },
};

export default renderer;
