"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupRename = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@linaria/react");
const click_outside_container_js_1 = __importDefault(require("../internal/click-outside-container/click-outside-container.js"));
const _exp = /*#__PURE__*/() => p => Math.max(16, p.targetHeight - 10);
const RenameInput = /*#__PURE__*/react_2.styled('input')({
  name: "RenameInput",
  class: "gdg-r17m35ur",
  propsAsIs: false,
  vars: {
    "r17m35ur-0": [_exp(), "px"]
  }
});
const GroupRename = p => {
  const {
    bounds,
    group,
    onClose,
    canvasBounds,
    onFinish
  } = p;
  const [value, setValue] = react_1.default.useState(group);
  return react_1.default.createElement(click_outside_container_js_1.default, {
    style: {
      position: "absolute",
      left: bounds.x - canvasBounds.left + 1,
      top: bounds.y - canvasBounds.top,
      width: bounds.width - 2,
      height: bounds.height
    },
    className: "gdg-c1tqibwd",
    onClickOutside: onClose
  }, react_1.default.createElement(RenameInput, {
    targetHeight: bounds.height,
    "data-testid": "group-rename-input",
    value: value,
    onBlur: onClose,
    onFocus: e => e.target.setSelectionRange(0, value.length),
    onChange: e => setValue(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") {
        onFinish(value);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    autoFocus: true
  }));
};
exports.GroupRename = GroupRename;

