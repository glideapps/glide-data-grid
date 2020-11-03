import * as React from "react";

import { GrowingEntryStyle, ShadowBox, InputBox } from "./growing-entry-style";
import { withDefault } from "collection-utils";
import { assert } from "../common/support";

interface Props
    extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    readonly placeholder?: string;
    readonly allowCtrlEnter?: boolean;
}

const GrowingEntryImpl: React.FunctionComponent<Props> = (props: Props) => {
    const { placeholder, value, ref, onKeyDown, allowCtrlEnter, ...rest } = props;
    const { onChange, className } = rest;

    const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

    const useText = withDefault(value, "");

    assert(onChange !== undefined, "GrowingEntry must be a controlled input area");

    React.useEffect(() => {
        const ta = inputRef.current;
        if (ta === null) return;

        const length = useText.toString().length;
        ta.focus();
        ta.setSelectionRange(length, length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onKeyDownImpl = React.useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.ctrlKey && event.key === "Enter" && allowCtrlEnter === true && inputRef.current !== null) {
                const newValue = inputRef.current.value + `\n`;
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                    window.HTMLTextAreaElement.prototype,
                    "value"
                )?.set;
                nativeInputValueSetter?.call(inputRef.current, newValue);

                inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
            }
            onKeyDown?.(event);
        },
        [onKeyDown, allowCtrlEnter]
    );

    return (
        <GrowingEntryStyle>
            <ShadowBox className={className}>{useText + "\n"}</ShadowBox>
            <InputBox
                {...rest}
                ref={inputRef}
                onKeyDown={onKeyDownImpl}
                value={useText}
                placeholder={placeholder}
                dir="auto"
            />
        </GrowingEntryStyle>
    );
};

const GrowingEntry = React.memo(GrowingEntryImpl);
export default GrowingEntry;
