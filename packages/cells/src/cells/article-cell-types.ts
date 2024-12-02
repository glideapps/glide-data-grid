import type { CustomCell } from "glide-data-grid-fork";

interface ArticleCellProps {
    readonly kind: "article-cell";
    readonly markdown: string;
}

export type ArticleCell = CustomCell<ArticleCellProps>;
