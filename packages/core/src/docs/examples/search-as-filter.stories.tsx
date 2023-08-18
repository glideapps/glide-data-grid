import React from "react";
import { useEventListener } from "../../common/utils";
import { DataEditor } from "../../data-editor/data-editor";
import { BeautifulWrapper, Description, defaultProps, useAllMockedKinds } from "../../data-editor/stories/utils";
import type { GridSelection } from "../../data-grid/data-grid-types";
import { CompactSelection } from "../../data-grid/data-grid-types";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Filtering down to search results"
                    description={
                        <>
                            <Description>You can update your grid however you want based on search inputs.</Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const SearchAsFilter: React.VFC = () => {
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

    return (
        <DataEditor
            {...defaultProps}
            searchResults={[]}
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
            rows={searchValue.length === 0 ? 10_000 : searchValue.length}
        />
    );
};
