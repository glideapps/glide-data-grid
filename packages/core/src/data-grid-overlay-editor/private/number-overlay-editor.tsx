import * as React from "react";
import { NumberOverlayEditorStyle } from "./number-overlay-editor-style";
import NumberFormat, { NumberFormatValues } from "react-number-format";

interface Props {
    value: number | undefined;
    disabled?: boolean;
    onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange: (values: NumberFormatValues) => void;
    highlight: boolean;
}

function getDecimalSeparator() {
    const numberWithDecimalSeparator = 1.1;
    const result = Intl.NumberFormat()
        ?.formatToParts(numberWithDecimalSeparator)
        ?.find(part => part.type === "decimal")?.value;

    return result ?? ".";
}

function getThousandSeprator() {
    return getDecimalSeparator() === "." ? "," : ".";
}

const NumberOverlayEditor: React.FunctionComponent<Props> = p => {
    const { value, onChange, onKeyDown, disabled, highlight } = p;
    return (
        <NumberOverlayEditorStyle>
            <NumberFormat
                autoFocus={true}
                className="gdg-input"
                onFocus={e => e.target.setSelectionRange(highlight ? 0 : e.target.value.length, e.target.value.length)}
                disabled={disabled === true}
                thousandSeparator={getThousandSeprator()}
                decimalSeparator={getDecimalSeparator()}
                value={value ?? ""}
                // decimalScale={3}
                // prefix={"$"}
                onValueChange={onChange}
                onKeyDown={onKeyDown}
            />
        </NumberOverlayEditorStyle>
    );
};

export default NumberOverlayEditor;
