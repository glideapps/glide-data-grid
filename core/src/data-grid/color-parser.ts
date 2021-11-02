// Shamelessly stolen from https://github.com/ricokahler/color2k
// We don't need all the color functions but we deeply appreciate their work.

const cache: {
    [color: string]: [number, number, number, number];
} = {};

let div: HTMLDivElement | null = null;

function createDiv() {
    const d = document.createElement("div");
    d.classList.add("color2k-parser");
    d.style.opacity = "0";
    d.style.pointerEvents = "none";
    d.style.position = "fixed";
    // div must be mounted for `getComputedStyle` to work
    document.body.appendChild(d);
    return d;
}

export function parseToRgba(color: string): [number, number, number, number] {
    // normalize the color
    const normalizedColor = color.toLowerCase().trim();

    if (cache[normalizedColor] !== undefined) return cache[normalizedColor];

    div = div || createDiv();

    div.style.color = "#000";
    div.style.color = normalizedColor;
    const control = getComputedStyle(div).color;

    div.style.color = "#fff";
    div.style.color = normalizedColor;
    const computedColor = getComputedStyle(div).color;

    if (computedColor !== control) throw new Error("Could not parse color");

    const result = computedColor
        .replace(/[^\d.,]/g, "")
        .split(",")
        .map(parseFloat) as [number, number, number, number];

    if (result.length < 4) {
        result.push(1);
    }

    cache[normalizedColor] = result;
    return result;
}
