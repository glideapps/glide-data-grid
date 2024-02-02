import{j as r,a as i}from"./marked.esm-dbrxtycE.js";import{D as p}from"./data-editor-all-ATY7qU3b.js";import{B as c,D as u,P as d,u as C,d as f}from"./utils-wFAOo4Dx.js";import{S as z}from"./story-utils-K2EZnGjM.js";import"./index-BMVQvedj.js";import"./iframe-ni8xiI1Q.js";import"../sb-preview/runtime.js";import"./image-window-loader-hgJATaim.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-ta-GKPbC.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const S={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>r(z,{children:r(c,{title:"Freeze columns",description:i(u,{children:["Columns at the start of your grid can be frozen in place by settings"," ",r(d,{children:"freezeColumns"})," to a number greater than 0."]}),children:r(o,{})})})]},e=o=>{const{cols:n,getCellContent:m}=C(100);return r(p,{...f,rowMarkers:"both",freezeColumns:o.freezeColumns,getCellContent:m,columns:n,verticalBorder:l=>l>0,rows:1e3})};e.argTypes={freezeColumns:{control:{type:"range",min:0,max:10}}};e.args={freezeColumns:1};var t,s,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`(p: {
  freezeColumns: number;
}) => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  return <DataEditor {...defaultProps} rowMarkers="both" freezeColumns={p.freezeColumns} getCellContent={getCellContent} columns={cols} verticalBorder={c => c > 0} rows={1000} />;
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const _=["FreezeColumns"];export{e as FreezeColumns,_ as __namedExportsOrder,S as default};
