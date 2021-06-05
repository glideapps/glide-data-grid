"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberOverlayEditorStyle = void 0;

var _styles = require("../../common/styles");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NumberOverlayEditorStyle = _styles.styled.div(_templateObject());

exports.NumberOverlayEditorStyle = NumberOverlayEditorStyle;