import React from "react";
import { css } from "styled-components";
import ClickOutsideContainer from "../click-outside-container/click-outside-container";
import { Rectangle } from "../data-grid/data-grid-types";

interface Props {
    readonly bounds: Rectangle;
    readonly group: string;
    readonly onClose: () => void;
    readonly onFinish: (newVal: string) => void;
    readonly canvasBounds: DOMRect;
}

export const GroupRename: React.VFC<Props> = p => {
    const { bounds, group, onClose, canvasBounds, onFinish } = p;

    const [value, setValue] = React.useState(group);

    return (
        <ClickOutsideContainer
            style={{
                position: "absolute",
                left: bounds.x - canvasBounds.left + 1,
                top: bounds.y - canvasBounds.top,
                width: bounds.width - 2,
                height: bounds.height,
            }}
            css={css`
                padding: 0 8px;
                display: flex;
                align-items: center;
                background-color: ${t => t.theme.bgHeader};
            `}
            onClickOutside={onClose}>
            <input
                data-testid="group-rename-input"
                css={css`
                    flex-grow: 1;
                    border: none;
                    outline: none;
                    background-color: ${t => t.theme.bgHeaderHasFocus};
                    border-radius: 9px;
                    padding: 0 8px;
                    box-shadow: 0 0 0 1px ${t => t.theme.borderColor};
                    color: ${t => t.theme.textGroupHeader};
                    min-height: ${Math.max(16, bounds.height - 10)}px;
                    font: ${t => t.theme.headerFontStyle} ${t => t.theme.fontFamily};
                `}
                value={value}
                onBlur={onClose}
                onFocus={e => e.target.setSelectionRange(0, value.length)}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        onFinish(value);
                    } else if (e.key === "Escape") {
                        onClose();
                    }
                }}
                autoFocus={true}
            />
        </ClickOutsideContainer>
    );
};
