import { CustomCell, ProvideEditorCallback, CustomCellRenderer, getMiddleCenterBias } from "@glideapps/glide-data-grid";
import styled, { useTheme } from "styled-components";
import * as React from "react";
import Select, { MenuProps, components } from "react-select";
import type { Theme } from "@glideapps/glide-data-grid";

interface CustomMenuProps extends MenuProps<any> {}

const CustomMenu: React.FC<CustomMenuProps> = p => {
    const { Menu } = components;
    const { children, ...rest } = p;
    return <Menu {...rest}>{children}</Menu>;
};

interface DropdownCellProps {
    readonly kind: "dropdown-cell";
    readonly value: string;
    readonly allowedValues: readonly string[];
    readonly readonly?: boolean;
}

export type DropdownCell = CustomCell<DropdownCellProps>;

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .glide-select {
        font-family: ${p => p.theme.fontFamily};
        font-size: ${p => p.theme.editorFontSize};
    }
`;

const PortalWrap = styled.div`
    font-family: ${p => p.theme.fontFamily};
    font-size: ${p => p.theme.editorFontSize};
    color: ${p => p.theme.textDark};

    > div {
        border-radius: 4px;
        border: 1px solid ${p => p.theme.borderColor};
    }
`;

const Editor: ReturnType<ProvideEditorCallback<DropdownCell>> = p => {
    const { value: cell, onFinishedEditing, initialValue } = p;
    const { allowedValues, value: valueIn } = cell.data;

    const [value, setValue] = React.useState(valueIn);
    const [inputValue, setInputValue] = React.useState(initialValue ?? "");

    const theme = useTheme() as Theme;

    return (
        <Wrap>
            <Select
                className="glide-select"
                inputValue={inputValue}
                onInputChange={setInputValue}
                menuPlacement={"auto"}
                value={{ value, label: value }}
                styles={{
                    control: base => ({
                        ...base,
                        border: 0,
                        boxShadow: "none",
                    }),
                }}
                theme={t => {
                    return {
                        ...t,
                        colors: {
                            ...t.colors,
                            neutral0: theme.bgCell, // this is both the background color AND the fg color of
                            // the selected item because of course it is.
                            neutral5: theme.bgCell,
                            neutral10: theme.bgCell,
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
                options={allowedValues.map(x => ({
                    value: x,
                    label: x,
                }))}
                onChange={e => {
                    if (e === null) return;
                    setValue(e.value);
                    onFinishedEditing({
                        ...cell,
                        data: {
                            ...cell.data,
                            value: e.value,
                        },
                    });
                }}
            />
        </Wrap>
    );
};

const renderer: CustomCellRenderer<DropdownCell> = {
    isMatch: (c): c is DropdownCell => (c.data as any).kind === "dropdown-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { value } = cell.data;
        ctx.fillStyle = theme.textDark;
        ctx.fillText(
            value,
            rect.x + theme.cellHorizontalPadding,
            rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme)
        );

        return true;
    },
    provideEditor: () => ({
        editor: Editor,
        disablePadding: true,
        deletedValue: v => ({
            ...v,
            copyData: "",
            data: {
                ...v.data,
                value: "",
            },
        }),
    }),
    onPaste: (v, d) => ({
        ...d,
        value: d.allowedValues.includes(v) ? v : d.value,
    }),
};

export default renderer;
