"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageOverlayEditorStyle = void 0;

var _styles = require("../../common/styles");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n\n    height: 100%;\n\n    .centering-container {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        height: 100%;\n\n        img,\n        canvas {\n            max-height: calc(100vh - var(--overlay-top) - 20px);\n            object-fit: contain;\n            user-select: none;\n        }\n\n        canvas {\n            max-width: 380px;\n        }\n    }\n\n    .edit-icon {\n        position: absolute;\n        top: 12px;\n        right: 0;\n        width: 48px;\n        height: 48px;\n        color: ", ";\n\n        cursor: pointer;\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        > * {\n            width: 24px;\n            height: 24px;\n        }\n    }\n\n    textarea {\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        width: 0px;\n        height: 0px;\n\n        opacity: 0;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ImageOverlayEditorStyle = _styles.styled.div(_templateObject(), function (p) {
  return p.theme.acceptColor;
});

exports.ImageOverlayEditorStyle = ImageOverlayEditorStyle;