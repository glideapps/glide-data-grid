import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";
interface StarCellProps {
    readonly kind: "star-cell";
    readonly rating: number;
}
export type StarCell = CustomCell<StarCellProps>;
declare const renderer: CustomRenderer<StarCell>;
export default renderer;
//# sourceMappingURL=star-cell.d.ts.map