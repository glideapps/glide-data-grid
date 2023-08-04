import { useCallback } from "@storybook/addons";
import type { CustomRow, GridRow, GroupContentRow, GroupRow, Item } from "../data-grid/data-grid-types";
import { GridRowKind } from "../data-grid/data-grid-types";
import { useEffect, useRef, useState } from "react";
import type { DataEditorProps } from "./data-editor";
import { flattenGroups } from "../common/groupUtils";

export type RowGroup = { name: string; rows: number[]; id: string; groups: RowGroup[]; expanded: boolean };

export const useGroups = (groups: RowGroup[], toggleGroup: (groupLocation: string) => void, groupExtraRow?: CustomRow) => {
    const [rowsCount, setRowsCount] = useState(0);
    const groupRows = useRef<GridRow[]>([]);

    useEffect(() => {
        if (groups.length > 0) {
            groupRows.current = flattenGroups(groups, groupExtraRow);
            setRowsCount(groupRows.current.length);
        }
    }, [groupExtraRow, groups]);

    const getRowDetails: DataEditorProps['getRowDetails'] = useCallback(
        (row: number): GridRow => {
            return groupRows.current[row];
        },
        [groupRows]
    );

    const getCellLocation = ([col, row]: Item): Item => {
        if (groupRows.current[row] !== undefined && groupRows.current[row].kind === GridRowKind.GroupContent) {
            return [col, (groupRows.current[row] as GroupContentRow).index - 1 ?? row];
        }
        return [col, row];
    };

    const onRowDetailsUpdated: DataEditorProps["onRowDetailsUpdated"] = useCallback(
        (row: number, newRowValue) => {
            if (groupRows.current[row] !== undefined && groupRows.current[row].kind === GridRowKind.Group) {
                toggleGroup((newRowValue as GroupRow).id);
            }
        },
        [toggleGroup]
    );

    return {
        getRowDetails,
        onRowDetailsUpdated,
        getCellLocation,
        rowsCount: rowsCount,
    };
};
