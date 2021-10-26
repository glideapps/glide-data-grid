import { styled } from "../common/styles";
import { disabledProps } from "../common/utils";

export const SearchWrapper = styled.div<{ showSearch: boolean }>`
    position: absolute;
    top: 4px;
    right: 20px;

    background-color: ${p => p.theme.bgCell};
    color: ${p => p.theme.textDark};

    padding: 8px;
    border: 1px solid ${p => p.theme.borderColor};

    font-size: 13px;

    transform: translateX(${p => (p.showSearch ? 0 : 400)}px);
    transition: transform 0.15s;

    .search-bar-inner {
        display: flex;
    }

    .search-status {
        margin-top: 4px;
        font-size: 11px;
    }

    .search-progress {
        position: absolute;
        height: 4px;
        left: 0;
        bottom: 0;

        background-color: ${p => p.theme.textLight};
    }

    input {
        width: 220px;
        color: ${p => p.theme.textDark};
        border: none;
        border-width: 0;
        outline: none;
    }

    button {
        width: 24px;
        height: 24px;
        padding: 0;

        border: none;
        outline: none;
        background: none;

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: ${p => p.theme.textMedium};

        :hover {
            color: ${p => p.theme.textDark};
        }

        .button-icon {
            width: 16px;
            height: 16px;
        }

        :disabled {
            ${disabledProps}
        }
    }
`;
