import{j as t,a as c,F as R}from"./marked.esm-dbrxtycE.js";import{R as i}from"./index-BMVQvedj.js";import{D as g}from"./data-editor-all-kwt0I9Kc.js";import{B as f,D,M as k,K as A,u as E,c as b,d as V}from"./utils-rXlmyYaC.js";import{S as j}from"./story-utils-K2EZnGjM.js";import"./iframe-lQqvcp2b.js";import"../sb-preview/runtime.js";import"./image-window-loader-aMebukIX.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-AbyJF5mC.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const H={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>t(j,{children:t(f,{title:"Add data",description:c(R,{children:[t(D,{children:"Data can be added by clicking on the trailing row."}),c(k,{children:["Keyboard is also supported, just navigate past the last row and press"," ",t(A,{children:"Enter"})]})]}),children:t(o,{})})})]},n=()=>{const{cols:o,getCellContent:a,setCellValueRaw:l,setCellValue:w}=E(60,!1),[s,m]=i.useState(50),h=i.useCallback(()=>{const r=s;for(let e=0;e<o.length;e++){const C=a([e,r]);l([e,r],b(C))}m(e=>e+1)},[o.length,a,s,l]);return t(g,{...V,getCellContent:a,columns:o,rowMarkers:"both",onPaste:!0,onCellEdited:w,trailingRowOptions:{sticky:!1,tint:!0,hint:"New row..."},rows:s,onRowAppended:h})};var d,u,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
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
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers={"both"} onPaste={true} // we want to allow paste to just call onCellEdited
  onCellEdited={setCellValue} // Sets the mock cell content
  trailingRowOptions={{
    // How to get the trailing row to look right
    sticky: false,
    tint: true,
    hint: "New row..."
  }} rows={numRows} onRowAppended={onRowAppended} />;
}`,...(p=(u=n.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const I=["AddData"];export{n as AddData,I as __namedExportsOrder,H as default};
