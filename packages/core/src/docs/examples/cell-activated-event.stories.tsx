import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    KeyName,
    defaultProps,
    useAllMockedKinds,
} from "../../data-editor/stories/utils.js";
import type { GridCell, Item } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import type { DataEditorCoreProps } from "../../index.js";

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

export const CellActivatedEvent: React.VFC<Pick<DataEditorCoreProps, "cellActivationBehavior">> = p => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const getCellContentMangled = React.useCallback(
        (item: Item): GridCell => {
            const result = getCellContent(item);
            if (item[0] === 3) {
                return {
                    ...result,
                    activationBehaviorOverride: "single-click",
                    hoverEffect: true,
                } as any;
            }
            return result;
        },
        [getCellContent]
    );

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
                // editorBloom={[-1, -4]}
                cellActivationBehavior={p.cellActivationBehavior}
                getCellContent={getCellContentMangled}
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
(CellActivatedEvent as any).argTypes = {
    cellActivationBehavior: {
        control: { type: "select" },
        options: ["double-click", "single-click", "second-click"],
    },
};
(CellActivatedEvent as any).args = {
    cellActivationBehavior: "second-click",
};
