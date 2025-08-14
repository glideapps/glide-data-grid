import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    useMockDataGenerator,
    defaultProps,
    clearCell,
} from "../../data-editor/stories/utils.js";
import { GridCellKind, type FillHandleDirection } from "../../internal/data-grid/data-grid-types.js";
import type { FillPatternEventArgs } from "../../index.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Fill handle"
                    description={
                        <>
                            <Description>Fill handles can be used to downfill data with the mouse.</Description>
                            <MoreInfo>
                                Just click and drag, the top row will be copied down. Enable using the{" "}
                                <PropName>fillHandle</PropName> prop.
                            </MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
    argTypes: {
        fillHandleEnabled: { control: "boolean", name: "fillHandle enabled" },
        shape: { control: { type: "inline-radio" }, options: ["square", "circle"], name: "shape" },
        size: { control: { type: "number" }, name: "size" },
        offsetX: { control: { type: "number" }, name: "offsetX" },
        offsetY: { control: { type: "number" }, name: "offsetY" },
        outline: { control: { type: "number" }, name: "outline" },
        allowedFillDirections: {
            control: { type: "inline-radio" },
            options: ["horizontal", "vertical", "orthogonal", "any"],
            name: "allowedFillDirections",
        },
    },
    args: {
        fillHandleEnabled: true,
        shape: "square",
        size: 4,
        offsetX: -2,
        offsetY: -2,
        outline: 0,
        allowedFillDirections: "orthogonal",
    },
};

export const FillHandle: React.VFC<{
    fillHandleEnabled: boolean;
    shape: "square" | "circle";
    size: number;
    offsetX: number;
    offsetY: number;
    outline: number;
    allowedFillDirections: FillHandleDirection;
}> = ({ fillHandleEnabled, shape, size, offsetX, offsetY, outline, allowedFillDirections }) => {
    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

    const getCellContentMangled = React.useCallback<typeof getCellContent>(
        i => {
            let val = getCellContent(i);
            if (i[0] === 1 && val.kind === GridCellKind.Text) {
                val = {
                    ...val,
                    readonly: true,
                };
            }

            return val;
        },
        [getCellContent]
    );

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;
        for (let c = 0; c < 6; c++) {
            const cell = getCellContent([c, newRow]);
            setCellValueRaw([c, newRow], clearCell(cell));
        }
        setNumRows(cv => cv + 1);
    }, [getCellContent, numRows, setCellValueRaw]);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContentMangled}
            columns={cols}
            rowMarkers={"both"}
            onPaste={true}
            fillHandle={fillHandleEnabled ? { shape, size, offsetX, offsetY, outline } : false}
            allowedFillDirections={allowedFillDirections}
            keybindings={{ downFill: true, rightFill: true }}
            onCellEdited={setCellValue}
            trailingRowOptions={{
                sticky: true,
                tint: true,
                hint: "New row...",
            }}
            rows={numRows}
            onRowAppended={onRowAppended}
        />
    );
};
