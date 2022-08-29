import type { ArticleCell } from "./article-cell-types";
import * as React from "react";
import { CustomRenderer, getMiddleCenterBias, GridCellKind } from "@glideapps/glide-data-grid";

const ArticleCellEditor = React.lazy(async () => await import("./article-cell-editor"));

const renderer: CustomRenderer<ArticleCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is ArticleCell => (c.data as any).kind === "article-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { markdown } = cell.data;

        let data = markdown;
        if (data.includes("\n")) {
            // new lines are rare and split is relatively expensive compared to the search
            // it pays off to not do the split contantly.
            data = data.split(/\r?\n/)[0];
        }
        const max = rect.width / 4; // no need to round, slice will just truncate this
        if (data.length > max) {
            data = data.slice(0, max);
        }

        ctx.fillStyle = theme.textDark;
        ctx.fillText(
            data,
            rect.x + theme.cellHorizontalPadding,
            rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme)
        );

        return true;
    },
    provideEditor: () => ({
        editor: p => {
            return (
                <React.Suspense fallback={null}>
                    <ArticleCellEditor {...p} />
                </React.Suspense>
            );
        },
        styleOverride: {
            position: "fixed",
            left: "12.5vw",
            top: "12.5vh",
            width: "75vw",
            borderRadius: "9px",
            maxWidth: "unset",
            maxHeight: "unset",
        },
        disablePadding: true,
    }),
    onPaste: (val, d) => ({
        ...d,
        markdown: val,
    }),
};

export default renderer;
