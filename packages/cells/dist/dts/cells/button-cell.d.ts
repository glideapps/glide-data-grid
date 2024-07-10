import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";
type PackedColor = string | readonly [normal: string, hover: string];
interface ButtonCellProps {
    readonly kind: "button-cell";
    readonly title: string;
    readonly onClick?: () => void;
    readonly backgroundColor?: PackedColor;
    readonly color?: PackedColor;
    readonly borderColor?: PackedColor;
    readonly borderRadius?: number;
}
export type ButtonCell = CustomCell<ButtonCellProps> & {
    readonly: true;
};
declare const renderer: CustomRenderer<ButtonCell>;
export default renderer;
//# sourceMappingURL=button-cell.d.ts.map