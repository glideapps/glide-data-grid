const resultCache: Map<string, readonly string[]> = new Map();

// font -> avg pixels per char
const metrics: Map<string, { count: number; size: number }> = new Map();

const hyperMaps: Map<string, Record<string, number>> = new Map();

export function clearMultilineCache() {
    resultCache.clear();
    metrics.clear();
    hyperMaps.clear();
}

// speed optimization plan
//
// 1) Use modified newton method to approach correct split point rather than walk after first guess (still walk when n
//    low enough)
//       -- Turns out the guess method we have already is too good and doesn't leave room for newtons method to improve
//
// 2) Make some conservative guess on the initial textWidth measure to not have to measure the entire string if it
//    is very large. This prevents laying out a lot of characters which will definitely be wrapped.
//      - End result of this seems to be that our guesses become more accurate as well due to the data for the guess
//        being more local. In hindsight this is obvious.

function makeHyperMap(ctx: CanvasRenderingContext2D, avgSize: number): Record<string, number> {
    const baseMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.-+=?"
        .split("")
        .map(char => ({ [char]: ctx.measureText(char).width }))
        .reduce((pv, acc) => Object.assign(acc, pv), {});

    const values = Object.values(baseMap);
    const avg = values.reduce((pv, cv) => pv + cv, 0) / values.length;

    // Artisnal hand-tuned constants that have no real meaning other than they make it work better for most fonts
    const damper = 3;
    const scaler = (avgSize / avg + damper) / (damper + 1);
    const keys = Object.keys(baseMap);
    for (const key of keys) {
        baseMap[key] *= scaler;
    }
    return baseMap;
}

function measureText(ctx: CanvasRenderingContext2D, text: string, fontStyle: string, hyperMode: boolean): number {
    const current = metrics.get(fontStyle);

    if (hyperMode && current !== undefined && current.count > 50000) {
        let hyperMap = hyperMaps.get(fontStyle);
        if (hyperMap === undefined) {
            hyperMap = makeHyperMap(ctx, current.size);
            hyperMaps.set(fontStyle, hyperMap);
        }
        let final = 0;
        for (const char of text) {
            final += hyperMap[char] ?? current.size;
        }
        return final;
    }

    const result = ctx.measureText(text);
    const avg = result.width / text.length;

    // we've collected enough data
    if ((current?.count ?? 0) > 50000) {
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
    const hyperMode = hyperWrappingAllowed && fontMetrics !== undefined && fontMetrics.count > 45000;

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
