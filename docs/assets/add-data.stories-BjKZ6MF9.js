import{R as e}from"./iframe-DvQ8_lQU.js";import{D as C}from"./data-editor-all-KwlQitOx.js";import{B as g,D as R,M as h,K as f,u as E,c as D,d as k}from"./utils-DbfckF8m.js";import{S}from"./story-utils-rfSg_w8P.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-B2G_WoyH.js";import"./throttle-CxLmvQkw.js";import"./marked.esm-Chqd-LbM.js";import"./flatten-B4uaeP2E.js";import"./scrolling-data-grid-ieZ08qph.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(S,null,e.createElement(g,{title:"Add data",description:e.createElement(e.Fragment,null,e.createElement(R,null,"Data can be added by clicking on the trailing row."),e.createElement(h,null,"Keyboard is also supported, just navigate past the last row and press"," ",e.createElement(f,null,"Enter")))},e.createElement(o,null)))]},n=()=>{const{cols:o,getCellContent:l,setCellValueRaw:s,setCellValue:d}=E(60,!1),[a,m]=e.useState(50),p=e.useCallback(()=>{const r=a;for(let t=0;t<o.length;t++){const w=l([t,r]);s([t,r],D(w))}m(t=>t+1)},[o.length,l,a,s]);return e.createElement(C,{...k,getCellContent:l,columns:o,rangeSelectionColumnSpanning:!1,rowMarkers:"both",onPaste:!0,onCellEdited:d,trailingRowOptions:{sticky:!1,tint:!0,hint:"New row..."},rows:a,onRowAppended:p})};var c,i,u;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = useMockDataGenerator(60, false);
  const [numRows, setNumRows] = React.useState(50);
  const onRowAppended = React.useCallback(() => {
    const newRow = numRows;
    // our data source is a mock source that pre-fills data, so we are just clearing this here. You should not
    // need to do this.
    for (let c = 0; c < cols.length; c++) {
      const cell = getCellContent([c, newRow]);
      setCellValueRaw([c, newRow], clearCell(cell));
    }
    // Tell the data grid there is another row
    setNumRows(cv => cv + 1);
  }, [cols.length, getCellContent, numRows, setCellValueRaw]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rangeSelectionColumnSpanning={false} rowMarkers={"both"} onPaste={true} // we want to allow paste to just call onCellEdited
  onCellEdited={setCellValue} // Sets the mock cell content
  trailingRowOptions={{
    // How to get the trailing row to look right
    sticky: false,
    tint: true,
    hint: "New row..."
  }} rows={numRows} onRowAppended={onRowAppended} />;
}`,...(u=(i=n.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const x=["AddData"];export{n as AddData,x as __namedExportsOrder,_ as default};
