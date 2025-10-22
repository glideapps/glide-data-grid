import React from "react";
import { getDataEditorTheme } from "../common/styles.js";
export function useRemAdjuster({ rowHeight: rowHeightIn, headerHeight: headerHeightIn, groupHeaderHeight: groupHeaderHeightIn, theme: themeIn, overscrollX: overscrollXIn, overscrollY: overscrollYIn, scaleToRem, remSize, }) {
    const [rowHeight, headerHeight, groupHeaderHeight, theme, overscrollX, overscrollY] = React.useMemo(() => {
        if (!scaleToRem || remSize === 16)
            return [rowHeightIn, headerHeightIn, groupHeaderHeightIn, themeIn, overscrollXIn, overscrollYIn];
        const scaler = remSize / 16;
        const rh = rowHeightIn;
        const bt = getDataEditorTheme();
        return [
            typeof rh === "number" ? rh * scaler : (n) => Math.ceil(rh(n) * scaler),
            Math.ceil(headerHeightIn * scaler),
            Math.ceil(groupHeaderHeightIn * scaler),
            {
                ...themeIn,
                headerIconSize: (themeIn?.headerIconSize ?? bt.headerIconSize) * scaler,
                cellHorizontalPadding: (themeIn?.cellHorizontalPadding ?? bt.cellHorizontalPadding) * scaler,
                cellVerticalPadding: (themeIn?.cellVerticalPadding ?? bt.cellVerticalPadding) * scaler,
            },
            Math.ceil((overscrollXIn ?? 0) * scaler),
            Math.ceil((overscrollYIn ?? 0) * scaler),
        ];
    }, [groupHeaderHeightIn, headerHeightIn, overscrollXIn, overscrollYIn, remSize, rowHeightIn, scaleToRem, themeIn]);
    return { rowHeight, headerHeight, groupHeaderHeight, theme, overscrollX, overscrollY };
}
//# sourceMappingURL=use-rem-adjuster.js.map