import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";
type DropdownOption = string | {
    value: string;
    label: string;
} | undefined | null;
interface DropdownCellProps {
    readonly kind: "dropdown-cell";
    readonly value: string | undefined | null;
    readonly allowedValues: readonly DropdownOption[];
}
export type DropdownCell = CustomCell<DropdownCellProps>;
declare const renderer: CustomRenderer<DropdownCell>;
export default renderer;
//# sourceMappingURL=dropdown-cell.d.ts.map