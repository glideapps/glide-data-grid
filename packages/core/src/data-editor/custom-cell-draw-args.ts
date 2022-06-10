import ImageWindowLoader from "../common/image-window-loader";
import { Theme } from "../common/styles";
import { Rectangle } from "../data-grid/data-grid-types";

export interface DrawArgs {
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
    requestAnimationFrame: () => void;
}
