"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UriOverlayEditorStyle = void 0;

var _styles = require("../../common/styles");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n\n    flex-grow: 1;\n\n    align-items: center;\n\n    .link-area {\n        flex-grow: 1;\n        flex-shrink: 1;\n\n        display: grid;\n\n        margin-right: 8px;\n    }\n\n    a {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n\n        color: ", ";\n        text-decoration: underline !important;\n    }\n\n    .edit-icon {\n        flex-shrink: 0;\n        width: 32px;\n        color: ", ";\n\n        cursor: pointer;\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        > * {\n            width: 24px;\n            height: 24px;\n        }\n    }\n\n    textarea {\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        width: 0px;\n        height: 0px;\n\n        opacity: 0;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var UriOverlayEditorStyle = _styles.styled.div(_templateObject(), function (p) {
  return p.theme.linkColor;
}, function (p) {
  return p.theme.acceptColor;
});

exports.UriOverlayEditorStyle = UriOverlayEditorStyle;