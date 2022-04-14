import {  DataEditorProps, ProvideEditorCallback, GridCell, useCustomCells } from "@glideapps/glide-data-grid";
import StarCellRenderer from "./cells/star-cell";
import SparklineCellRenderer from "./cells/sparkline-cell";
import TagsCellRenderer from "./cells/tags-cell";
import UserProfileCellRenderer from "./cells/user-profile-cell";
import DropdownCellRenderer from "./cells/dropdown-cell";
import ArticleCellRenderer from "./cells/article-cell";
import RangeCellRenderer from "./cells/range-cell";

type DrawCallback = NonNullable<DataEditorProps["drawCell"]>;

const cells = [
    StarCellRenderer,
    SparklineCellRenderer,
    TagsCellRenderer,
    UserProfileCellRenderer,
    DropdownCellRenderer,
    ArticleCellRenderer,
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
 };