const resultCache: Map<string, readonly string[]> = new Map();

export function clearMultilineCache() {
    resultCache.clear();
}

// speed optimization plan
//
// 1) Use modified newton method to approach correct split point rather than walk after first guess (still walk when n
//    low enough)
//       -- Turns out the guess method we have already is too good and doesn't leave room for newtons method to improve
//
// 2) Make some conservative guess on the initial textWidth measure to not have to measure the entire string if it
//    is very large. This prevents laying out a lot of characters which will definitely be wrapped.

function getSplitPoint(ctx: CanvasRenderingContext2D, text: string, totalWidth: number, width: number): number {
    if (text.length <= 1) return text.length;

    // this should never happen, but we are protecting anyway
    if (totalWidth < width) return -1;

    let guess = Math.floor((width / totalWidth) * text.length);
    let guessWidth = ctx.measureText(text.substring(0, guess)).width;

    if (guessWidth === width) {
        // NAILED IT
    } else if (guessWidth < width) {
        while (guessWidth < width) {
            guess++;
            guessWidth = ctx.measureText(text.substring(0, guess)).width;
        }
        guess--;
    } else {
        // we only need to check for spaces as we go back
        while (guessWidth > width) {
            guess--;
            guessWidth = ctx.measureText(text.substring(0, guess)).width;
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
    width: number
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

    for (let line of encodedLines) {
        let textWidth = ctx.measureText(line).width;
        if (textWidth <= width) {
            // line fits, just push it
            result.push(line);
        } else {
            while (textWidth > width) {
                const splitPoint = getSplitPoint(ctx, line, textWidth, width);
                const subLine = line.substring(0, splitPoint);

                line = line.substring(subLine.length);
                result.push(subLine);
                textWidth = ctx.measureText(line).width;
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
