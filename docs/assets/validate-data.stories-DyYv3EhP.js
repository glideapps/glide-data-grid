import{R as e}from"./iframe-BR7xuyxq.js";import{D as d}from"./data-editor-all-CYc0zstB.js";import{B as u,D as c,P as m,M as p,u as f,d as C}from"./utils-Cimubnom.js";import{G as D}from"./image-window-loader-CxzDuQ9s.js";import{S as E}from"./story-utils-CIsdngZT.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-Ddt7N8Q3.js";import"./flatten-Db_qbC0f.js";import"./scrolling-data-grid-B5dbQ4nv.js";import"./marked.esm-GWu2Uyfc.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const T={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>e.createElement(E,null,e.createElement(u,{title:"Validate data",description:e.createElement(e.Fragment,null,e.createElement(c,null,"Data can be validated using the ",e.createElement(m,null,"validateCell")," callback"),e.createElement(p,null,'This example only allows the word "Valid" inside text cells.'))},e.createElement(l,null)))]},a=()=>{const{cols:l,getCellContent:i,setCellValue:s}=f(60,!1);return e.createElement(d,{...C,getCellContent:i,columns:l,rowMarkers:"both",onPaste:!0,onCellEdited:s,rows:100,validateCell:(V,t)=>t.kind!==D.Text||t.data==="Valid"?!0:t.data.toLowerCase()==="valid"?{...t,data:"Valid",selectionRange:[0,3]}:!1})};var r,n,o;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(60, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers={"both"} onPaste={true} onCellEdited={setCellValue} rows={100} validateCell={(_cell, newValue) => {
    if (newValue.kind !== GridCellKind.Text) return true;
    if (newValue.data === "Valid") return true;
    if (newValue.data.toLowerCase() === "valid") {
      return {
        ...newValue,
        data: "Valid",
        selectionRange: [0, 3]
      };
    }
    return false;
  }} />;
}`,...(o=(n=a.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const S=["ValidateData"];export{a as ValidateData,S as __namedExportsOrder,T as default};
