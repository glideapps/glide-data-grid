import * as React from "react";

import { GrowingEntryStyle, ShadowBox, InputBox } from "./growing-entry-style";
import { withDefault } from "collection-utils";
import { assert } from "../common/support";
// import { Checkmark } from "../common/utils";

interface Props
    extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    readonly placeholder?: string;
}

const GrowingEntryImpl: React.FunctionComponent<Props> = (props: Props) => {
    const { placeholder, value, onKeyDown, ...rest } = props;
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

    return (
        <GrowingEntryStyle>
            <ShadowBox className={className}>{useText + "\n"}</ShadowBox>
            <InputBox
                {...rest}
                ref={inputRef}
                onKeyDown={onKeyDown}
                value={useText}
                placeholder={placeholder}
                dir="auto"
            />
        </GrowingEntryStyle>
    );
};

const GrowingEntry = GrowingEntryImpl;
export default GrowingEntry;
