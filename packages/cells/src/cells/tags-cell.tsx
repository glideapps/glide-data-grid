import {
    type CustomCell,
    type Rectangle,
    measureTextCached,
    type CustomRenderer,
    getMiddleCenterBias,
    GridCellKind,
} from "@glideapps/glide-data-grid";
import { styled } from "@linaria/react";
import * as React from "react";
import { roundedRect } from "../draw-fns.js";

interface TagsCellProps {
    readonly kind: "tags-cell";
    readonly tags: readonly string[];
    readonly readonly?: boolean;
    readonly possibleTags: readonly {
        tag: string;
        color: string;
    }[];
}

export type TagsCell = CustomCell<TagsCellProps>;

const tagHeight = 20;
const innerPad = 6;

const EditorWrap = styled.div<{ tagHeight: number; innerPad: number }>`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-top: 6px;
    color: var(--gdg-text-dark);

    box-sizing: border-box;

    * {
        box-sizing: border-box;
    }

    &&&& label {
        display: flex;
        cursor: pointer;

        input {
            cursor: pointer;
            width: auto;
        }

        .gdg-pill {
            margin-left: 8px;
            margin-right: 6px;
            margin-bottom: 6px;

            border-radius: ${p => p.tagHeight / 2}px;
            min-height: ${p => p.tagHeight}px;
            padding: 2px ${p => p.innerPad}px;
            display: flex;
            align-items: center;

            font: 12px var(--gdg-font-family);

            background-color: var(--gdg-bg-bubble);

            transition: box-shadow 150ms;

            &.gdg-unselected {
                opacity: 0.8;
            }
        }
    }
    label:hover .gdg-pill {
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    }

    &&&&.gdg-readonly label {
        cursor: default;

        .gdg-pill {
            box-shadow: none !important;
        }
    }
`;

const renderer: CustomRenderer<TagsCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is TagsCell => (c.data as any).kind === "tags-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
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
            const textY = tagHeight / 2;

            if (x !== drawArea.x && x + width > drawArea.x + drawArea.width && row < rows) {
                row++;
                y += tagHeight + innerPad;
                x = drawArea.x;
            }

            ctx.fillStyle = color;
            ctx.beginPath();
            roundedRect(ctx, x, y, width, tagHeight, tagHeight / 2);
            ctx.fill();

            ctx.fillStyle = theme.textDark;
            ctx.fillText(tag, x + innerPad, y + textY + getMiddleCenterBias(ctx, `12px ${theme.fontFamily}`));

            x += width + 8;
            if (x > drawArea.x + drawArea.width && row >= rows) break;
        }

        return true;
    },
    provideEditor: () => {
        // eslint-disable-next-line react/display-name
        return p => {
            const { onChange, value } = p;
            const { possibleTags, tags, readonly = false } = value.data;
            return (
                <EditorWrap tagHeight={tagHeight} innerPad={innerPad} className={readonly ? "gdg-readonly" : ""}>
                    {possibleTags.map(t => {
                        const selected = tags.indexOf(t.tag) !== -1;
                        return (
                            <label key={t.tag}>
                                {!readonly && (
                                    <input
                                        className="gdg-input"
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
                                )}
                                <div
                                    className={"gdg-pill " + (selected ? "gdg-selected" : "gdg-unselected")}
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
    onPaste: (v, d) => ({
        ...d,
        tags: d.possibleTags
            .map(x => x.tag)
            .filter(x =>
                v
                    .split(",")
                    .map(s => s.trim())
                    .includes(x)
            ),
    }),
};

export default renderer;
