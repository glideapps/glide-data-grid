import React from "react";
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
import type { Item } from "../../data-grid/data-grid-types";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

export const CellActivatedEvent: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const [lastActivated, setLastActivated] = React.useState<Item | undefined>(undefined);

    const onCellActivated = React.useCallback((cell: Item) => {
        setLastActivated(cell);
    }, []);

    return (
        <BeautifulWrapper
            title="Cell Activated event"
            description={
                <>
                    <Description>
                        When you tap <KeyName>Enter</KeyName>, <KeyName>Space</KeyName> or double click a cell, that
                        cell is activated. You can track this with <PropName>onCellActivated</PropName>.
                    </Description>
                    <MoreInfo>
                        Last activated cell:{" "}
                        {lastActivated === undefined ? "none" : `(${lastActivated[0]}, ${lastActivated[1]})`}
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                //initialSize={[849, 967]}
                //scrollOffsetY={10_000}
                getCellsForSelection={true}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                onCellActivated={onCellActivated}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
