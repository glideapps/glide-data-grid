import { useCustomCells } from "@glideapps/glide-data-grid";
import StarCellRenderer, { type StarCell } from "./cells/star-cell.js";
import SparklineCellRenderer, { type SparklineCell } from "./cells/sparkline-cell.js";
import TagsCellRenderer, { type TagsCell } from "./cells/tags-cell.js";
import UserProfileCellRenderer, { type UserProfileCell } from "./cells/user-profile-cell.js";
import DropdownCellRenderer, { type DropdownCell } from "./cells/dropdown-cell.js";
import ArticleCellRenderer from "./cells/article-cell.js";
import type { ArticleCell } from "./cells/article-cell-types.js";
import RangeCellRenderer, { type RangeCell } from "./cells/range-cell.js";
import SpinnerCellRenderer, { type SpinnerCell } from "./cells/spinner-cell.js";
import DatePickerRenderer, { type DatePickerCell } from "./cells/date-picker-cell.js";
import LinksCellRenderer, { type LinksCell } from "./cells/links-cell.js";
import ButtonCellRenderer, { type ButtonCell } from "./cells/button-cell.js";

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
