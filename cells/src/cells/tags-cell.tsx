import { CustomCell, Rectangle } from "@glideapps/glide-data-grid";
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
        for (const realTag of tags) {
            const tag = realTag.toLocaleUpperCase();
            const color = possibleTags.find(t => t.tag === realTag)?.color ?? theme.bgBubble;

            ctx.font = `700 12px ${theme.fontFamily}`;
            const metrics = ctx.measureText(tag);
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
            roundedRect(ctx, x + 1, y + 1, width - 2, tagHeight - 2, 4);
            ctx.globalAlpha = 0.8;
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = "white";
            ctx.fillText(tag, x + innerPad, y + textY);

            x += width + 8;
            if (x > drawArea.x + drawArea.width && row > rows) break;
        }

        return true;
    },
    provideEditor: () => undefined,
};

export default renderer;
