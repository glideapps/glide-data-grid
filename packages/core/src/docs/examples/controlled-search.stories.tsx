import React from "react";
import { useEventListener } from "../../common/utils.js";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    defaultProps,
    useAllMockedKinds,
} from "../../data-editor/stories/utils.js";
import type { GridSelection, Item } from "../../internal/data-grid/data-grid-types.js";
import { CompactSelection } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Controlling search results"
                    description={
                        <>
                            <Description>
                                Search results can be controlled via <PropName>searchResults</PropName>. You can
                                implement any search algorithm you want, even a silly one.
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ControlledSearch: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const [showSearch, setShowSearch] = React.useState(false);

    const [selection, setSelection] = React.useState<GridSelection>({
        rows: CompactSelection.empty(),
        columns: CompactSelection.empty(),
    });

    useEventListener(
        "keydown",
        React.useCallback(event => {
            if ((event.ctrlKey || event.metaKey) && event.code === "KeyF") {
                setShowSearch(cv => !cv);
                event.stopPropagation();
                event.preventDefault();
            }
        }, []),
        window,
        false,
        true
    );

    const [searchValue, setSearchValue] = React.useState("");

    const searchResults = React.useMemo(() => {
        const result: Item[] = [];
        for (let i = 0; i < searchValue.length; i++) {
            result.push([3, i]);
        }
        return result;
    }, [searchValue.length]);

    return (
        <DataEditor
            {...defaultProps}
            searchResults={searchResults}
            getCellContent={getCellContent}
            getCellsForSelection={true}
            gridSelection={selection}
            onGridSelectionChange={setSelection}
            columns={cols}
            onCellEdited={setCellValue}
            onColumnResize={onColumnResize}
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
            showSearch={showSearch}
            onSearchClose={() => {
                setShowSearch(false);
                setSearchValue("");
            }}
            rows={10_000}
        />
    );
};
