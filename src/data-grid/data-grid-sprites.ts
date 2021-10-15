import { Theme } from "../common/styles";
import { sprites } from "./sprites";

type Sprite = keyof typeof sprites;
const spriteList = Object.keys(sprites) as Sprite[];

export type HeaderIcon = Sprite;

export type SpriteVariant = "normal" | "selected" | "special" | "specialSelected";
const variantList: SpriteVariant[] = ["normal", "selected", "special", "specialSelected"];

const renderSize = 40;

let spriteCanvas: HTMLCanvasElement | undefined;
interface SpriteTheme {
    bgColorLight: string;
    fgColorDark: string;
    acceptColor: string;
    columnHeaderBg: string;
}
let lastTheme: SpriteTheme | undefined;
export async function buildSpriteMap(theme: Theme): Promise<void> {
    // spriteCanvas = new OffscreenCanvas(spriteList.length * renderSize, 4 * renderSize);
    const themeExtract: SpriteTheme = {
        bgColorLight: theme.bgCell,
        fgColorDark: theme.textDark,
        acceptColor: theme.accentColor,
        columnHeaderBg: theme.bgHeader,
    };
    if (
        lastTheme?.acceptColor === themeExtract.acceptColor &&
        lastTheme?.bgColorLight === themeExtract.bgColorLight &&
        lastTheme?.columnHeaderBg === themeExtract.columnHeaderBg &&
        lastTheme?.fgColorDark === themeExtract.fgColorDark
    ) {
        return;
    }

    lastTheme = themeExtract;

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
            let fgColor = themeExtract.bgColorLight;
            let bgColor = themeExtract.fgColorDark;
            if (variant === "selected") {
                bgColor = "white";
                fgColor = themeExtract.acceptColor;
            } else if (variant === "special") {
                bgColor = themeExtract.acceptColor;
                fgColor = themeExtract.columnHeaderBg;
            }
            const imgSource = new Image();
            imgSource.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sprite({ fgColor, bgColor }))}`;
            await imgSource.decode();

            ctx.drawImage(imgSource, x, y, renderSize, renderSize);

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
