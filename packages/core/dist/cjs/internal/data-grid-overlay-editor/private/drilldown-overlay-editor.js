"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const React = __importStar(require("react"));
const react_1 = require("@linaria/react");
const DrilldownOverlayEditorStyle = /*#__PURE__*/react_1.styled('div')({
  name: "DrilldownOverlayEditorStyle",
  class: "gdg-d4zsq0x",
  propsAsIs: false
});
const DrilldownOverlayEditor = p => {
  const {
    drilldowns
  } = p;
  return React.createElement(DrilldownOverlayEditorStyle, null, drilldowns.map((d, i) => React.createElement("div", {
    key: i,
    className: "doe-bubble"
  }, d.img !== undefined && React.createElement("img", {
    src: d.img
  }), React.createElement("div", null, d.text))));
};
exports.default = DrilldownOverlayEditor;

