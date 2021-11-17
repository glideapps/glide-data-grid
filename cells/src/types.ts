import { CustomCell, Rectangle, Theme, ProvideEditorCallback } from "@glideapps/glide-data-grid";

interface DrawArgs {
    ctx: CanvasRenderingContext2D;
    theme: Theme;
    rect: Rectangle;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    highlighted: boolean;
}

export type CustomCellRenderer<T extends CustomCell> = {
    isMatch: (cell: CustomCell) => cell is T;
    draw: (args: DrawArgs, cell: T) => boolean;
    provideEditor: ProvideEditorCallback<T>;
};
