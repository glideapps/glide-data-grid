import { GridColumn } from "index";
import { Theme } from "../common/styles";
import { HeaderIconMap, sprites } from "./sprites";

export type HeaderIcon = keyof HeaderIconMap;

export type SpriteMap = Record<string | HeaderIcon, HeaderIconMap["headerArray"]>;

export type SpriteVariant = "normal" | "selected" | "special" | "specialSelected";
const variantList: SpriteVariant[] = ["normal", "selected", "special", "specialSelected"];

const renderSize = 40;

interface SpriteTheme {
    bgColor: string;
    fgColor: string;
    acceptColor: string;
    columnHeaderBg: string;
}

export class SpriteManager {
    private extraMap: string[] = [];
    private spriteCanvas: HTMLCanvasElement | undefined;
    private lastTheme: SpriteTheme | undefined;
    private spriteList: string[];
    private headerIcons: SpriteMap;

    constructor(headerIcons: SpriteMap | undefined) {
        this.headerIcons = {
            ...sprites,
            ...(headerIcons ?? {}),
        };
        this.spriteList = Object.keys(this.headerIcons);
    }

    public drawSprite(
        sprite: HeaderIcon | string,
        variant: SpriteVariant,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        size: number,
        theme: Theme
    ) {
        if (this.spriteCanvas === undefined) throw new Error();

        const index = this.spriteList.indexOf(sprite);
        if (index === -1) throw new Error("Unknown header icon");

        const extraIndex = this.extraMap.indexOf(theme.textDark);

        const xOffset = index * renderSize;
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
            fgColor: theme.fgIconHeader,
            bgColor: theme.bgIconHeader,
            acceptColor: theme.accentColor,
            columnHeaderBg: theme.bgHeader,
        };
        if (
            this.lastTheme?.acceptColor === themeExtract.acceptColor &&
            this.lastTheme?.bgColor === themeExtract.bgColor &&
            this.lastTheme?.columnHeaderBg === themeExtract.columnHeaderBg &&
            this.lastTheme?.fgColor === themeExtract.fgColor
        ) {
            return;
        }

        this.lastTheme = themeExtract;

        this.spriteCanvas = document.createElement("canvas");
        this.spriteCanvas.width = this.spriteList.length * renderSize;
        this.spriteCanvas.height = (variantList.length + this.extraMap.length) * renderSize;
        const ctx = this.spriteCanvas.getContext("2d");
        if (ctx === null) return;

        let x = 0;
        for (const key of this.spriteList) {
            const sprite = this.headerIcons[key];

            let y = 0;
            for (const variant of variantList) {
                let fgColor = themeExtract.fgColor;
                let bgColor = themeExtract.bgColor;
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
                const fgColor = themeExtract.fgColor;
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
