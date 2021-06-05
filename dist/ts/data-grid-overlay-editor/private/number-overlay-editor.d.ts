import * as React from "react";
import { NumberFormatValues } from "react-number-format";
interface Props {
    value: number | undefined;
    onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange: (values: NumberFormatValues) => void;
}
declare const NumberOverlayEditor: React.FunctionComponent<Props>;
export default NumberOverlayEditor;
//# sourceMappingURL=number-overlay-editor.d.ts.map