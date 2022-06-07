import { DataEditorProps, ProvideEditorCallback, GridCell, useCustomCells } from "@glideapps/glide-data-grid";
import StarCellRenderer, { StarCell } from "./cells/star-cell";
import SparklineCellRenderer, { SparklineCell } from "./cells/sparkline-cell";
import TagsCellRenderer, { TagsCell } from "./cells/tags-cell";
import UserProfileCellRenderer, { UserProfileCell } from "./cells/user-profile-cell";
import DropdownCellRenderer, { DropdownCell } from "./cells/dropdown-cell";
import ArticleCellRenderer from "./cells/article-cell";
import { ArticleCell } from "./cells/article-cell-types";
import RangeCellRenderer, { RangeCell } from "./cells/range-cell";
import SpinnerCellRenderer, { SpinnerCell } from "./cells/spinner-cell";

type DrawCallback = NonNullable<DataEditorProps["drawCell"]>;

const cells = [
    StarCellRenderer,
    SparklineCellRenderer,
    TagsCellRenderer,
    UserProfileCellRenderer,
    DropdownCellRenderer,
    ArticleCellRenderer,
    SpinnerCellRenderer,
    RangeCellRenderer,
];

export function useExtraCells(): {
    drawCell: DrawCallback;
    provideEditor: ProvideEditorCallback<GridCell>;
} {
    return useCustomCells(cells);
}

export {
    StarCellRenderer as StarCell,
    SparklineCellRenderer as SparklineCell,
    TagsCellRenderer as TagsCell,
    UserProfileCellRenderer as UserProfileCell,
    DropdownCellRenderer as DropdownCell,
    ArticleCellRenderer as ArticleCell,
    RangeCellRenderer as RangeCell,
    SpinnerCellRenderer as SpinnerCell,
};

export {
    StarCell as StarCellType,
    SparklineCell as SparklineCellType,
    TagsCell as TagsCellType,
    UserProfileCell as UserProfileCellType,
    DropdownCell as DropdownCellType,
    ArticleCell as ArticleCellType,
    RangeCell as RangeCellType,
    SpinnerCell as SpinnerCellType,
};
