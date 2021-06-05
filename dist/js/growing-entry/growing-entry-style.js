"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrowingEntryStyle = exports.ShadowBox = exports.InputBox = void 0;

var _styles = require("../common/styles");

var _styledComponents = require("styled-components");

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    position: relative;\n    margin-top: 5px;\n\n    min-width: 100%;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    visibility: hidden;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n    overflow-wrap: break-word;\n\n    width: 100%;\n\n    ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n\n    border-radius: 0px;\n\n    resize: none;\n    white-space: normal;\n    width: 100%;\n    overflow: hidden;\n    border: 0;\n    background-color: transparent;\n\n    ::placeholder {\n        color: ", ";\n    }\n\n    ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    font-size: 13px;\n    line-height: 16px;\n    font-family: Roboto, sans-serif;\n    color: ", ";\n    padding: 0;\n    margin: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var inputProps = (0, _styledComponents.css)(_templateObject(), function (p) {
  return p.theme.fgColorDark;
});

var InputBox = _styles.styled.textarea(_templateObject2(), function (p) {
  return p.theme.fgColorLight;
}, inputProps);

exports.InputBox = InputBox;

var ShadowBox = _styles.styled.div(_templateObject3(), inputProps);

exports.ShadowBox = ShadowBox;

var GrowingEntryStyle = _styles.styled.div(_templateObject4());

exports.GrowingEntryStyle = GrowingEntryStyle;