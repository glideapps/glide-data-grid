import { CustomCell, Rectangle, measureTextCached } from "@glideapps/glide-data-grid";
import styled from "styled-components";
import * as React from "react";
import { CustomCellRenderer } from "../types";

interface TagsCellProps {
    readonly kind: "tags-cell";
    readonly tags: readonly string[];
    readonly possibleTags: readonly {
        tag: string;
        color: string;
    }[];
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

export type TagsCell = CustomCell<TagsCellProps>;

const tagHeight = 20;
const innerPad = 6;

const EditorWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-top: 6px;
    color: ${p => p.theme.textDark};

    &&&& label {
        display: flex;
        cursor: pointer;

        input {
            cursor: pointer;
            width: auto;
        }

        .pill {
            margin-left: 8px;
            margin-right: 6px;
            margin-bottom: 6px;

            border-radius: 100px;
            height: ${tagHeight}px;
            padding: 0 ${innerPad}px;
            display: flex;
            justify-content: center;
            align-items: center;

            font: 12px ${p => p.theme.fontFamily};

            background-color: ${p => p.theme.bgBubble};

            transition: box-shadow 150ms;

            &.unselected {
                opacity: 0.8;
            }
        }
    }
    label:hover .pill {
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    }
`;

const renderer: CustomCellRenderer<TagsCell> = {
    isMatch: (c): c is TagsCell => (c.data as any).kind === "tags-cell",
    draw: (ctx, cell, theme, rect, _hoverAmount) => {
        const { possibleTags, tags } = cell.data;

        const drawArea: Rectangle = {
            x: rect.x + theme.cellHorizontalPadding,
            y: rect.y + theme.cellVerticalPadding,
            width: rect.width - 2 * theme.cellHorizontalPadding,
            height: rect.height - 2 * theme.cellVerticalPadding,
        };
        const rows = Math.max(1, Math.floor(drawArea.height / (tagHeight + innerPad)));

        let x = drawArea.x;
        let row = 1;
        let y = drawArea.y + (drawArea.height - rows * tagHeight - (rows - 1) * innerPad) / 2;
        for (const tag of tags) {
            const color = possibleTags.find(t => t.tag === tag)?.color ?? theme.bgBubble;

            ctx.font = `12px ${theme.fontFamily}`;
            const metrics = measureTextCached(tag, ctx);
            const width = metrics.width + innerPad * 2;
            const textY = tagHeight / 2 + metrics.actualBoundingBoxAscent / 2;

            if (x !== drawArea.x && x + width > drawArea.x + drawArea.width) {
                if (row < rows) {
                    row++;
                    y += tagHeight + innerPad;
                    x = drawArea.x;
                }
            }

            ctx.fillStyle = color;
            ctx.beginPath();
            roundedRect(ctx, x, y, width, tagHeight, tagHeight / 2);
            ctx.fill();

            ctx.fillStyle = theme.textDark;
            ctx.fillText(tag, x + innerPad, y + textY);

            x += width + 8;
            if (x > drawArea.x + drawArea.width && row > rows) break;
        }

        return true;
    },
    provideEditor: () => {
        // eslint-disable-next-line react/display-name
        return p => {
            const { onChange, value } = p;
            const { possibleTags, tags } = value.data;
            return (
                <EditorWrap>
                    {possibleTags.map(t => {
                        const selected = tags.indexOf(t.tag) !== -1;
                        return (
                            <label key={t.tag}>
                                <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={() => {
                                        const newTags = selected ? tags.filter(x => x !== t.tag) : [...tags, t.tag];
                                        onChange({
                                            ...p.value,
                                            data: {
                                                ...value.data,
                                                tags: newTags,
                                            },
                                        });
                                    }}
                                />
                                <div
                                    className={"pill " + (selected ? "selectd" : "unselected")}
                                    style={{ backgroundColor: selected ? t.color : undefined }}>
                                    {t.tag}
                                </div>
                            </label>
                        );
                    })}
                </EditorWrap>
            );
        };
    },
};

export default renderer;
