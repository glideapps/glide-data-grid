import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";
interface UserProfileCellProps {
    readonly kind: "user-profile-cell";
    readonly image: string;
    readonly initial: string;
    readonly tint: string;
    readonly name?: string;
}
export type UserProfileCell = CustomCell<UserProfileCellProps>;
declare const renderer: CustomRenderer<UserProfileCell>;
export default renderer;
//# sourceMappingURL=user-profile-cell.d.ts.map