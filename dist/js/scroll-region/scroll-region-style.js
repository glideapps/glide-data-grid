"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollRegionStyle = void 0;

var _browserDetect = require("../common/browser-detect");

var _styles = require("../common/styles");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    .dvn-scroller {\n        overflow: ", ";\n        transform: translate3d(0, 0, 0);\n    }\n\n    .dvn-scroll-inner {\n        pointer-events: none;\n    }\n\n    .dvn-underlay > * {\n        position: absolute;\n        left: 0;\n        top: 0;\n    }\n\n    canvas {\n        outline: none;\n\n        * {\n            height: 0;\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ScrollRegionStyle = _styles.styled.div(_templateObject(), _browserDetect.browserIsSafari ? "scroll" : "auto");

exports.ScrollRegionStyle = ScrollRegionStyle;