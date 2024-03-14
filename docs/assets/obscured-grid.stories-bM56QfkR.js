import{j as o,a as n,F as c}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{D as u}from"./data-editor-all-GpgGLgAp.js";import{B as C,D as m,M as p,u as g,d as x}from"./utils-7mONzaSM.js";import{S as h}from"./story-utils-K2EZnGjM.js";import"./iframe-IBA1fIo6.js";import"../sb-preview/runtime.js";import"./image-window-loader-EipmoZrG.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-x65Jn_nE.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const S={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>o(h,{children:n(C,{title:"Obscured Data Grid",description:n(c,{children:[o(m,{children:"The data grid should respect being obscured by other elements"}),o(p,{children:"This is mostly a test area because its hard to test with unit tests."})]}),children:[o(r,{}),o("div",{style:{position:"absolute",top:0,left:"50%",width:"50%",height:"100%",background:"rgba(0,0,0,0.5)",zIndex:100}})]})})]},t=()=>{const{cols:r,getCellContent:i,setCellValue:d}=g(60,!1);return o(u,{...x,getCellContent:i,onItemHovered:e=>console.log("onItemHovered",e),onCellClicked:e=>console.log("onCellClicked",e),onHeaderClicked:e=>console.log("onHeaderClicked",e),onCellContextMenu:e=>console.log("onCellContextMenu",e),onHeaderContextMenu:e=>console.log("onHeaderContextMenu",e),columns:r,rowMarkers:"both",onPaste:!0,onCellEdited:d,trailingRowOptions:{sticky:!0,tint:!0,hint:"New row..."},rows:1e4})};var l,s,a;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(60, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} onItemHovered={x => console.log("onItemHovered", x)} onCellClicked={x => console.log("onCellClicked", x)} onHeaderClicked={x => console.log("onHeaderClicked", x)} onCellContextMenu={x => console.log("onCellContextMenu", x)} onHeaderContextMenu={x => console.log("onHeaderContextMenu", x)} columns={cols} rowMarkers={"both"} onPaste={true} // we want to allow paste to just call onCellEdited
  onCellEdited={setCellValue} // Sets the mock cell content
  trailingRowOptions={{
    // How to get the trailing row to look right
    sticky: true,
    tint: true,
    hint: "New row..."
  }} rows={10_000} />;
}`,...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const _=["ObscuredDataGrid"];export{t as ObscuredDataGrid,_ as __namedExportsOrder,S as default};
