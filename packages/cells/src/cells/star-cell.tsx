import { CustomCell, Item, CustomCellRenderer } from "@glideapps/glide-data-grid";
import * as React from "react";
import styled from "styled-components";

interface StarCellProps {
    readonly kind: "star-cell";
    readonly rating: number;
}

export type StarCell = CustomCell<StarCellProps>;

const starPoints = [
    [50, 5],
    [61.23, 39.55],
    [97.55, 39.55],
    [68.16, 60.9],
    [79.39, 95.45],
    [50, 74.1],
    [20.61, 95.45],
    [31.84, 60.9],
    [2.45, 39.55],
    [38.77, 39.55],
];

function pathStar(ctx: CanvasRenderingContext2D, center: Item, size: number) {
    let moved = false;
    for (const p of starPoints) {
        const x = (p[0] - 50) * (size / 100) + center[0];
        const y = (p[1] - 50) * (size / 100) + center[1];

        if (moved) {
            ctx.lineTo(x, y);
        } else {
            ctx.moveTo(x, y);
            moved = true;
        }
    }

    ctx.closePath();
}

const StarSVG = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M47.1468 13.7811C48.0449 11.0172 51.9551 11.0172 52.8532 13.7812L60.5522 37.4762C60.9538 38.7123 62.1056 39.5491 63.4053 39.5491H88.3198C91.226 39.5491 92.4343 43.268 90.0831 44.9762L69.9269 59.6205C68.8755 60.3845 68.4355 61.7386 68.8371 62.9746L76.5361 86.6697C77.4342 89.4336 74.2707 91.732 71.9196 90.0238L51.7634 75.3794C50.7119 74.6155 49.2881 74.6155 48.2366 75.3795L28.0804 90.0238C25.7293 91.732 22.5659 89.4336 23.4639 86.6697L31.1629 62.9746C31.5645 61.7386 31.1245 60.3845 30.0731 59.6205L9.91686 44.9762C7.56572 43.268 8.77405 39.5491 11.6802 39.5491H36.5947C37.8944 39.5491 39.0462 38.7123 39.4478 37.4762L47.1468 13.7811Z"
            fill="currentColor"
        />
    </svg>
);

const EditorWrap = styled.div`
    .active {
        color: var(--gdg-text-dark);
    }

    display: flex;
    align-items: center;
    padding: 6px 0;
    color: var(--gdg-text-light);

    > * {
        position: relative;
        width: 16px;
        height: 16px;
        cursor: pointer;
        margin-right: 2px;

        svg {
            width: 100%;
            height: 100%;
        }
    }
`;

const renderer: CustomCellRenderer<StarCell> = {
    isMatch: (cell: CustomCell): cell is StarCell => (cell.data as any).kind === "star-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect, hoverAmount } = args;
        const { rating } = cell.data;
        const padX = theme.cellHorizontalPadding;
        let drawX = rect.x + padX;
        const stars = Math.min(5, Math.ceil(rating));
        drawX += 8;
        ctx.beginPath();
        for (let i = 0; i < stars; i++) {
            pathStar(ctx, [drawX, rect.y + rect.height / 2], 16);
            drawX += 18;
        }
        ctx.fillStyle = theme.textDark;
        ctx.globalAlpha = 0.6 + 0.4 * hoverAmount;
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
    },
    provideEditor: () => {
        // eslint-disable-next-line react/display-name
        return p => (
            <EditorWrap>
                {[0, 1, 2, 3, 4].map(index => (
                    <div
                        key={index}
                        className={p.value.data.rating < index + 1 ? "inactive" : "active"}
                        onClick={() => {
                            p.onChange({
                                ...p.value,
                                data: {
                                    ...p.value.data,
                                    rating: index + 1,
                                },
                            });
                        }}>
                        <StarSVG />
                    </div>
                ))}
            </EditorWrap>
        );
    },
    onPaste: (val, d) => {
        const num = Number.parseInt(val);
        return {
            ...d,
            rating: Number.isNaN(num) ? 0 : num,
        };
    },
};

export default renderer;
