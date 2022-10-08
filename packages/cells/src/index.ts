import { useCustomCells } from "@glideapps/glide-data-grid";
import StarCellRenderer, { StarCell } from "./cells/star-cell";
import SparklineCellRenderer, { SparklineCell } from "./cells/sparkline-cell";
import TagsCellRenderer, { TagsCell } from "./cells/tags-cell";
import TreeCellRenderer, { TreeCell } from "./cells/tree-cell";
import UserProfileCellRenderer, { UserProfileCell } from "./cells/user-profile-cell";
import DropdownCellRenderer, { DropdownCell } from "./cells/dropdown-cell";
import ArticleCellRenderer from "./cells/article-cell";
import type { ArticleCell } from "./cells/article-cell-types";
import RangeCellRenderer, { RangeCell } from "./cells/range-cell";
import SpinnerCellRenderer, { SpinnerCell } from "./cells/spinner-cell";
import DatePickerRenderer, { DatePickerCell } from "./cells/date-picker-cell";
import LinksCellRenderer, { LinksCell } from "./cells/links-cell";
import ButtonCellRenderer, { ButtonCell } from "./cells/button-cell";

const cells = [
    StarCellRenderer,
    SparklineCellRenderer,
    TagsCellRenderer,
    TreeCellRenderer,
    UserProfileCellRenderer,
    DropdownCellRenderer,
    ArticleCellRenderer,
    SpinnerCellRenderer,
    RangeCellRenderer,
    DatePickerRenderer,
    LinksCellRenderer,
    ButtonCellRenderer,
];

export function useExtraCells() {
    return useCustomCells(cells);
}

export {
    StarCellRenderer as StarCell,
    SparklineCellRenderer as SparklineCell,
    TagsCellRenderer as TagsCell,
    TreeCellRenderer as TreeCell,
    UserProfileCellRenderer as UserProfileCell,
    DropdownCellRenderer as DropdownCell,
    ArticleCellRenderer as ArticleCell,
    RangeCellRenderer as RangeCell,
    SpinnerCellRenderer as SpinnerCell,
    DatePickerRenderer as DatePickerCell,
    LinksCellRenderer as LinksCell,
    ButtonCellRenderer as ButtonCell,
    cells as allCells,
};

export type {
    StarCell as StarCellType,
    SparklineCell as SparklineCellType,
    TagsCell as TagsCellType,
    TreeCell as TreeCellType,
    UserProfileCell as UserProfileCellType,
    DropdownCell as DropdownCellType,
    ArticleCell as ArticleCellType,
    RangeCell as RangeCellType,
    SpinnerCell as SpinnerCellType,
    DatePickerCell as DatePickerType,
    LinksCell as LinksCellType,
    ButtonCell as ButtonCellType,
};
