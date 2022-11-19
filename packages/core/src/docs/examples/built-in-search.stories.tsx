import React from "react";
import { useEventListener } from "../../common/utils";
import { DataEditor } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    KeyName,
    defaultProps,
    useAllMockedKinds,
} from "../../data-editor/stories/utils";
import { type GridSelection, CompactSelection } from "../../data-grid/data-grid-types";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                        <BeautifulWrapper
            title="Search is easy"
            description={
                <>
                    <Description>
                        Search for any data in your grid by setting <PropName>showSearch</PropName>.
                    </Description>
                    <MoreInfo>
                        In this story, <KeyName>Ctrl</KeyName> (<KeyName>⌘</KeyName> on Mac) + <KeyName>f</KeyName>{" "}
                        toggles the search bar. Make sure you&apos;re focused on the Data Grid!
                    </MoreInfo>
                </>
            }>

                <Story />
            </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const BuiltInSearch: React.VFC = () => {
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

    return (
        <BeautifulWrapper
            title="Search is easy"
            description={
                <>
                    <Description>
                        Search for any data in your grid by setting <PropName>showSearch</PropName>.
                    </Description>
                    <MoreInfo>
                        In this story, <KeyName>Ctrl</KeyName> (<KeyName>⌘</KeyName> on Mac) + <KeyName>f</KeyName>{" "}
                        toggles the search bar. Make sure you&apos;re focused on the Data Grid!
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                getCellsForSelection={true}
                gridSelection={selection}
                onGridSelectionChange={setSelection}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                showSearch={showSearch}
                onSearchClose={() => setShowSearch(false)}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
