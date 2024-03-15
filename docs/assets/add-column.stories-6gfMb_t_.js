import{j as r,a as l,F as i}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{D as c}from"./data-editor-all-x3Z0J_KE.js";import{B as p,D as u,M as d,u as C,d as f}from"./utils-TaWgF9d_.js";import{S as g}from"./story-utils-K2EZnGjM.js";import"./iframe-WiXKo5C8.js";import"../sb-preview/runtime.js";import"./image-window-loader-OdeDDfWK.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-mah7XTYW.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const B={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>r(g,{children:r(p,{title:"Add and remove columns",description:l(i,{children:[r(u,{children:"You can add and remove columns at your disposal"}),r(d,{children:"Use the story's controls to change the number of columns"})]}),children:r(t,{})})})]},o=t=>{const{cols:a,getCellContent:m}=C(t.columnsCount);return r(c,{...f,rowMarkers:"number",getCellContent:m,experimental:{strict:!0},columns:a,rows:1e4})};o.args={columnsCount:10};o.argTypes={columnsCount:{control:{type:"range",min:2,max:200}}};var e,s,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(p.columnsCount);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContent} experimental={{
    strict: true
  }} columns={cols} rows={10_000} />;
}`,...(n=(s=o.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const F=["AddColumns"];export{o as AddColumns,F as __namedExportsOrder,B as default};
