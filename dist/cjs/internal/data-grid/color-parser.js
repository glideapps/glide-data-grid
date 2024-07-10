"use strict";
// Shamelessly stolen from https://github.com/ricokahler/color2k
// We don't need all the color functions but we deeply appreciate their work.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLuminance = exports.interpolateColors = exports.blend = exports.blendCache = exports.withAlpha = exports.parseToRgba = void 0;
const cache = {};
let div = null;
function createDiv() {
    const d = document.createElement("div");
    d.style.opacity = "0";
    d.style.pointerEvents = "none";
    d.style.position = "fixed";
    // div must be mounted for `getComputedStyle` to work
    document.body.append(d);
    return d;
}
/** @category Drawing */
function parseToRgba(color) {
    // normalize the color
    const normalizedColor = color.toLowerCase().trim();
    if (cache[normalizedColor] !== undefined)
        return cache[normalizedColor];
    div = div || createDiv();
    div.style.color = "#000";
    div.style.color = normalizedColor;
    const control = getComputedStyle(div).color;
    div.style.color = "#fff";
    div.style.color = normalizedColor;
    const computedColor = getComputedStyle(div).color;
    if (computedColor !== control)
        return [0, 0, 0, 1];
    let result = computedColor
        // eslint-disable-next-line unicorn/better-regex
        .replace(/[^\d.,]/g, "")
        .split(",")
        .map(Number.parseFloat);
    if (result.length < 4) {
        result.push(1);
    }
    result = result.map(x => {
        const isNaN = Number.isNaN(x);
        if (process.env.NODE_ENV !== "production" && isNaN) {
            // eslint-disable-next-line no-console
            console.warn("Could not parse color", color);
        }
        return isNaN ? 0 : x;
    });
    cache[normalizedColor] = result;
    return result;
}
exports.parseToRgba = parseToRgba;
/** @category Drawing */
function withAlpha(color, alpha) {
    const [r, g, b] = parseToRgba(color);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
exports.withAlpha = withAlpha;
const blendResultCache = new Map();
function blendCache(color, background) {
    const cacheKey = `${color}-${background}`;
    const maybe = blendResultCache.get(cacheKey);
    if (maybe !== undefined)
        return maybe;
    const result = blend(color, background);
    blendResultCache.set(cacheKey, result);
    return result;
}
exports.blendCache = blendCache;
/** @category Drawing */
function blend(color, background) {
    if (background === undefined)
        return color;
    const [r, g, b, a] = parseToRgba(color);
    if (a === 1)
        return color;
    const [br, bg, bb, ba] = parseToRgba(background);
    const ao = a + ba * (1 - a);
    // (xaA + xaB·(1−aA))/aR
    const ro = (a * r + ba * br * (1 - a)) / ao;
    const go = (a * g + ba * bg * (1 - a)) / ao;
    const bo = (a * b + ba * bb * (1 - a)) / ao;
    return `rgba(${ro}, ${go}, ${bo}, ${ao})`;
}
exports.blend = blend;
/** @category Drawing */
function interpolateColors(leftColor, rightColor, val) {
    // toot toot im a GPU
    if (val <= 0)
        return leftColor;
    if (val >= 1)
        return rightColor;
    // Parse to rgba returns straight alpha colors, for interpolation we want pre-multiplied alpha
    // FIXME: This can be faster if instead of makign an array we just use variables. No memory allocation.
    const left = [...parseToRgba(leftColor)];
    left[0] = left[0] * left[3];
    left[1] = left[1] * left[3];
    left[2] = left[2] * left[3];
    const right = [...parseToRgba(rightColor)];
    right[0] = right[0] * right[3];
    right[1] = right[1] * right[3];
    right[2] = right[2] * right[3];
    const hScaler = val;
    const nScaler = 1 - val;
    const a = left[3] * nScaler + right[3] * hScaler;
    // now we need to divide the alpha back out to get linear alpha back for the final result
    const r = Math.floor((left[0] * nScaler + right[0] * hScaler) / a);
    const g = Math.floor((left[1] * nScaler + right[1] * hScaler) / a);
    const b = Math.floor((left[2] * nScaler + right[2] * hScaler) / a);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
exports.interpolateColors = interpolateColors;
/**
 * Returns a number (float) representing the luminance of a color.
 *
 * @category Drawing
 */
function getLuminance(color) {
    if (color === "transparent")
        return 0;
    // eslint-disable-next-line unicorn/consistent-function-scoping
    function f(x) {
        const channel = x / 255;
        return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    }
    const [r, g, b] = parseToRgba(color);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
exports.getLuminance = getLuminance;
//# sourceMappingURL=color-parser.js.map