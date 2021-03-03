import { Theme } from "../common/styles";
import ImageWindowLoader from "../common/image-window-loader";
import { GridCell, GridCellKind, GridColumn, isEditableGridCell } from "./data-grid-types";
import direction from "direction";
// import { drawGenImageToCanvas } from "../../lib/gen-image-cache";
import { degreesToRadians } from "../common/utils";
import { assertNever } from "../common/support";

interface MappedGridColumn extends GridColumn {
    sourceIndex: number;
    sticky: boolean;
}

export function makeEditCell(cell: GridCell): GridCell {
    const isEditable = isEditableGridCell(cell);

    switch (cell.kind) {
        case GridCellKind.Boolean:
            return {
                ...cell,
                data: false,
            };
        case GridCellKind.Text:
            return {
                ...cell,
                data: "",
                displayData: "",
            };
        case GridCellKind.Markdown:
        case GridCellKind.Uri:
        case GridCellKind.RowID:
            return {
                ...cell,
                data: "",
                allowOverlay: isEditable,
            };
        case GridCellKind.Protected:
        case GridCellKind.Loading:
            return cell;
        case GridCellKind.Image:
        case GridCellKind.Bubble:
            return {
                ...cell,
                data: [],
                allowOverlay: isEditable,
            };
        case GridCellKind.Number:
            return {
                ...cell,
                data: undefined,
                displayData: "",
            };
        default:
            assertNever(cell);
    }
}

export function getEffectiveColumns(
    columns: readonly GridColumn[],
    cellXOffset: number,
    width: number,
    firstColSticky: boolean,
    dndState?: {
        src: number;
        dest: number;
    },
    tx?: number
): readonly MappedGridColumn[] {
    const mappedCols = columns.map((c, i) => ({
        ...c,
        sourceIndex: i,
        sticky: firstColSticky && i === 0,
    }));

    if (dndState !== undefined) {
        const temp = mappedCols[dndState.src];
        if (dndState.src > dndState.dest) {
            mappedCols.splice(dndState.src, 1);
            mappedCols.splice(dndState.dest, 0, temp);
        } else {
            mappedCols.splice(dndState.dest + 1, 0, temp);
            mappedCols.splice(dndState.src, 1);
        }
    }

    if (firstColSticky) {
        width -= mappedCols[0].width;
    }
    let endIndex = cellXOffset;
    let curX = tx ?? 0;

    while (curX <= width && endIndex < mappedCols.length) {
        curX += mappedCols[endIndex].width;
        endIndex++;
    }

    let effectiveCols = mappedCols.slice(cellXOffset, endIndex);

    if (firstColSticky && cellXOffset !== 0) {
        effectiveCols = [
            {
                ...mappedCols[0],
            },
            ...effectiveCols,
        ];
    }

    return effectiveCols;
}

export function getColumnIndexForX(
    targetX: number,
    effectiveColumns: readonly MappedGridColumn[],
    translateX?: number
): number {
    let x = 0;
    for (const c of effectiveColumns) {
        const cx = c.sticky ? x : x + (translateX ?? 0);
        if (targetX <= cx + c.width) {
            return c.sourceIndex;
        }
        x += c.width;
    }
    return -1;
}

export function getRowIndexForY(
    targetY: number,
    headerHeight: number,
    rows: number,
    rowHeight: number | ((index: number) => number),
    cellYOffset: number,
    translateY?: number
): number | undefined {
    if (targetY <= headerHeight) return -1;

    const ty = targetY - (translateY ?? 0);
    if (typeof rowHeight === "number") {
        const target = Math.floor((ty - headerHeight) / rowHeight) + cellYOffset;
        if (target >= rows) return undefined;
        return target;
    } else {
        let curY = headerHeight;
        for (let i = cellYOffset; i < rows; i++) {
            const rh = rowHeight(i);
            if (ty <= curY + rh) return i;
            curY += rh;
        }
        return undefined;
    }
}

const cellXPad = 8;
const cellYPad = 3;

const textWidths = new Map<string, number>();

function measureTextWidth(s: string, ctx: CanvasRenderingContext2D): number {
    // return ctx.measureText(s).width;
    let textWidth = textWidths.get(s);
    if (textWidth === undefined) {
        textWidth = ctx.measureText(s).width;
        textWidths.set(s, textWidth);
    }

    if (textWidths.size > 10000) {
        textWidths.clear();
    }

    return textWidth;
}

export function drawTextCell(
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    data: string,
    x: number,
    y: number,
    width: number,
    height: number,
    overrideColor?: string
) {
    data = data.split(/\r?\n/)[0].slice(0, Math.round(width / 4));

    const dir = direction(data);

    ctx.fillStyle = overrideColor ?? theme.fgColorDark;
    if (dir === "rtl") {
        const textWidth = measureTextWidth(data, ctx);
        ctx.fillText(data, x + width - cellXPad - textWidth + 0.5, y + height / 2 + 4.5);
    } else {
        ctx.fillText(data, x + cellXPad + 0.5, y + height / 2 + 4.5);
    }
}

export function drawProtectedCell(
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    x: number,
    y: number,
    width: number,
    height: number,
    drawBackground: boolean
) {
    if (drawBackground) {
        ctx.beginPath();
        ctx.rect(x + 1, y + 1, width - 1, height - 1);
        ctx.fillStyle = theme.bgColorAltLight;
        ctx.fill();
    }

    ctx.beginPath();

    const radius = 2.5;
    let xStart = x + cellXPad + radius;
    const center = y + height / 2;
    const p = Math.cos(degreesToRadians(30)) * radius;
    const q = Math.sin(degreesToRadians(30)) * radius;

    for (let i = 0; i < 12; i++) {
        // ctx.arc(xStart, center, radius, 0, Math.PI * 2);
        ctx.moveTo(xStart, center - radius);
        ctx.lineTo(xStart, center + radius);

        ctx.moveTo(xStart + p, center - q);
        ctx.lineTo(xStart - p, center + q);

        ctx.moveTo(xStart - p, center - q);
        ctx.lineTo(xStart + p, center + q);
        xStart += 8;
    }
    ctx.lineWidth = 1.1;
    ctx.lineCap = "square";
    ctx.strokeStyle = theme.fgColorMedium + "DD";
    ctx.stroke();
}

interface CornerRadius {
    tl: number;
    tr: number;
    bl: number;
    br: number;
}

function roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number | CornerRadius
) {
    if (typeof radius === "number") {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    }

    ctx.moveTo(x + radius.tl, y);
    ctx.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
    ctx.arcTo(x + width, y + height, x + width - radius.br, y + height, radius.br);
    ctx.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
    ctx.arcTo(x, y, x + radius.tl, y, radius.tl);
}

export function drawBoolean(
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    data: boolean,
    x: number,
    y: number,
    width: number,
    height: number,
    highlighted: boolean
) {
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    if (data) {
        ctx.beginPath();
        roundedRect(ctx, centerX - 9, centerY - 9, 18, 18, 3);

        ctx.fillStyle = highlighted ? theme.acceptColor : theme.fgColorMedium;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(centerX - 6, centerY - 0.5);
        ctx.lineTo(centerX - 2.5, centerY + 3);
        ctx.lineTo(centerX + 5, centerY - 4);

        ctx.strokeStyle = theme.bgColorLight;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 1.9;
        ctx.stroke();
    } else {
        ctx.beginPath();
        roundedRect(ctx, centerX - 8, centerY - 8, 16, 16, 2);

        ctx.lineWidth = 2;
        ctx.strokeStyle = theme.fgColorLight;
        ctx.stroke();
    }
}

const itemMargin = 4;

export function drawBubbles(
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    data: string[],
    x: number,
    y: number,
    width: number,
    height: number,
    highlighted: boolean
) {
    const bubbleHeight = 20;
    const bubblePad = 8;
    const bubbleMargin = itemMargin;
    let renderX = x + cellXPad;

    const renderBoxes: { x: number; width: number }[] = [];
    for (const s of data) {
        if (renderX > x + width) break;
        const textWidth = measureTextWidth(s, ctx);
        renderBoxes.push({
            x: renderX,
            width: textWidth,
        });

        renderX += textWidth + bubblePad * 2 + bubbleMargin;
    }

    ctx.beginPath();
    renderBoxes.forEach(rectInfo => {
        roundedRect(
            ctx,
            rectInfo.x,
            y + (height - bubbleHeight) / 2,
            rectInfo.width + bubblePad * 2,
            bubbleHeight,
            bubbleHeight / 2
        );
    });
    ctx.fillStyle = highlighted ? theme.dataViewer.bgBubbleSelected : theme.dataViewer.bgBubble;
    ctx.fill();

    renderBoxes.forEach((rectInfo, i) => {
        ctx.beginPath();
        ctx.fillStyle = theme.fgColorDark;
        ctx.fillText(data[i], rectInfo.x + bubblePad, y + height / 2 + 4);
    });
}

export function drawImage(
    ctx: CanvasRenderingContext2D,
    _theme: Theme,
    data: string[],
    col: number,
    row: number,
    x: number,
    y: number,
    _width: number,
    height: number,
    imageLoader: ImageWindowLoader
) {
    let drawX = x + cellXPad;
    data.filter(s => s.length > 0).forEach(i => {
        // FIXME: Injection?
        // if (i.startsWith("glide:")) {
        //     const size = height - cellYPad * 2;
        //     drawGenImageToCanvas(ctx, i, drawX, y + cellYPad, size);
        //     drawX += size + itemMargin;
        // } else {
        const img = imageLoader.loadOrGetImage(i, col, row);

        if (img !== undefined) {
            const imgHeight = height - cellYPad * 2;
            const imgWidth = img.naturalWidth * (imgHeight / img.naturalHeight);
            ctx.drawImage(img, drawX, y + cellYPad, imgWidth, imgHeight);

            drawX += imgWidth + itemMargin;
        }
        // }
    });
}

interface Point {
    x: number;
    y: number;
    radius?: number;
}

interface Vector {
    nx: number;
    ny: number;
    len: number;
    x: number;
    y: number;
    ang: number;
}

export function roundedPoly(ctx: CanvasRenderingContext2D, points: Point[], radiusAll: number) {
    // convert 2 points into vector form, polar form, and normalised
    const asVec = function (p: Point, pp: Point): Vector {
        const vx = pp.x - p.x;
        const vy = pp.y - p.y;
        const vlen = Math.sqrt(vx * vx + vy * vy);
        const vnx = vx / vlen;
        const vny = vy / vlen;
        return {
            x: vx,
            y: pp.y - p.y,
            len: vlen,
            nx: vnx,
            ny: vny,
            ang: Math.atan2(vny, vnx),
        };
    };
    let radius = radiusAll;
    // const v1: Vector = {} as any;
    // const v2: Vector = {} as any;
    const len = points.length;
    let p1 = points[len - 1];
    // for each point
    for (let i = 0; i < len; i++) {
        let p2 = points[i % len];
        const p3 = points[(i + 1) % len];
        //-----------------------------------------
        // Part 1
        const v1 = asVec(p2, p1);
        const v2 = asVec(p2, p3);
        const sinA = v1.nx * v2.ny - v1.ny * v2.nx;
        const sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
        let angle = Math.asin(sinA < -1 ? -1 : sinA > 1 ? 1 : sinA);
        //-----------------------------------------
        let radDirection = 1;
        let drawDirection = false;
        if (sinA90 < 0) {
            if (angle < 0) {
                angle = Math.PI + angle;
            } else {
                angle = Math.PI - angle;
                radDirection = -1;
                drawDirection = true;
            }
        } else {
            if (angle > 0) {
                radDirection = -1;
                drawDirection = true;
            }
        }
        if (p2.radius !== undefined) {
            radius = p2.radius;
        } else {
            radius = radiusAll;
        }
        //-----------------------------------------
        // Part 2
        const halfAngle = angle / 2;
        //-----------------------------------------

        //-----------------------------------------
        // Part 3
        let lenOut = Math.abs((Math.cos(halfAngle) * radius) / Math.sin(halfAngle));
        //-----------------------------------------

        //-----------------------------------------
        // Special part A
        let cRadius: number;
        if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
            lenOut = Math.min(v1.len / 2, v2.len / 2);
            cRadius = Math.abs((lenOut * Math.sin(halfAngle)) / Math.cos(halfAngle));
        } else {
            cRadius = radius;
        }
        //-----------------------------------------
        // Part 4
        let x = p2.x + v2.nx * lenOut;
        let y = p2.y + v2.ny * lenOut;
        //-----------------------------------------
        // Part 5
        x += -v2.ny * cRadius * radDirection;
        y += v2.nx * cRadius * radDirection;
        //-----------------------------------------
        // Part 6
        ctx.arc(
            x,
            y,
            cRadius,
            v1.ang + (Math.PI / 2) * radDirection,
            v2.ang - (Math.PI / 2) * radDirection,
            drawDirection
        );
        //-----------------------------------------
        p1 = p2;
        p2 = p3;
    }
    ctx.closePath();
}
