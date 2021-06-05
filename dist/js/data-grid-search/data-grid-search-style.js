"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchWrapper = void 0;

var _styles = require("../common/styles");

var _utils = require("../common/utils");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    position: absolute;\n    top: 4px;\n    right: 20px;\n\n    background-color: ", ";\n    color: ", ";\n\n    padding: 8px;\n    border: 1px solid ", ";\n\n    font-size: 13px;\n\n    transform: translateX(", "px);\n    transition: transform 0.15s;\n\n    .search-bar-inner {\n        display: flex;\n    }\n\n    .search-status {\n        margin-top: 4px;\n        font-size: 11px;\n    }\n\n    .search-progress {\n        position: absolute;\n        height: 4px;\n        left: 0;\n        bottom: 0;\n\n        background-color: ", ";\n    }\n\n    input {\n        width: 220px;\n        color: ", ";\n        border: none;\n        border-width: 0;\n        outline: none;\n    }\n\n    button {\n        width: 24px;\n        height: 24px;\n        padding: 0;\n\n        border: none;\n        outline: none;\n        background: none;\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        cursor: pointer;\n        color: ", ";\n\n        :hover {\n            color: ", ";\n        }\n\n        .button-icon {\n            width: 16px;\n            height: 16px;\n        }\n\n        :disabled {\n            ", "\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SearchWrapper = _styles.styled.div(_templateObject(), function (p) {
  return p.theme.bgColorLight;
}, function (p) {
  return p.theme.fgColorDark;
}, function (p) {
  return p.theme.borderColor;
}, function (p) {
  return p.showSearch ? 0 : 400;
}, function (p) {
  return p.theme.fgColorLight;
}, function (p) {
  return p.theme.fgColorDark;
}, function (p) {
  return p.theme.fgColorMedium;
}, function (p) {
  return p.theme.fgColorDark;
}, _utils.disabledProps);

exports.SearchWrapper = SearchWrapper;