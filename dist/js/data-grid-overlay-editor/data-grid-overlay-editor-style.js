"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataGridOverlayEditorStyle = void 0;

var _styles = require("../common/styles");

var _growingEntryStyle = require("../growing-entry/growing-entry-style");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    position: absolute;\n\n    box-sizing: border-box;\n\n    --overlay-top: ", "px;\n\n    left: ", "px;\n    top: ", "px;\n    min-width: ", "px;\n    min-height: ", "px;\n    max-width: 400px;\n    max-height: calc(100vh - ", "px);\n\n    border: 2px solid ", ";\n    background-color: ", ";\n\n    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);\n\n    font-family: Roboto, sans-serif;\n    font-size: 13px;\n\n    padding: 3px 6.5px 2px;\n\n    display: flex;\n\n    overflow-y: auto;\n    overflow-x: hidden;\n\n    input {\n        width: 100%;\n\n        border: none;\n        border-width: 0;\n        outline: none;\n    }\n\n    textarea {\n        border: none;\n        border-width: 0;\n        outline: none;\n    }\n\n    ", " {\n        height: 100%;\n    }\n\n    text-align: start;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DataGridOverlayEditorStyle = _styles.styled.div(_templateObject(), function (p) {
  return p.targetRect.y;
}, function (p) {
  return p.targetRect.x;
}, function (p) {
  return p.targetRect.y;
}, function (p) {
  return p.targetRect.width;
}, function (p) {
  return p.targetRect.height;
}, function (p) {
  return p.targetRect.y + 10;
}, function (p) {
  return p.theme.acceptColor;
}, function (p) {
  return p.theme.dataViewer.gridColor;
}, _growingEntryStyle.GrowingEntryStyle);

exports.DataGridOverlayEditorStyle = DataGridOverlayEditorStyle;