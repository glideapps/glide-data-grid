"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownOverlayEditorStyle = void 0;

var _styles = require("../../common/styles");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n\n    position: relative;\n\n    .edit-icon {\n        position: absolute;\n        top: -4px;\n        right: -4px;\n        width: 40px;\n        height: 40px;\n        color: ", ";\n\n        cursor: pointer;\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        > * {\n            width: 24px;\n            height: 24px;\n        }\n    }\n\n    textarea {\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        width: 0px;\n        height: 0px;\n\n        opacity: 0;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MarkdownOverlayEditorStyle = _styles.styled.div(_templateObject(), function (p) {
  return p.theme.acceptColor;
});

exports.MarkdownOverlayEditorStyle = MarkdownOverlayEditorStyle;