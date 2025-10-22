import { styled } from "@linaria/react";
import * as React from "react";
function toCss(x) {
  if (typeof x === "string") return x;
  return `${x}px`;
}
const _exp = /*#__PURE__*/() => p => p.innerWidth;
const _exp2 = /*#__PURE__*/() => p => p.innerHeight;
const Wrapper = /*#__PURE__*/styled('div')({
  name: "Wrapper",
  class: "gdg-wmyidgi",
  propsAsIs: false,
  vars: {
    "wmyidgi-0": [_exp()],
    "wmyidgi-1": [_exp2()]
  }
});
export const DataEditorContainer = p => {
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

