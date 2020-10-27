import * as React from "react";
import { NumberOverlayEditorStyle } from "./number-overlay-editor-style";
import NumberFormat, { NumberFormatValues } from "react-number-format";

interface Props {
  value: number | undefined;
  onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (values: NumberFormatValues) => void;
}

function getDecimalSeparator() {
  const numberWithDecimalSeparator = 1.1;
  const result = Intl.NumberFormat()
    ?.formatToParts(numberWithDecimalSeparator)
    ?.find((part) => part.type === "decimal")?.value;

  return result ?? ".";
}

function getThousandSeprator() {
  return getDecimalSeparator() === "." ? "," : ".";
}

const NumberOverlayEditor: React.FunctionComponent<Props> = (p) => {
  const { value, onChange, onKeyDown } = p;
  return (
    <NumberOverlayEditorStyle>
      <NumberFormat
        autoFocus={true}
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
