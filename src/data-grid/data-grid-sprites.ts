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
        bgColorLight: theme.bgColorLight,
        fgColorDark: theme.fgColorDark,
        acceptColor: theme.acceptColor,
        columnHeaderBg: theme.dataViewer.columnHeader.bgColor,
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

    const images: { image: HTMLImageElement; x: number; y: number }[] = [];

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

            const img = new Image(40, 40);
            const svg = sprite({ fgColor, bgColor });
            img.src = "data:image/svg+xml;base64," + btoa(svg);
            images.push({ image: img, x: x, y: y });
            y += renderSize;
        }

        x += renderSize;
    }

    return new Promise((resolve, reject) => {
        Promise.all(images.map(image => image.image.decode())).then(
            () => {
                for (let i = 0; i < images.length; i++) {
                    const img = images[i];
                    const renderTarget = document.createElement("canvas");
                    renderTarget.width = renderSize;
                    renderTarget.height = renderSize;
                    const renderCtx = renderTarget.getContext("2d");
                    if (renderCtx === null) continue;
                    renderCtx.drawImage(img.image, 0, 0, renderSize, renderSize);
                    ctx.drawImage(renderTarget, img.x, img.y);
                }
                resolve();
            },
            () => {
                reject();
            }
        );
    });
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
