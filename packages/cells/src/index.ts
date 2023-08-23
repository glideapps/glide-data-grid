import { useCustomCells } from "@glideapps/glide-data-grid";
import StarCellRenderer, { type StarCell } from "./cells/star-cell";
import SparklineCellRenderer, { type SparklineCell } from "./cells/sparkline-cell";
import TagsCellRenderer, { type TagsCell } from "./cells/tags-cell";
import UserProfileCellRenderer, { type UserProfileCell } from "./cells/user-profile-cell";
import DropdownCellRenderer, { type DropdownCell } from "./cells/dropdown-cell";
import ArticleCellRenderer from "./cells/article-cell";
import type { ArticleCell } from "./cells/article-cell-types";
import RangeCellRenderer, { type RangeCell } from "./cells/range-cell";
import SpinnerCellRenderer, { type SpinnerCell } from "./cells/spinner-cell";
import DatePickerRenderer, { type DatePickerCell } from "./cells/date-picker-cell";
import LinksCellRenderer, { type LinksCell } from "./cells/links-cell";
import ButtonCellRenderer, { type ButtonCell } from "./cells/button-cell";

const cells = [
    StarCellRenderer,
    SparklineCellRenderer,
    TagsCellRenderer,
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
    UserProfileCell as UserProfileCellType,
    DropdownCell as DropdownCellType,
    ArticleCell as ArticleCellType,
    RangeCell as RangeCellType,
    SpinnerCell as SpinnerCellType,
    DatePickerCell as DatePickerType,
    LinksCell as LinksCellType,
    ButtonCell as ButtonCellType,
};
