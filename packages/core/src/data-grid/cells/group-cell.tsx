import type { InternalCellRenderer } from './cell-types';
import { GridRowKind, GroupCell } from '../data-grid-types';
import { clipCanvasString, getMiddleCenterBias } from '../data-grid-lib';

const GROUP_ICON_SIZE = 18;
export const groupRenderer: InternalCellRenderer<GroupCell> = {
  getAccessibilityString: () => 'Group',
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

    const clippedText = clipCanvasString(
      cell.name,
      rect.width - drawX * 2,
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
    return true;
  },
  onClick: (e) => {
    if (e.onRowDetailsUpdated) {
      e.onRowDetailsUpdated({ ...e.cell, expanded: !e.cell.expanded });
    }

    return undefined;
  },
  onKeyDown: (e) => {
    if (e.onRowDetailsUpdated && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      if (e.cell.expanded && e.key === 'ArrowLeft') {
        e.onRowDetailsUpdated({ ...e.cell, expanded: false });
      }
      if (!e.cell.expanded && e.key === 'ArrowRight') {
        e.onRowDetailsUpdated({ ...e.cell, expanded: true });
      }
      e.cancel();
    }
  },
  onPaste: () => undefined,
};
