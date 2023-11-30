import { styled } from "@linaria/react";
import React from "react";
import { useLayer } from "react-laag";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import { BeautifulWrapper, Description, defaultProps, useAllMockedKinds } from "../../data-editor/stories/utils.js";
import type { Rectangle } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Header menus"
                    description={
                        <>
                            <Description>
                                Headers on the data grid can be configured to support menus. We provide the events and
                                the triangle, you provide the menu.
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

const SimpleMenu = styled.div`
    width: 175px;
    padding: 8px 0;
    border-radius: 6px;
    box-shadow:
        0px 0px 1px rgba(62, 65, 86, 0.7),
        0px 6px 12px rgba(62, 65, 86, 0.35);

    display: flex;
    flex-direction: column;

    background-color: white;
    font-size: 13px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;

    .danger {
        color: rgba(255, 40, 40, 0.8);
        :hover {
            color: rgba(255, 40, 40, 1);
        }
    }

    > div {
        padding: 6px 8px;
        color: rgba(0, 0, 0, 0.7);
        :hover {
            background-color: rgba(0, 0, 0, 0.05);
            color: rgba(0, 0, 0, 0.9);
        }
        transition: background-color 100ms;
        cursor: pointer;
    }
`;

export const HeaderMenus: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const realCols = React.useMemo(() => {
        return cols.map(c => ({
            ...c,
            hasMenu: true,
        }));
    }, [cols]);

    const [menu, setMenu] = React.useState<{
        col: number;
        bounds: Rectangle;
    }>();

    const isOpen = menu !== undefined;

    const { layerProps, renderLayer } = useLayer({
        isOpen,
        auto: true,
        placement: "bottom-end",
        triggerOffset: 2,
        onOutsideClick: () => setMenu(undefined),
        trigger: {
            getBounds: () => ({
                left: menu?.bounds.x ?? 0,
                top: menu?.bounds.y ?? 0,
                width: menu?.bounds.width ?? 0,
                height: menu?.bounds.height ?? 0,
                right: (menu?.bounds.x ?? 0) + (menu?.bounds.width ?? 0),
                bottom: (menu?.bounds.y ?? 0) + (menu?.bounds.height ?? 0),
            }),
        },
    });

    const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
        setMenu({ col, bounds });
    }, []);

    const onHeaderClicked = React.useCallback(() => {
        // eslint-disable-next-line no-console
        console.log("Header clicked");
    }, []);

    return (
        <>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                onHeaderMenuClick={onHeaderMenuClick}
                onHeaderClicked={onHeaderClicked}
                columns={realCols}
                onCellContextMenu={(_, e) => e.preventDefault()}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                rows={1000}
            />
            {isOpen &&
                renderLayer(
                    <SimpleMenu {...layerProps}>
                        <div onClick={() => setMenu(undefined)}>These do nothing</div>
                        <div onClick={() => setMenu(undefined)}>Add column right</div>
                        <div onClick={() => setMenu(undefined)}>Add column left</div>
                        <div className="danger" onClick={() => setMenu(undefined)}>
                            Delete
                        </div>
                    </SimpleMenu>
                )}
        </>
    );
};
