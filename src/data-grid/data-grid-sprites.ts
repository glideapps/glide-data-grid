import { GridColumn } from "index";
import { assert } from "../common/support";
import { Theme } from "../common/styles";
import { HeaderIconMap, sprites } from "./sprites";

export type HeaderIcon = keyof HeaderIconMap;

export type SpriteMap = Record<string | HeaderIcon, HeaderIconMap["headerArray"]>;

export type SpriteVariant = "normal" | "selected" | "special";
const variantList: SpriteVariant[] = ["normal", "selected", "special"];

const renderSize = 40;

function makeExtraMapIndex(bgColor: string, fgColor: string) {
    return `${bgColor}|${fgColor}`;
}

function getColorsForIndex(str: string): readonly [string, string] {
    const r = str.split("|");
    assert(r.length === 2);
    return r as [string, string];
}

function getColors(variant: SpriteVariant, theme: Theme): readonly [string, string] {
    if (variant === "normal") {
        return [theme.bgIconHeader, theme.fgIconHeader];
    } else if (variant === "selected") {
        return ["white", theme.accentColor];
    } else {
        return [theme.accentColor, theme.bgHeader];
    }
}

export class SpriteManager {
    private colorMap: string[] = [];
    private spriteCanvas: HTMLCanvasElement | undefined;
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

        const spriteIndex = this.spriteList.indexOf(sprite);
        if (spriteIndex === -1) throw new Error("Unknown header icon");

        const [bgColor, fgColor] = getColors(variant, theme);
        const variantIndex = this.colorMap.indexOf(makeExtraMapIndex(bgColor, fgColor));

        const xOffset = spriteIndex * renderSize;
        const yOffset = Math.max(0, variantIndex * renderSize);

        ctx.drawImage(this.spriteCanvas, xOffset, yOffset, renderSize, renderSize, x, y, size, size);
    }

    public async buildSpriteMap(theme: Theme, cols: readonly GridColumn[]): Promise<boolean> {
        const map = new Set<string>();
        for (const v of variantList) {
            const [bg, fg] = getColors(v, theme);
            map.add(makeExtraMapIndex(bg, fg));
        }

        for (const c of cols) {
            if (c.themeOverride?.bgIconHeader !== undefined || c.themeOverride?.fgIconHeader !== undefined) {
                const finalTheme = { ...theme, ...c.themeOverride };

                for (const v of variantList) {
                    const [bg, fg] = getColors(v, finalTheme);
                    map.add(makeExtraMapIndex(bg, fg));
                }
            }
        }

        const newMap = [...map];
        newMap.sort();

        let hasDiff = false;
        for (const [index, key] of newMap.entries()) {
            if (key !== this.colorMap[index]) {
                hasDiff = true;
                break;
            }
        }

        if (!hasDiff) return false;

        this.colorMap = newMap;

        this.spriteCanvas = document.createElement("canvas");
        this.spriteCanvas.width = this.spriteList.length * renderSize;
        this.spriteCanvas.height = this.colorMap.length * renderSize;
        const ctx = this.spriteCanvas.getContext("2d");
        if (ctx === null) return false;

        let x = 0;
        for (const key of this.spriteList) {
            const sprite = this.headerIcons[key];

            let y = 0;
            for (const ex of this.colorMap) {
                const [bgColor, fgColor] = getColorsForIndex(ex);
                const imgSource = new Image();
                imgSource.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sprite({ fgColor, bgColor }))}`;
                await imgSource.decode();

                ctx.drawImage(imgSource, x, y, renderSize, renderSize);

                y += renderSize;
            }

            x += renderSize;
        }

        return true;
    }
}
