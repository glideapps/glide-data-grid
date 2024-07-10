"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrowingEntry = void 0;
const React = __importStar(require("react"));
const growing_entry_style_js_1 = require("./growing-entry-style.js");
const support_js_1 = require("../../common/support.js");
let globalInputID = 0;
/** @category Renderers */
const GrowingEntry = (props) => {
    const { placeholder, value, onKeyDown, highlight, altNewline, validatedSelection, ...rest } = props;
    const { onChange, className } = rest;
    const inputRef = React.useRef(null);
    const useText = value ?? "";
    (0, support_js_1.assert)(onChange !== undefined, "GrowingEntry must be a controlled input area");
    // 10 million id's aught to be enough for anybody
    const [inputID] = React.useState(() => "input-box-" + (globalInputID = (globalInputID + 1) % 10000000));
    React.useEffect(() => {
        const ta = inputRef.current;
        if (ta === null)
            return;
        if (ta.disabled)
            return;
        const length = useText.toString().length;
        ta.focus();
        ta.setSelectionRange(highlight ? 0 : length, length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useLayoutEffect(() => {
        if (validatedSelection !== undefined) {
            const range = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
            inputRef.current?.setSelectionRange(range[0], range[1]);
        }
    }, [validatedSelection]);
    const onKeyDownInner = React.useCallback(e => {
        if (e.key === "Enter" && e.shiftKey && altNewline === true) {
            return;
        }
        onKeyDown?.(e);
    }, [altNewline, onKeyDown]);
    return (React.createElement(growing_entry_style_js_1.GrowingEntryStyle, { className: "gdg-growing-entry" },
        React.createElement(growing_entry_style_js_1.ShadowBox, { className: className }, useText + "\n"),
        React.createElement(growing_entry_style_js_1.InputBox, { ...rest, className: (className ?? "") + " gdg-input", id: inputID, ref: inputRef, onKeyDown: onKeyDownInner, value: useText, placeholder: placeholder, dir: "auto" })));
};
exports.GrowingEntry = GrowingEntry;
//# sourceMappingURL=growing-entry.js.map