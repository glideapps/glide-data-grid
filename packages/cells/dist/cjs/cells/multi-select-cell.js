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
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveValues = exports.prepareOptions = void 0;
const React = __importStar(require("react"));
const glide_data_grid_1 = require("@glideapps/glide-data-grid");
const react_1 = require("@linaria/react");
const react_select_1 = __importStar(require("react-select"));
const creatable_1 = __importDefault(require("react-select/creatable"));
const BUBBLE_HEIGHT = 20;
const BUBBLE_PADDING = 6;
const BUBBLE_MARGIN = 4;
/* This prefix is used when allowDuplicates is enabled to make sure that
all underlying values are unique. */
const VALUE_PREFIX = "__value";
const VALUE_PREFIX_REGEX = new RegExp(`^${VALUE_PREFIX}\\d+__`);
const Wrap = /*#__PURE__*/react_1.styled('div')({
  name: "Wrap",
  class: "gdg-w1i61rz",
  propsAsIs: false
});
const PortalWrap = /*#__PURE__*/react_1.styled('div')({
  name: "PortalWrap",
  class: "gdg-phbadu4",
  propsAsIs: false
});
/**
 * Prepares the options for usage with the react-select component.
 *
 * @param options The options to prepare.
 * @returns The prepared options in the format required by react-select.
 */
const prepareOptions = options => {
  return options.map(option => {
    if (typeof option === "string" || option === null || option === undefined) {
      return {
        value: option,
        label: option ?? "",
        color: undefined
      };
    }
    return {
      value: option.value,
      label: option.label ?? option.value ?? "",
      color: option.color ?? undefined
    };
  });
};
exports.prepareOptions = prepareOptions;
/**
 * Resolve a list values to values compatible with react-select.
 * If allowDuplicates is true, the values will be prefixed with a numbered prefix to
 * make sure that all values are unique.
 *
 * @param values The values to resolve.
 * @param options The options to use for the resolution.
 * @param allowDuplicates If true, the values can contain duplicates.
 * @returns The list of values compatible with react-select.
 */
const resolveValues = (values, options, allowDuplicates) => {
  if (values === undefined || values === null) {
    return [];
  }
  return values.map((value, index) => {
    const valuePrefix = allowDuplicates ? `${VALUE_PREFIX}${index}__` : "";
    const matchedOption = options.find(option => {
      return option.value === value;
    });
    if (matchedOption) {
      return {
        ...matchedOption,
        value: `${valuePrefix}${matchedOption.value}`
      };
    }
    return {
      value: `${valuePrefix}${value}`,
      label: value
    };
  });
};
exports.resolveValues = resolveValues;
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
const Editor = p => {
  const {
    value: cell,
    initialValue,
    onChange,
    onFinishedEditing
  } = p;
  const {
    options: optionsIn,
    values: valuesIn,
    allowCreation,
    allowDuplicates
  } = cell.data;
  const theme = (0, glide_data_grid_1.useTheme)();
  const [value, setValue] = React.useState(valuesIn);
  const [menuOpen, setMenuOpen] = React.useState(true);
  const [inputValue, setInputValue] = React.useState(initialValue ?? "");
  const options = React.useMemo(() => {
    return (0, exports.prepareOptions)(optionsIn ?? []);
  }, [optionsIn]);
  const menuDisabled = allowCreation && allowDuplicates && options.length === 0;
  // Prevent the grid from handling the keydown as long as the menu is open:
  // This allows usage of enter without triggering the grid to finish editing.
  const onKeyDown = React.useCallback(e => {
    if (menuOpen) {
      e.stopPropagation();
    }
  }, [menuOpen]);
  // Apply styles to the react-select component.
  // All components: https://react-select.com/components
  const colorStyles = {
    control: base => ({
      ...base,
      border: 0,
      boxShadow: "none",
      backgroundColor: theme.bgCell
    }),
    menu: styles => ({
      ...styles,
      backgroundColor: theme.bgCell
    }),
    option: (styles, state) => {
      return {
        ...styles,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        color: theme.textDark,
        ...(state.isFocused ? {
          backgroundColor: theme.accentLight,
          cursor: "pointer"
        } : {}),
        ":active": {
          ...styles[":active"],
          color: theme.accentFg,
          backgroundColor: theme.accentColor
        }
      };
    },
    input: (styles, {
      isDisabled
    }) => {
      if (isDisabled) {
        return {
          display: "none"
        };
      }
      return {
        ...styles,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        color: theme.textDark
      };
    },
    placeholder: styles => {
      return {
        ...styles,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        color: theme.textLight
      };
    },
    noOptionsMessage: styles => {
      return {
        ...styles,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        color: theme.textLight
      };
    },
    clearIndicator: styles => {
      return {
        ...styles,
        color: theme.textLight,
        ":hover": {
          color: theme.textDark,
          cursor: "pointer"
        }
      };
    },
    multiValue: (styles, {
      data
    }) => {
      return {
        ...styles,
        backgroundColor: data.color ?? theme.bgBubble,
        borderRadius: `${theme.roundingRadius ?? BUBBLE_HEIGHT / 2}px`
      };
    },
    multiValueLabel: (styles, {
      data,
      isDisabled
    }) => {
      return {
        ...styles,
        paddingRight: isDisabled ? BUBBLE_PADDING : 0,
        paddingLeft: BUBBLE_PADDING,
        paddingTop: 0,
        paddingBottom: 0,
        color: data.color ?
        // If a color is set for this option,
        // we use it to determine the text color.
        (0, glide_data_grid_1.getLuminance)(data.color) > 0.5 ? "black" : "white" : theme.textBubble,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: BUBBLE_HEIGHT
      };
    },
    multiValueRemove: (styles, {
      data,
      isDisabled,
      isFocused
    }) => {
      if (isDisabled) {
        return {
          display: "none"
        };
      }
      return {
        ...styles,
        color: data.color ?
        // If a color is set for this option,
        // we use it to determine the text color.
        (0, glide_data_grid_1.getLuminance)(data.color) > 0.5 ? "black" : "white" : theme.textBubble,
        backgroundColor: undefined,
        borderRadius: isFocused ? `${theme.roundingRadius ?? BUBBLE_HEIGHT / 2}px` : undefined,
        ":hover": {
          cursor: "pointer"
        }
      };
    }
  };
  // This is used to submit the values to the grid.
  const submitValues = React.useCallback(values => {
    // Change the list of values to the actual values by removing the prefix.
    // This is only relevant in the case of allowDuplicates being true.
    const mappedValues = values.map(v => {
      return allowDuplicates && v.startsWith(VALUE_PREFIX) ? v.replace(new RegExp(VALUE_PREFIX_REGEX), "") : v;
    });
    setValue(mappedValues);
    onChange({
      ...cell,
      data: {
        ...cell.data,
        values: mappedValues
      }
    });
  }, [cell, onChange, allowDuplicates]);
  const handleKeyDown = event => {
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (!inputValue) {
          // If the user pressed enter or tab without entering anything,
          // we finish editing based on the current state.
          onFinishedEditing(cell, [0, 1]);
          return;
        }
        if (allowDuplicates && allowCreation) {
          // This is a workaround to allow the user to enter new values
          // multiple times.
          setInputValue("");
          submitValues([...(value ?? []), inputValue]);
          setMenuOpen(false);
          event.preventDefault();
        }
    }
  };
  const SelectComponent = allowCreation ? creatable_1.default : react_select_1.default;
  return React.createElement(Wrap, {
    onKeyDown: onKeyDown,
    "data-testid": "multi-select-cell"
  }, React.createElement(SelectComponent, {
    className: "gdg-multi-select",
    isMulti: true,
    isDisabled: cell.readonly,
    isClearable: true,
    isSearchable: true,
    inputValue: inputValue,
    onInputChange: setInputValue,
    options: options,
    placeholder: cell.readonly ? "" : allowCreation ? "Add..." : undefined,
    noOptionsMessage: input => {
      return allowCreation && allowDuplicates && input.inputValue ? `Create "${input.inputValue}"` : undefined;
    },
    menuIsOpen: cell.readonly ? false : menuOpen,
    onMenuOpen: () => setMenuOpen(true),
    onMenuClose: () => setMenuOpen(false),
    value: (0, exports.resolveValues)(value, options, allowDuplicates),
    onKeyDown: cell.readonly ? undefined : handleKeyDown,
    menuPlacement: "auto",
    menuPortalTarget: document.getElementById("portal"),
    autoFocus: true,
    openMenuOnFocus: true,
    openMenuOnClick: true,
    closeMenuOnSelect: true,
    backspaceRemovesValue: true,
    escapeClearsValue: false,
    styles: colorStyles,
    components: {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
      Menu: props => {
        if (menuDisabled) {
          return null;
        }
        return React.createElement(PortalWrap, null, React.createElement(CustomMenu, {
          className: "click-outside-ignore",
          ...props
        }));
      }
    },
    onChange: async e => {
      if (e === null) {
        return;
      }
      submitValues(e.map(x => x.value));
    }
  }));
};
const renderer = {
  kind: glide_data_grid_1.GridCellKind.Custom,
  isMatch: c => c.data.kind === "multi-select-cell",
  draw: (args, cell) => {
    const {
      ctx,
      theme,
      rect,
      highlighted
    } = args;
    const {
      values,
      options: optionsIn
    } = cell.data;
    if (values === undefined || values === null) {
      return true;
    }
    const options = (0, exports.prepareOptions)(optionsIn ?? []);
    const drawArea = {
      x: rect.x + theme.cellHorizontalPadding,
      y: rect.y + theme.cellVerticalPadding,
      width: rect.width - 2 * theme.cellHorizontalPadding,
      height: rect.height - 2 * theme.cellVerticalPadding
    };
    const rows = Math.max(1, Math.floor(drawArea.height / (BUBBLE_HEIGHT + BUBBLE_PADDING)));
    let {
      x
    } = drawArea;
    let row = 1;
    let y = rows === 1 ? drawArea.y + (drawArea.height - BUBBLE_HEIGHT) / 2 : drawArea.y + (drawArea.height - rows * BUBBLE_HEIGHT - (rows - 1) * BUBBLE_PADDING) / 2;
    for (const value of values) {
      const matchedOption = options.find(t => t.value === value);
      const color = matchedOption?.color ?? (highlighted ? theme.bgBubbleSelected : theme.bgBubble);
      const displayText = matchedOption?.label ?? value;
      const metrics = (0, glide_data_grid_1.measureTextCached)(displayText, ctx);
      const width = metrics.width + BUBBLE_PADDING * 2;
      const textY = BUBBLE_HEIGHT / 2;
      if (x !== drawArea.x && x + width > drawArea.x + drawArea.width && row < rows) {
        row++;
        y += BUBBLE_HEIGHT + BUBBLE_PADDING;
        x = drawArea.x;
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      (0, glide_data_grid_1.roundedRect)(ctx, x, y, width, BUBBLE_HEIGHT, theme.roundingRadius ?? BUBBLE_HEIGHT / 2);
      ctx.fill();
      // If a color is set for this option, we use either black or white as the text color depending on the background.
      // Otherwise, use the configured textBubble color.
      ctx.fillStyle = matchedOption?.color ? (0, glide_data_grid_1.getLuminance)(color) > 0.5 ? "#000000" : "#ffffff" : theme.textBubble;
      ctx.fillText(displayText, x + BUBBLE_PADDING, y + textY + (0, glide_data_grid_1.getMiddleCenterBias)(ctx, theme));
      x += width + BUBBLE_MARGIN;
      if (x > drawArea.x + drawArea.width + theme.cellHorizontalPadding && row >= rows) {
        break;
      }
    }
    return true;
  },
  measure: (ctx, cell, t) => {
    const {
      values,
      options
    } = cell.data;
    if (!values) {
      return t.cellHorizontalPadding * 2;
    }
    // Resolve the values to the actual display labels:
    const labels = (0, exports.resolveValues)(values, (0, exports.prepareOptions)(options ?? []), cell.data.allowDuplicates).map(x => x.label ?? x.value);
    return labels.reduce((acc, data) => ctx.measureText(data).width + acc + BUBBLE_PADDING * 2 + BUBBLE_MARGIN, 0) + 2 * t.cellHorizontalPadding - 4;
  },
  provideEditor: () => ({
    editor: Editor,
    disablePadding: true,
    deletedValue: v => ({
      ...v,
      copyData: "",
      data: {
        ...v.data,
        values: []
      }
    })
  }),
  onPaste: (val, cell) => {
    if (!val || !val.trim()) {
      // Empty values should result in empty strings
      return {
        ...cell,
        values: []
      };
    }
    let values = val.split(",").map(s => s.trim());
    if (!cell.allowDuplicates) {
      // Remove all duplicates
      values = values.filter((v, index) => values.indexOf(v) === index);
    }
    if (!cell.allowCreation) {
      // Only allow values that are part of the options:
      const options = (0, exports.prepareOptions)(cell.options ?? []);
      values = values.filter(v => options.find(o => o.value === v));
    }
    if (values.length === 0) {
      // We were not able to parse any values, return undefined to
      // not change the cell value.
      return undefined;
    }
    return {
      ...cell,
      values
    };
  }
};
exports.default = renderer;

