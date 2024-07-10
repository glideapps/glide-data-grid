"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRemAdjuster = void 0;
const react_1 = __importDefault(require("react"));
const styles_js_1 = require("../common/styles.js");
function useRemAdjuster({ rowHeight: rowHeightIn, headerHeight: headerHeightIn, groupHeaderHeight: groupHeaderHeightIn, theme: themeIn, overscrollX: overscrollXIn, overscrollY: overscrollYIn, scaleToRem, remSize, }) {
    const [rowHeight, headerHeight, groupHeaderHeight, theme, overscrollX, overscrollY] = react_1.default.useMemo(() => {
        if (!scaleToRem || remSize === 16)
            return [rowHeightIn, headerHeightIn, groupHeaderHeightIn, themeIn, overscrollXIn, overscrollYIn];
        const scaler = remSize / 16;
        const rh = rowHeightIn;
        const bt = (0, styles_js_1.getDataEditorTheme)();
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
exports.useRemAdjuster = useRemAdjuster;
//# sourceMappingURL=use-rem-adjuster.js.map