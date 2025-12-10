import React, { useState, useCallback } from "react";
import { styled } from "@linaria/react";
import { DayPicker } from "react-day-picker";


import {
    type CustomCell,
    type CustomRenderer,
    drawTextCell,
    GridCellKind,
    type ProvideEditorCallback,
} from "glide-data-grid-fork";

// Shadcn-inspired styles for the date picker
// Inlined styles from react-day-picker/style.css to ensure portability
const rdpStyles = `
.rdp-root {
  --rdp-accent-color: blue;
  --rdp-accent-background-color: #f0f0ff;
  --rdp-day-height: 44px;
  --rdp-day-width: 44px;
  --rdp-day_button-border-radius: 100%;
  --rdp-day_button-border: 2px solid transparent;
  --rdp-day_button-height: 42px;
  --rdp-day_button-width: 42px;
  --rdp-selected-border: 2px solid var(--rdp-accent-color);
  --rdp-disabled-opacity: 0.5;
  --rdp-outside-opacity: 0.75;
  --rdp-today-color: var(--rdp-accent-color);
  --rdp-dropdown-gap: 0.5rem;
  --rdp-months-gap: 2rem;
  --rdp-nav_button-disabled-opacity: 0.5;
  --rdp-nav_button-height: 2.25rem;
  --rdp-nav_button-width: 2.25rem;
  --rdp-nav-height: 2.75rem;
  --rdp-range_middle-background-color: var(--rdp-accent-background-color);
  --rdp-range_middle-color: inherit;
  --rdp-range_start-color: white;
  --rdp-range_start-background: linear-gradient(
    var(--rdp-gradient-direction),
    transparent 50%,
    var(--rdp-range_middle-background-color) 50%
  );
  --rdp-range_start-date-background-color: var(--rdp-accent-color);
  --rdp-range_end-background: linear-gradient(
    var(--rdp-gradient-direction),
    var(--rdp-range_middle-background-color) 50%,
    transparent 50%
  );
  --rdp-range_end-color: white;
  --rdp-range_end-date-background-color: var(--rdp-accent-color);
  --rdp-week_number-border-radius: 100%;
  --rdp-week_number-border: 2px solid transparent;
  --rdp-week_number-height: var(--rdp-day-height);
  --rdp-week_number-opacity: 0.75;
  --rdp-week_number-width: var(--rdp-day-width);
  --rdp-weeknumber-text-align: center;
  --rdp-weekday-opacity: 0.75;
  --rdp-weekday-padding: 0.5rem 0rem;
  --rdp-weekday-text-align: center;
  --rdp-gradient-direction: 90deg;
  --rdp-animation_duration: 0.3s;
  --rdp-animation_timing: cubic-bezier(0.4, 0, 0.2, 1);
}

.rdp-root[dir="rtl"] {
  --rdp-gradient-direction: -90deg;
}

.rdp-root[data-broadcast-calendar="true"] {
  --rdp-outside-opacity: unset;
}

.rdp-root {
  position: relative;
  box-sizing: border-box;
}

.rdp-root * {
  box-sizing: border-box;
}

.rdp-day {
  width: var(--rdp-day-width);
  height: var(--rdp-day-height);
  text-align: center;
}

.rdp-day_button {
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font: inherit;
  color: inherit;
  justify-content: center;
  align-items: center;
  display: flex;
  width: var(--rdp-day_button-width);
  height: var(--rdp-day_button-height);
  border: var(--rdp-day_button-border);
  border-radius: var(--rdp-day_button-border-radius);
}

.rdp-day_button:disabled {
  cursor: revert;
}

.rdp-caption_label {
  z-index: 1;
  position: relative;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  border: 0;
}

.rdp-dropdown:focus-visible ~ .rdp-caption_label {
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}

.rdp-button_next,
.rdp-button_previous {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font: inherit;
  color: inherit;
  -moz-appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  appearance: none;
  width: var(--rdp-nav_button-width);
  height: var(--rdp-nav_button-height);
}

.rdp-button_next:disabled,
.rdp-button_next[aria-disabled="true"],
.rdp-button_previous:disabled,
.rdp-button_previous[aria-disabled="true"] {
  cursor: revert;
  opacity: var(--rdp-nav_button-disabled-opacity);
}

.rdp-chevron {
  display: inline-block;
  fill: var(--rdp-accent-color);
}

.rdp-root[dir="rtl"] .rdp-nav .rdp-chevron {
  transform: rotate(180deg);
  transform-origin: 50%;
}

.rdp-dropdowns {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--rdp-dropdown-gap);
}
.rdp-dropdown {
  z-index: 2;
  opacity: 0;
  appearance: none;
  position: absolute;
  inset-block-start: 0;
  inset-block-end: 0;
  inset-inline-start: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  cursor: inherit;
  border: none;
  line-height: inherit;
}

.rdp-dropdown_root {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.rdp-dropdown_root[data-disabled="true"] .rdp-chevron {
  opacity: var(--rdp-disabled-opacity);
}

.rdp-month_caption {
  display: flex;
  align-content: center;
  height: var(--rdp-nav-height);
  font-weight: bold;
  font-size: large;
}

.rdp-root[data-nav-layout="around"] .rdp-month,
.rdp-root[data-nav-layout="after"] .rdp-month {
  position: relative;
}

.rdp-root[data-nav-layout="around"] .rdp-month_caption {
  justify-content: center;
  margin-inline-start: var(--rdp-nav_button-width);
  margin-inline-end: var(--rdp-nav_button-width);
  position: relative;
}

.rdp-root[data-nav-layout="around"] .rdp-button_previous {
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  height: var(--rdp-nav-height);
  display: inline-flex;
}

.rdp-root[data-nav-layout="around"] .rdp-button_next {
  position: absolute;
  inset-inline-end: 0;
  top: 0;
  height: var(--rdp-nav-height);
  display: inline-flex;
  justify-content: center;
}

.rdp-months {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: var(--rdp-months-gap);
  max-width: fit-content;
}

.rdp-month_grid {
  border-collapse: collapse;
}

.rdp-nav {
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  display: flex;
  align-items: center;
  height: var(--rdp-nav-height);
}

.rdp-weekday {
  opacity: var(--rdp-weekday-opacity);
  padding: var(--rdp-weekday-padding);
  font-weight: 500;
  font-size: smaller;
  text-align: var(--rdp-weekday-text-align);
  text-transform: var(--rdp-weekday-text-transform);
}

.rdp-week_number {
  opacity: var(--rdp-week_number-opacity);
  font-weight: 400;
  font-size: small;
  height: var(--rdp-week_number-height);
  width: var(--rdp-week_number-width);
  border: var(--rdp-week_number-border);
  border-radius: var(--rdp-week_number-border-radius);
  text-align: var(--rdp-weeknumber-text-align);
}

.rdp-today:not(.rdp-outside) {
  color: var(--rdp-today-color);
}

.rdp-selected {
  font-weight: bold;
  font-size: large;
}

.rdp-selected .rdp-day_button {
  border: var(--rdp-selected-border);
}

.rdp-outside {
  opacity: var(--rdp-outside-opacity);
}

.rdp-disabled:not(.rdp-selected) {
  opacity: var(--rdp-disabled-opacity);
}

.rdp-hidden {
  visibility: hidden;
  color: var(--rdp-range_start-color);
}

.rdp-range_start {
  background: var(--rdp-range_start-background);
}

.rdp-range_start .rdp-day_button {
  background-color: var(--rdp-range_start-date-background-color);
  color: var(--rdp-range_start-color);
}

.rdp-range_middle {
  background-color: var(--rdp-range_middle-background-color);
}

.rdp-range_middle .rdp-day_button {
  border: unset;
  border-radius: unset;
  color: var(--rdp-range_middle-color);
}

.rdp-range_end {
  background: var(--rdp-range_end-background);
  color: var(--rdp-range_end-color);
}

.rdp-range_end .rdp-day_button {
  color: var(--rdp-range_start-color);
  background-color: var(--rdp-range_end-date-background-color);
}

.rdp-range_start.rdp-range_end {
  background: revert;
}

.rdp-focusable {
  cursor: pointer;
}
`;

const DatePickerWrapper = styled.div`
    ${rdpStyles}

    --cell-size: 2.25rem;
    --accent: #f4f4f5;
    --accent-foreground: #18181b;
    --primary: #18181b;
    --primary-foreground: #fafafa;
    --muted-foreground: #71717a;
    --border: #e4e4e7;
    --ring: #18181b;
    --background: #ffffff;
    --radius: 0.5rem;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background: var(--background);
    border-radius: var(--radius);
    padding: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid var(--border);
    min-width: 280px;

    /* Override react-day-picker default styles with shadcn styling */
    .rdp-root {
        --rdp-accent-color: var(--primary);
        --rdp-accent-background-color: var(--accent);
        --rdp-day-height: var(--cell-size);
        --rdp-day-width: var(--cell-size);
        --rdp-day_button-height: var(--cell-size);
        --rdp-day_button-width: var(--cell-size);
        --rdp-selected-border: 0px;
        --rdp-disabled-opacity: 0.5;
        --rdp-outside-opacity: 0.5;
        --rdp-today-color: var(--primary);
        --rdp-dropdown-gap: 0.5rem;

        margin: 0;
    }

    .rdp-months {
        position: relative;
    }

    .rdp-month {
        width: 100%;
    }

    .rdp-month_caption {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--cell-size);
        padding: 0 var(--cell-size);
        margin-bottom: 0.5rem;
    }

    .rdp-caption_label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--accent-foreground);
    }

    /* Dropdown container - flex layout for month and year */
    .rdp-dropdowns {
        display: flex;
        gap: 0.375rem;
        justify-content: center;
        align-items: center;
        height: var(--cell-size);
        font-size: 0.875rem;
        font-weight: 500;
    }

    /* Dropdown root container - styled border wrapper */
    .rdp-dropdown_root {
        position: relative;
        display: inline-flex;
        align-items: center;
        border: 1px solid var(--border);
        border-radius: calc(var(--radius) - 2px);
        background: var(--background);
        transition: border-color 0.2s ease, box-shadow 0.2s ease;

        &:hover {
            border-color: var(--ring);
        }

        &:focus-within {
            border-color: var(--ring);
            box-shadow: 0 0 0 3px rgba(24, 24, 27, 0.1);
        }
    }

    /* The caption label shows the text (e.g. "December") with chevron */
    .rdp-caption_label {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.375rem 0.5rem;
        padding-right: 1.5rem; /* Space for the chevron */
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--accent-foreground);
        cursor: pointer;
        user-select: none;
        position: relative;

        /* Add a CSS chevron since default DayPicker doesn't render one inside label */
        &::after {
            content: "";
            position: absolute;
            right: 0.5rem;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 4px solid var(--muted-foreground);
            pointer-events: none;
        }

        &:hover::after {
             border-top-color: var(--accent-foreground);
        }
    }

    /* Hidden select dropdown overlaid on the label - shadcn approach */
    .rdp-dropdown {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0 !important;
        cursor: pointer;
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        border: none !important;
        background: transparent !important;
    }

    .rdp-chevron {
        fill: var(--muted-foreground);
    }

    .rdp-nav {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
    }

    .rdp-button_previous,
    .rdp-button_next {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--cell-size);
        height: var(--cell-size);
        padding: 0;
        border: none;
        background: transparent;
        border-radius: calc(var(--radius) - 2px);
        cursor: pointer;
        color: var(--accent-foreground);
        transition: background-color 0.2s ease;

        &:hover {
            background-color: var(--accent);
        }

        &:focus-visible {
            outline: 2px solid var(--ring);
            outline-offset: 2px;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        svg {
            width: 1rem;
            height: 1rem;
        }
    }

    .rdp-weekdays {
        display: flex;
        margin-bottom: 0.25rem;
    }

    .rdp-weekday {
        flex: 1;
        color: var(--muted-foreground);
        font-size: 0.75rem;
        font-weight: 400;
        text-align: center;
        padding: 0.25rem 0;
    }

    .rdp-weeks {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
    }

    .rdp-week {
        display: flex;
    }

    .rdp-day {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .rdp-day_button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--cell-size);
        height: var(--cell-size);
        font-size: 0.875rem;
        font-weight: 400;
        border: none;
        background: transparent;
        border-radius: calc(var(--radius) - 2px);
        cursor: pointer;
        color: var(--accent-foreground);
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
            background-color: var(--accent);
        }

        &:focus-visible {
            outline: 2px solid var(--ring);
            outline-offset: 2px;
            position: relative;
            z-index: 10;
        }
    }

    .rdp-today:not(.rdp-selected) .rdp-day_button {
        background-color: var(--accent);
        color: var(--accent-foreground);
        font-weight: 500;
    }

    .rdp-selected .rdp-day_button {
        background-color: var(--primary) !important;
        color: var(--primary-foreground) !important;
        font-weight: 500;

        &:hover {
            background-color: var(--primary) !important;
            opacity: 0.9;
        }
    }

    .rdp-outside .rdp-day_button {
        color: var(--muted-foreground);
        opacity: 0.5;
    }

    .rdp-disabled .rdp-day_button {
        color: var(--muted-foreground);
        opacity: 0.5;
        cursor: not-allowed;
    }

    .rdp-hidden {
        visibility: hidden;
    }
`;

// Calendar icon SVG component
const CalendarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

// Styled button that matches shadcn style
const TriggerButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    min-width: 200px;
    height: 2.5rem;
    padding: 0.5rem 0.75rem;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 0.5rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 0.875rem;
    color: #18181b;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #fafafa;
        border-color: #d4d4d8;
    }

    &:focus {
        outline: none;
        border-color: #18181b;
        box-shadow: 0 0 0 2px rgba(24, 24, 27, 0.1);
    }

    .icon {
        color: #71717a;
        flex-shrink: 0;
    }

    .text {
        flex: 1;
        text-align: left;
    }

    .placeholder {
        color: #a1a1aa;
    }
`;

export interface DatePickerCellProps {
    readonly kind: "date-picker-cell";
    /* The current value of the datetime cell. */
    readonly date: Date | undefined | null;
    /* The current display value of the datetime cell. */
    readonly displayDate: string;
    /* Defines the type of the HTML input element. */
    readonly format: DateKind;
    /* Timezone offset in minutes.
    This can be used to adjust the date by a given timezone offset. */
    readonly timezoneOffset?: number;
    /* Minimum value that can be entered by the user.
    This is passed to the min attribute of the HTML input element. */
    readonly min?: string | Date;
    /* Maximum value that can be entered by the user.
    This is passed to the max attribute of the HTML input element. */
    readonly max?: string | Date;
    /* Granularity that the date must adhere.
    This is passed to the step attribute of the HTML input element. */
    readonly step?: string;
}

export type DateKind = "date" | "time" | "datetime-local";

/**
 * Format a date as YYYY/MM/DD
 */
export const formatDateDisplay = (date: Date | undefined | null): string => {
    if (date === undefined || date === null) {
        return "";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
};

/**
 * Format a date with time as YYYY/MM/DD HH:mm
 */
export const formatDateTimeDisplay = (date: Date | undefined | null): string => {
    if (date === undefined || date === null) {
        return "";
    }
    const datePart = formatDateDisplay(date);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${datePart} ${hours}:${minutes}`;
};

/**
 * Format a time as HH:mm
 */
export const formatTimeDisplay = (date: Date | undefined | null): string => {
    if (date === undefined || date === null) {
        return "";
    }
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
};

export const formatValueForHTMLInput = (dateKind: DateKind, date: Date | undefined | null): string => {
    if (date === undefined || date === null) {
        return "";
    }
    const isoDate = date.toISOString();
    switch (dateKind) {
        case "date":
            return isoDate.split("T")[0];
        case "datetime-local":
            return isoDate.replace("Z", "");
        case "time":
            return isoDate.split("T")[1].replace("Z", "");
        default:
            throw new Error(`Unknown date kind ${dateKind}`);
    }
};

export type DatePickerCell = CustomCell<DatePickerCellProps>;

// Time input component for time and datetime-local modes
const TimeInput = styled.input`
    width: 100%;
    padding: 0.5rem 0.75rem;
    margin-top: 0.75rem;
    background: #ffffff;
    border: 1px solid #e4e4e7;
    border-radius: 0.5rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 0.875rem;
    color: #18181b;

    &:focus {
        outline: none;
        border-color: #18181b;
        box-shadow: 0 0 0 2px rgba(24, 24, 27, 0.1);
    }
`;

const Editor: ReturnType<ProvideEditorCallback<DatePickerCell>> = cell => {
    const cellData = cell.value.data;
    const { format, displayDate } = cellData;

    // Convert timezone offset to milliseconds
    const timezoneOffsetMs = cellData.timezoneOffset ? cellData.timezoneOffset * 60 * 1000 : 0;

    let initialDate = cellData.date;
    if (timezoneOffsetMs && initialDate) {
        initialDate = new Date(initialDate.getTime() + timezoneOffsetMs);
    }

    const [selected, setSelected] = useState<Date | undefined>(initialDate ?? undefined);
    const [timeValue, setTimeValue] = useState<string>(() => {
        if (initialDate && (format === "time" || format === "datetime-local")) {
            const hours = initialDate.getHours().toString().padStart(2, "0");
            const minutes = initialDate.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
        }
        return "00:00";
    });

    // Prepare min/max dates for the calendar
    const minDate = cellData.min instanceof Date ? cellData.min : cellData.min ? new Date(cellData.min) : undefined;
    const maxDate = cellData.max instanceof Date ? cellData.max : cellData.max ? new Date(cellData.max) : undefined;

    const handleDateSelect = useCallback((date: Date | undefined) => {
        setSelected(date);

        if (format === "time") {
            // For time-only, we don't use the date picker
            return;
        }

        let finalDate = date;
        if (date && (format === "datetime-local")) {
            // Combine date with time
            const [hours, minutes] = timeValue.split(":").map(Number);
            finalDate = new Date(date);
            finalDate.setHours(hours, minutes, 0, 0);
        }

        // Calculate the date with timezone offset applied for storage
        const dateForStorage = finalDate ? new Date(finalDate.getTime() - timezoneOffsetMs) : undefined;

        // Generate the display date based on format
        let newDisplayDate = "";
        if (dateForStorage) {
            // Apply timezone offset for display (reverse of storage)
            const displayDateWithOffset = new Date(dateForStorage.getTime() + timezoneOffsetMs);
            if (format === "datetime-local") {
                newDisplayDate = formatDateTimeDisplay(displayDateWithOffset);
            } else {
                newDisplayDate = formatDateDisplay(displayDateWithOffset);
            }
        }

        const newValue = {
            ...cell.value,
            data: {
                ...cell.value.data,
                date: dateForStorage,
                displayDate: newDisplayDate,
            },
        };

        cell.onChange(newValue);

        // Auto-close and commit changes for date-only pickers
        if (date && (format === "date" || !format)) {
            // We cast to any here because onFinishedEditing might be missing from the
            // ReturnType<ProvideEditorCallback> inference but is present in CustomEditorProps
            if ((cell as any).onFinishedEditing) {
                (cell as any).onFinishedEditing(newValue);
            } else {
                console.warn("DatePickerCell: onFinishedEditing prop is missing. Auto-close will not work. Ensure your parent DataEditor is passing this prop correctly.");
            }
        }
    }, [cell, format, timeValue, timezoneOffsetMs]);

    const handleTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTimeValue(newTime);

        if (format === "time") {
            // For time-only format
            const [hours, minutes] = newTime.split(":").map(Number);
            const timeDate = new Date(1970, 0, 1, hours, minutes, 0, 0);
            const dateForStorage = new Date(timeDate.getTime() - timezoneOffsetMs);
            const displayDateWithOffset = new Date(dateForStorage.getTime() + timezoneOffsetMs);
            cell.onChange({
                ...cell.value,
                data: {
                    ...cell.value.data,
                    date: dateForStorage,
                    displayDate: formatTimeDisplay(displayDateWithOffset),
                },
            });
        } else if (selected && format === "datetime-local") {
            // For datetime-local, combine with selected date
            const [hours, minutes] = newTime.split(":").map(Number);
            const combinedDate = new Date(selected);
            combinedDate.setHours(hours, minutes, 0, 0);
            const dateForStorage = new Date(combinedDate.getTime() - timezoneOffsetMs);
            const displayDateWithOffset = new Date(dateForStorage.getTime() + timezoneOffsetMs);
            cell.onChange({
                ...cell.value,
                data: {
                    ...cell.value.data,
                    date: dateForStorage,
                    displayDate: formatDateTimeDisplay(displayDateWithOffset),
                },
            });
        }
    }, [cell, format, selected, timezoneOffsetMs]);

    if (cell.value.readonly) {
        return (
            <TriggerButton disabled>
                <span className="text">{displayDate || "No date selected"}</span>
                <span className="icon"><CalendarIcon /></span>
            </TriggerButton>
        );
    }

    // For time-only format, just show time input
    if (format === "time") {
        return (
            <DatePickerWrapper>
                <TimeInput
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    autoFocus
                    data-testid="date-picker-cell-time"
                />
            </DatePickerWrapper>
        );
    }

    return (
        <DatePickerWrapper data-testid="date-picker-cell">
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleDateSelect}
                showOutsideDays
                captionLayout="dropdown"
                fromYear={new Date().getFullYear() - 75}
                toYear={new Date().getFullYear() + 75}

                disabled={[
                    ...(minDate ? [{ before: minDate }] : []),
                    ...(maxDate ? [{ after: maxDate }] : []),
                ]}
                defaultMonth={selected || new Date()}
            />
            {format === "datetime-local" && (
                <TimeInput
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    data-testid="date-picker-cell-time"
                />
            )}
        </DatePickerWrapper>
    );
};

const renderer: CustomRenderer<DatePickerCell> = {
    kind: GridCellKind.Custom,
    isMatch: (cell: CustomCell): cell is DatePickerCell => (cell.data as any).kind === "date-picker-cell",
    draw: (args, cell) => {
        const { displayDate } = cell.data;
        drawTextCell(args, displayDate, cell.contentAlign);
        return true;
    },
    measure: (ctx, cell, theme) => {
        const { displayDate } = cell.data;
        return ctx.measureText(displayDate).width + theme.cellHorizontalPadding * 2;
    },
    provideEditor: () => ({
        editor: Editor,
        disablePadding: true,
        disableStyling: true,
    }),
    onPaste: (v, d) => {
        let parseDateTimestamp = NaN;
        // We only try to parse the value if it is not empty/undefined/null:
        if (v) {
            // Support for unix timestamps (milliseconds since 1970-01-01):
            parseDateTimestamp = Number(v).valueOf();

            if (Number.isNaN(parseDateTimestamp)) {
                // Support for parsing ISO 8601 date strings:
                parseDateTimestamp = Date.parse(v);
                if (d.format === "time" && Number.isNaN(parseDateTimestamp)) {
                    // The pasted value was not a valid date string
                    // Try to interpret value as time string instead (HH:mm:ss)
                    parseDateTimestamp = Date.parse(`1970-01-01T${v}Z`);
                }
            }
        }
        return {
            ...d,
            date: Number.isNaN(parseDateTimestamp) ? undefined : new Date(parseDateTimestamp),
        };
    },
};

export default renderer;
