/* eslint-disable react/display-name */
import * as React from "react";
import { CustomCell, measureTextCached, TextCellEntry } from "@glideapps/glide-data-grid";
import { CustomCellRenderer } from "../types";

interface UserProfileCellProps {
    readonly kind: "user-profile-cell";
    readonly image: string;
    readonly initial: string;
    readonly tint: string;
    readonly name?: string;
}

export type UserProfileCell = CustomCell<UserProfileCellProps>;

const renderer: CustomCellRenderer<UserProfileCell> = {
    isMatch: (cell: CustomCell): cell is UserProfileCell => (cell.data as any).kind === "user-profile-cell",
    draw: (args, cell) => {
        const { ctx, rect, theme, imageLoader, col, row } = args;
        const { image, name, initial, tint } = cell.data;

        const xPad = theme.cellHorizontalPadding;

        const radius = Math.min(12, rect.height / 2 - theme.cellVerticalPadding);

        const drawX = rect.x + xPad;

        const imageResult = imageLoader.loadOrGetImage(image, col, row);

        ctx.save();
        ctx.beginPath();
        ctx.arc(drawX + radius, rect.y + rect.height / 2, radius, 0, Math.PI * 2);
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = tint;
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.font = `600 16px ${theme.fontFamily}`;
        const metrics = measureTextCached(initial[0], ctx);
        ctx.fillText(
            initial[0],
            drawX + radius - metrics.width / 2,
            rect.y + rect.height / 2 + metrics.actualBoundingBoxAscent / 2
        );

        if (imageResult !== undefined) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(drawX + radius, rect.y + rect.height / 2, radius, 0, Math.PI * 2);
            ctx.clip();

            ctx.drawImage(imageResult, drawX, rect.y + rect.height / 2 - radius, radius * 2, radius * 2);

            ctx.restore();
        }

        if (name !== undefined) {
            ctx.font = `${theme.baseFontStyle} ${theme.fontFamily}`;
            ctx.fillStyle = theme.textDark;
            ctx.textBaseline = "middle";
            ctx.fillText(name, drawX + radius * 2 + xPad, rect.y + rect.height / 2);
        }

        ctx.restore();

        return true;
    },
    provideEditor: () => p => {
        const { isHighlighted, onChange, value, onFinishedEditing } = p;
        return (
            <TextCellEntry
                highlight={isHighlighted}
                autoFocus={true}
                value={value.data.name ?? ""}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        onFinishedEditing();
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }}
                onChange={e =>
                    onChange({
                        ...value,
                        data: {
                            ...value.data,
                            name: e.target.value,
                        },
                    })
                }
            />
        );
    },
};

export default renderer;
