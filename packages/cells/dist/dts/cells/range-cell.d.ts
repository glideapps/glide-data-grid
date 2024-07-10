import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";
interface RangeCellProps {
    readonly kind: "range-cell";
    readonly value: number;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    readonly label?: string;
    readonly measureLabel?: string;
}
export type RangeCell = CustomCell<RangeCellProps>;
declare const renderer: CustomRenderer<RangeCell>;
export default renderer;
//# sourceMappingURL=range-cell.d.ts.map