import Canvg from "canvg";
import { Theme } from "../common/styles";
import { sprites } from "./sprites";

type Sprite = keyof typeof sprites;
const spriteList = Object.keys(sprites) as Sprite[];

export type HeaderIcon = Sprite;

export type SpriteVariant = "normal" | "selected" | "special" | "specialSelected";
const variantList: SpriteVariant[] = ["normal", "selected", "special", "specialSelected"];

const renderSize = 40;

let spriteCanvas: HTMLCanvasElement | undefined;
let lastTheme: Theme | undefined;
export async function buildSpriteMap(theme: Theme): Promise<void> {
    // spriteCanvas = new OffscreenCanvas(spriteList.length * renderSize, 4 * renderSize);
    if (theme === lastTheme) return;
    lastTheme = theme;

    spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteList.length * renderSize;
    spriteCanvas.height = 4 * renderSize;
    const ctx = spriteCanvas.getContext("2d");
    if (ctx === null) return;

    let x = 0;
    for (const key of spriteList) {
        const sprite = sprites[key];

        let y = 0;
        for (const variant of variantList) {
            let fgColor = theme.bgColorLight;
            let bgColor = theme.fgColorDark;
            if (variant === "selected") {
                bgColor = "white";
                fgColor = theme.acceptColor;
            } else if (variant === "special") {
                bgColor = theme.acceptColor;
                fgColor = theme.dataViewer.columnHeader.bgColor;
            }
            const renderTarget = document.createElement("canvas");
            renderTarget.width = renderSize;
            renderTarget.height = renderSize;
            const renderCtx = renderTarget.getContext("2d");
            if (renderCtx === null) continue;
            const v = Canvg.fromString(renderCtx, sprite({ fgColor, bgColor }), {
                scaleHeight: 40,
                scaleWidth: 40,
                ignoreDimensions: true,
            });
            await v.render();

            ctx.drawImage(renderTarget, x, y);

            y += renderSize;
        }

        x += renderSize;
    }
}

export function drawSprite(
    sprite: Sprite,
    variant: SpriteVariant,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
) {
    if (spriteCanvas === undefined) throw new Error();

    const xOffset = spriteList.indexOf(sprite) * renderSize;
    const yOffset = variantList.indexOf(variant) * renderSize;

    ctx.drawImage(spriteCanvas, xOffset, yOffset, renderSize, renderSize, x, y, size, size);
}
