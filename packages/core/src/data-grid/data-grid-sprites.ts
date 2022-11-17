import type { Theme } from "../common/styles";
import type { SpriteProps } from "../common/utils";
import { HeaderIconMap, sprites } from "./sprites";

/**
 * A known icon identifier
 *
 * @category Columns
 */
export type HeaderIcon = keyof HeaderIconMap;

/**
 * A method that produces an SVG array from
 * an SVG icon configuration.
 *
 * @category Columns
 */
export type Sprite = (props: SpriteProps) => string;

/**
 * A method that maps from icon names to functions
 * that return SVG strings.
 *
 * @category Columns
 */
export type SpriteMap = Record<string | HeaderIcon, Sprite>;

/** @category Columns */
export type SpriteVariant = "normal" | "selected" | "special";

function getColors(variant: SpriteVariant, theme: Theme): readonly [string, string] {
    if (variant === "normal") {
        return [theme.bgIconHeader, theme.fgIconHeader];
    } else if (variant === "selected") {
        return ["white", theme.accentColor];
    } else {
        return [theme.accentColor, theme.bgHeader];
    }
}

/** @category Columns */
export class SpriteManager {
    private spriteMap: Map<string, HTMLCanvasElement> = new Map();
    private headerIcons: SpriteMap;
    private inFlight = 0;

    constructor(headerIcons: SpriteMap | undefined, private onSettled: () => void) {
        this.headerIcons = {
            ...sprites,
            ...headerIcons,
        };
    }

    public drawSprite(
        sprite: HeaderIcon | string,
        variant: SpriteVariant,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number,
        theme: Theme,
        alpha: number = 1
    ) {
        const [bgColor, fgColor] = getColors(variant, theme);
        const rSize = size * Math.ceil(window.devicePixelRatio);
        const key = `${bgColor}_${fgColor}_${rSize}_${sprite}`;

        let spriteCanvas = this.spriteMap.get(key);
        if (spriteCanvas === undefined) {
            const spriteCb = this.headerIcons[sprite];

            if (spriteCb === undefined) return;

            spriteCanvas = document.createElement("canvas");
            const spriteCtx = spriteCanvas.getContext("2d");

            if (spriteCtx === null) return;

            const imgSource = new Image();
            imgSource.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(spriteCb({ fgColor, bgColor }))}`;
            this.spriteMap.set(key, spriteCanvas);
            const promise: Promise<void> | undefined = imgSource.decode();

            if (promise === undefined) return;

            this.inFlight++;
            promise
                .then(() => {
                    spriteCtx.drawImage(imgSource, 0, 0, rSize, rSize);
                })
                .finally(() => {
                    this.inFlight--;
                    if (this.inFlight === 0) {
                        this.onSettled();
                    }
                });
        } else {
            if (alpha < 1) {
                ctx.globalAlpha = alpha;
            }
            ctx.drawImage(spriteCanvas, 0, 0, rSize, rSize, x, y, size, size);
            if (alpha < 1) {
                ctx.globalAlpha = 1;
            }
        }
    }
}
