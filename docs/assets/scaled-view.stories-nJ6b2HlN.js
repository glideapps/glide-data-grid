import{j as e}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{D as l}from"./data-editor-all-7qGf1nmg.js";import{B as m,D as p,u as c,d}from"./utils-IRSZKvf9.js";import{S as u}from"./story-utils-K2EZnGjM.js";import"./iframe-AiCMyApU.js";import"../sb-preview/runtime.js";import"./image-window-loader-nvLgsaxj.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-SWWsfOyf.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const V={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e(u,{children:e(m,{title:"Scaled view",description:e(p,{children:"The data editor supports being scaled."}),scale:"0.5",children:e(r,{})})})]},o=()=>{const{cols:r,getCellContent:i,onColumnResize:n}=c(60);return e(l,{...d,getCellContent:i,columns:r,rowMarkers:"both",rows:500,onColumnResize:n})};var t,s,a;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" rows={500} onColumnResize={onColumnResize} />;
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const _=["ScaledView"];export{o as ScaledView,_ as __namedExportsOrder,V as default};
