const resultCache: Map<string, readonly string[]> = new Map();

// font -> avg pixels per char
const metrics: Map<string, { count: number; size: number }> = new Map();

const hyperMaps: Map<string, Map<string, number>> = new Map();

export function clearMultilineCache() {
    resultCache.clear();
    metrics.clear();
    hyperMaps.clear();
}

function backProp(text: string, realWidth: number, keyMap: Map<string, number>, temperature: number, avgSize: number) {
    let guessWidth = 0;
    const contribMap: Record<string, number> = {};
    for (const char of text) {
        const v = keyMap.get(char) ?? avgSize;
        guessWidth += v;
        contribMap[char] = (contribMap[char] ?? 0) + 1;
    }

    const diff = realWidth - guessWidth;

    for (const key of Object.keys(contribMap)) {
        const numContribution = contribMap[key];
        const contribWidth = keyMap.get(key) ?? avgSize;
        const contribAmount = (contribWidth * numContribution) / guessWidth;
        const adjustment = (diff * contribAmount * temperature) / numContribution;
        const newVal = contribWidth + adjustment;
        keyMap.set(key, newVal);
    }
}

function makeHyperMap(ctx: CanvasRenderingContext2D, avgSize: number): Map<string, number> {
    const result: Map<string, number> = new Map();
    let total = 0;
    for (const char of "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.-+=?") {
        const w = ctx.measureText(char).width;
        result.set(char, w);
        total += w;
    }

    const avg = total / result.size;

    // Artisnal hand-tuned constants that have no real meaning other than they make it work better for most fonts
    const damper = 3;
    const scaler = (avgSize / avg + damper) / (damper + 1);
    const keys = result.keys();
    for (const key of keys) {
        result.set(key, (result.get(key) ?? avg) * scaler);
    }
    return result;
}

function measureText(ctx: CanvasRenderingContext2D, text: string, fontStyle: string, hyperMode: boolean): number {
    const current = metrics.get(fontStyle);

    if (hyperMode && current !== undefined && current.count > 20000) {
        let hyperMap = hyperMaps.get(fontStyle);
        if (hyperMap === undefined) {
            hyperMap = makeHyperMap(ctx, current.size);
            hyperMaps.set(fontStyle, hyperMap);
        }

        if (current.count > 500000) {
            let final = 0;
            for (const char of text) {
                final += hyperMap.get(char) ?? current.size;
            }
            return final * 1.01; //safety margin
        }

        const result = ctx.measureText(text);
        backProp(text, result.width, hyperMap, Math.max(0.05, 1 - current.count / 200000), current.size);
        metrics.set(fontStyle, {
            count: current.count + text.length,
            size: current.size,
        });
        return result.width;
    }

    const result = ctx.measureText(text);

    const avg = result.width / text.length;

    // we've collected enough data
    if ((current?.count ?? 0) > 20000) {
        return result.width;
    }

    if (current === undefined) {
        metrics.set(fontStyle, {
            count: text.length,
            size: avg,
        });
    } else {
        const diff = avg - current.size;
        const contribution = text.length / (current.count + text.length);
        const newVal = current.size + diff * contribution;
        metrics.set(fontStyle, {
            count: current.count + text.length,
            size: newVal,
        });
    }

    return result.width;
}

function getSplitPoint(
    ctx: CanvasRenderingContext2D,
    text: string,
    width: number,
    fontStyle: string,
    totalWidth: number,
    measuredChars: number,
    hyperMode: boolean
): number {
    if (text.length <= 1) return text.length;

    // this should never happen, but we are protecting anyway
    if (totalWidth < width) return -1;

    let guess = Math.floor((width / totalWidth) * measuredChars);
    let guessWidth = measureText(ctx, text.substring(0, guess), fontStyle, hyperMode);

    if (guessWidth === width) {
        // NAILED IT
    } else if (guessWidth < width) {
        while (guessWidth < width) {
            guess++;
            guessWidth = measureText(ctx, text.substring(0, guess), fontStyle, hyperMode);
        }
        guess--;
    } else {
        // we only need to check for spaces as we go back
        while (guessWidth > width) {
            guess--;
            guessWidth = measureText(ctx, text.substring(0, guess), fontStyle, hyperMode);
        }
    }

    if (text[guess] !== " ") {
        const lastSpace = text.lastIndexOf(" ", guess);
        if (lastSpace > 0) {
            guess = lastSpace;
        }
    }

    return guess;
}

// Algorithm improved from https://github.com/geongeorge/Canvas-Txt/blob/master/src/index.js
export function splitMultilineText(
    ctx: CanvasRenderingContext2D,
    value: string,
    fontStyle: string,
    width: number,
    hyperWrappingAllowed: boolean
): readonly string[] {
    const key = `${value}_${fontStyle}_${width}px`;
    const cacheResult = resultCache.get(key);
    if (cacheResult !== undefined) return cacheResult;

    if (width <= 0) {
        // dont render 0 width stuff
        return [];
    }

    let result: string[] = [];
    const encodedLines: string[] = value.split("\n");

    const fontMetrics = metrics.get(fontStyle);
    const safeLineGuess = fontMetrics === undefined ? value.length : (width / fontMetrics.size) * 1.5;
    const hyperMode = hyperWrappingAllowed && fontMetrics !== undefined && fontMetrics.count > 20000;

    for (let line of encodedLines) {
        let textWidth = measureText(ctx, line.substring(0, safeLineGuess), fontStyle, hyperMode);
        let measuredChars = Math.min(line.length, safeLineGuess);
        if (textWidth <= width) {
            // line fits, just push it
            result.push(line);
        } else {
            while (textWidth > width) {
                const splitPoint = getSplitPoint(ctx, line, width, fontStyle, textWidth, measuredChars, hyperMode);
                const subLine = line.substring(0, splitPoint);

                line = line.substring(subLine.length);
                result.push(subLine);
                textWidth = measureText(ctx, line.substring(0, safeLineGuess), fontStyle, hyperMode);
                measuredChars = Math.min(line.length, safeLineGuess);
            }
            if (textWidth > 0) {
                result.push(line);
            }
        }
    }

    result = result.map((l, i) => (i === 0 ? l.trimEnd() : l.trim()));
    resultCache.set(key, result);
    if (resultCache.size > 500) {
        // this is not technically LRU behavior but it works "close enough" and is much cheaper
        resultCache.delete(resultCache.keys().next().value);
    }
    return result;
}
