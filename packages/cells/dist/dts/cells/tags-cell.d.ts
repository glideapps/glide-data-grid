import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";
interface TagsCellProps {
    readonly kind: "tags-cell";
    readonly tags: readonly string[];
    readonly possibleTags: readonly {
        tag: string;
        color: string;
    }[];
}
export type TagsCell = CustomCell<TagsCellProps>;
declare const renderer: CustomRenderer<TagsCell>;
export default renderer;
//# sourceMappingURL=tags-cell.d.ts.map