import { pointInRect } from "../../../common/math.js";
import { mergeAndRealizeTheme, type FullTheme } from "../../../common/styles.js";
import { direction } from "../../../common/utils.js";
import type { HoverValues } from "../animation-manager.js";
import type { CellSet } from "../cell-set.js";
import { withAlpha } from "../color-parser.js";
import type { SpriteManager, SpriteVariant } from "../data-grid-sprites.js";
import {
    headerCellCheckboxPrefix,
    type DrawHeaderCallback,
    type Rectangle,
    GridColumnMenuIcon,
    BooleanIndeterminate,
    headerCellCheckedMarker,
    headerCellUnheckedMarker,
    type GridSelection,
} from "../data-grid-types.js";
import { drawMenuDots, getMiddleCenterBias, roundedPoly, type MappedGridColumn } from "./data-grid-lib.js";
import type { GroupDetails, GroupDetailsCallback } from "./data-grid-render.cells.js";
import { walkColumns, walkGroups } from "./data-grid-render.walk.js";
import { drawCheckbox } from "./draw-checkbox.js";
import type { DragAndDropState, HoverInfo } from "./draw-grid-arg.js";

export function drawGridHeaders(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    enableGroups: boolean,
    hovered: HoverInfo | undefined,
    width: number,
    translateX: number,
    headerHeight: number,
    groupHeaderHeight: number,
    dragAndDropState: DragAndDropState | undefined,
    isResizing: boolean,
    selection: GridSelection,
    outerTheme: FullTheme,
    spriteManager: SpriteManager,
    hoverValues: HoverValues,
    verticalBorder: (col: number) => boolean,
    getGroupDetails: GroupDetailsCallback,
    damage: CellSet | undefined,
    drawHeaderCallback: DrawHeaderCallback | undefined,
    touchMode: boolean
) {
    const totalHeaderHeight = headerHeight + groupHeaderHeight;
    if (totalHeaderHeight <= 0) return;

    ctx.fillStyle = outerTheme.bgHeader;
    ctx.fillRect(0, 0, width, totalHeaderHeight);

    const [hCol, hRow] = hovered?.[0] ?? [];

    const font = outerTheme.headerFontFull;
    // Assinging the context font too much can be expensive, it can be worth it to minimze this
    ctx.font = font;
    walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x, _y, clipX) => {
        if (damage !== undefined && !damage.has([c.sourceIndex, -1])) return;
        const diff = Math.max(0, clipX - x);
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + diff, groupHeaderHeight, c.width - diff, headerHeight);
        ctx.clip();

        const groupTheme = getGroupDetails(c.group ?? "").overrideTheme;
        const theme =
            c.themeOverride === undefined && groupTheme === undefined
                ? outerTheme
                : mergeAndRealizeTheme(outerTheme, groupTheme, c.themeOverride);

        if (theme.bgHeader !== outerTheme.bgHeader) {
            ctx.fillStyle = theme.bgHeader;
            ctx.fill();
        }

        if (theme !== outerTheme) {
            ctx.font = theme.baseFontFull;
        }
        const selected = selection.columns.hasIndex(c.sourceIndex);
        const noHover = dragAndDropState !== undefined || isResizing;
        const hoveredBoolean = !noHover && hRow === -1 && hCol === c.sourceIndex;
        const hover = noHover
            ? 0
            : hoverValues.find(s => s.item[0] === c.sourceIndex && s.item[1] === -1)?.hoverAmount ?? 0;

        const hasSelectedCell = selection?.current !== undefined && selection.current.cell[0] === c.sourceIndex;

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

export function drawGroups(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    translateX: number,
    groupHeaderHeight: number,
    hovered: HoverInfo | undefined,
    theme: FullTheme,
    spriteManager: SpriteManager,
    _hoverValues: HoverValues,
    verticalBorder: (col: number) => boolean,
    getGroupDetails: GroupDetailsCallback,
    damage: CellSet | undefined
) {
    const xPad = 8;
    const [hCol, hRow] = hovered?.[0] ?? [];

    let finalX = 0;
    walkGroups(effectiveCols, width, translateX, groupHeaderHeight, (span, groupName, x, y, w, h) => {
        if (
            damage !== undefined &&
            !damage.hasItemInRectangle({
                x: span[0],
                y: -2,
                width: span[1] - span[0] + 1,
                height: 1,
            })
        )
            return;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        const group = getGroupDetails(groupName);
        const groupTheme =
            group?.overrideTheme === undefined ? theme : mergeAndRealizeTheme(theme, group.overrideTheme);
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
            ctx.fillText(
                group.name,
                drawX + xPad,
                groupHeaderHeight / 2 + getMiddleCenterBias(ctx, theme.headerFontFull)
            );

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

        if (x !== 0 && verticalBorder(span[0])) {
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
export function getHeaderMenuBounds(x: number, y: number, width: number, height: number, isRtl: boolean): Rectangle {
    if (isRtl) return { x, y, width: menuButtonSize, height: Math.min(menuButtonSize, height) };
    return {
        x: x + width - menuButtonSize, // right align
        y: Math.max(y, y + height / 2 - menuButtonSize / 2), // center vertically
        width: menuButtonSize,
        height: Math.min(menuButtonSize, height),
    };
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

function drawHeaderInner(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    c: MappedGridColumn,
    selected: boolean,
    theme: FullTheme,
    isHovered: boolean,
    hoverAmount: number,
    spriteManager: SpriteManager,
    touchMode: boolean,
    isRtl: boolean,
    isCheckboxHeader: boolean,
    menuBounds: Rectangle
) {
    if (isCheckboxHeader) {
        let checked: boolean | BooleanIndeterminate = undefined;
        if (c.title === headerCellCheckedMarker) checked = true;
        if (c.title === headerCellUnheckedMarker) checked = false;
        if (checked !== true) {
            ctx.globalAlpha = hoverAmount;
        }
        drawCheckbox(ctx, theme, checked, x, y, width, height, false, undefined, undefined, 18);
        if (checked !== true) {
            ctx.globalAlpha = 1;
        }
        return;
    }

    const xPad = theme.cellHorizontalPadding;
    const fillStyle = selected ? theme.textHeaderSelected : theme.textHeader;

    const shouldDrawMenu = c.hasMenu === true && (isHovered || (touchMode && selected));

    const dirScalar = isRtl ? -1 : 1;

    let drawX = isRtl ? x + width - xPad : x + xPad;
    if (c.icon !== undefined) {
        let variant: SpriteVariant = selected ? "selected" : "normal";
        if (c.style === "highlight") {
            variant = selected ? "selected" : "special";
        }
        const headerSize = theme.headerIconSize;
        spriteManager.drawSprite(
            c.icon,
            variant,
            ctx,
            isRtl ? drawX - headerSize : drawX,
            y + (height - headerSize) / 2,
            headerSize,
            theme
        );

        if (c.overlayIcon !== undefined) {
            spriteManager.drawSprite(
                c.overlayIcon,
                selected ? "selected" : "special",
                ctx,
                isRtl ? drawX - headerSize + 9 : drawX + 9,
                y + ((height - 18) / 2 + 6),
                18,
                theme
            );
        }

        drawX += Math.ceil(headerSize * 1.3) * dirScalar;
    }

    if (shouldDrawMenu && c.hasMenu === true && width > 35) {
        const fadeWidth = 35;
        const fadeStart = isRtl ? fadeWidth : width - fadeWidth;
        const fadeEnd = isRtl ? fadeWidth * 0.7 : width - fadeWidth * 0.7;

        const fadeStartPercent = fadeStart / width;
        const fadeEndPercent = fadeEnd / width;

        const grad = ctx.createLinearGradient(x, 0, x + width, 0);
        const trans = withAlpha(fillStyle, 0);

        grad.addColorStop(isRtl ? 1 : 0, fillStyle);
        grad.addColorStop(fadeStartPercent, fillStyle);
        grad.addColorStop(fadeEndPercent, trans);
        grad.addColorStop(isRtl ? 0 : 1, trans);
        ctx.fillStyle = grad;
    } else {
        ctx.fillStyle = fillStyle;
    }

    if (isRtl) {
        ctx.textAlign = "right";
    }
    ctx.fillText(c.title, drawX, y + height / 2 + getMiddleCenterBias(ctx, theme.headerFontFull));
    if (isRtl) {
        ctx.textAlign = "left";
    }

    if (shouldDrawMenu && c.hasMenu === true) {
        if (c.menuIcon === undefined || c.menuIcon === GridColumnMenuIcon.Triangle) {
            // Draw the default triangle menu icon:
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
        } else if (c.menuIcon === GridColumnMenuIcon.Dots) {
            // Draw the three dots menu icon:
            ctx.beginPath();
            const dotsX = menuBounds.x + menuBounds.width / 2;
            const dotsY = menuBounds.y + menuBounds.height / 2;
            drawMenuDots(ctx, dotsX, dotsY);
            ctx.fillStyle = fillStyle;
            ctx.fill();
        } else {
            // Assume that the user has specified a valid sprite image as header icon:
            const iconX = menuBounds.x + (menuBounds.width - theme.headerIconSize) / 2;
            const iconY = menuBounds.y + (menuBounds.height - theme.headerIconSize) / 2;
            spriteManager.drawSprite(c.menuIcon, "normal", ctx, iconX, iconY, theme.headerIconSize, theme);
        }
    }
}

export function drawHeader(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    c: MappedGridColumn,
    selected: boolean,
    theme: FullTheme,
    isHovered: boolean,
    hasSelectedCell: boolean,
    hoverAmount: number,
    spriteManager: SpriteManager,
    drawHeaderCallback: DrawHeaderCallback | undefined,
    touchMode: boolean
) {
    const isCheckboxHeader = c.title.startsWith(headerCellCheckboxPrefix);
    const isRtl = direction(c.title) === "rtl";
    const menuBounds = getHeaderMenuBounds(x, y, width, height, isRtl);

    if (drawHeaderCallback !== undefined) {
        let passCol = c;
        if (isCheckboxHeader) {
            passCol = {
                ...c,
                title: "",
            };
        }
        drawHeaderCallback(
            {
                ctx,
                theme,
                rect: { x, y, width, height },
                column: passCol,
                columnIndex: passCol.sourceIndex,
                isSelected: selected,
                hoverAmount,
                isHovered,
                hasSelectedCell,
                spriteManager,
                menuBounds,
            },
            () =>
                drawHeaderInner(
                    ctx,
                    x,
                    y,
                    width,
                    height,
                    c,
                    selected,
                    theme,
                    isHovered,
                    hoverAmount,
                    spriteManager,
                    touchMode,
                    isRtl,
                    isCheckboxHeader,
                    menuBounds
                )
        );
    } else {
        drawHeaderInner(
            ctx,
            x,
            y,
            width,
            height,
            c,
            selected,
            theme,
            isHovered,
            hoverAmount,
            spriteManager,
            touchMode,
            isRtl,
            isCheckboxHeader,
            menuBounds
        );
    }
}
