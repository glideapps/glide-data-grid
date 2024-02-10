import{j as o,F as C}from"./marked.esm-dbrxtycE.js";import{R as c}from"./index-BMVQvedj.js";import{D as R}from"./data-editor-all-vh5PYcJs.js";import{B as f,D as h,u as D,c as g,d as x}from"./utils-O3xu-yRM.js";import{S as y}from"./story-utils-K2EZnGjM.js";import"./iframe-qD4w8K__.js";import"../sb-preview/runtime.js";import"./image-window-loader-ae1-l40w.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-GIDCmpe8.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const F={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>o(y,{children:o(f,{title:"Add data",description:o(C,{children:o(h,{children:"You can return a different location to have the new row append take place."})}),children:o(l,{})})})]},r=()=>{const{cols:l,getCellContent:n,setCellValueRaw:a,setCellValue:u}=D(60,!1),[s,m]=c.useState(50),w=c.useCallback(async()=>{for(let e=s;e>0;e--)for(let t=0;t<6;t++)a([t,e],n([t,e-1]));for(let e=0;e<6;e++){const t=n([e,0]);a([e,0],g(t))}return m(e=>e+1),"top"},[n,s,a]);return o(R,{...x,getCellContent:n,columns:l,rowMarkers:"both",onCellEdited:u,trailingRowOptions:{hint:"New row...",sticky:!0,tint:!0},rows:s,onRowAppended:w})};var i,p,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = useMockDataGenerator(60, false);
  const [numRows, setNumRows] = React.useState(50);
  const onRowAppended = React.useCallback(async () => {
    // shift all of the existing cells down
    for (let y = numRows; y > 0; y--) {
      for (let x = 0; x < 6; x++) {
        setCellValueRaw([x, y], getCellContent([x, y - 1]));
      }
    }
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, 0]);
      setCellValueRaw([c, 0], clearCell(cell));
    }
    setNumRows(cv => cv + 1);
    return ("top" as const);
  }, [getCellContent, numRows, setCellValueRaw]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers={"both"} onCellEdited={setCellValue} trailingRowOptions={{
    hint: "New row...",
    sticky: true,
    tint: true
  }} rows={numRows} onRowAppended={onRowAppended} />;
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const P=["AddDataToTop"];export{r as AddDataToTop,P as __namedExportsOrder,F as default};
