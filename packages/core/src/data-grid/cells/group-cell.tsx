import type { InternalCellRenderer } from "./cell-types";
import { GridRowKind, GroupCell } from "../data-grid-types";
import { getMiddleCenterBias } from "../data-grid-lib";

const GROUP_ICON_SIZE = 18;
export const groupRenderer: InternalCellRenderer<GroupCell> = {
    getAccessibilityString: () => "Group",
    kind: GridRowKind.Group,
    draw: args => {
        const { ctx, rect, theme, cell, spriteManager } = args;

        const drawX = rect.x + cell.level * theme.nestedGroupIndent;

        const icon = cell.expanded ? "expandIcon" : "collapseIcon";
        const iconDrawY = rect.y + rect.height / 2 - 9;
        spriteManager.drawSprite(icon, "normal", ctx, drawX, iconDrawY, GROUP_ICON_SIZE, theme, 1);

        ctx.fillStyle = theme.textDark;
        ctx.font = `${theme.headerFontStyle} ${theme.fontFamily}`;
        ctx.fillText(
            cell.name,
            drawX + GROUP_ICON_SIZE + theme.cellHorizontalPadding,
            rect.y + rect.height / 2 + getMiddleCenterBias(ctx, `${theme.headerFontStyle} ${theme.fontFamily}`)
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
        if(e.onRowDetailsUpdated && (e.key === "ArrowLeft" || e.key === "ArrowRight") ) {
            if(e.cell.expanded && e.key === "ArrowLeft") {
                e.onRowDetailsUpdated({ ...e.cell, expanded: false })
            }
            if(!e.cell.expanded && e.key === "ArrowRight") {
                e.onRowDetailsUpdated({ ...e.cell, expanded: true })
            }
            e.cancel()
        }
    },
    onPaste: () => undefined,
};
