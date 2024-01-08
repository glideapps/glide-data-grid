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

interface CustomMenuProps extends MenuProps<any> {}

const CustomMenu: React.FC<CustomMenuProps> = p => {
    const { Menu } = components;
    const { children, ...rest } = p;
    return <Menu {...rest}>{children}</Menu>;
};

type SelectOption = { value: string; label?: string; color?: string };

interface MultiSelectCellProps {
    readonly kind: "multi-select-cell";
    readonly value: string[] | undefined | null;
    readonly options: readonly (SelectOption | string)[];
    readonly color?: string;
    readonly creatable?: boolean;
    readonly borderRadius?: number;
}

const TAG_HEIGHT = 20;
const INNER_PAD = 6;
const TAG_MARGIN = 4;
const CREATED_VALUE_PREFIX = "__created";

export type MultiSelectCell = CustomCell<MultiSelectCellProps>;

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

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

const Editor: ReturnType<ProvideEditorCallback<MultiSelectCell>> = p => {
    const { value: cell, initialValue, onChange } = p;
    const { options: optionsIn, value: valueIn, creatable, color: colorIn, borderRadius } = cell.data;

    const theme = useTheme();
    const [value, setValue] = React.useState(valueIn);
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

    const colourStyles: StylesConfig<SelectOption, true> = {
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
                paddingRight: isDisabled ? INNER_PAD : undefined,
                paddingLeft: INNER_PAD,
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
                ":hover": {},
            };
        },
    };

    const handleKeyDown: React.KeyboardEventHandler = event => {
        if (!inputValue) return;
        switch (event.key) {
            case "Enter":
            case "Tab":
                setValue(prev => [...prev, inputValue]);
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
                value={value?.map(
                    (v, index) =>
                        options.find(x => x.value === v) ?? { value: `${CREATED_VALUE_PREFIX}${index}${v}`, label: v }
                )}
                styles={colourStyles}
                onKeyDown={handleKeyDown}
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
                // closeMenuOnSelect={false}
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
                    const mappedValues = e.map(x =>
                        x.value.startsWith(CREATED_VALUE_PREFIX) && x.label ? x.label : x.value
                    );
                    setValue(mappedValues);
                    // TODO: do we need this?
                    await new Promise(r => window.requestAnimationFrame(r));
                    onChange({
                        ...cell,
                        data: {
                            ...cell.data,
                            value: mappedValues,
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
        const { value, options: optionsIn, borderRadius, color: colorIn } = cell.data;

        if (value === undefined || value === null) {
            return true;
        }

        const options = prepareOptions(optionsIn);

        const drawArea: Rectangle = {
            x: rect.x + theme.cellHorizontalPadding,
            y: rect.y + theme.cellVerticalPadding,
            width: rect.width - 2 * theme.cellHorizontalPadding,
            height: rect.height - 2 * theme.cellVerticalPadding,
        };
        const rows = Math.max(1, Math.floor(drawArea.height / (TAG_HEIGHT + INNER_PAD)));

        let { x } = drawArea;
        let row = 1;
        let y = drawArea.y + (drawArea.height - rows * TAG_HEIGHT - (rows - 1) * TAG_HEIGHT) / 2;
        for (const tag of value) {
            const matchedOption = options.find(t => t.value === tag);
            const color = chroma(
                matchedOption?.color ?? colorIn ?? (highlighted ? theme.bgBubbleSelected : theme.bgBubble)
            );
            const displayText = matchedOption?.label ?? tag;
            const metrics = measureTextCached(displayText, ctx);
            const width = metrics.width + INNER_PAD * 2;
            const textY = TAG_HEIGHT / 2;

            if (x !== drawArea.x && x + width > drawArea.x + drawArea.width && row < rows) {
                row++;
                y += TAG_HEIGHT + INNER_PAD;
                x = drawArea.x;
            }

            ctx.fillStyle = color.hex();
            ctx.beginPath();
            roundedRect(ctx, x, y, width, TAG_HEIGHT, borderRadius ?? TAG_HEIGHT / 2);
            ctx.fill();

            ctx.fillStyle = color.luminance() > 0.5 ? "#000000" : "#ffffff";
            ctx.fillText(displayText, x + INNER_PAD, y + textY + getMiddleCenterBias(ctx, theme));

            x += width + TAG_MARGIN;
            if (x > drawArea.x + drawArea.width && row >= rows) break;
        }

        return true;
    },
    measure: (ctx, cell, t) => {
        const { value } = cell.data;
        if (value) {
            return (
                value.reduce((acc, data) => ctx.measureText(data).width + acc + 20, 0) + 2 * t.cellHorizontalPadding - 4
            );
        } else {
            return t.cellHorizontalPadding * 2;
        }
    },
    provideEditor: () => ({
        editor: Editor,
        disablePadding: true,
        deletedValue: v => ({
            ...v,
            copyData: "",
            data: {
                ...v.data,
                value: [],
            },
        }),
    }),
    onPaste: (v, d) => {
        const values = v.split(",").map(s => s.trim());
        return {
            ...d,
            value: d.creatable
                ? values
                : prepareOptions(d.options)
                      .map(x => x.value)
                      .filter(x => values.includes(x)),
        };
    },
};

export default renderer;
