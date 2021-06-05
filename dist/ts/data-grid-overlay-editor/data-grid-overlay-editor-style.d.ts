import { Rectangle } from "../data-grid/data-grid-types";
interface Props {
    targetRect: Rectangle;
}
export declare const DataGridOverlayEditorStyle: import("styled-components").StyledComponent<"div", {
    overlayName: string;
    darkGrey: string;
    fgColorDarkest: string;
    fgColorDark: string;
    fgColorMedium: string;
    fgColorLight: string;
    bgColorLight: string;
    borderColor: string;
    bgColorAltLight: string;
    acceptColor: string;
    linkColor: string;
    dataViewer: {
        fgAddButton: string;
        bgColor: string;
        gridColor: string;
        leftMargin: string;
        bgSelected: string;
        bgBubble: string;
        bgBubbleSelected: string;
        bgPrelight: string;
        checkbox: {
            checkedColor: string;
        };
        columnHeader: {
            bgColor: string;
            bgDark: string;
            fgColor: string;
            fgSelected: string;
            bgSelected: string;
            icon: {
                bgColor: string;
                fgColor: string;
                bgColorSelected: string;
                fgColorSelected: string;
                userSpecific: {
                    bgColor: string;
                    fgColor: string;
                    bgColorSelected: string;
                    fgColorSelected: string;
                };
            };
        };
    };
}, Props, never>;
export {};
//# sourceMappingURL=data-grid-overlay-editor-style.d.ts.map