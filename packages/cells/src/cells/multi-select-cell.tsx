import * as React from "react";

import {
    type CustomCell,
    type ProvideEditorCallback,
    type CustomRenderer,
    type Rectangle,
    measureTextCached,
    getMiddleCenterBias,
    useTheme,
    GridCellKind,
} from "@glideapps/glide-data-grid";

import { styled } from "@linaria/react";
import chroma from "chroma-js";
import Select, { type MenuProps, components, type StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import { roundedRect } from "../draw-fns.js";

type SelectOption = { value: string; label?: string; color?: string };

interface MultiSelectCellProps {
    readonly kind: "multi-select-cell";
    readonly values: string[] | undefined | null;
    readonly options: readonly (SelectOption | string)[];
    readonly color?: string;
    readonly creatable?: boolean;
    readonly allowDuplicates?: boolean;
    readonly borderRadius?: number;
}

const TAG_HEIGHT = 20;
const TAG_PADDING = 6;
const TAG_MARGIN = 4;
const VALUE_PREFIX = "__created";
const VALUE_PREFIX_REGEX = new RegExp(`^${VALUE_PREFIX}\\d+__`);

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-top: auto;
    margin-bottom: auto;
    .gdg-multi-select {
        font-family: var(--gdg-font-family);
        font-size: var(--gdg-editor-font-size);
    }
`;

const PortalWrap = styled.div`
    font-family: var(--gdg-font-family);
    font-size: var(--gdg-editor-font-size);
    color: var(--gdg-text-dark);

    > div {
        border-radius: 4px;
        border: 1px solid var(--gdg-border-color);
    }
`;

const prepareOptions = (
    options: readonly (string | SelectOption)[]
): { value: string; label?: string; color?: string }[] => {
    return options.map(option => {
        if (typeof option === "string" || option === null || option === undefined) {
            return { value: option, label: option?.toString() ?? "", color: undefined };
        }

        return {
            value: option.value,
            label: option.label ?? option.value?.toString() ?? "",
            color: option.color ?? undefined,
        };
    });
};

const resolveValues = (
    values: string[] | null | undefined,
    options: readonly SelectOption[],
    allowDuplicates?: boolean
): { value: string; label?: string; color?: string }[] => {
    if (values === undefined || values === null) {
        return [];
    }

    return values.map((value, index) => {
        const valuePrefix = allowDuplicates ? `${VALUE_PREFIX}${index}__` : "";
        const matchedOption = options.find(option => {
            return option.value === value;
        });
        if (matchedOption) {
            return { ...matchedOption, value: `${valuePrefix}${matchedOption.value}` };
        }
        return { value: `${valuePrefix}${value}`, label: value };
    });
};

interface CustomMenuProps extends MenuProps<any> {}

const CustomMenu: React.FC<CustomMenuProps> = p => {
    const { Menu } = components;
    const { children, ...rest } = p;
    return <Menu {...rest}>{children}</Menu>;
};

export type MultiSelectCell = CustomCell<MultiSelectCellProps>;

const Editor: ReturnType<ProvideEditorCallback<MultiSelectCell>> = p => {
    const { value: cell, initialValue, onChange } = p;
    const {
        options: optionsIn,
        values: valuesIn,
        creatable,
        color: colorIn,
        borderRadius,
        allowDuplicates,
    } = cell.data;

    const theme = useTheme();
    const [value, setValue] = React.useState(valuesIn);
    const [menuOpen, setMenuOpen] = React.useState(true);
    const [inputValue, setInputValue] = React.useState(initialValue ?? "");

    const onKeyDown = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (menuOpen) {
                e.stopPropagation();
            }
        },
        [menuOpen]
    );

    const options = React.useMemo(() => {
        return prepareOptions(optionsIn);
    }, [optionsIn]);

    const colorStyles: StylesConfig<SelectOption, true> = {
        control: base => ({
            ...base,
            border: 0,
            boxShadow: "none",
        }),
        option: styles => {
            return {
                ...styles,
                fontSize: theme.editorFontSize,
                fontFamily: theme.fontFamily,
                ":active": {
                    ...styles[":active"],
                    color: theme.accentFg,
                },
            };
        },
        multiValue: (styles, { data }) => {
            const color = chroma(data.color ?? colorIn ?? theme.bgBubble);
            return {
                ...styles,
                backgroundColor: color.css(),
                borderRadius: `${borderRadius ?? TAG_HEIGHT / 2}px`,
            };
        },
        multiValueLabel: (styles, { data, isDisabled }) => {
            const color = chroma(data.color ?? colorIn ?? theme.bgBubble);
            return {
                ...styles,
                paddingRight: isDisabled ? TAG_PADDING : undefined,
                paddingLeft: TAG_PADDING,
                color: color.luminance() > 0.5 ? "black" : "white",
                fontSize: theme.editorFontSize,
                fontFamily: theme.fontFamily,
            };
        },
        multiValueRemove: (styles, { data, isDisabled }) => {
            if (isDisabled) {
                return {
                    display: "none",
                };
            }
            const color = chroma(data.color ?? colorIn ?? theme.bgBubble);
            return {
                ...styles,
                color: color.luminance() > 0.5 ? "black" : "white",
                ":hover": {
                    cursor: "pointer",
                },
            };
        },
    };

    const handleKeyDown: React.KeyboardEventHandler = event => {
        if (!inputValue) {
            return;
        }
        switch (event.key) {
            case "Enter":
            case "Tab":
                setValue(prev => [...(prev ?? []), inputValue]);
                setInputValue("");
                event.preventDefault();
        }
    };

    const SelectComponent = creatable ? CreatableSelect : Select;
    return (
        <Wrap onKeyDown={onKeyDown}>
            <SelectComponent
                className="gdg-multi-select"
                isMulti={true}
                isDisabled={cell.readonly}
                isClearable={true}
                isSearchable={true}
                inputValue={inputValue}
                onInputChange={setInputValue}
                options={options}
                placeholder={cell.readonly ? "" : undefined}
                onMenuOpen={() => setMenuOpen(true)}
                onMenuClose={() => setMenuOpen(false)}
                value={resolveValues(value, options, allowDuplicates)}
                styles={colorStyles}
                onKeyDown={allowDuplicates && creatable ? handleKeyDown : undefined}
                theme={t => {
                    return {
                        ...t,
                        colors: {
                            ...t.colors,
                            neutral0: theme.bgCell, // this is both the background color AND the fg color of
                            // the selected item because of course it is.
                            neutral5: theme.bgCell,
                            neutral10: theme.accentColor,
                            neutral20: theme.bgCellMedium,
                            neutral30: theme.bgCellMedium,
                            neutral40: theme.bgCellMedium,
                            neutral50: theme.textLight,
                            neutral60: theme.textMedium,
                            neutral70: theme.textMedium,
                            neutral80: theme.textDark,
                            neutral90: theme.textDark,
                            neutral100: theme.textDark,
                            primary: theme.accentColor,
                            primary75: theme.accentColor,
                            primary50: theme.accentColor,
                            primary25: theme.accentLight, // prelight color
                        },
                    };
                }}
                menuPlacement={"auto"}
                menuPortalTarget={document.getElementById("portal")}
                autoFocus={true}
                openMenuOnFocus={true}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    Menu: props => (
                        <PortalWrap>
                            <CustomMenu className={"click-outside-ignore"} {...props} />
                        </PortalWrap>
                    ),
                }}
                onChange={async e => {
                    if (e === null) {
                        return;
                    }
                    const mappedValues = e.map(x => {
                        return allowDuplicates && x.value.startsWith(VALUE_PREFIX)
                            ? x.value.replace(new RegExp(VALUE_PREFIX_REGEX), "")
                            : x.value;
                    });
                    setValue(mappedValues);
                    onChange({
                        ...cell,
                        data: {
                            ...cell.data,
                            values: mappedValues,
                        },
                    });
                }}
            />
        </Wrap>
    );
};

const renderer: CustomRenderer<MultiSelectCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is MultiSelectCell => (c.data as any).kind === "multi-select-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect, highlighted } = args;
        const { values, options: optionsIn, borderRadius, color: colorIn } = cell.data;

        if (values === undefined || values === null) {
            return true;
        }

        const options = prepareOptions(optionsIn);

        const drawArea: Rectangle = {
            x: rect.x + theme.cellHorizontalPadding,
            y: rect.y + theme.cellVerticalPadding,
            width: rect.width - 2 * theme.cellHorizontalPadding,
            height: rect.height - 2 * theme.cellVerticalPadding,
        };
        const rows = Math.max(1, Math.floor(drawArea.height / (TAG_HEIGHT + TAG_PADDING)));

        let { x } = drawArea;
        let row = 1;

        let y =
            rows === 1
                ? drawArea.y + (drawArea.height - TAG_HEIGHT) / 2
                : drawArea.y + (drawArea.height - rows * TAG_HEIGHT - (rows - 1) * TAG_PADDING) / 2;
        for (const value of values) {
            const matchedOption = options.find(t => t.value === value);
            const color = chroma(
                matchedOption?.color ?? colorIn ?? (highlighted ? theme.bgBubbleSelected : theme.bgBubble)
            );
            const displayText = matchedOption?.label ?? value;
            const metrics = measureTextCached(displayText, ctx);
            const width = metrics.width + TAG_PADDING * 2;
            const textY = TAG_HEIGHT / 2;

            if (x !== drawArea.x && x + width > drawArea.x + drawArea.width && row < rows) {
                row++;
                y += TAG_HEIGHT + TAG_PADDING;
                x = drawArea.x;
            }

            ctx.fillStyle = color.hex();
            ctx.beginPath();
            roundedRect(ctx, x, y, width, TAG_HEIGHT, borderRadius ?? TAG_HEIGHT / 2);
            ctx.fill();

            ctx.fillStyle = color.luminance() > 0.5 ? "#000000" : "#ffffff";
            ctx.fillText(displayText, x + TAG_PADDING, y + textY + getMiddleCenterBias(ctx, theme));

            x += width + TAG_MARGIN;
            if (x > drawArea.x + drawArea.width && row >= rows) {
                break;
            }
        }

        return true;
    },
    measure: (ctx, cell, t) => {
        const { values, options } = cell.data;

        if (!values) {
            return t.cellHorizontalPadding * 2;
        }

        // Resolve the values to the actual display labels:
        const labels = resolveValues(values, prepareOptions(options), cell.data.allowDuplicates).map(
            x => x.label ?? x.value
        );

        return (
            labels.reduce((acc, data) => ctx.measureText(data).width + acc + TAG_PADDING * 2 + TAG_MARGIN, 0) +
            2 * t.cellHorizontalPadding -
            4
        );
    },
    provideEditor: () => ({
        editor: Editor,
        disablePadding: true,
        deletedValue: v => ({
            ...v,
            copyData: "",
            data: {
                ...v.data,
                values: [],
            },
        }),
    }),
    onPaste: (val, d) => {
        let values = val.split(",").map(s => s.trim());

        if (!d.allowDuplicates) {
            values = values.filter((v, index) => values.indexOf(v) === index);
        }

        return {
            ...d,
            values: d.creatable
                ? values
                : prepareOptions(d.options)
                      .map(x => x.value)
                      .filter(x => values.includes(x)),
        };
    },
};

export default renderer;
