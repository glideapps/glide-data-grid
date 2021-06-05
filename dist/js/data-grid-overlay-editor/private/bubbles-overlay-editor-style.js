"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BubblesOverlayEditorStyle = void 0;

var _styles = require("../../common/styles");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    flex-wrap: wrap;\n\n    .boe-bubble {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        border-radius: 100px;\n\n        padding: 0 8px;\n        height: 20px;\n\n        background-color: ", ";\n        color: ", ";\n        margin: 2px;\n    }\n\n    textarea {\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        width: 0px;\n        height: 0px;\n\n        opacity: 0;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var BubblesOverlayEditorStyle = _styles.styled.div(_templateObject(), function (p) {
  return p.theme.dataViewer.bgBubble;
}, function (p) {
  return p.theme.fgColorDark;
});

exports.BubblesOverlayEditorStyle = BubblesOverlayEditorStyle;