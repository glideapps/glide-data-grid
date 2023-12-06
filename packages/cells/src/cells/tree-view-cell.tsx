import { type CustomCell, type CustomRenderer, GridCellKind, getMiddleCenterBias } from "@glideapps/glide-data-grid";

interface TreeViewCellProps {
    readonly kind: "tree-view-cell";
    readonly text: string;
    readonly isOpen: boolean;
    readonly canOpen: boolean;
    readonly depth: number;
}

export type TreeViewCell = CustomCell<TreeViewCellProps> & { readonly: true };

const renderer: CustomRenderer<TreeViewCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is TreeViewCell => (c.data as any).kind === "tree-view-cell",
    needsHover: true,
    needsHoverPosition: true,
    draw: (args, cell) => {
        const { ctx, theme, rect, hoverX = 0, hoverY = 0 } = args;
        const { x, y, height: h } = rect;
        const { canOpen, depth, text, isOpen } = cell.data;

        const bias = getMiddleCenterBias(ctx, theme);

        const inset = depth * 16;

        const midLine = y + h / 2;

        if (canOpen) {
            const overIcon =
                hoverX >= inset + theme.cellHorizontalPadding - 4 &&
                hoverX <= inset + theme.cellHorizontalPadding + 18 &&
                hoverY >= h / 2 - 9 &&
                hoverY <= h / 2 + 9;

            if (isOpen) {
                ctx.moveTo(inset + x + theme.cellHorizontalPadding, midLine - 2.5);
                ctx.lineTo(inset + x + theme.cellHorizontalPadding + 5, midLine + 2.5);
                ctx.lineTo(inset + x + theme.cellHorizontalPadding + 10, midLine - 2.5);
            } else {
                ctx.moveTo(inset + x + theme.cellHorizontalPadding + 2.5, midLine - 5);
                ctx.lineTo(inset + x + theme.cellHorizontalPadding + 2.5 + 5, midLine);
                ctx.lineTo(inset + x + theme.cellHorizontalPadding + 2.5, midLine + 5);
            }

            ctx.strokeStyle = overIcon ? theme.textMedium : theme.textLight;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        ctx.fillStyle = theme.textDark;
        ctx.fillText(text, 16 + x + inset + theme.cellHorizontalPadding + 0.5, y + h / 2 + bias);

        return true;
    },
    provideEditor: undefined,
};

export default renderer;
