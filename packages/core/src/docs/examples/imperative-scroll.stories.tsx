import React from "react";
import { DataEditor, type DataEditorRef } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    defaultProps,
    useAllMockedKinds,
} from "../../data-editor/stories/utils";
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

interface ImperativeScrollProps {
    paddingY: number;
    paddingX: number;
    vAlign?: "start" | "center" | "end";
    hAlign?: "start" | "center" | "end";
}

export const ImperativeScroll: React.VFC<ImperativeScrollProps> = p => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const ref = React.useRef<DataEditorRef>(null);

    const onClick = () => {
        ref.current?.scrollTo(4, 99, "both", p.paddingX, p.paddingY, {
            vAlign: p.vAlign,
            hAlign: p.hAlign,
        });
    };

    return (
        <BeautifulWrapper
            title="Imperative scrolling"
            description={
                <>
                    <Description>
                        You can imperatively scroll to a cell by calling <PropName>scrollTo</PropName> on a DataEditor
                        ref.
                    </Description>
                    <MoreInfo>
                        Click <button onClick={onClick}>Here</button> to scroll to column 4 row 100
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                ref={ref}
                rowMarkers="clickable-number"
                getCellContent={getCellContent}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
(ImperativeScroll as any).args = {
    paddingY: 0,
    paddingX: 0,
    vAlign: "start",
    hAlign: "start",
};
(ImperativeScroll as any).argTypes = {
    paddingY: 0,
    paddingX: 0,
    vAlign: {
        control: { type: "select", options: ["start", "center", "end", undefined] },
    },
    hAlign: {
        control: { type: "select", options: ["start", "center", "end", undefined] },
    },
};
