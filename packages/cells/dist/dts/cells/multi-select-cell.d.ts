import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";
type SelectOption = {
    value: string;
    label?: string;
    color?: string;
};
interface MultiSelectCellProps {
    readonly kind: "multi-select-cell";
    readonly values: string[] | undefined | null;
    readonly options?: readonly (SelectOption | string)[];
    readonly allowCreation?: boolean;
    readonly allowDuplicates?: boolean;
}
/**
 * Prepares the options for usage with the react-select component.
 *
 * @param options The options to prepare.
 * @returns The prepared options in the format required by react-select.
 */
export declare const prepareOptions: (options: readonly (string | SelectOption)[]) => {
    value: string;
    label?: string;
    color?: string;
}[];
/**
 * Resolve a list values to values compatible with react-select.
 * If allowDuplicates is true, the values will be prefixed with a numbered prefix to
 * make sure that all values are unique.
 *
 * @param values The values to resolve.
 * @param options The options to use for the resolution.
 * @param allowDuplicates If true, the values can contain duplicates.
 * @returns The list of values compatible with react-select.
 */
export declare const resolveValues: (values: string[] | null | undefined, options: readonly SelectOption[], allowDuplicates?: boolean) => {
    value: string;
    label?: string;
    color?: string;
}[];
export type MultiSelectCell = CustomCell<MultiSelectCellProps>;
declare const renderer: CustomRenderer<MultiSelectCell>;
export default renderer;
//# sourceMappingURL=multi-select-cell.d.ts.map