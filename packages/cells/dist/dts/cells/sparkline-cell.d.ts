import { type CustomCell, type Item, type CustomRenderer } from "@glideapps/glide-data-grid";
interface SparklineCellProps {
    readonly kind: "sparkline-cell";
    readonly graphKind?: "line" | "bar" | "area";
    readonly values: readonly number[];
    readonly displayValues?: readonly string[];
    readonly yAxis: Item;
    readonly color?: string;
    readonly hideAxis?: boolean;
}
export type SparklineCell = CustomCell<SparklineCellProps>;
declare const renderer: CustomRenderer<SparklineCell>;
export default renderer;
//# sourceMappingURL=sparkline-cell.d.ts.map