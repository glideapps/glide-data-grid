import{R as e}from"./iframe-DuKzhFAV.js";import{D as d}from"./data-editor-all-h01LK8X1.js";import{B as u,D as m,P as c,M as p,u as f,d as C}from"./utils-CXj6_Jia.js";import{G as D}from"./image-window-loader-D4WXs3fS.js";import{S as E}from"./story-utils-BbqVCsEB.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-C9zA5J5l.js";import"./flatten-mmeTaiPx.js";import"./scrolling-data-grid-BBESFY1a.js";import"./marked.esm-B1hMdrV8.js";import"./index-D_kXk1yT.js";import"./index.esm-CRvNmNkt.js";import"./index-Cfg5Tl68.js";const S={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(E,null,e.createElement(u,{title:"Validate data",description:e.createElement(e.Fragment,null,e.createElement(m,null,"Data can be validated using the ",e.createElement(c,null,"validateCell")," callback"),e.createElement(p,null,'This example only allows the word "Valid" inside text cells.'))},e.createElement(r,null)))]},a=()=>{const{cols:r,getCellContent:i,setCellValue:s}=f(60,!1);return e.createElement(d,{...C,getCellContent:i,columns:r,rowMarkers:"both",onPaste:!0,onCellEdited:s,rows:100,validateCell:(V,t)=>t.kind!==D.Text||t.data==="Valid"?!0:t.data.toLowerCase()==="valid"?{...t,data:"Valid",selectionRange:[0,3]}:!1})};var l,n,o;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
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
}`,...(o=(n=a.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const B=["ValidateData"];export{a as ValidateData,B as __namedExportsOrder,S as default};
