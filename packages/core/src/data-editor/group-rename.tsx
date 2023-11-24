import React from "react";
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import ClickOutsideContainer from "../internal/click-outside-container/click-outside-container.js";
import type { Rectangle } from "../internal/data-grid/data-grid-types.js";

interface Props {
    readonly bounds: Rectangle;
    readonly group: string;
    readonly onClose: () => void;
    readonly onFinish: (newVal: string) => void;
    readonly canvasBounds: DOMRect;
}

const RenameInput = styled.input<{ targetHeight: number }>`
    flex-grow: 1;
    border: none;
    outline: none;
    background-color: var(--gdg-bg-header-has-focus);
    border-radius: 9px;
    padding: 0 8px;
    box-shadow: 0 0 0 1px var(--gdg-border-color);
    color: var(--gdg-text-group-header);
    min-height: ${p => Math.max(16, p.targetHeight - 10)}px;
    font: var(--gdg-header-font-style) var(--gdg-font-family);
`;

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
            className={css`
                padding: 0 8px;
                display: flex;
                align-items: center;
                background-color: var(--gdg-bg-header);
            `}
            onClickOutside={onClose}>
            <RenameInput
                targetHeight={bounds.height}
                data-testid="group-rename-input"
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
