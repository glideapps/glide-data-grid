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
exports.DataEditorContainer = void 0;
const react_1 = require("@linaria/react");
const React = __importStar(require("react"));
function toCss(x) {
  if (typeof x === "string") return x;
  return `${x}px`;
}
const _exp = /*#__PURE__*/() => p => p.innerWidth;
const _exp2 = /*#__PURE__*/() => p => p.innerHeight;
const Wrapper = /*#__PURE__*/react_1.styled('div')({
  name: "Wrapper",
  class: "gdg-wmyidgi",
  propsAsIs: false,
  vars: {
    "wmyidgi-0": [_exp()],
    "wmyidgi-1": [_exp2()]
  }
});
const DataEditorContainer = p => {
  const {
    inWidth,
    inHeight,
    children,
    ...rest
  } = p;
  return React.createElement(Wrapper, {
    innerHeight: toCss(inHeight),
    innerWidth: toCss(inWidth),
    ...rest
  }, children);
};
exports.DataEditorContainer = DataEditorContainer;

