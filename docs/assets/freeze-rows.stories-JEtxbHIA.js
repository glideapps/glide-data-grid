import{j as t,F as h}from"./marked.esm-dbrxtycE.js";import{R as c}from"./index-BMVQvedj.js";import{D as C}from"./data-editor-all-x3Z0J_KE.js";import{B as g,D as f,u as k,c as D,d as S}from"./utils-TaWgF9d_.js";import{S as z}from"./story-utils-K2EZnGjM.js";import"./iframe-WiXKo5C8.js";import"../sb-preview/runtime.js";import"./image-window-loader-OdeDDfWK.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-mah7XTYW.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>t(z,{children:t(g,{title:"Freeze rows",description:t(h,{children:t(f,{children:"Rows can be frozen to make sure the user always sees them."})}),children:t(o,{})})})]},r=()=>{const{cols:o,getCellContent:n,setCellValueRaw:l,setCellValue:m}=k(60,!1),[s,p]=c.useState(50),d=c.useCallback(()=>{const a=s;for(let e=0;e<o.length;e++){const R=n([e,a]);l([e,a],D(R))}p(e=>e+1)},[o.length,n,s,l]);return t(C,{...S,getCellContent:n,columns:o,rowMarkers:"both",freezeTrailingRows:2,experimental:{kineticScrollPerfHack:!0},onPaste:!0,onCellEdited:m,trailingRowOptions:{sticky:!0,tint:!0,hint:"New row..."},rows:s,onRowAppended:d})};var i,u,w;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
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
}`,...(w=(u=r.parameters)==null?void 0:u.docs)==null?void 0:w.source}}};const v=["FreezeRows"];export{r as FreezeRows,v as __namedExportsOrder,_ as default};
