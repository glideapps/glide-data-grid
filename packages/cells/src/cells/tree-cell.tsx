import { CustomCell, CustomRenderer, GridCellKind, Rectangle, drawTextCell } from "@glideapps/glide-data-grid";

export type TreeNode = {
  name: string;
  description: string;
  depth?: number;
  collapsed?: boolean;
  children: TreeNode[];
};

interface TreeCellProps {
  readonly kind: "tree-cell";
  readonly node: TreeNode;
}

export type TreeCell = CustomCell<TreeCellProps>;

const renderer: CustomRenderer<TreeCell> = {
  kind: GridCellKind.Custom,
  isMatch: (cell: CustomCell): cell is TreeCell => (cell.data as any).kind === "tree-cell",
  draw: (args, cell) => {
      const { ctx, rect, theme } = args;
      const { x, y, width, height } = rect;
      const { data } = cell;
      const { node } = data;
      const { children, collapsed, depth, name } = node;

      const depthOffset = (depth || 0) * 20;

      ctx.save();

      if (children?.length) {
          ctx.fillStyle = "none";
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = theme.textDark;
          ctx.beginPath();
          if (collapsed) {
              ctx.moveTo(x + depthOffset + 8, y + height / 2 - 4);
              ctx.lineTo(x + depthOffset + 8, y + height / 2 + 4);
              ctx.lineTo(x + depthOffset + 14, y + height / 2);
          } else {
              ctx.moveTo(x + depthOffset + 15, y + height / 2 - 3);
              ctx.lineTo(x + depthOffset + 7, y + height / 2 - 3);
              ctx.lineTo(x + depthOffset + 11, y + height / 2 + 3);
          }
          ctx.closePath();
          ctx.stroke();
      }

      ctx.restore();

      const indent = depthOffset + 20;
      const indentRect: Rectangle = {
        ...rect,
        x: rect.x + indent,
        width: width - indent,
      };

      drawTextCell({...args, rect: indentRect }, name, cell.contentAlign);

      return true;
  },
  /*
  onCellClicked: (cell, event, callback) => {
      const { item } = cell.data;
      const { depth } = item;
      const { localEventX } = event;

      const depthOffset = (depth || 0) * 20;

      if (localEventX < depthOffset || localEventX > depthOffset + 22) return;

      event.preventDefault();
      item.collapsed = !item.collapsed;
      callback(item);
  },
  */
  provideEditor: undefined,
};

export default renderer;
