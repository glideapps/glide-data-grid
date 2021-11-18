import { CustomCell, Rectangle, Theme, ProvideEditorCallback } from "@glideapps/glide-data-grid";
import ImageWindowLoader from "@glideapps/glide-data-grid/dist/ts/common/image-window-loader";

interface DrawArgs {
    ctx: CanvasRenderingContext2D;
    theme: Theme;
    rect: Rectangle;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    col: number;
    row: number;
    highlighted: boolean;
    imageLoader: ImageWindowLoader;
}

export type CustomCellRenderer<T extends CustomCell> = {
    isMatch: (cell: CustomCell) => cell is T;
    draw: (args: DrawArgs, cell: T) => boolean;
    provideEditor: ProvideEditorCallback<T>;
};
