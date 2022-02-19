import { GridSelection } from "@glideapps/glide-data-grid";
import React from "react";
import { Props } from "./types";

export function useCollapsingGroups(
    props: Props
): Pick<
    Props,
    | "columns"
    | "onGroupHeaderClicked"
    | "onSelectedColumnsChange"
    | "onGridSelectionChange"
    | "getGroupDetails"
    | "gridSelection"
> {
    const [collapsed, setCollapsed] = React.useState<readonly string[]>([]);
    const [gridSelectionInner, setGridSelectionsInner] = React.useState<GridSelection | undefined>(undefined);

    const {
        columns: columnsIn,
        onGroupHeaderClicked: onGroupHeaderClickedIn,
        onSelectedColumnsChange: onSelectedColumnsChangeIn,
        onGridSelectionChange: onGridSelectionChangeIn,
        getGroupDetails: getGroupDetailsIn,
        gridSelection: gridSelectionIn,
        freezeColumns = 0,
        theme,
    } = props;

    const gridSelection = gridSelectionIn ?? gridSelectionInner;

    const spans = React.useMemo(() => {
        const result: [number, number][] = [];
        let current: [number, number] = [-1, -1];
        let lastGroup: string | undefined;
        for (let i = freezeColumns; i < columnsIn.length; i++) {
            const c = columnsIn[i];
            const group = c.group ?? "";
            const isCollapsed = collapsed.includes(group);

            if (lastGroup !== group && current[0] !== -1) {
                result.push(current);
                current = [-1, -1];
            }

            if (isCollapsed && current[0] !== -1) {
                current[1] += 1;
            } else if (isCollapsed) {
                current = [i, 1];
            } else if (current[0] !== -1) {
                result.push(current);
                current = [-1, -1];
            }
            lastGroup = group;
        }
        if (current[0] !== -1) result.push(current);
        return result;
    }, [collapsed, columnsIn, freezeColumns]);

    const columns = React.useMemo(() => {
        if (props.collapseGroups !== true) return columnsIn;
        if (spans.length === 0) return columnsIn;
        return columnsIn.map((c, index) => {
            for (const [start, length] of spans) {
                if (index >= start && index < start + length) {
                    let width = 8;
                    if (index === start + length - 1) {
                        width = 36;
                    } else if (index <= start + 1) {
                        width = 8;
                    }

                    return {
                        ...c,
                        width,
                        themeOverride: { bgCell: theme.bgCellMedium },
                    };
                }
            }
            return c;
        });
    }, [props.collapseGroups, columnsIn, spans, theme.bgCellMedium]);

    const onGroupHeaderClicked = React.useCallback<NonNullable<Props["onGroupHeaderClicked"]>>(
        (index, a) => {
            onGroupHeaderClickedIn?.(index, a);

            const group = columns[index]?.group ?? "";
            if (group === "") return;
            setCollapsed(cv => (cv.includes(group) ? cv.filter(x => x !== group) : [...cv, group]));
        },
        [columns, onGroupHeaderClickedIn]
    );

    const onSelectedColumnsChange = React.useCallback<NonNullable<Props["onSelectedColumnsChange"]>>(
        (cs, reason) => {
            if (reason === "group") return;
            onSelectedColumnsChangeIn?.(cs, reason);
        },
        [onSelectedColumnsChangeIn]
    );

    const onGridSelectionChange = React.useCallback<NonNullable<Props["onGridSelectionChange"]>>(
        s => {
            if (s !== undefined) {
                const col = s.cell[0];
                const column = columns[col];
                setCollapsed(cv => {
                    if (cv.includes(column?.group ?? "")) {
                        return cv.filter(g => g !== column.group);
                    }
                    return cv;
                });
            }
            if (onGridSelectionChangeIn !== undefined) {
                onGridSelectionChangeIn(s);
            } else {
                setGridSelectionsInner(s);
            }
        },
        [columns, onGridSelectionChangeIn]
    );

    const getGroupDetails = React.useCallback<NonNullable<Props["getGroupDetails"]>>(
        group => {
            const result = getGroupDetailsIn?.(group);

            return {
                ...result,
                name: group,
                overrideTheme: collapsed.includes(group ?? "")
                    ? {
                          bgHeader: theme.bgHeaderHasFocus,
                      }
                    : undefined,
            };
        },
        [collapsed, getGroupDetailsIn, theme.bgHeaderHasFocus]
    );

    return {
        columns,
        onGroupHeaderClicked,
        onSelectedColumnsChange,
        onGridSelectionChange,
        getGroupDetails,
        gridSelection,
    };
}
