import StarCellRenderer, { type StarCell } from "./cells/star-cell.js";
import SparklineCellRenderer, { type SparklineCell } from "./cells/sparkline-cell.js";
import TagsCellRenderer, { type TagsCell } from "./cells/tags-cell.js";
import UserProfileCellRenderer, { type UserProfileCell } from "./cells/user-profile-cell.js";
import DropdownCellRenderer, { type DropdownCell } from "./cells/dropdown-cell.js";
import InputDropdownCellRenderer from "./cells/input-dropdown-cell.js";
import ArticleCellRenderer from "./cells/article-cell.js";
import type { ArticleCell } from "./cells/article-cell-types.js";
import RangeCellRenderer, { type RangeCell } from "./cells/range-cell.js";
import SpinnerCellRenderer, { type SpinnerCell } from "./cells/spinner-cell.js";
import DatePickerRenderer, { type DatePickerCell } from "./cells/date-picker-cell.js";
import LinksCellRenderer, { type LinksCell } from "./cells/links-cell.js";
import ButtonCellRenderer, { type ButtonCell } from "./cells/button-cell.js";
import TreeViewCellRenderer, { type TreeViewCell } from "./cells/tree-view-cell.js";
import MultiSelectCellRenderer, { type MultiSelectCell } from "./cells/multi-select-cell.js";

const cells = [
    StarCellRenderer,
    SparklineCellRenderer,
    TagsCellRenderer,
    UserProfileCellRenderer,
    DropdownCellRenderer,
    InputDropdownCellRenderer,
    ArticleCellRenderer,
    SpinnerCellRenderer,
    RangeCellRenderer,
    DatePickerRenderer,
    LinksCellRenderer,
    ButtonCellRenderer,
    TreeViewCellRenderer,
    MultiSelectCellRenderer,
];

export {
    StarCellRenderer as StarCell,
    SparklineCellRenderer as SparklineCell,
    TagsCellRenderer as TagsCell,
    UserProfileCellRenderer as UserProfileCell,
    DropdownCellRenderer as DropdownCell,
    InputDropdownCellRenderer as InputDropdownCellRenderer,
    ArticleCellRenderer as ArticleCell,
    RangeCellRenderer as RangeCell,
    SpinnerCellRenderer as SpinnerCell,
    DatePickerRenderer as DatePickerCell,
    LinksCellRenderer as LinksCell,
    ButtonCellRenderer as ButtonCell,
    TreeViewCellRenderer as TreeViewCell,
    MultiSelectCellRenderer as MultiSelectCell,
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
    TreeViewCell as TreeViewCellType,
    MultiSelectCell as MultiSelectCellType,
};
