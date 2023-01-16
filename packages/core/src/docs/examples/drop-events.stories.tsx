import React from "react";
import { DataEditor, DataEditorProps } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    defaultProps,
    useAllMockedKinds,
} from "../../data-editor/stories/utils";
import type { Item } from "../../data-grid/data-grid-types";
import { GridCellKind } from "../../data-grid/data-grid-types";
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

// A few supported mime types for drag and drop into cells.
const SUPPORTED_IMAGE_TYPES = new Set(["image/png", "image/gif", "image/bmp", "image/jpeg"]);

export const DropEvents: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const [highlights, setHighlights] = React.useState<DataEditorProps["highlightRegions"]>([]);

    const [lastDropCell, setLastDropCell] = React.useState<Item | undefined>();

    const onDrop = React.useCallback(
        (cell: Item, dataTransfer: DataTransfer | null) => {
            setHighlights([]);

            if (dataTransfer === null) {
                return;
            }

            const { files } = dataTransfer;
            // This only supports one image, for simplicity.
            if (files.length !== 1) {
                return;
            }

            const [file] = files;
            if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
                return;
            }

            const imgUrl = URL.createObjectURL(file);

            setCellValue(
                cell,
                {
                    kind: GridCellKind.Image,
                    data: [imgUrl],
                    allowOverlay: true,
                    allowAdd: false,
                },
                true,
                true
            );

            setLastDropCell(cell);
        },
        [setCellValue]
    );

    const onDragOverCell = React.useCallback(
        (cell: Item, dataTransfer: DataTransfer | null) => {
            if (dataTransfer === null) {
                return;
            }

            const { items } = dataTransfer;
            // This only supports one image, for simplicity.
            if (items.length !== 1) {
                return;
            }

            const [item] = items;
            if (!SUPPORTED_IMAGE_TYPES.has(item.type)) {
                return;
            }

            const [col, row] = cell;
            if (getCellContent(cell).kind === GridCellKind.Image) {
                setHighlights([
                    {
                        color: "#44BB0022",
                        range: {
                            x: col,
                            y: row,
                            width: 1,
                            height: 1,
                        },
                    },
                ]);
            } else {
                setHighlights([]);
            }
        },
        [getCellContent]
    );

    const onDragLeave = React.useCallback(() => {
        setHighlights([]);
    }, []);

    return (
        <BeautifulWrapper
            title="Drop events"
            description={
                <>
                    <Description>
                        You can drag and drop into cells by using <PropName>onDragOverCell</PropName> and{" "}
                        <PropName>onDrop</PropName>.
                    </Description>

                    <div>
                        {lastDropCell === undefined ? (
                            <MoreInfo>Nothing dropped, yet</MoreInfo>
                        ) : (
                            <>
                                <MoreInfo>
                                    You last dropped in cell <PropName>{JSON.stringify(lastDropCell)}</PropName>
                                </MoreInfo>
                            </>
                        )}
                    </div>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                rows={1000}
                onDrop={onDrop}
                onDragOverCell={onDragOverCell}
                onDragLeave={onDragLeave}
                highlightRegions={highlights}
                rowMarkers="none"
            />
        </BeautifulWrapper>
    );
};
