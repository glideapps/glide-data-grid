import{j as e,a as d}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{D as m}from"./data-editor-all-v3SUrwQv.js";import{B as p,D as c,P as u,a as C,d as h}from"./utils-_crEUr6w.js";import{S as g}from"./story-utils-K2EZnGjM.js";import"./iframe-UFWDJmcQ.js";import"../sb-preview/runtime.js";import"./image-window-loader-2Fr7t2ou.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-By3ovTFU.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const V={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e(g,{children:e(p,{title:"Lotsa cell kinds",description:d(c,{children:["Data grid supports plenty cell kinds. Anything under ",e(u,{children:"GridCellKind"}),"."]}),children:e(o,{})})})]},t=()=>{const{cols:o,getCellContent:s,onColumnResize:i,setCellValue:a}=C();return e(m,{...h,getCellContent:s,columns:o,onCellEdited:a,onPaste:!0,onColumnResize:i,highlightRegions:[{color:"#ff00ff33",range:{x:1,y:1,width:3,height:3}}],rows:1e3})};var l,r,n;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} onCellEdited={setCellValue} onPaste={true}
  // rowHeight={55}
  onColumnResize={onColumnResize} highlightRegions={[{
    color: "#ff00ff33",
    range: {
      x: 1,
      y: 1,
      width: 3,
      height: 3
    }
  }]} rows={1000} />;
}`,...(n=(r=t.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const _=["AllCellKinds"];export{t as AllCellKinds,_ as __namedExportsOrder,V as default};
