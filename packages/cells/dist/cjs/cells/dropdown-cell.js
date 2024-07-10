"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const React = __importStar(require("react"));
const react_1 = require("@linaria/react");
const react_select_1 = __importStar(require("react-select"));
const glide_data_grid_1 = require("@glideapps/glide-data-grid");
const CustomMenu = p => {
  const {
    Menu
  } = react_select_1.components;
  const {
    children,
    ...rest
  } = p;
  return React.createElement(Menu, {
    ...rest
  }, children);
};
const Wrap = /*#__PURE__*/react_1.styled('div')({
  name: "Wrap",
  class: "gdg-wghi2zc",
  propsAsIs: false
});
const PortalWrap = /*#__PURE__*/react_1.styled('div')({
  name: "PortalWrap",
  class: "gdg-p13nj8j0",
  propsAsIs: false
});
// This is required since the padding is disabled for this cell type
// The settings are based on the "pad" settings in the data-grid-overlay-editor-style.tsx
const ReadOnlyWrap = /*#__PURE__*/react_1.styled('div')({
  name: "ReadOnlyWrap",
  class: "gdg-r6sia3g",
  propsAsIs: false
});
const Editor = p => {
  const {
    value: cell,
    onFinishedEditing,
    initialValue
  } = p;
  const {
    allowedValues,
    value: valueIn
  } = cell.data;
  const [value, setValue] = React.useState(valueIn);
  const [inputValue, setInputValue] = React.useState(initialValue ?? "");
  const theme = (0, glide_data_grid_1.useTheme)();
  const values = React.useMemo(() => {
    return allowedValues.map(option => {
      if (typeof option === "string" || option === null || option === undefined) {
        return {
          value: option,
          label: option?.toString() ?? ""
        };
      }
      return option;
    });
  }, [allowedValues]);
  if (cell.readonly) {
    return React.createElement(ReadOnlyWrap, null, React.createElement(glide_data_grid_1.TextCellEntry, {
      highlight: true,
      autoFocus: false,
      disabled: true,
      value: value ?? "",
      onChange: () => undefined
    }));
  }
  return React.createElement(Wrap, null, React.createElement(react_select_1.default, {
    className: "glide-select",
    inputValue: inputValue,
    onInputChange: setInputValue,
    menuPlacement: "auto",
    value: values.find(x => x.value === value),
    styles: {
      control: base => ({
        ...base,
        border: 0,
        boxShadow: "none"
      }),
      option: (base, {
        isFocused
      }) => ({
        ...base,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        cursor: isFocused ? "pointer" : undefined,
        paddingLeft: theme.cellHorizontalPadding,
        paddingRight: theme.cellHorizontalPadding,
        ":active": {
          ...base[":active"],
          color: theme.accentFg
        },
        // Add some content in case the option is empty
        // so that the option height can be calculated correctly
        ":empty::after": {
          content: '"&nbsp;"',
          visibility: "hidden"
        }
      })
    },
    theme: t => {
      return {
        ...t,
        colors: {
          ...t.colors,
          neutral0: theme.bgCell,
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
          primary25: theme.accentLight // prelight color
        }
      };
    },

    menuPortalTarget: document.getElementById("portal"),
    autoFocus: true,
    openMenuOnFocus: true,
    components: {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
      Menu: props => React.createElement(PortalWrap, null, React.createElement(CustomMenu, {
        className: "click-outside-ignore",
        ...props
      }))
    },
    options: values,
    onChange: async e => {
      if (e === null) return;
      setValue(e.value);
      await new Promise(r => window.requestAnimationFrame(r));
      onFinishedEditing({
        ...cell,
        data: {
          ...cell.data,
          value: e.value
        }
      });
    }
  }));
};
const renderer = {
  kind: glide_data_grid_1.GridCellKind.Custom,
  isMatch: c => c.data.kind === "dropdown-cell",
  draw: (args, cell) => {
    const {
      ctx,
      theme,
      rect
    } = args;
    const {
      value
    } = cell.data;
    const foundOption = cell.data.allowedValues.find(opt => {
      if (typeof opt === "string" || opt === null || opt === undefined) {
        return opt === value;
      }
      return opt.value === value;
    });
    const displayText = typeof foundOption === "string" ? foundOption : foundOption?.label ?? "";
    if (displayText) {
      ctx.fillStyle = theme.textDark;
      ctx.fillText(displayText, rect.x + theme.cellHorizontalPadding, rect.y + rect.height / 2 + (0, glide_data_grid_1.getMiddleCenterBias)(ctx, theme));
    }
    return true;
  },
  measure: (ctx, cell, theme) => {
    const {
      value
    } = cell.data;
    return (value ? ctx.measureText(value).width : 0) + theme.cellHorizontalPadding * 2;
  },
  provideEditor: () => ({
    editor: Editor,
    disablePadding: true,
    deletedValue: v => ({
      ...v,
      copyData: "",
      data: {
        ...v.data,
        value: ""
      }
    })
  }),
  onPaste: (v, d) => ({
    ...d,
    value: d.allowedValues.includes(v) ? v : d.value
  })
};
exports.default = renderer;

