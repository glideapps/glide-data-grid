import { CustomCell, measureTextCached, CustomCellRenderer, getMiddleCenterBias } from "@glideapps/glide-data-grid";
import * as React from "react";
import { roundedRect } from "../draw-fns";

interface RangeCellProps {
    readonly kind: "range-cell";
    readonly value: number;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    readonly label?: string;
    readonly measureLabel?: string;
    readonly readonly?: boolean;
}

export type RangeCell = CustomCell<RangeCellProps>;

const RANGE_HEIGHT = 6;

const inputStyle: React.CSSProperties = {
    marginRight: 8,
};

const wrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
};

const renderer: CustomCellRenderer<RangeCell> = {
    isMatch: (c): c is RangeCell => (c.data as any).kind === "range-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { min, max, value, label, measureLabel } = cell.data;

        const x = rect.x + theme.cellHorizontalPadding;
        const yMid = rect.y + rect.height / 2;

        const rangeSize = max - min;
        const fillRatio = (value - min) / rangeSize;

        ctx.save();
        let labelWidth = 0;
        if (label !== undefined) {
            ctx.font = `12px ${theme.fontFamily}`; // fixme this is slow
            labelWidth =
                measureTextCached(measureLabel ?? label, ctx, `12px ${theme.fontFamily}`).width +
                theme.cellHorizontalPadding;
        }

        const rangeWidth = rect.width - theme.cellHorizontalPadding * 2 - labelWidth;

        const gradient = ctx.createLinearGradient(x, yMid, x + rangeWidth, yMid);

        gradient.addColorStop(0, theme.accentColor);
        gradient.addColorStop(fillRatio, theme.accentColor);
        gradient.addColorStop(fillRatio, theme.bgBubble);
        gradient.addColorStop(1, theme.bgBubble);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        roundedRect(ctx, x, yMid - RANGE_HEIGHT / 2, rangeWidth, RANGE_HEIGHT, RANGE_HEIGHT / 2);
        ctx.fill();

        ctx.beginPath();
        roundedRect(
            ctx,
            x + 0.5,
            yMid - RANGE_HEIGHT / 2 + 0.5,
            rangeWidth - 1,
            RANGE_HEIGHT - 1,
            (RANGE_HEIGHT - 1) / 2
        );
        ctx.strokeStyle = theme.accentLight;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (label !== undefined) {
            ctx.textAlign = "right";
            ctx.fillStyle = theme.textDark;
            ctx.fillText(
                label,
                rect.x + rect.width - theme.cellHorizontalPadding,
                yMid + getMiddleCenterBias(ctx, `12px ${theme.fontFamily}`)
            );
        }

        ctx.restore();

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
