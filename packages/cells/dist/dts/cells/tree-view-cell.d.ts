import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";
interface TreeViewCellProps {
    readonly kind: "tree-view-cell";
    readonly text: string;
    readonly isOpen: boolean;
    readonly canOpen: boolean;
    readonly depth: number;
    readonly onClickOpener?: (cell: TreeViewCell) => TreeViewCell | undefined;
}
export type TreeViewCell = CustomCell<TreeViewCellProps> & {
    readonly: true;
};
declare const renderer: CustomRenderer<TreeViewCell>;
export default renderer;
//# sourceMappingURL=tree-view-cell.d.ts.map