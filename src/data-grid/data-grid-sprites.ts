import { GridColumn } from "index";
import { Theme } from "../common/styles";
import { HeaderIconMap, sprites } from "./sprites";

type Sprite = keyof HeaderIconMap;
const spriteList = Object.keys(sprites) as Sprite[];

export type HeaderIcon = Sprite;

export type SpriteVariant = "normal" | "selected" | "special" | "specialSelected";
const variantList: SpriteVariant[] = ["normal", "selected", "special", "specialSelected"];

const renderSize = 40;

interface SpriteTheme {
    bgColorLight: string;
    fgColorDark: string;
    acceptColor: string;
    columnHeaderBg: string;
}

export class SpriteManager {
    private extraMap: string[] = [];
    private spriteCanvas: HTMLCanvasElement | undefined;
    private lastTheme: SpriteTheme | undefined;

    constructor(private headerIcons: HeaderIconMap = sprites) {}

    public drawSprite(
        sprite: Sprite,
        variant: SpriteVariant,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number,
        theme: Theme
    ) {
        if (this.spriteCanvas === undefined) throw new Error();

        const extraIndex = this.extraMap.indexOf(theme.textDark);

        const xOffset = spriteList.indexOf(sprite) * renderSize;
        const yOffset =
            (extraIndex !== -1 ? variantList.length + extraIndex : variantList.indexOf(variant)) * renderSize;

        ctx.drawImage(this.spriteCanvas, xOffset, yOffset, renderSize, renderSize, x, y, size, size);
    }

    public async buildSpriteMap(theme: Theme, cols: readonly GridColumn[]): Promise<void> {
        const extra = new Set<string>();
        for (const c of cols) {
            if (c.themeOverride?.textDark !== undefined) {
                extra.add(c.themeOverride.textDark);
            }
        }
        extra.delete(theme.textDark);
        this.extraMap = [...extra];

        const themeExtract: SpriteTheme = {
            bgColorLight: theme.bgCell,
            fgColorDark: theme.textDark,
            acceptColor: theme.accentColor,
            columnHeaderBg: theme.bgHeader,
        };
        if (
            this.lastTheme?.acceptColor === themeExtract.acceptColor &&
            this.lastTheme?.bgColorLight === themeExtract.bgColorLight &&
            this.lastTheme?.columnHeaderBg === themeExtract.columnHeaderBg &&
            this.lastTheme?.fgColorDark === themeExtract.fgColorDark
        ) {
            return;
        }

        this.lastTheme = themeExtract;

        this.spriteCanvas = document.createElement("canvas");
        this.spriteCanvas.width = spriteList.length * renderSize;
        this.spriteCanvas.height = (variantList.length + this.extraMap.length) * renderSize;
        const ctx = this.spriteCanvas.getContext("2d");
        if (ctx === null) return;

        let x = 0;
        for (const key of spriteList) {
            const sprite = this.headerIcons[key];

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

            for (const ex of this.extraMap) {
                const fgColor = themeExtract.bgColorLight;
                const bgColor = ex;
                const imgSource = new Image();
                imgSource.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sprite({ fgColor, bgColor }))}`;
                await imgSource.decode();

                ctx.drawImage(imgSource, x, y, renderSize, renderSize);

                y += renderSize;
            }

            x += renderSize;
        }
    }
}
