function getColors(variant, theme) {
    if (variant === "normal") {
        return [theme.bgIconHeader, theme.fgIconHeader];
    }
    else if (variant === "selected") {
        return ["white", theme.accentColor];
    }
    else {
        return [theme.accentColor, theme.bgHeader];
    }
}
/** @category Columns */
export class SpriteManager {
    onSettled;
    spriteMap = new Map();
    headerIcons;
    inFlight = 0;
    constructor(headerIcons, onSettled) {
        this.onSettled = onSettled;
        this.headerIcons = headerIcons ?? {};
    }
    drawSprite(sprite, variant, ctx, x, y, size, theme, alpha = 1) {
        const [bgColor, fgColor] = getColors(variant, theme);
        const rSize = size * Math.ceil(window.devicePixelRatio);
        const key = `${bgColor}_${fgColor}_${rSize}_${sprite}`;
        let spriteCanvas = this.spriteMap.get(key);
        if (spriteCanvas === undefined) {
            const spriteCb = this.headerIcons[sprite];
            if (spriteCb === undefined)
                return;
            spriteCanvas = document.createElement("canvas");
            const spriteCtx = spriteCanvas.getContext("2d");
            if (spriteCtx === null)
                return;
            const imgSource = new Image();
            imgSource.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(spriteCb({ fgColor, bgColor }))}`;
            this.spriteMap.set(key, spriteCanvas);
            const promise = imgSource.decode();
            if (promise === undefined)
                return;
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
        }
        else {
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
//# sourceMappingURL=data-grid-sprites.js.map