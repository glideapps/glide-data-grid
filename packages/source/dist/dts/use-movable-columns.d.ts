import type { DataEditorProps } from "@glideapps/glide-data-grid";
type Props = Pick<DataEditorProps, "columns" | "onColumnMoved" | "getCellContent">;
export declare function useMoveableColumns(p: Props): Required<Props>;
export {};
