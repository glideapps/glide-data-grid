import * as React from "react";
import { GrowingEntryStyle, ShadowBox, InputBox } from "./growing-entry-style.js";
import { assert } from "../../common/support.js";
let globalInputID = 0;
/** @category Renderers */
export const GrowingEntry = (props) => {
    const { placeholder, value, onKeyDown, highlight, altNewline, validatedSelection, ...rest } = props;
    const { onChange, className } = rest;
    const inputRef = React.useRef(null);
    const useText = value ?? "";
    assert(onChange !== undefined, "GrowingEntry must be a controlled input area");
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
    return (React.createElement(GrowingEntryStyle, { className: "gdg-growing-entry" },
        React.createElement(ShadowBox, { className: className }, useText + "\n"),
        React.createElement(InputBox, { ...rest, className: (className ?? "") + " gdg-input", id: inputID, ref: inputRef, onKeyDown: onKeyDownInner, value: useText, placeholder: placeholder, dir: "auto" })));
};
//# sourceMappingURL=growing-entry.js.map