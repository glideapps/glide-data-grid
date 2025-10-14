import { styled } from "@linaria/react";

export const SearchWrapper = styled.div`
    position: absolute;
    top: 4px;
    right: 20px;

    background-color: var(--gdg-bg-cell);
    color: var(--gdg-text-dark);

    padding: 8px;
    border: 1px solid var(--gdg-border-color);
    border-radius: 6px;

    font-size: var(--gdg-editor-font-size);

    &.out {
        animation: gdg-search-fadeout 0.15s forwards;
    }
    animation: gdg-search-fadein 0.15s forwards;

    .gdg-search-bar-inner {
        display: flex;
    }

    .gdg-search-status {
        padding-top: 4px;
        font-size: 11px;
    }

    .gdg-search-progress {
        position: absolute;
        height: 4px;
        left: 0;
        bottom: 0;

        background-color: var(--gdg-text-light);
    }

    input {
        width: 220px;
        color: var(--gdg-text-dark);
        background-color: var(--gdg-bg-cell);
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
        color: var(--gdg-text-medium);

        &:hover {
            color: var(--gdg-text-dark);
        }

        .button-icon {
            width: 16px;
            height: 16px;
        }

        &:disabled {
            opacity: 0.4;
            pointer-events: none;
        }
    }

    @keyframes gdg-search-fadeout {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(400px);
        }
    }

    @keyframes gdg-search-fadein {
        from {
            transform: translateX(400px);
        }
        to {
            transform: translateX(0);
        }
    }
`;
