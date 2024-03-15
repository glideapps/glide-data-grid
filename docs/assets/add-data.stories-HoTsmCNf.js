import{j as t,a as i,F as g}from"./marked.esm-dbrxtycE.js";import{R as c}from"./index-BMVQvedj.js";import{D as R}from"./data-editor-all-x3Z0J_KE.js";import{B as f,D,M as k,K as S,u as A,c as E,d as b}from"./utils-TaWgF9d_.js";import{S as V}from"./story-utils-K2EZnGjM.js";import"./iframe-WiXKo5C8.js";import"../sb-preview/runtime.js";import"./image-window-loader-OdeDDfWK.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-mah7XTYW.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const H={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>t(V,{children:t(f,{title:"Add data",description:i(g,{children:[t(D,{children:"Data can be added by clicking on the trailing row."}),i(k,{children:["Keyboard is also supported, just navigate past the last row and press"," ",t(S,{children:"Enter"})]})]}),children:t(o,{})})})]},n=()=>{const{cols:o,getCellContent:a,setCellValueRaw:l,setCellValue:m}=A(60,!1),[s,w]=c.useState(50),h=c.useCallback(()=>{const r=s;for(let e=0;e<o.length;e++){const C=a([e,r]);l([e,r],E(C))}w(e=>e+1)},[o.length,a,s,l]);return t(R,{...b,getCellContent:a,columns:o,rangeSelectionColumnSpanning:!1,rowMarkers:"both",onPaste:!0,onCellEdited:m,trailingRowOptions:{sticky:!1,tint:!0,hint:"New row..."},rows:s,onRowAppended:h})};var d,u,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
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
}`,...(p=(u=n.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const I=["AddData"];export{n as AddData,I as __namedExportsOrder,H as default};
