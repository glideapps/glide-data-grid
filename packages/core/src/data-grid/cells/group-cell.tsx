import type { InternalCellRenderer } from './cell-types';
import { GridRowKind, GroupCell } from '../data-grid-types';
import {
  getMiddleCenterBias,
  measureTextCached,
  roundedRect,
  clipCanvasString,
} from '../data-grid-lib';

const GROUP_ICON_SIZE = 18;
const GROUP_ICON_CLICK_PADDING = 6;
const GROUP_ELLIPSIS_TITLE_PADDING = 25;
export const groupRenderer: InternalCellRenderer<GroupCell> = {
  getAccessibilityString: (cell) => {
    return cell.name;
  },
  kind: GridRowKind.Group,
  draw: (args) => {
    const { ctx, rect, theme, cell, spriteManager } = args;
    const drawX = rect.x - 4 + cell.level * theme.nestedGroupIndent;

    const icon = cell.expanded ? 'expandIcon' : 'collapseIcon';
    const iconDrawY = rect.y + rect.height / 2 - 9;
    spriteManager.drawSprite(icon, 'normal', ctx, drawX, iconDrawY, GROUP_ICON_SIZE, theme, 1);

    const font = `${theme.headerFontStyle} ${theme.fontFamily}`;
    ctx.fillStyle = theme.textDark;
    ctx.font = font;

    const countWidth = measureTextCached(
      `${cell.rowsCount}`,
      ctx,
      `${theme.headerFontStyle} ${theme.fontFamily}`
    );
    const groupCountWidth = countWidth.width > 13 ? countWidth.width + 8 : 16;

    const clippedText = clipCanvasString(
      cell.name,
      rect.width - drawX * 2 - groupCountWidth - GROUP_ELLIPSIS_TITLE_PADDING,
      ctx,
      `${cell.name}_${rect.width}`,
      font
    );

    ctx.fillText(
      clippedText,
      drawX + GROUP_ICON_SIZE + theme.cellHorizontalPadding,
      rect.y +
        rect.height / 2 +
        getMiddleCenterBias(ctx, `${theme.headerFontStyle} ${theme.fontFamily}`)
    );

    const textWidth = measureTextCached(
      clippedText,
      ctx,
      `${theme.headerFontStyle} ${theme.fontFamily}`
    );

    ctx.fillStyle = '#0000001A';

    const groupCountHeight = 14;
    const circleX = groupCountWidth + textWidth.width + drawX + 30;
    const circleY =
      rect.y +
      rect.height / 2 +
      getMiddleCenterBias(ctx, `${theme.headerFontStyle} ${theme.fontFamily}`) -
      1;

    roundedRect(
      ctx,
      circleX - groupCountWidth / 2,
      circleY - groupCountHeight / 2,
      groupCountWidth,
      groupCountHeight,
      6
    );

    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(`${cell.rowsCount}`, circleX, circleY + 1);

    return true;
  },
  onClick: (e) => {
    if (e.onRowDetailsUpdated) {
      let posX = e.posX;
      const iconXPosition = e.cell.level * e.theme.nestedGroupIndent + 4;
      /**
       * When working with group headers that contain spans and render cells, we've encountered an issue related to the position information. Specifically, when clicking on span 0, it correctly provides us with the postX value. However, when clicking on span 1, it returns the postX value of its cell instead.
       * For example, if we click on a group header located within span 1, it gives us a postX value of approximately 22, which corresponds to the position within that span 1. However, what we actually need to determine is the location of our group icon. To address this, we should check if it's not in the first span. If it isn't, we should add the width of the row marker to accurately determine its position.
       */
      const column = e.location[0];
      if (column !== 0 && e.rowMarkerWidth !== undefined) {
        posX = posX + e.rowMarkerWidth;
      }
      /**
       * The handling of the Glide doubleClick is currently managed through the mouseDown event, which, unfortunately, fires three times. Regrettably, we cannot prevent the event from firing. As a result, when a double-click event is triggered on the group icon, it fires multiple times, although it ultimately functions as expected.
       */
      if (
        posX >= iconXPosition - GROUP_ICON_CLICK_PADDING &&
        posX <= iconXPosition + GROUP_ICON_CLICK_PADDING
      ) {
        e.onRowDetailsUpdated({ ...e.cell, expanded: !e.cell.expanded });
      }
      if (e.doubleClick !== undefined && e.doubleClick === true) {
        e.onRowDetailsUpdated({ ...e.cell, expanded: !e.cell.expanded });
      }
    }

    return undefined;
  },
  onKeyDown: (e) => {
    if (e.onRowDetailsUpdated) {
      // https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/
      // In this document, you can read about TreeGrid accessibility techniques. It states that we should open by using the arrow keys or by pressing enter.
      if (e.key === 'Enter') {
        e.onRowDetailsUpdated({ ...e.cell, expanded: !e.cell.expanded });
        e.cancel();
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (e.cell.expanded && e.key === 'ArrowLeft') {
          e.onRowDetailsUpdated({ ...e.cell, expanded: false });
        }
        if (!e.cell.expanded && e.key === 'ArrowRight') {
          e.onRowDetailsUpdated({ ...e.cell, expanded: true });
        }
        e.cancel();
      }
    }
  },
  onPaste: () => undefined,
};
