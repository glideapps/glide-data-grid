import{R as n}from"./iframe-DPg-y61j.js";import{D as u}from"./data-editor-all-Cz7LUH88.js";import{B as a,D as s,u as m,d as p}from"./utils-CmnmZJ4c.js";import{S as g}from"./story-utils-ClR13Xy3.js";import"./image-window-loader-CNunBHwY.js";import"./throttle-0ZFJsqod.js";import"./marked.esm-C6zVSTXC.js";import"./flatten-Bh33zcF_.js";import"./scrolling-data-grid-CFwQxEVk.js";import"./index-D_kXk1yT.js";import"./index.esm-CmK_US7f.js";import"./index-BsW4W0HJ.js";const E={title:"Glide-Data-Grid/DataEditor Demos",decorators:[e=>n.createElement(g,null,n.createElement(a,{title:"Input blending",description:n.createElement(s,null,"Input blending can be enabled or disable between row, column, and range selections. Multi-selections can also be enabled or disabled with the same level of granularity.")},n.createElement(e,null)))]},t=e=>{const{cols:i,getCellContent:c}=m(30);return n.createElement(u,{...p,rowMarkers:e.rowMultiSelect==="none"?"number":"both",keybindings:{clear:!0,copy:!0,downFill:!0,rightFill:!0,pageDown:!0,pageUp:!0,paste:!0,search:!0,selectAll:!0,selectColumn:!0,selectRow:!0},getCellsForSelection:!0,rangeSelect:e.rangeMultiSelect,columnSelect:e.columnMultiSelect,rowSelect:e.rowMultiSelect,rangeSelectionBlending:e.rangeBlending,columnSelectionBlending:e.columnBlending,rowSelectionBlending:e.rowBlending,getCellContent:c,columns:i,rows:1e4})};t.args={rangeBlending:"mixed",columnBlending:"mixed",rowBlending:"mixed",rangeMultiSelect:"rect",columnMultiSelect:"multi",rowMultiSelect:"multi"};t.argTypes={rangeBlending:{control:{type:"select"},options:["mixed","exclusive"]},columnBlending:{control:{type:"select"},options:["mixed","exclusive"]},rowBlending:{control:{type:"select"},options:["mixed","exclusive"]},rangeMultiSelect:{control:{type:"select"},options:["none","cell","rect","multi-cell","multi-rect"]},columnMultiSelect:{control:{type:"select"},options:["none","single","multi"]},rowMultiSelect:{control:{type:"select"},options:["none","single","multi"]}};var l,r,o;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(30);
  return <DataEditor {...defaultProps} rowMarkers={p.rowMultiSelect === "none" ? "number" : "both"} keybindings={{
    clear: true,
    copy: true,
    downFill: true,
    rightFill: true,
    pageDown: true,
    pageUp: true,
    paste: true,
    search: true,
    selectAll: true,
    selectColumn: true,
    selectRow: true
  }} getCellsForSelection={true} rangeSelect={p.rangeMultiSelect} columnSelect={p.columnMultiSelect} rowSelect={p.rowMultiSelect} rangeSelectionBlending={p.rangeBlending} columnSelectionBlending={p.columnBlending} rowSelectionBlending={p.rowBlending} getCellContent={getCellContent} columns={cols} rows={10_000} />;
}`,...(o=(r=t.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const k=["InputBlending"];export{t as InputBlending,k as __namedExportsOrder,E as default};
