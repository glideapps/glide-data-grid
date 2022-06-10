// FIXME: Replace with LRU cache
const resultCache: Map<string, readonly string[]> = new Map();

// Algorithm imrpoved from https://github.com/geongeorge/Canvas-Txt/blob/master/src/index.js
export function splitMultilineText(ctx: CanvasRenderingContext2D, value: string, fontStyle: string, width: number) {
    const key = `${value}_${fontStyle}`;
    const cacheResult = resultCache.get(key);
    if (cacheResult !== undefined) return cacheResult;

    if (width <= 0) {
        // dont render 0 width stuff
        return [];
    }

    //added one-line only auto linebreak feature
    let result: string[] = [];
    const encodedLines: string[] = value.split("\n");

    encodedLines.forEach(line => {
        let textwidth = ctx.measureText(line).width;
        if (textwidth <= width) {
            // line fits, just push it
            result.push(line);
        } else {
            const lineLength = width;
            let textLength;
            let proposedWidth;
            let subLine;
            textwidth = ctx.measureText(line).width;
            while (textwidth > lineLength) {
                textLength = 0;
                proposedWidth = 0;
                subLine = "";
                while (proposedWidth < lineLength) {
                    // this is dumb as shit, walking up 1 char at a time. we can do better.
                    textLength++;
                    subLine = line.substring(0, textLength);
                    proposedWidth = ctx.measureText(line.substring(0, textLength)).width;
                }
                // Remove last character that was out of the box
                textLength--;
                subLine = subLine.substring(0, textLength);
                //if statement ensures a new line only happens at a space, and not amidst a word
                const backup = textLength;
                if (line.substring(textLength, textLength + 1) !== " ") {
                    while (line.substring(textLength, textLength + 1) !== " " && textLength !== 0) {
                        textLength--;
                    }
                    if (textLength === 0) {
                        textLength = backup;
                    }
                    subLine = line.substring(0, textLength);
                }

                line = line.substring(textLength);
                result.push(subLine);
                textwidth = ctx.measureText(line).width;
            }
            if (textwidth > 0) {
                result.push(line);
            }

            result = result.map((l, i) => (i === 0 ? l : l.trim()));
        }
    });

    return result;
}
