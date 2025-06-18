import{R as t}from"./iframe-sovjcoBX.js";import{D as w}from"./data-editor-all-BFQL8O0M.js";import{B as C,D as R,u as f,c as D,d as g}from"./utils-DqmYTUjP.js";import{S as E}from"./story-utils-C6XGsZzc.js";import"./image-window-loader-DcBr8jh5.js";import"./throttle-ByZ5WCOp.js";import"./marked.esm-BEWaOdLN.js";import"./flatten-C7S2_-_8.js";import"./scrolling-data-grid-DFmyGvCq.js";import"./index-D_kXk1yT.js";import"./index.esm-O1vvazls.js";import"./index-Cb6RtXuN.js";const v={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>t.createElement(E,null,t.createElement(C,{title:"Add data",description:t.createElement(t.Fragment,null,t.createElement(R,null,"You can return a different location to have the new row append take place."))},t.createElement(a,null)))]},l=()=>{const{cols:a,getCellContent:n,setCellValueRaw:r,setCellValue:p}=f(60,!1),[s,m]=t.useState(50),d=t.useCallback(async()=>{for(let e=s;e>0;e--)for(let o=0;o<6;o++)r([o,e],n([o,e-1]));for(let e=0;e<6;e++){const o=n([e,0]);r([e,0],D(o))}return m(e=>e+1),"top"},[n,s,r]);return t.createElement(w,{...g,getCellContent:n,columns:a,rowMarkers:"both",onCellEdited:p,trailingRowOptions:{hint:"New row...",sticky:!0,tint:!0},rows:s,onRowAppended:d})};var c,i,u;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
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
    return "top" as const;
  }, [getCellContent, numRows, setCellValueRaw]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers={"both"} onCellEdited={setCellValue} trailingRowOptions={{
    hint: "New row...",
    sticky: true,
    tint: true
  }} rows={numRows} onRowAppended={onRowAppended} />;
}`,...(u=(i=l.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const O=["AddDataToTop"];export{l as AddDataToTop,O as __namedExportsOrder,v as default};
