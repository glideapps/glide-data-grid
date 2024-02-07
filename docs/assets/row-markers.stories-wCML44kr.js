import{j as r,F as c,a as l}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{D as m}from"./data-editor-all-BRJ4jo8P.js";import{B as p,D as d,P as k,u,d as h}from"./utils-Pc9bIpez.js";import{S as b}from"./story-utils-K2EZnGjM.js";import"./iframe-bMSjurlU.js";import"../sb-preview/runtime.js";import"./image-window-loader-kcFVuRwy.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-QSoV3kaN.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const v={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>r(b,{children:r(p,{title:"Row markers",description:r(c,{children:l(d,{children:["Row Markers can be controlled by setting the ",r(k,{children:"rowMarkers"})," prop."]})}),children:r(o,{})})})]},e=o=>{const{cols:n,getCellContent:i}=u(10,!1);return r(m,{...h,getCellContent:i,verticalBorder:!1,rowMarkers:{kind:o.markers,checkboxStyle:"circle"},columns:n,rows:400})};e.args={markers:"both"};e.argTypes={markers:{control:{type:"select"},options:["both","checkbox","number","none","clickable-number","checkbox-visible"]}};var t,s,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(10, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} verticalBorder={false} rowMarkers={{
    kind: p.markers,
    checkboxStyle: "circle"
  }} columns={cols} rows={400} />;
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const _=["RowMarkers"];export{e as RowMarkers,_ as __namedExportsOrder,v as default};
