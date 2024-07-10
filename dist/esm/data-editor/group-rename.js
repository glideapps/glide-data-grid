import React from "react";
import { styled } from "@linaria/react";
import ClickOutsideContainer from "../internal/click-outside-container/click-outside-container.js";
const _exp = /*#__PURE__*/() => p => Math.max(16, p.targetHeight - 10);
const RenameInput = /*#__PURE__*/styled('input')({
  name: "RenameInput",
  class: "gdg-r17m35ur",
  propsAsIs: false,
  vars: {
    "r17m35ur-0": [_exp(), "px"]
  }
});
export const GroupRename = p => {
  const {
    bounds,
    group,
    onClose,
    canvasBounds,
    onFinish
  } = p;
  const [value, setValue] = React.useState(group);
  return React.createElement(ClickOutsideContainer, {
    style: {
      position: "absolute",
      left: bounds.x - canvasBounds.left + 1,
      top: bounds.y - canvasBounds.top,
      width: bounds.width - 2,
      height: bounds.height
    },
    className: "gdg-c1tqibwd",
    onClickOutside: onClose
  }, React.createElement(RenameInput, {
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

