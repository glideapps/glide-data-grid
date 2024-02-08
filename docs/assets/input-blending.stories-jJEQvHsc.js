import{j as n}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{D as u}from"./data-editor-all-yujqlsKV.js";import{B as s,D as a,u as p,d as m}from"./utils-yjoal4Mg.js";import{S as d}from"./story-utils-K2EZnGjM.js";import"./iframe-l9ryaD9P.js";import"../sb-preview/runtime.js";import"./image-window-loader-q2CaKJk6.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-bRzKuQe4.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const E={title:"Glide-Data-Grid/DataEditor Demos",decorators:[e=>n(d,{children:n(s,{title:"Input blending",description:n(a,{children:"Input blending can be enabled or disable between row, column, and range selections. Multi-selections can also be enabled or disabled with the same level of granularity."}),children:n(e,{})})})]},t=e=>{const{cols:i,getCellContent:c}=p(30);return n(u,{...m,rowMarkers:e.rowMultiSelect==="none"?"number":"both",keybindings:{clear:!0,copy:!0,downFill:!0,rightFill:!0,pageDown:!0,pageUp:!0,paste:!0,search:!0,selectAll:!0,selectColumn:!0,selectRow:!0},getCellsForSelection:!0,rangeSelect:e.rangeMultiSelect,columnSelect:e.columnMultiSelect,rowSelect:e.rowMultiSelect,rangeSelectionBlending:e.rangeBlending,columnSelectionBlending:e.columnBlending,rowSelectionBlending:e.rowBlending,getCellContent:c,columns:i,rows:1e4})};t.args={rangeBlending:"mixed",columnBlending:"mixed",rowBlending:"mixed",rangeMultiSelect:"rect",columnMultiSelect:"multi",rowMultiSelect:"multi"};t.argTypes={rangeBlending:{control:{type:"select"},options:["mixed","exclusive"]},columnBlending:{control:{type:"select"},options:["mixed","exclusive"]},rowBlending:{control:{type:"select"},options:["mixed","exclusive"]},rangeMultiSelect:{control:{type:"select"},options:["none","cell","rect","multi-cell","multi-rect"]},columnMultiSelect:{control:{type:"select"},options:["none","single","multi"]},rowMultiSelect:{control:{type:"select"},options:["none","single","multi"]}};var l,o,r;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`p => {
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
}`,...(r=(o=t.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const G=["InputBlending"];export{t as InputBlending,G as __namedExportsOrder,E as default};
