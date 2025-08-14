import{R as e}from"./iframe-C8mbvmQ2.js";import{D as R}from"./data-editor-all-DSqmXH_k.js";import{B as C,D as h,u as g,c as f,d as k}from"./utils-D0Tmd5yw.js";import{S as E}from"./story-utils-DJ5zFs2S.js";import"./image-window-loader-198VS7YK.js";import"./throttle-BLtI0ZdS.js";import"./marked.esm-IQAEb1mq.js";import"./flatten-CXFNrBeO.js";import"./scrolling-data-grid-BWC3oosC.js";import"./index-D_kXk1yT.js";import"./index.esm-BHpqIr2Q.js";import"./index-CrV-JlDZ.js";const T={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(E,null,e.createElement(C,{title:"Freeze rows",description:e.createElement(e.Fragment,null,e.createElement(h,null,"Rows can be frozen to make sure the user always sees them."))},e.createElement(o,null)))]},n=()=>{const{cols:o,getCellContent:l,setCellValueRaw:s,setCellValue:w}=g(60,!1),[r,m]=e.useState(50),p=e.useCallback(()=>{const a=r;for(let t=0;t<o.length;t++){const d=l([t,a]);s([t,a],f(d))}m(t=>t+1)},[o.length,l,r,s]);return e.createElement(R,{...k,getCellContent:l,columns:o,rowMarkers:"both",freezeTrailingRows:2,experimental:{kineticScrollPerfHack:!0},onPaste:!0,onCellEdited:w,trailingRowOptions:{sticky:!0,tint:!0,hint:"New row..."},rows:r,onRowAppended:p})};var c,i,u;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
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
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers={"both"} freezeTrailingRows={2} experimental={{
    kineticScrollPerfHack: true
  }} onPaste={true} // we want to allow paste to just call onCellEdited
  onCellEdited={setCellValue} // Sets the mock cell content
  trailingRowOptions={{
    // How to get the trailing row to look right
    sticky: true,
    tint: true,
    hint: "New row..."
  }} rows={numRows} onRowAppended={onRowAppended} />;
}`,...(u=(i=n.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const y=["FreezeRows"];export{n as FreezeRows,y as __namedExportsOrder,T as default};
