import {
    CustomCell,
    measureTextCached,
    CustomRenderer,
    getMiddleCenterBias,
    GridCellKind,
    blend,
} from "@glideapps/glide-data-grid";

interface LinksCellProps {
    readonly kind: "links-cell";
    /**
     * Used to hand tune the position of the underline as this is not a native canvas capability, it can need tweaking
     * for different fonts.
     */
    readonly underlineOffset?: number;
    readonly links: readonly {
        readonly title: string;
        readonly onClick?: () => void;
    }[];
}

export type LinksCell = CustomCell<LinksCellProps>;

function onClickSelect(e: Parameters<NonNullable<CustomRenderer<LinksCell>["onSelect"]>>[0]) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx === null) return;

    const { posX: hoverX, bounds: rect, cell, theme } = e;
    const font = `${theme.baseFontStyle} ${theme.fontFamily}`;
    ctx.font = font;

    const { links } = cell.data;

    const xPad = theme.cellHorizontalPadding;

    let drawX = rect.x + xPad;

    const rectHoverX = rect.x + hoverX;

    for (const [index, l] of links.entries()) {
        const needsComma = index < links.length - 1;
        const metrics = measureTextCached(l.title, ctx);
        const commaMetrics = needsComma ? measureTextCached(l.title + ",", ctx, font) : metrics;

        const isHovered = rectHoverX > drawX && rectHoverX < drawX + metrics.width;

        if (isHovered) {
            return l;
        }

        drawX += commaMetrics.width + 4;
    }

    return undefined;
}

const renderer: CustomRenderer<LinksCell> = {
    kind: GridCellKind.Custom,
    needsHover: true,
    needsHoverPosition: true,
    isMatch: (c): c is LinksCell => (c.data as any).kind === "links-cell",
    onSelect: e => {
        if (onClickSelect(e) !== undefined) {
            e.preventDefault();
        }
    },
    onClick: e => {
        const hovered = onClickSelect(e);
        if (hovered !== undefined) {
            hovered.onClick?.();
            e.preventDefault();
        }
        return undefined;
    },
    draw: (args, cell) => {
        const { ctx, rect, theme, hoverX = -100, highlighted } = args;
        const { links, underlineOffset = 5 } = cell.data;

        const xPad = theme.cellHorizontalPadding;

        let drawX = rect.x + xPad;

        const rectHoverX = rect.x + hoverX;

        const font = `${theme.baseFontStyle} ${theme.fontFamily}`;

        const middleCenterBias = getMiddleCenterBias(ctx, font);
        const drawY = rect.y + rect.height / 2 + middleCenterBias;

        for (const [index, l] of links.entries()) {
            const needsComma = index < links.length - 1;
            const metrics = measureTextCached(l.title, ctx);
            const commaMetrics = needsComma ? measureTextCached(l.title + ",", ctx, font) : metrics;

            const isHovered = rectHoverX > drawX && rectHoverX < drawX + metrics.width;

            if (isHovered) {
                ctx.moveTo(drawX, Math.floor(drawY + underlineOffset) + 0.5);
                ctx.lineTo(drawX + metrics.width, Math.floor(drawY + underlineOffset) + 0.5);

                // ctx.lineWidth = 1;
                ctx.strokeStyle = theme.textDark;
                ctx.stroke();

                ctx.fillStyle = highlighted ? blend(theme.accentLight, theme.bgCell) : theme.bgCell;
                ctx.fillText(needsComma ? l.title + "," : l.title, drawX - 1, drawY);
                ctx.fillText(needsComma ? l.title + "," : l.title, drawX + 1, drawY);

                ctx.fillText(needsComma ? l.title + "," : l.title, drawX - 2, drawY);
                ctx.fillText(needsComma ? l.title + "," : l.title, drawX + 2, drawY);
            }
            ctx.fillStyle = theme.textDark;
            ctx.fillText(needsComma ? l.title + "," : l.title, drawX, drawY);

            drawX += commaMetrics.width + 4;
        }

        return true;
    },
    provideEditor: () => {
        // eslint-disable-next-line react/display-name
        return undefined;
    },
    onPaste: (v, d) => {
        const split = v.split(",");
        if (d.links.some((l, i) => split[i] !== l.title)) return undefined;
        return {
            ...d,
            links: split.map(l => ({ title: l })),
        };
    },
};

export default renderer;
