import type { CustomCell } from '@workfront-grid/glide-data-grid';

interface ArticleCellProps {
  readonly kind: 'article-cell';
  readonly markdown: string;
  readonly readonly?: boolean;
}

export type ArticleCell = CustomCell<ArticleCellProps>;
