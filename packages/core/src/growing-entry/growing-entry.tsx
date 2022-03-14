import * as React from "react";

import { GrowingEntryStyle, ShadowBox, InputBox } from "./growing-entry-style";
import { assert } from "../common/support";

interface Props
    extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    readonly placeholder?: string;
    readonly highlight: boolean;
}

const GrowingEntry: React.FunctionComponent<Props> = (props: Props) => {
    const { placeholder, value, onKeyDown, highlight, ...rest } = props;
    const { onChange, className } = rest;

    const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

    const useText = value ?? "";

    assert(onChange !== undefined, "GrowingEntry must be a controlled input area");

    React.useEffect(() => {
        const ta = inputRef.current;
        if (ta === null) return;

        if (ta.disabled) return;
        const length = useText.toString().length;
        ta.focus();
        ta.setSelectionRange(highlight ? 0 : length, length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <GrowingEntryStyle>
            <ShadowBox className={className}>{useText + "\n"}</ShadowBox>
            <InputBox
                {...rest}
                className={(rest.className ?? "") + " gdg-input"}
                ref={inputRef}
                onKeyDown={onKeyDown}
                value={useText}
                placeholder={placeholder}
                dir="auto"
            />
        </GrowingEntryStyle>
    );
};

export default GrowingEntry;
