import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";
interface LinksCellProps {
    readonly kind: "links-cell";
    /**
     * Used to hand tune the position of the underline as this is not a native canvas capability, it can need tweaking
     * for different fonts.
     */
    readonly underlineOffset?: number;
    readonly maxLinks?: number;
    readonly navigateOn?: "click" | "control-click";
    readonly links: readonly {
        readonly title: string;
        readonly href?: string;
        readonly onClick?: () => void;
    }[];
}
export type LinksCell = CustomCell<LinksCellProps>;
declare const renderer: CustomRenderer<LinksCell>;
export default renderer;
//# sourceMappingURL=links-cell.d.ts.map