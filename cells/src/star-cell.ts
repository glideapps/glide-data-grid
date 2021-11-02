import { CustomCell } from "@glideapps/glide-data-grid";
import { CustomCellRenderer } from "./types";

interface StarCellProps {
    readonly kind: "star-cell";
    readonly rating: number;
    readonly label?: string;
}

export type StarCell = CustomCell<StarCellProps>;

const renderer: CustomCellRenderer<StarCell> = {
    isMatch: (cell: CustomCell): cell is StarCell => (cell.data as any).kind === "star-cell",
    draw: (ctx, _cell, theme, rect) => {
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.fillStyle = theme.accentColor;
        ctx.fill();
        return true;
    },
};

export default renderer;
