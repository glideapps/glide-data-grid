import * as React from "react";
import type { MarkdownCell, Rectangle, SelectionRange } from "../../data-grid/data-grid-types.js";
interface Props {
    readonly targetRect: Rectangle;
    readonly onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly forceEditMode: boolean;
    readonly onFinish: (newValue?: MarkdownCell | undefined) => void;
    readonly validatedSelection?: SelectionRange;
    readonly value: MarkdownCell;
    createNode?: (content: string) => DocumentFragment;
}
export declare const MarkdownOverlayEditor: React.FunctionComponent<Props>;
export {};
