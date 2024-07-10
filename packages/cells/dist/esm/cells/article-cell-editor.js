import * as React from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import { styled } from "@linaria/react";
const Wrapper = /*#__PURE__*/styled('div')({
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
    }, React.createElement(Viewer, {
      initialValue: p.value.data.markdown,
      usageStatistics: false
    }));
  }
  return React.createElement(Wrapper, {
    id: "gdg-markdown-wysiwyg",
    onKeyDown: onKeyDown
  }, React.createElement(Editor, {
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
export default ArticleCellEditor;

