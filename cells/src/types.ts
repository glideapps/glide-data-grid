import { CustomCell, Rectangle, Theme } from "@glideapps/glide-data-grid";

export type CustomCellRenderer<T extends CustomCell> = {
    isMatch: (cell: CustomCell) => cell is T;
    draw: (ctx: CanvasRenderingContext2D, cell: T, theme: Theme, rect: Rectangle) => boolean;
};
