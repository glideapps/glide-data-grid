import ImageWindowLoader from "../common/image-window-loader";
import type {
    GridSelection,
    DrawHeaderCallback,
    InnerGridCell,
    Rectangle,
    CompactSelection,
    DrawCustomCellCallback,
    GridColumnIcon,
    Item,
    CellList,
    GridMouseGroupHeaderEventArgs,
    SizedGridColumn,
} from "./data-grid-types";
import { GridCellKind, isInnerOnlyCell } from "./data-grid-types";
import { HoverValues } from "./animation-manager";
import {
    getEffectiveColumns,
    getStickyWidth,
    MappedGridColumn,
    roundedPoly,
    drawWithLastUpdate,
    isGroupEqual,
    cellIsSelected,
    cellIsInRange,
} from "./data-grid-lib";
import { SpriteManager, SpriteVariant } from "./data-grid-sprites";
import { Theme } from "../common/styles";
import { blend, withAlpha } from "./color-parser";
import { CellRenderers } from "./cells";
import { DeprepCallback } from "./cells/cell-types";

// Future optimization opportunities
// - Create a cache of a buffer used to render the full view of a partially displayed column so that when
//   scrolling horizontally you can simply blit the pre-drawn column instead of continually paying the draw
//   cost as it slides into view.
// - Blit headers on horizontal scroll
// - Use webworker to load images, helpful with lots of large images
// - Sprite map currently wastes a lot of canvas texture space
// - Retain mode for drawing cells. Instead of drawing cells as we come across them, first build a data
//   structure which contains all operations to perform, then sort them all by "prep" requirement, then do
//   all like operations at once.

type HoverInfo = readonly [Item, readonly [number, number]];

interface GroupDetails {
    readonly name: string;
    readonly icon?: string;
    readonly overrideTheme?: Partial<Theme>;
    readonly actions?: readonly {
        readonly title: string;
        readonly onClick: (e: GridMouseGroupHeaderEventArgs) => void;
        readonly icon: GridColumnIcon | string;
    }[];
}

export type GroupDetailsCallback = (groupName: string) => GroupDetails;
export type GetRowThemeCallback = (row: number) => Partial<Theme> | undefined;

const loadingCell: InnerGridCell = {
    kind: GridCellKind.Loading,
    allowOverlay: false,
};

interface BlitData {
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly translateY: number;
}

interface DragAndDropState {
    src: number;
    dest: number;
}

export function drawCell(
    ctx: CanvasRenderingContext2D,
    row: number,
    cell: InnerGridCell,
    col: number,
    x: number,
    y: number,
    w: number,
    h: number,
    highlighted: boolean,
    theme: Theme,
    drawCustomCell: DrawCustomCellCallback | undefined,
    imageLoader: ImageWindowLoader,
    spriteManager: SpriteManager,
    hoverAmount: number,
    hoverInfo: HoverInfo | undefined,
    frameTime: number,
    lastToken?: {} | undefined,
    enqueue?: (item: Item) => void
): {} | DeprepCallback | undefined {
    let hoverX: number | undefined;
    let hoverY: number | undefined;
    if (hoverInfo !== undefined && hoverInfo[0][0] === col && hoverInfo[0][1] === row) {
        hoverX = hoverInfo[1][0];
        hoverY = hoverInfo[1][1];
    }
    let result: {} | undefined = undefined;
    const args = {
        ctx,
        theme,
        col,
        row,
        cell,
        x,
        y,
        w,
        h,
        highlighted,
        hoverAmount,
        hoverX,
        hoverY,
        imageLoader,
        spriteManager,
    };
    const needsAnim = drawWithLastUpdate(args, cell.lastUpdated, frameTime, forcePrep => {
        const drawn = isInnerOnlyCell(cell)
            ? false
            : drawCustomCell?.({
                  ctx,
                  cell,
                  theme,
                  rect: { x, y, width: w, height: h },
                  col,
                  row,
                  hoverAmount,
                  hoverX,
                  hoverY,
                  highlighted,
                  imageLoader,
              }) === true;
        if (!drawn && cell.kind !== GridCellKind.Custom) {
            const r = CellRenderers[cell.kind];
            if (lastToken !== r || forcePrep) {
                if (typeof lastToken === "function") {
                    lastToken(args);
                }
                r.renderPrep?.(args);
            }
            r.render(args);
            result = r?.renderDeprep ?? r;
        }
    });
    if (needsAnim) enqueue?.([col, row]);
    return result;
}

function blitLastFrame(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    last: BlitData,
    cellXOffset: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    lastRowSticky: boolean,
    width: number,
    height: number,
    rows: number,
    totalHeaderHeight: number,
    dpr: number,
    columns: readonly SizedGridColumn[],
    effectiveCols: readonly MappedGridColumn[],
    getRowHeight: number | ((r: number) => number)
) {
    const drawRegions: Rectangle[] = [];
    let blittedYOnly = false;

    ctx.imageSmoothingEnabled = false;
    const minY = Math.min(last.cellYOffset, cellYOffset);
    const maxY = Math.max(last.cellYOffset, cellYOffset);
    let deltaY = 0;
    if (typeof getRowHeight === "number") {
        deltaY += (maxY - minY) * getRowHeight;
    } else {
        for (let i = minY; i < maxY; i++) {
            deltaY += getRowHeight(i);
        }
    }
    if (cellYOffset > last.cellYOffset) {
        deltaY = -deltaY;
    }
    deltaY += translateY - last.translateY;

    const minX = Math.min(last.cellXOffset, cellXOffset);
    const maxX = Math.max(last.cellXOffset, cellXOffset);
    let deltaX = 0;
    for (let i = minX; i < maxX; i++) {
        deltaX += columns[i].width;
    }
    if (cellXOffset > last.cellXOffset) {
        deltaX = -deltaX;
    }
    deltaX += translateX - last.translateX;

    let stickyWidth = getStickyWidth(effectiveCols);
    if (stickyWidth > 0) stickyWidth++;

    if (deltaX !== 0 && deltaY !== 0) {
        return {
            regions: [],
            yOnly: false,
        };
    }

    const stickyRowHeight = lastRowSticky
        ? typeof getRowHeight === "number"
            ? getRowHeight
            : getRowHeight(rows - 1)
        : 0;

    const blitWidth = width - stickyWidth - Math.abs(deltaX);
    const blitHeight = height - totalHeaderHeight - stickyRowHeight - Math.abs(deltaY) - 1;

    if (blitWidth > 150 && blitHeight > 150) {
        blittedYOnly = deltaX === 0;

        const args = {
            sx: 0,
            sy: 0,
            sw: width * dpr,
            sh: height * dpr,
            dx: 0,
            dy: 0,
            dw: width * dpr,
            dh: height * dpr,
        };

        // blit Y
        if (deltaY > 0) {
            // scrolling up
            args.sy = (totalHeaderHeight + 1) * dpr;
            args.sh = blitHeight * dpr;
            args.dy = (deltaY + totalHeaderHeight + 1) * dpr;
            args.dh = blitHeight * dpr;

            drawRegions.push({
                x: 0,
                y: totalHeaderHeight,
                width: width,
                height: deltaY + 1,
            });
        } else if (deltaY < 0) {
            // scrolling down
            args.sy = (-deltaY + totalHeaderHeight + 1) * dpr;
            args.sh = blitHeight * dpr;
            args.dy = (totalHeaderHeight + 1) * dpr;
            args.dh = blitHeight * dpr;

            drawRegions.push({
                x: 0,
                y: height + deltaY - stickyRowHeight,
                width: width,
                height: -deltaY + stickyRowHeight,
            });
        }

        // blit X
        if (deltaX > 0) {
            // pixels moving right
            args.sx = stickyWidth * dpr;
            args.sw = blitWidth * dpr;
            args.dx = (deltaX + stickyWidth) * dpr;
            args.dw = blitWidth * dpr;

            drawRegions.push({
                x: stickyWidth - 1,
                y: 0,
                width: deltaX + 2, // extra width to account for first col not drawing a left side border
                height: height,
            });
        } else if (deltaX < 0) {
            // pixels moving left
            args.sx = (stickyWidth - deltaX) * dpr;
            args.sw = blitWidth * dpr;
            args.dx = stickyWidth * dpr;
            args.dw = blitWidth * dpr;

            drawRegions.push({
                x: width + deltaX,
                y: 0,
                width: -deltaX,
                height: height,
            });
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(canvas, args.sx, args.sy, args.sw, args.sh, args.dx, args.dy, args.dw, args.dh);
        ctx.scale(dpr, dpr);
    }
    ctx.imageSmoothingEnabled = true;

    return {
        regions: drawRegions,
        yOnly: blittedYOnly,
    };
}

// lines are effectively drawn on the top left edge of a cell.
function drawGridLines(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    cellYOffset: number,
    translateX: number,
    translateY: number,
    width: number,
    height: number,
    drawRegions: Rectangle[] | undefined,
    spans: Rectangle[] | undefined,
    groupHeaderHeight: number,
    totalHeaderHeight: number,
    getRowHeight: (row: number) => number,
    verticalBorder: (col: number) => boolean,
    lastRowSticky: boolean,
    rows: number,
    theme: Theme,
    verticalOnly: boolean = false
) {
    if (spans !== undefined) {
        ctx.beginPath();
        ctx.save();
        ctx.rect(0, 0, width, height);
        for (const span of spans) {
            ctx.rect(span.x + 1, span.y + 1, span.width - 1, span.height - 1);
        }
        ctx.clip("evenodd");
    }
    const hColor = theme.horizontalBorderColor ?? theme.borderColor;
    const vColor = theme.borderColor;

    let minX = 0;
    let maxX = width;
    let minY = 0;
    let maxY = height;

    if (drawRegions !== undefined && drawRegions.length > 0) {
        minX = Number.MAX_SAFE_INTEGER;
        minY = Number.MAX_SAFE_INTEGER;
        maxX = Number.MIN_SAFE_INTEGER;
        maxY = Number.MIN_SAFE_INTEGER;
        for (const r of drawRegions) {
            minX = Math.min(minX, r.x - 1);
            maxX = Math.max(maxX, r.x + r.width + 1);
            minY = Math.min(minY, r.y - 1);
            maxY = Math.max(maxY, r.y + r.height + 1);
        }
    }

    ctx.beginPath();
    // we need to under-draw the header background on its line to improve its contrast.
    ctx.moveTo(minX, totalHeaderHeight + 0.5);
    ctx.lineTo(maxX, totalHeaderHeight + 0.5);
    ctx.strokeStyle = theme.bgHeader;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();

    // vertical lines
    let x = 0.5;
    for (let index = 0; index < effectiveCols.length; index++) {
        const c = effectiveCols[index];
        if (c.width === 0) continue;
        x += c.width;
        const tx = c.sticky ? x : x + translateX;
        if (tx >= minX && tx <= maxX && (index === effectiveCols.length - 1 || verticalBorder(index + 1))) {
            ctx.moveTo(tx, Math.max(groupHeaderHeight, minY));
            ctx.lineTo(tx, Math.min(height, maxY));
        }
    }
    if (vColor !== hColor) {
        ctx.strokeStyle = vColor;
        ctx.stroke();
        ctx.beginPath();
    }

    const stickyHeight = getRowHeight(rows - 1);
    const stickyRowY = height - stickyHeight + 0.5;
    if (lastRowSticky) {
        ctx.moveTo(minX, stickyRowY);
        ctx.lineTo(maxX, stickyRowY);
    }

    if (verticalOnly !== true) {
        // horizontal lines
        let y = totalHeaderHeight + 0.5;
        let row = cellYOffset;
        let isHeader = true;
        const target = lastRowSticky ? height - stickyHeight : height;
        while (y + translateY <= target) {
            const ty = isHeader ? y : y + translateY;
            // This shouldn't be needed it seems like... yet it is. We're not sure why.
            if (ty >= minY && ty <= maxY && (!lastRowSticky || row !== rows - 1 || Math.abs(ty - stickyRowY) > 1)) {
                ctx.moveTo(minX, ty);
                ctx.lineTo(maxX, ty);
            }

            y += getRowHeight(row);
            isHeader = false;
            row++;
        }
    }

    ctx.strokeStyle = hColor;
    ctx.stroke();
    ctx.beginPath();

    if (spans !== undefined) {
        ctx.restore();
    }
}

export function getActionBoundsForGroup(
    box: Rectangle,
    actions: NonNullable<GroupDetails["actions"]>
): readonly Rectangle[] {
    const result: Rectangle[] = [];
    let x = box.x + box.width - 26 * actions.length;
    const y = box.y + box.height / 2 - 13;
    const height = 26;
    const width = 26;
    for (let i = 0; i < actions.length; i++) {
        result.push({
            x,
            y,
            width,
            height,
        });
        x += 26;
    }
    return result;
}

export function pointInRect(rect: Rectangle, x: number, y: number): boolean {
    return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}

function drawGroups(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    translateX: number,
    groupHeaderHeight: number,
    hovered: HoverInfo | undefined,
    theme: Theme,
    spriteManager: SpriteManager,
    _hoverValues: HoverValues,
    verticalBorder: (col: number) => boolean,
    getGroupDetails: GroupDetailsCallback,
    damage: CellList | undefined
) {
    const xPad = 8;
    const [hCol, hRow] = hovered?.[0] ?? [];

    let finalX = 0;
    walkGroups(effectiveCols, width, translateX, groupHeaderHeight, (span, groupName, x, y, w, h) => {
        if (damage !== undefined && !damage.some(d => d[1] === -2 && d[0] >= span[0] && d[0] <= span[1])) return;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        const group = getGroupDetails(groupName);
        const groupTheme = group?.overrideTheme === undefined ? theme : { ...theme, ...group.overrideTheme };
        const isHovered = hRow === -2 && hCol !== undefined && hCol >= span[0] && hCol <= span[1];

        const fillColor = isHovered ? groupTheme.bgHeaderHovered : groupTheme.bgHeader;
        if (fillColor !== theme.bgHeader) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }

        ctx.fillStyle = groupTheme.textGroupHeader ?? groupTheme.textHeader;
        if (group !== undefined) {
            let drawX = x;
            if (group.icon !== undefined) {
                spriteManager.drawSprite(
                    group.icon,
                    "normal",
                    ctx,
                    drawX + xPad,
                    (groupHeaderHeight - 20) / 2,
                    20,
                    groupTheme
                );
                drawX += 26;
            }
            ctx.fillText(group.name, drawX + xPad, groupHeaderHeight / 2 + 1);

            if (group.actions !== undefined && isHovered) {
                const actionBoxes = getActionBoundsForGroup({ x, y, width: w, height: h }, group.actions);

                ctx.beginPath();
                const fadeStartX = actionBoxes[0].x - 10;
                const fadeWidth = x + w - fadeStartX;
                ctx.rect(fadeStartX, 0, fadeWidth, groupHeaderHeight);
                const grad = ctx.createLinearGradient(fadeStartX, 0, fadeStartX + fadeWidth, 0);
                const trans = withAlpha(fillColor, 0);
                grad.addColorStop(0, trans);
                grad.addColorStop(10 / fadeWidth, fillColor);
                grad.addColorStop(1, fillColor);
                ctx.fillStyle = grad;

                ctx.fill();

                ctx.globalAlpha = 0.6;

                // eslint-disable-next-line prefer-const
                const [mouseX, mouseY] = hovered?.[1] ?? [-1, -1];
                for (let i = 0; i < group.actions.length; i++) {
                    const action = group.actions[i];
                    const box = actionBoxes[i];
                    const actionHovered = pointInRect(box, mouseX + x, mouseY);
                    if (actionHovered) {
                        ctx.globalAlpha = 1;
                    }
                    spriteManager.drawSprite(
                        action.icon,
                        "normal",
                        ctx,
                        box.x + box.width / 2 - 10,
                        box.y + box.height / 2 - 10,
                        20,
                        groupTheme
                    );
                    if (actionHovered) {
                        ctx.globalAlpha = 0.6;
                    }
                }

                ctx.globalAlpha = 1;
            }
        }

        if (verticalBorder(span[0])) {
            ctx.beginPath();
            ctx.moveTo(x + 0.5, 0);
            ctx.lineTo(x + 0.5, groupHeaderHeight);
            ctx.strokeStyle = theme.borderColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.restore();

        finalX = x + w;
    });

    ctx.beginPath();
    ctx.moveTo(finalX + 0.5, 0);
    ctx.lineTo(finalX + 0.5, groupHeaderHeight);

    ctx.moveTo(0, groupHeaderHeight + 0.5);
    ctx.lineTo(width, groupHeaderHeight + 0.5);
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
}

const menuButtonSize = 30;
export function getHeaderMenuBounds(x: number, y: number, width: number, height: number): Rectangle {
    return {
        x: x + width - menuButtonSize, // right align
        y: Math.max(y, y + height / 2 - menuButtonSize / 2), // center vertically
        width: menuButtonSize,
        height: Math.min(menuButtonSize, height),
    };
}

function drawHeader(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    c: MappedGridColumn,
    selected: boolean,
    theme: Theme,
    isHovered: boolean,
    hasSelectedCell: boolean,
    hoverAmount: number,
    spriteManager: SpriteManager,
    drawHeaderCallback: DrawHeaderCallback | undefined,
    touchMode: boolean
) {
    const menuBounds = getHeaderMenuBounds(x, y, width, height);
    if (drawHeaderCallback !== undefined) {
        if (
            drawHeaderCallback({
                ctx,
                theme,
                rect: { x, y, width, height },
                column: c,
                isSelected: selected,
                hoverAmount,
                isHovered,
                hasSelectedCell,
                spriteManager,
                menuBounds,
            })
        ) {
            return;
        }
    }
    const xPad = 8;
    const fillStyle = selected ? theme.textHeaderSelected : theme.textHeader;

    const shouldDrawMenu = c.hasMenu === true && (isHovered || (touchMode && selected));

    let drawX = x + xPad;
    if (c.icon !== undefined) {
        let variant: SpriteVariant = selected ? "selected" : "normal";
        if (c.style === "highlight") {
            variant = selected ? "selected" : "special";
        }
        spriteManager.drawSprite(c.icon, variant, ctx, drawX, y + (height - 20) / 2, 20, theme);

        if (c.overlayIcon !== undefined) {
            spriteManager.drawSprite(
                c.overlayIcon,
                selected ? "selected" : "special",
                ctx,
                drawX + 9,
                y + ((height - 18) / 2 + 6),
                18,
                theme
            );
        }

        drawX += 26;
    }

    if (shouldDrawMenu && c.hasMenu === true && width > 35) {
        const fadeWidth = 35;
        const fadeStart = width - fadeWidth;
        const fadeEnd = width - fadeWidth * 0.7;

        const fadeStartPercent = fadeStart / width;
        const fadeEndPercent = fadeEnd / width;

        const grad = ctx.createLinearGradient(x, 0, x + width, 0);
        const trans = withAlpha(fillStyle, 0);

        grad.addColorStop(0, fillStyle);
        grad.addColorStop(fadeStartPercent, fillStyle);
        grad.addColorStop(fadeEndPercent, trans);
        grad.addColorStop(1, trans);
        ctx.fillStyle = grad;
    } else {
        ctx.fillStyle = fillStyle;
    }
    ctx.fillText(c.title, drawX, y + height / 2 + 1);

    if (shouldDrawMenu && c.hasMenu === true) {
        ctx.beginPath();
        const triangleX = menuBounds.x + menuBounds.width / 2 - 5.5;
        const triangleY = menuBounds.y + menuBounds.height / 2 - 3;
        roundedPoly(
            ctx,
            [
                {
                    x: triangleX,
                    y: triangleY,
                },
                {
                    x: triangleX + 11,
                    y: triangleY,
                },
                {
                    x: triangleX + 5.5,
                    y: triangleY + 6,
                },
            ],
            1
        );

        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
}

function drawGridHeaders(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    enableGroups: boolean,
    hovered: HoverInfo | undefined,
    width: number,
    translateX: number,
    headerHeight: number,
    groupHeaderHeight: number,
    selectedColumns: CompactSelection,
    dragAndDropState: DragAndDropState | undefined,
    isResizing: boolean,
    selectedCell: GridSelection | undefined,
    outerTheme: Theme,
    spriteManager: SpriteManager,
    hoverValues: HoverValues,
    verticalBorder: (col: number) => boolean,
    getGroupDetails: GroupDetailsCallback,
    damage: CellList | undefined,
    drawHeaderCallback: DrawHeaderCallback | undefined,
    touchMode: boolean
) {
    const totalHeaderHeight = headerHeight + groupHeaderHeight;
    if (totalHeaderHeight <= 0) return;

    ctx.fillStyle = outerTheme.bgHeader;
    ctx.fillRect(0, 0, width, totalHeaderHeight);

    const [hCol, hRow] = hovered?.[0] ?? [];

    const font = `${outerTheme.headerFontStyle} ${outerTheme.fontFamily}`;
    // Assinging the context font too much can be expensive, it can be worth it to minimze this
    ctx.font = font;
    walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x, _y, clipX) => {
        if (damage !== undefined && !damage.some(d => d[1] === -1 && d[0] === c.sourceIndex)) return;
        const diff = Math.max(0, clipX - x);
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + diff, groupHeaderHeight, c.width - diff, headerHeight);
        ctx.clip();

        const groupTheme = getGroupDetails(c.group ?? "").overrideTheme;
        const theme =
            c.themeOverride === undefined && groupTheme === undefined
                ? outerTheme
                : { ...outerTheme, ...groupTheme, ...c.themeOverride };

        if (theme.bgHeader !== outerTheme.bgHeader) {
            ctx.fillStyle = theme.bgHeader;
            ctx.fill();
        }

        const f = `${theme.headerFontStyle} ${theme.fontFamily}`;
        if (font !== f) {
            ctx.font = f;
        }
        const selected = selectedColumns.hasIndex(c.sourceIndex);
        const noHover = dragAndDropState !== undefined || isResizing;
        const hoveredBoolean = !noHover && hRow === -1 && hCol === c.sourceIndex;
        const hover = noHover
            ? 0
            : hoverValues.find(s => s.item[0] === c.sourceIndex && s.item[1] === -1)?.hoverAmount ?? 0;

        const hasSelectedCell = selectedCell !== undefined && selectedCell.cell[0] === c.sourceIndex;

        const bgFillStyle = selected ? theme.accentColor : hasSelectedCell ? theme.bgHeaderHasFocus : theme.bgHeader;

        const y = enableGroups ? groupHeaderHeight : 0;
        const xOffset = c.sourceIndex === 0 ? 0 : 1;

        if (selected) {
            ctx.fillStyle = bgFillStyle;
            ctx.fillRect(x + xOffset, y, c.width - xOffset, headerHeight);
        } else if (hasSelectedCell || hover > 0) {
            ctx.beginPath();
            ctx.rect(x + xOffset, y, c.width - xOffset, headerHeight);
            if (hasSelectedCell) {
                ctx.fillStyle = theme.bgHeaderHasFocus;
                ctx.fill();
            }
            if (hover > 0) {
                ctx.globalAlpha = hover;
                ctx.fillStyle = theme.bgHeaderHovered;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        drawHeader(
            ctx,
            x,
            y,
            c.width,
            headerHeight,
            c,
            selected,
            theme,
            hoveredBoolean,
            hasSelectedCell,
            hover,
            spriteManager,
            drawHeaderCallback,
            touchMode
        );
        ctx.restore();
    });

    if (enableGroups) {
        drawGroups(
            ctx,
            effectiveCols,
            width,
            translateX,
            groupHeaderHeight,
            hovered,
            outerTheme,
            spriteManager,
            hoverValues,
            verticalBorder,
            getGroupDetails,
            damage
        );
    }
}

function intersectRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number) {
    return x1 <= x2 + w2 && x2 <= x1 + w1 && y1 <= y2 + h2 && y2 <= y1 + h1;
}

function clipDamage(
    ctx: CanvasRenderingContext2D,
    effectiveColumns: readonly MappedGridColumn[],
    width: number,
    height: number,
    groupHeaderHeight: number,
    totalHeaderHeight: number,
    translateX: number,
    translateY: number,
    cellYOffset: number,
    rows: number,
    getRowHeight: (row: number) => number,
    lastRowSticky: boolean,
    damage: CellList | undefined,
    includeCells: boolean
): void {
    if (damage === undefined || damage.length === 0) return;

    const stickyRowHeight = lastRowSticky ? getRowHeight(rows - 1) : 0;

    ctx.beginPath();

    walkGroups(effectiveColumns, width, translateX, groupHeaderHeight, (span, _group, x, y, w, h) => {
        for (let i = 0; i < damage.length; i++) {
            const d = damage[i];
            if (d[1] === -2 && d[0] >= span[0] && d[0] <= span[1]) {
                ctx.rect(x, y, w, h);
                break;
            }
        }
    });

    walkColumns(
        effectiveColumns,
        cellYOffset,
        translateX,
        translateY,
        totalHeaderHeight,
        (c, drawX, colDrawY, clipX, startRow) => {
            const diff = Math.max(0, clipX - drawX);

            const finalX = drawX + diff + 1;
            const finalWidth = c.width - diff - 1;
            for (let i = 0; i < damage.length; i++) {
                const d = damage[i];
                if (d[0] === c.sourceIndex && (d[1] === -1 || d[1] === undefined)) {
                    ctx.rect(finalX, groupHeaderHeight, finalWidth, totalHeaderHeight - groupHeaderHeight);
                    break;
                }
            }

            if (!includeCells) return;

            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, lastRowSticky, (drawY, row, rh, isSticky) => {
                let isDamaged = false;
                for (let i = 0; i < damage.length; i++) {
                    const d = damage[i];
                    if (d[0] === c.sourceIndex && d[1] === row) {
                        isDamaged = true;
                        break;
                    }
                }
                if (isDamaged) {
                    const top = drawY + 1;
                    const bottom = isSticky ? top + rh - 1 : Math.min(top + rh - 1, height - stickyRowHeight);
                    const h = bottom - top;

                    if (h > 0) {
                        ctx.rect(finalX, top, finalWidth, h);
                    }
                }
            });
        }
    );
    ctx.clip();
}

function getSpanBounds(
    span: readonly [number, number],
    cellX: number,
    cellY: number,
    cellW: number,
    cellH: number,
    column: MappedGridColumn,
    allColumns: readonly MappedGridColumn[]
): [Rectangle | undefined, Rectangle | undefined] {
    const [startCol, endCol] = span;

    let frozenRect: Rectangle | undefined;
    let contentRect: Rectangle | undefined;

    const firstNonSticky = allColumns.find(x => !x.sticky)?.sourceIndex ?? 0;
    if (endCol > firstNonSticky) {
        const renderFromCol = Math.max(startCol, firstNonSticky);
        let tempX = cellX;
        let tempW = cellW;
        for (let x = column.sourceIndex - 1; x >= renderFromCol; x--) {
            tempX -= allColumns[x].width;
            tempW += allColumns[x].width;
        }
        for (let x = column.sourceIndex + 1; x <= endCol; x++) {
            tempW += allColumns[x].width;
        }
        contentRect = {
            x: tempX,
            y: cellY,
            width: tempW,
            height: cellH,
        };
    }

    if (firstNonSticky > startCol) {
        const renderToCol = Math.min(endCol, firstNonSticky - 1);
        let tempX = cellX;
        let tempW = cellW;
        for (let x = column.sourceIndex - 1; x >= startCol; x--) {
            tempX -= allColumns[x].width;
            tempW += allColumns[x].width;
        }
        for (let x = column.sourceIndex + 1; x <= renderToCol; x++) {
            tempW += allColumns[x].width;
        }
        frozenRect = {
            x: tempX,
            y: cellY,
            width: tempW,
            height: cellH,
        };
    }

    return [frozenRect, contentRect];
}

function drawCells(
    ctx: CanvasRenderingContext2D,
    effectiveColumns: readonly MappedGridColumn[],
    allColumns: readonly MappedGridColumn[],
    height: number,
    totalHeaderHeight: number,
    translateX: number,
    translateY: number,
    cellYOffset: number,
    rows: number,
    getRowHeight: (row: number) => number,
    getCellContent: (cell: readonly [number, number]) => InnerGridCell,
    getGroupDetails: GroupDetailsCallback,
    getRowThemeOverride: GetRowThemeCallback | undefined,
    selectedRows: CompactSelection,
    disabledRows: CompactSelection,
    lastRowSticky: boolean,
    drawRegions: readonly Rectangle[],
    damage: CellList | undefined,
    selectedCell: GridSelection | undefined,
    selectedColumns: CompactSelection,
    prelightCells: CellList | undefined,
    drawCustomCell: DrawCustomCellCallback | undefined,
    imageLoader: ImageWindowLoader,
    spriteManager: SpriteManager,
    hoverValues: HoverValues,
    hoverInfo: HoverInfo | undefined,
    outerTheme: Theme,
    enqueue: (item: Item) => void
): Rectangle[] | undefined {
    let toDraw = damage?.length ?? Number.MAX_SAFE_INTEGER;
    const frameTime = performance.now();
    let font = `${outerTheme.baseFontStyle} ${outerTheme.fontFamily}`;
    ctx.font = font;
    let result: Rectangle[] | undefined;
    const handledSpans = new Set<string>();
    walkColumns(
        effectiveColumns,
        cellYOffset,
        translateX,
        translateY,
        totalHeaderHeight,
        (c, drawX, colDrawStartY, clipX, startRow) => {
            const diff = Math.max(0, clipX - drawX);

            const colDrawX = drawX + diff;
            const colDrawY = totalHeaderHeight + 1;
            const colWidth = c.width - diff;
            const colHeight = height - totalHeaderHeight - 1;
            if (drawRegions.length > 0) {
                let found = false;
                for (let i = 0; i < drawRegions.length; i++) {
                    const dr = drawRegions[i];
                    if (intersectRect(colDrawX, colDrawY, colWidth, colHeight, dr.x, dr.y, dr.width, dr.height)) {
                        found = true;
                        break;
                    }
                }
                if (!found) return;
            }

            const reclip = () => {
                ctx.save();
                ctx.beginPath();
                ctx.rect(colDrawX, colDrawY, colWidth, colHeight);
                ctx.clip();
            };
            reclip();

            const groupTheme = getGroupDetails(c.group ?? "").overrideTheme;
            const colTheme =
                c.themeOverride === undefined && groupTheme === undefined
                    ? outerTheme
                    : { ...outerTheme, ...groupTheme, ...c.themeOverride };
            const colFont = `${colTheme.baseFontStyle} ${colTheme.fontFamily}`;
            if (colFont !== font) {
                font = colFont;
                ctx.font = colFont;
            }
            let lastToken: {} | DeprepCallback | undefined;

            walkRowsInCol(
                startRow,
                colDrawStartY,
                height,
                rows,
                getRowHeight,
                lastRowSticky,
                (drawY, row, rh, isSticky) => {
                    // if (damage !== undefined && !damage.some(d => d[0] === c.sourceIndex && d[1] === row)) {
                    //     return;
                    // }
                    // if (
                    //     drawRegions.length > 0 &&
                    //     !drawRegions.some(dr => intersectRect(drawX, drawY, c.width, rh, dr.x, dr.y, dr.width, dr.height))
                    // ) {
                    //     return;
                    // }

                    // These are dumb versions of the above. I cannot for the life of believe that this matters but this is
                    // the tightest part of the draw loop and the allocations above actually has a very measurable impact
                    // on performance. For the love of all that is unholy please keep checking this again in the future.
                    // As soon as this doesn't have any impact of note go back to the saner looking code. The smoke test
                    // here is to scroll to the bottom of a test case first, then scroll back up while profiling and see
                    // how many major GC collections you get. These allocate a lot of objects.
                    if (damage !== undefined) {
                        let found = false;
                        for (let i = 0; i < damage.length; i++) {
                            const d = damage[i];
                            if (d[0] === c.sourceIndex && d[1] === row) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) return;
                    }
                    if (drawRegions.length > 0) {
                        let found = false;
                        for (let i = 0; i < drawRegions.length; i++) {
                            const dr = drawRegions[i];
                            if (intersectRect(drawX, drawY, c.width, rh, dr.x, dr.y, dr.width, dr.height)) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) return;
                    }

                    const rowSelected = selectedRows.hasIndex(row);
                    const rowDisabled = disabledRows.hasIndex(row);

                    const cell: InnerGridCell = row < rows ? getCellContent([c.sourceIndex, row]) : loadingCell;

                    let cellX = drawX;
                    let cellWidth = c.width;
                    let drawingSpan = false;
                    let skipContents = false;
                    if (cell.span !== undefined) {
                        const [startCol, endCol] = cell.span;
                        const spanKey = `${row},${startCol},${endCol},${c.sticky}`;
                        if (!handledSpans.has(spanKey)) {
                            const areas = getSpanBounds(cell.span, drawX, drawY, c.width, rh, c, allColumns);
                            const area = c.sticky ? areas[0] : areas[1];
                            if (!c.sticky && areas[0] !== undefined) {
                                skipContents = true;
                            }
                            if (area !== undefined) {
                                cellX = area.x;
                                cellWidth = area.width;
                                handledSpans.add(spanKey);
                                ctx.restore();
                                if (typeof lastToken === "function") lastToken({ ctx });
                                lastToken = undefined;
                                ctx.save();
                                ctx.beginPath();
                                const d = Math.max(0, clipX - area.x);
                                ctx.rect(area.x + d, drawY, area.width - d, rh);
                                if (result === undefined) {
                                    result = [];
                                }
                                result.push({
                                    x: area.x + d,
                                    y: drawY,
                                    width: area.width - d,
                                    height: rh,
                                });
                                ctx.clip();
                                drawingSpan = true;
                            }
                        } else {
                            toDraw--;
                            return;
                        }
                    }

                    const rowTheme = getRowThemeOverride?.(row);
                    const theme =
                        cell.themeOverride === undefined && rowTheme === undefined
                            ? colTheme
                            : { ...colTheme, ...rowTheme, ...cell.themeOverride };

                    ctx.beginPath();

                    const isFocused =
                        cellIsSelected([c.sourceIndex, row], cell, selectedCell) ||
                        cellIsInRange([c.sourceIndex, row], cell, selectedCell);
                    const spanIsHighlighted =
                        cell.span !== undefined &&
                        selectedColumns.some(
                            index => cell.span !== undefined && index >= cell.span[0] && index <= cell.span[1]
                        );
                    const highlighted =
                        spanIsHighlighted ||
                        isFocused ||
                        (!isSticky && (rowSelected || selectedColumns.hasIndex(c.sourceIndex)));

                    let fill: string | undefined;
                    if (isSticky || theme.bgCell !== outerTheme.bgCell) {
                        fill = blend(theme.bgCell, fill);
                        if (typeof lastToken === "function") lastToken({ ctx });
                        lastToken = undefined;
                    }

                    if (theme.textDark !== outerTheme.textDark) {
                        if (typeof lastToken === "function") lastToken({ ctx });
                        lastToken = undefined;
                    }

                    if (highlighted || rowDisabled) {
                        if (rowDisabled) {
                            fill = blend(theme.bgHeader, fill);
                        }
                        if (highlighted) {
                            fill = blend(theme.accentLight, fill);
                        }
                        if (typeof lastToken === "function") lastToken({ ctx });
                        lastToken = undefined;
                    } else {
                        if (prelightCells?.some(pre => pre[0] === c.sourceIndex && pre[1] === row) === true) {
                            fill = blend(theme.bgSearchResult, fill);
                            if (typeof lastToken === "function") lastToken({ ctx });
                            lastToken = undefined;
                        }
                    }
                    if (fill !== undefined) {
                        ctx.fillStyle = fill;
                        ctx.fillRect(cellX, drawY, cellWidth, rh);
                    }

                    if (cell.style === "faded") {
                        ctx.globalAlpha = 0.6;
                    }

                    const hoverValue = hoverValues.find(hv => hv.item[0] === c.sourceIndex && hv.item[1] === row);

                    if (cellWidth > 10 && !skipContents) {
                        const cellFont = `${theme.baseFontStyle} ${theme.fontFamily}`;
                        if (cellFont !== font) {
                            ctx.font = cellFont;
                            font = cellFont;
                        }
                        const drawResult = drawCell(
                            ctx,
                            row,
                            cell,
                            c.sourceIndex,
                            cellX,
                            drawY,
                            cellWidth,
                            rh,
                            highlighted,
                            theme,
                            drawCustomCell,
                            imageLoader,
                            spriteManager,
                            hoverValue?.hoverAmount ?? 0,
                            hoverInfo,
                            frameTime,
                            lastToken,
                            enqueue
                        );
                        lastToken = drawResult;
                    }

                    if (cell.style === "faded") {
                        ctx.globalAlpha = 1;
                    }
                    toDraw--;
                    if (drawingSpan) {
                        ctx.restore();
                        if (typeof lastToken === "function") lastToken({ ctx });
                        lastToken = undefined;
                        reclip();
                        font = colFont;
                        ctx.font = colFont;
                    }
                    return toDraw <= 0;
                }
            );

            ctx.restore();
            return toDraw <= 0;
        }
    );
    return result;
}

function drawBlanks(
    ctx: CanvasRenderingContext2D,
    effectiveColumns: readonly MappedGridColumn[],
    allColumns: readonly MappedGridColumn[],
    width: number,
    height: number,
    totalHeaderHeight: number,
    translateX: number,
    translateY: number,
    cellYOffset: number,
    rows: number,
    getRowHeight: (row: number) => number,
    getRowTheme: GetRowThemeCallback | undefined,
    selectedRows: CompactSelection,
    disabledRows: CompactSelection,
    lastRowSticky: boolean,
    drawRegions: readonly Rectangle[],
    damage: CellList | undefined,
    theme: Theme
): void {
    if (
        damage !== undefined ||
        effectiveColumns[effectiveColumns.length - 1] !== allColumns[effectiveColumns.length - 1]
    )
        return;
    walkColumns(
        effectiveColumns,
        cellYOffset,
        translateX,
        translateY,
        totalHeaderHeight,
        (c, drawX, colDrawY, clipX, startRow) => {
            if (c !== effectiveColumns[effectiveColumns.length - 1]) return;
            drawX += c.width;
            const x = Math.max(drawX, clipX);
            if (x > width) return;
            ctx.save();
            ctx.beginPath();
            ctx.rect(x, totalHeaderHeight + 1, 10000, height - totalHeaderHeight - 1);
            ctx.clip();

            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, lastRowSticky, (drawY, row, rh, isSticky) => {
                if (
                    !isSticky &&
                    drawRegions.length > 0 &&
                    !drawRegions.some(dr => intersectRect(drawX, drawY, 10000, rh, dr.x, dr.y, dr.width, dr.height))
                ) {
                    return;
                }

                const rowSelected = selectedRows.hasIndex(row);
                const rowDisabled = disabledRows.hasIndex(row);

                ctx.beginPath();

                const rowTheme = getRowTheme?.(row);

                const blankTheme = rowTheme === undefined ? theme : { ...theme, ...rowTheme };

                if (blankTheme.bgCell !== theme.bgCell) {
                    ctx.fillStyle = blankTheme.bgCell;
                    ctx.fillRect(drawX, drawY, 10000, rh);
                }
                if (rowDisabled) {
                    ctx.fillStyle = blankTheme.bgHeader;
                    ctx.fillRect(drawX, drawY, 10000, rh);
                }
                if (rowSelected) {
                    ctx.fillStyle = blankTheme.accentLight;
                    ctx.fillRect(drawX, drawY, 10000, rh);
                }
            });

            ctx.restore();
        }
    );
}

function overdrawStickyBoundaries(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    height: number,
    totalHeaderHeight: number,
    lastRowSticky: boolean,
    rows: number,
    getRowHeight: (row: number) => number,
    theme: Theme
) {
    const drawX = getStickyWidth(effectiveCols);
    ctx.beginPath();

    // fill in header color behind header border
    ctx.moveTo(0, totalHeaderHeight + 0.5);
    ctx.lineTo(width, totalHeaderHeight + 0.5);

    ctx.strokeStyle = theme.bgHeader;
    ctx.stroke();

    ctx.beginPath();

    let doCell = false;
    if (drawX !== 0) {
        ctx.moveTo(drawX + 0.5, 0);
        ctx.lineTo(drawX + 0.5, height);
        doCell = true;
    }

    if (lastRowSticky) {
        const h = getRowHeight(rows - 1);
        ctx.moveTo(0, height - h + 0.5);
        ctx.lineTo(width, height - h + 0.5);
        doCell = true;
    }

    // fill in cell color behind other borders
    if (doCell) {
        ctx.strokeStyle = theme.bgCell;
        ctx.stroke();
    }

    // overdraw borders for all
    ctx.moveTo(0, totalHeaderHeight + 0.5);
    ctx.lineTo(width, totalHeaderHeight + 0.5);

    ctx.strokeStyle = theme.borderColor;
    ctx.stroke();
}

function drawFocusRing(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    effectiveCols: readonly MappedGridColumn[],
    allColumns: readonly MappedGridColumn[],
    theme: Theme,
    totalHeaderHeight: number,
    selectedCell: GridSelection | undefined,
    getRowHeight: (row: number) => number,
    getCellContent: (cell: readonly [number, number]) => InnerGridCell,
    lastRowSticky: boolean,
    rows: number
): (() => void) | undefined {
    if (selectedCell === undefined || effectiveCols.find(c => (c.sourceIndex === selectedCell.cell[0]) === undefined))
        return undefined;
    const [targetCol, targetRow] = selectedCell.cell;
    const cell = getCellContent(selectedCell.cell);
    const targetColSpan = cell.span ?? [targetCol, targetCol];

    const isStickyRow = lastRowSticky && targetRow === rows - 1;
    const stickRowHeight = lastRowSticky && !isStickyRow ? getRowHeight(rows - 1) - 1 : 0;

    let drawCb: (() => void) | undefined = undefined;

    walkColumns(
        effectiveCols,
        cellYOffset,
        translateX,
        translateY,
        totalHeaderHeight,
        (col, drawX, colDrawY, clipX, startRow) => {
            if (col.sticky && targetCol > col.sourceIndex) return;
            if (col.sourceIndex < targetColSpan[0] || col.sourceIndex > targetColSpan[1]) {
                return;
            }

            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, lastRowSticky, (drawY, row, rh) => {
                if (row !== targetRow) return;

                let cellX = drawX;
                let cellWidth = col.width;

                if (cell.span !== undefined) {
                    const areas = getSpanBounds(cell.span, drawX, drawY, col.width, rh, col, allColumns);
                    const area = col.sticky ? areas[0] : areas[1];

                    if (area !== undefined) {
                        cellX = area.x;
                        cellWidth = area.width;
                    }
                }

                drawCb = () => {
                    if (clipX > cellX && !col.sticky) {
                        const diff = Math.max(0, clipX - cellX);
                        ctx.beginPath();
                        ctx.rect(cellX + diff, drawY, cellWidth - diff + 1, rh + 1);
                        ctx.clip();
                    }
                    ctx.beginPath();
                    ctx.rect(cellX + 0.5, drawY + 0.5, cellWidth, rh);
                    ctx.strokeStyle = col.themeOverride?.accentColor ?? theme.accentColor;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                };
                return true;
            });

            return true;
        }
    );

    if (drawCb === undefined) return undefined;

    const result = () => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, totalHeaderHeight, width, height - totalHeaderHeight - stickRowHeight);
        ctx.clip();

        drawCb?.();

        ctx.restore();
    };

    result();

    return result;
}

export function drawGrid(
    canvas: HTMLCanvasElement,
    buffers: Buffers,
    width: number,
    height: number,
    cellXOffset: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    columns: readonly SizedGridColumn[],
    mappedColumns: readonly MappedGridColumn[],
    enableGroups: boolean,
    freezeColumns: number,
    dragAndDropState: DragAndDropState | undefined,
    theme: Theme,
    headerHeight: number,
    groupHeaderHeight: number,
    selectedRows: CompactSelection,
    disabledRows: CompactSelection,
    rowHeight: number | ((index: number) => number),
    verticalBorder: (col: number) => boolean,
    selectedColumns: CompactSelection,
    isResizing: boolean,
    selectedCell: GridSelection | undefined,
    lastRowSticky: boolean,
    rows: number,
    getCellContent: (cell: readonly [number, number]) => InnerGridCell,
    getGroupDetails: GroupDetailsCallback,
    getRowThemeOverride: GetRowThemeCallback | undefined,
    drawCustomCell: DrawCustomCellCallback | undefined,
    drawHeaderCallback: DrawHeaderCallback | undefined,
    prelightCells: CellList | undefined,
    imageLoader: ImageWindowLoader,
    lastBlitData: React.MutableRefObject<BlitData>,
    canBlit: boolean,
    damage: CellList | undefined,
    hoverValues: HoverValues,
    hoverInfo: HoverInfo | undefined,
    spriteManager: SpriteManager,
    scrolling: boolean,
    touchMode: boolean,
    enqueue: (item: Item) => void
) {
    if (width === 0 || height === 0) return;
    const dpr = scrolling ? 1 : Math.ceil(window.devicePixelRatio ?? 1);

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
    }

    const overlayCanvas = buffers.overlay;
    const totalHeaderHeight = enableGroups ? groupHeaderHeight + headerHeight : headerHeight;

    if (overlayCanvas.width !== width * dpr || overlayCanvas.height !== totalHeaderHeight * dpr) {
        overlayCanvas.width = width * dpr;
        overlayCanvas.height = totalHeaderHeight * dpr;

        overlayCanvas.style.width = width + "px";
        overlayCanvas.style.height = totalHeaderHeight + "px";
    }

    const last = lastBlitData.current;
    if (
        canBlit === true &&
        cellXOffset === last.cellXOffset &&
        cellYOffset === last.cellYOffset &&
        translateX === last.translateX &&
        translateY === last.translateY
    )
        return;

    const targetCtx = canvas.getContext("2d", {
        alpha: false,
    });
    const overlayCtx = overlayCanvas.getContext("2d", {
        alpha: false,
    });
    if (overlayCtx === null || targetCtx === null) return;

    const getRowHeight = (r: number) => (typeof rowHeight === "number" ? rowHeight : rowHeight(r));

    overlayCtx.save();
    overlayCtx.beginPath();
    targetCtx.save();
    targetCtx.beginPath(); // clear any path in the ctx

    overlayCtx.textBaseline = "middle";
    targetCtx.textBaseline = "middle";

    if (dpr !== 1) {
        overlayCtx.scale(dpr, dpr);
        targetCtx.scale(dpr, dpr);
    }

    const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, dragAndDropState, translateX);

    let drawRegions: Rectangle[] = [];

    const drawHeaderTexture = () => {
        drawGridHeaders(
            overlayCtx,
            effectiveCols,
            enableGroups,
            hoverInfo,
            width,
            translateX,
            headerHeight,
            groupHeaderHeight,
            selectedColumns,
            dragAndDropState,
            isResizing,
            selectedCell,
            theme,
            spriteManager,
            hoverValues,
            verticalBorder,
            getGroupDetails,
            damage,
            drawHeaderCallback,
            touchMode
        );

        drawGridLines(
            overlayCtx,
            effectiveCols,
            cellYOffset,
            translateX,
            translateY,
            width,
            height,
            undefined,
            undefined,
            groupHeaderHeight,
            totalHeaderHeight,
            getRowHeight,
            verticalBorder,
            lastRowSticky,
            rows,
            theme,
            true
        );
    };

    // handle damage updates by directly drawing to the target to avoid large blits
    if (damage !== undefined) {
        let doHeaders = false;
        damage = damage.filter(x => {
            doHeaders = doHeaders || x[1] < 0;
            return (
                x[1] < 0 ||
                intersectRect(cellXOffset, cellYOffset, effectiveCols.length, 300, x[0], x[1], 1, 1) ||
                intersectRect(0, cellYOffset, freezeColumns, 300, x[0], x[1], 1, 1) ||
                (lastRowSticky && intersectRect(cellXOffset, rows - 1, effectiveCols.length, 1, x[0], x[1], 1, 1))
            );
        });

        if (damage.length > 0) {
            clipDamage(
                targetCtx,
                effectiveCols,
                width,
                height,
                groupHeaderHeight,
                totalHeaderHeight,
                translateX,
                translateY,
                cellYOffset,
                rows,
                getRowHeight,
                lastRowSticky,
                damage,
                true
            );

            targetCtx.fillStyle = theme.bgCell;
            targetCtx.fillRect(0, totalHeaderHeight + 1, width, height - totalHeaderHeight - 1);

            drawCells(
                targetCtx,
                effectiveCols,
                mappedColumns,
                height,
                totalHeaderHeight,
                translateX,
                translateY,
                cellYOffset,
                rows,
                getRowHeight,
                getCellContent,
                getGroupDetails,
                getRowThemeOverride,
                selectedRows,
                disabledRows,
                lastRowSticky,
                drawRegions,
                damage,
                selectedCell,
                selectedColumns,
                prelightCells,
                drawCustomCell,
                imageLoader,
                spriteManager,
                hoverValues,
                hoverInfo,
                theme,
                enqueue
            );
        }

        if (doHeaders) {
            clipDamage(
                overlayCtx,
                effectiveCols,
                width,
                totalHeaderHeight,
                groupHeaderHeight,
                totalHeaderHeight,
                translateX,
                translateY,
                cellYOffset,
                rows,
                getRowHeight,
                lastRowSticky,
                damage,
                false
            );
            drawHeaderTexture();
        }
        targetCtx.restore();
        overlayCtx.restore();

        return;
    }

    if (!canBlit || cellXOffset !== last.cellXOffset || translateX !== last.translateX) {
        drawHeaderTexture();
    }

    if (canBlit === true) {
        const { regions } = blitLastFrame(
            targetCtx,
            canvas,
            last,
            cellXOffset,
            cellYOffset,
            translateX,
            translateY,
            lastRowSticky,
            width,
            height,
            rows,
            totalHeaderHeight,
            dpr,
            columns,
            effectiveCols,
            rowHeight
        );
        drawRegions = regions;
    }

    overdrawStickyBoundaries(
        targetCtx,
        effectiveCols,
        width,
        height,
        totalHeaderHeight,
        lastRowSticky,
        rows,
        getRowHeight,
        theme
    );

    // the overdraw may have nuked out our focus ring right edge.
    const focusRedraw = drawFocusRing(
        targetCtx,
        width,
        height,
        cellYOffset,
        translateX,
        translateY,
        effectiveCols,
        mappedColumns,
        theme,
        totalHeaderHeight,
        selectedCell,
        getRowHeight,
        getCellContent,
        lastRowSticky,
        rows
    );

    targetCtx.fillStyle = theme.bgCell;
    if (drawRegions.length > 0) {
        targetCtx.beginPath();
        for (const r of drawRegions) {
            targetCtx.rect(r.x, r.y, r.width, r.height);
        }
        targetCtx.clip();
        targetCtx.fill();
        targetCtx.beginPath();
    } else {
        targetCtx.fillRect(0, 0, width, height);
    }

    const spans = drawCells(
        targetCtx,
        effectiveCols,
        mappedColumns,
        height,
        totalHeaderHeight,
        translateX,
        translateY,
        cellYOffset,
        rows,
        getRowHeight,
        getCellContent,
        getGroupDetails,
        getRowThemeOverride,
        selectedRows,
        disabledRows,
        lastRowSticky,
        drawRegions,
        damage,
        selectedCell,
        selectedColumns,
        prelightCells,
        drawCustomCell,
        imageLoader,
        spriteManager,
        hoverValues,
        hoverInfo,
        theme,
        enqueue
    );

    drawBlanks(
        targetCtx,
        effectiveCols,
        mappedColumns,
        width,
        height,
        totalHeaderHeight,
        translateX,
        translateY,
        cellYOffset,
        rows,
        getRowHeight,
        getRowThemeOverride,
        selectedRows,
        disabledRows,
        lastRowSticky,
        drawRegions,
        damage,
        theme
    );

    drawGridLines(
        targetCtx,
        effectiveCols,
        cellYOffset,
        translateX,
        translateY,
        width,
        height,
        drawRegions,
        spans,
        groupHeaderHeight,
        totalHeaderHeight,
        getRowHeight,
        verticalBorder,
        lastRowSticky,
        rows,
        theme
    );

    focusRedraw?.();

    imageLoader?.setWindow(
        {
            x: cellXOffset,
            y: cellYOffset,
            width: effectiveCols.length,
            height: 100, // FIXME: row - cellYOffset,
        },
        freezeColumns
    );

    lastBlitData.current = { cellXOffset, cellYOffset, translateX, translateY };

    targetCtx.restore();
    overlayCtx.restore();
}

type WalkRowsCallback = (drawY: number, row: number, rowHeight: number, isSticky: boolean) => boolean | void;

function walkRowsInCol(
    startRow: number,
    drawY: number,
    height: number,
    rows: number,
    getRowHeight: (row: number) => number,
    lastRowSticky: boolean,
    cb: WalkRowsCallback
): void {
    let y = drawY;
    let row = startRow;
    let doSticky = lastRowSticky;
    while (y < height || doSticky) {
        const doingSticky = doSticky && y >= height;
        if (doingSticky) {
            doSticky = false;
            row = rows - 1;
        }
        const rh = getRowHeight(row);

        if (doingSticky) {
            y = height - rh;
        }

        const isMovedStickyRow = doSticky && row === rows - 1;

        if (!isMovedStickyRow) {
            if (cb(y, row, rh, doingSticky) === true) {
                break;
            }
        }

        if (doingSticky) {
            break;
        }
        y += rh;
        row++;
    }
}

type WalkColsCallback = (
    col: MappedGridColumn,
    drawX: number,
    drawY: number,
    clipX: number,
    startRow: number
) => boolean | void;

function walkColumns(
    effectiveCols: readonly MappedGridColumn[],
    cellYOffset: number,
    translateX: number,
    translateY: number,
    totalHeaderHeight: number,
    cb: WalkColsCallback
): void {
    let x = 0;
    let clipX = 0; // this tracks the total width of sticky cols
    const drawY = totalHeaderHeight + translateY;
    for (const c of effectiveCols) {
        let drawX: number;
        if (c.sticky) {
            drawX = clipX;
        } else {
            drawX = x + translateX;
        }

        if (cb(c, drawX, drawY, clipX, cellYOffset) === true) {
            break;
        }

        x += c.width;
        clipX += c.sticky ? c.width : 0;
    }
}

type WalkGroupsCallback = (
    colSpan: readonly [number, number],
    group: string,
    x: number,
    y: number,
    width: number,
    height: number
) => void;
function walkGroups(
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    translateX: number,
    groupHeaderHeight: number,
    cb: WalkGroupsCallback
): void {
    let x = 0;
    let clipX = 0;
    for (let index = 0; index < effectiveCols.length; index++) {
        const startCol = effectiveCols[index];

        let end = index + 1;
        let boxWidth = startCol.width;
        if (startCol.sticky) {
            clipX += boxWidth;
        }
        while (
            end < effectiveCols.length &&
            isGroupEqual(effectiveCols[end].group, startCol.group) &&
            effectiveCols[end].sticky === effectiveCols[index].sticky
        ) {
            const endCol = effectiveCols[end];
            boxWidth += endCol.width;
            end++;
            index++;
            if (endCol.sticky) {
                clipX += endCol.width;
            }
        }

        const t = startCol.sticky ? 0 : translateX;
        const localX = x + t;
        const delta = startCol.sticky ? 0 : Math.max(0, clipX - localX);
        const w = Math.min(boxWidth - delta, width - (localX + delta));
        cb(
            [startCol.sourceIndex, effectiveCols[end - 1].sourceIndex],
            startCol.group ?? "",
            localX + delta,
            0,
            w,
            groupHeaderHeight
        );

        x += boxWidth;
    }
}

interface Buffers {
    overlay: HTMLCanvasElement;
}
