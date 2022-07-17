import * as React from "react";

import { GrowingEntryStyle, ShadowBox, InputBox } from "./growing-entry-style";
import { assert } from "../common/support";
import type { SelectionRange } from "../data-grid/data-grid-types";

interface Props
    extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    readonly placeholder?: string;
    readonly highlight: boolean;
    readonly altNewline?: boolean;
    readonly validatedSelection?: SelectionRange;
}

const GrowingEntry: React.FunctionComponent<Props> = (props: Props) => {
    const { placeholder, value, onKeyDown, highlight, altNewline, validatedSelection, ...rest } = props;
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

    React.useLayoutEffect(() => {
        if (validatedSelection !== undefined) {
            const range = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
            inputRef.current?.setSelectionRange(range[0], range[1]);
        }
    }, [validatedSelection]);

    const onKeyDownInner = React.useCallback<NonNullable<typeof onKeyDown>>(
        e => {
            if (e.key === "Enter" && e.shiftKey && altNewline === true) {
                return;
            }
            onKeyDown?.(e);
        },
        [altNewline, onKeyDown]
    );

    return (
        <GrowingEntryStyle className="gdg-growing-entry">
            <ShadowBox className={className}>{useText + "\n"}</ShadowBox>
            <InputBox
                {...rest}
                className={(className ?? "") + " gdg-input"}
                ref={inputRef}
                onKeyDown={onKeyDownInner}
                value={useText}
                placeholder={placeholder}
                dir="auto"
            />
        </GrowingEntryStyle>
    );
};

export default GrowingEntry;
