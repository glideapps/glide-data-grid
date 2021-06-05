import { Theme } from "../common/styles";
import { sprites } from "./sprites";
declare type Sprite = keyof typeof sprites;
export declare type HeaderIcon = Sprite;
export declare type SpriteVariant = "normal" | "selected" | "special" | "specialSelected";
export declare function buildSpriteMap(theme: Theme): Promise<void>;
export declare function drawSprite(sprite: Sprite, variant: SpriteVariant, ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void;
export {};
//# sourceMappingURL=data-grid-sprites.d.ts.map