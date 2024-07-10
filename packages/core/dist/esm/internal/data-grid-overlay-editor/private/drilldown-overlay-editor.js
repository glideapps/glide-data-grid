import * as React from "react";
import { styled } from "@linaria/react";
const DrilldownOverlayEditorStyle = /*#__PURE__*/styled('div')({
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
export default DrilldownOverlayEditor;

