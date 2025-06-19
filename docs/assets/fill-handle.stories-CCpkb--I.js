import{R as e}from"./iframe-C1-tNiF2.js";import{D as R}from"./data-editor-all-DmhSNLJC.js";import{B as g,D as f,M as k,P as E,u as h,c as b,d as D}from"./utils-xL8XIxQl.js";import{G as F}from"./image-window-loader-CXb9j7hw.js";import{S as M}from"./story-utils-CDI4T5Xi.js";import"./throttle-SLdF8OvU.js";import"./flatten-DXbQYuqR.js";import"./scrolling-data-grid-BWhfxTgG.js";import"./marked.esm-D3slmJuh.js";import"./index-D_kXk1yT.js";import"./index.esm-BaHk0IuN.js";import"./index-CNGx-KVY.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e.createElement(M,null,e.createElement(g,{title:"Fill handle",description:e.createElement(e.Fragment,null,e.createElement(f,null,"Fill handles can be used to downfill data with the mouse."),e.createElement(k,null,"Just click and drag, the top row will be copied down. Enable using the"," ",e.createElement(E,null,"fillHandle")," prop."))},e.createElement(a,null)))]},o=()=>{const{cols:a,getCellContent:n,setCellValueRaw:s,setCellValue:d}=h(60,!1),[r,m]=e.useState(50),p=e.useCallback(l=>{let t=n(l);return l[0]===1&&t.kind===F.Text&&(t={...t,readonly:!0}),t},[n]),w=e.useCallback(()=>{const l=r;for(let t=0;t<6;t++){const C=n([t,l]);s([t,l],b(C))}m(t=>t+1)},[n,r,s]);return e.createElement(R,{...D,getCellContent:p,columns:a,rowMarkers:"both",onPaste:!0,fillHandle:!0,keybindings:{downFill:!0,rightFill:!0},onCellEdited:d,trailingRowOptions:{sticky:!0,tint:!0,hint:"New row..."},rows:r,onRowAppended:w})};var i,c,u;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = useMockDataGenerator(60, false);
  const [numRows, setNumRows] = React.useState(50);
  const getCellContentMangled = React.useCallback<typeof getCellContent>(i => {
    let val = getCellContent(i);
    if (i[0] === 1 && val.kind === GridCellKind.Text) {
      val = {
        ...val,
        readonly: true
      };
    }
    return val;
  }, [getCellContent]);
  const onRowAppended = React.useCallback(() => {
    const newRow = numRows;
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, newRow]);
      setCellValueRaw([c, newRow], clearCell(cell));
    }
    setNumRows(cv => cv + 1);
  }, [getCellContent, numRows, setCellValueRaw]);
  return <DataEditor {...defaultProps} getCellContent={getCellContentMangled} columns={cols} rowMarkers={"both"} onPaste={true} fillHandle={true} keybindings={{
    downFill: true,
    rightFill: true
  }} onCellEdited={setCellValue} trailingRowOptions={{
    sticky: true,
    tint: true,
    hint: "New row..."
  }} rows={numRows} onRowAppended={onRowAppended} />;
}`,...(u=(c=o.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const B=["FillHandle"];export{o as FillHandle,B as __namedExportsOrder,_ as default};
