import React from "react";
import type { Rectangle } from "../internal/data-grid/data-grid-types.js";
interface Props {
    readonly bounds: Rectangle;
    readonly group: string;
    readonly onClose: () => void;
    readonly onFinish: (newVal: string) => void;
    readonly canvasBounds: DOMRect;
}
export declare const GroupRename: React.VFC<Props>;
export {};
//# sourceMappingURL=group-rename.d.ts.map