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
const react_editor_1 = require("@toast-ui/react-editor");
const react_1 = require("@linaria/react");
const Wrapper = /*#__PURE__*/react_1.styled('div')({
  name: "Wrapper",
  class: "gdg-w1hnqk7o",
  propsAsIs: false
});
const ArticleCellEditor = p => {
  const [tempValue, setTempValue] = React.useState(p.value.data.markdown);
  const onKeyDown = React.useCallback(e => {
    e.stopPropagation();
  }, []);
  const onSave = React.useCallback(() => {
    p.onFinishedEditing({
      ...p.value,
      data: {
        ...p.value.data,
        markdown: tempValue
      }
    });
  }, [p, tempValue]);
  const onClose = React.useCallback(() => {
    p.onFinishedEditing(undefined);
  }, [p]);
  if (p.value.readonly) {
    return React.createElement(Wrapper, {
      id: "gdg-markdown-readonly",
      onKeyDown: onKeyDown,
      style: {
        height: "75vh",
        padding: "35px"
      }
    }, React.createElement(react_editor_1.Viewer, {
      initialValue: p.value.data.markdown,
      usageStatistics: false
    }));
  }
  return React.createElement(Wrapper, {
    id: "gdg-markdown-wysiwyg",
    onKeyDown: onKeyDown
  }, React.createElement(react_editor_1.Editor, {
    initialEditType: "wysiwyg",
    autofocus: true,
    initialValue: p.value.data.markdown,
    hideModeSwitch: true,
    onChange: setTempValue,
    height: "75vh",
    usageStatistics: false,
    toolbarItems: [["heading", "bold", "italic", "strike"], ["hr", "quote"], ["ul", "ol", "task", "indent", "outdent"], ["table", "link"], ["code", "codeblock"]]
  }), React.createElement("div", {
    className: "gdg-footer"
  }, React.createElement("button", {
    className: "gdg-close-button",
    onClick: onClose
  }, "Close"), React.createElement("button", {
    className: "gdg-save-button",
    onClick: onSave
  }, "Save")));
};
exports.default = ArticleCellEditor;

