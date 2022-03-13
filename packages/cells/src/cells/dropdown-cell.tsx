import { CustomCell, ProvideEditorCallback } from "@glideapps/glide-data-grid";
import styled from "styled-components";
import * as React from "react";
import Select, { MenuProps, components } from "react-select";
import { CustomCellRenderer } from "../types";

interface CustomMenuProps extends MenuProps<any> {}

export class CustomMenu extends React.Component<CustomMenuProps> {
    render() {
        const { Menu } = components;
        const { children, ...props } = this.props;
        return <Menu {...props}>{children}</Menu>;
    }
}

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
`;

const editor: ProvideEditorCallback<DropdownCell> = () => {
    // eslint-disable-next-line react/display-name
    const result: ReturnType<ProvideEditorCallback<DropdownCell>> = p => {
        const { value: cell, onFinishedEditing } = p;
        const { allowedValues, value: valueIn } = cell.data;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = React.useState(valueIn);

        return (
            <Wrap>
                <Select
                    value={{ value, label: value }}
                    styles={{
                        control: base => ({
                            ...base,
                            border: 0,
                            boxShadow: "none",
                        }),
                    }}
                    menuPortalTarget={document.getElementById("portal")}
                    autoFocus={true}
                    openMenuOnFocus={true}
                    components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                        Menu: props => <CustomMenu className={"click-outside-ignore"} {...props} />,
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
    result.disablePadding = true;

    return result;
};

const renderer: CustomCellRenderer<DropdownCell> = {
    isMatch: (c): c is DropdownCell => (c.data as any).kind === "dropdown-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { value } = cell.data;
        ctx.fillStyle = theme.textDark;
        ctx.fillText(value, rect.x + theme.cellHorizontalPadding, rect.y + rect.height / 2);

        return true;
    },
    provideEditor: editor,
};

export default renderer;
