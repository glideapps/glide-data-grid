import{R as e}from"./iframe-DvQ8_lQU.js";import{D as k}from"./data-editor-all-KwlQitOx.js";import{B as y,D as F,M as H,P as v,u as M,c as G,d as V}from"./utils-DbfckF8m.js";import{G as z}from"./image-window-loader-B2G_WoyH.js";import{S as N}from"./story-utils-rfSg_w8P.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-CxLmvQkw.js";import"./flatten-B4uaeP2E.js";import"./scrolling-data-grid-ieZ08qph.js";import"./marked.esm-Chqd-LbM.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const W={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e.createElement(N,null,e.createElement(y,{title:"Fill handle",description:e.createElement(e.Fragment,null,e.createElement(F,null,"Fill handles can be used to downfill data with the mouse."),e.createElement(H,null,"Just click and drag, the top row will be copied down. Enable using the"," ",e.createElement(v,null,"fillHandle")," prop."))},e.createElement(a,null)))],argTypes:{fillHandleEnabled:{control:"boolean",name:"fillHandle enabled"},shape:{control:{type:"inline-radio"},options:["square","circle"],name:"shape"},size:{control:{type:"number"},name:"size"},offsetX:{control:{type:"number"},name:"offsetX"},offsetY:{control:{type:"number"},name:"offsetY"},outline:{control:{type:"number"},name:"outline"},allowedFillDirections:{control:{type:"inline-radio"},options:["horizontal","vertical","orthogonal","any"],name:"allowedFillDirections"}},args:{fillHandleEnabled:!0,shape:"square",size:4,offsetX:-2,offsetY:-2,outline:0,allowedFillDirections:"orthogonal"}},o=({fillHandleEnabled:a,shape:u,size:m,offsetX:p,offsetY:f,outline:w,allowedFillDirections:C})=>{const{cols:g,getCellContent:t,setCellValueRaw:s,setCellValue:R}=M(60,!1),[r,b]=e.useState(50),h=e.useCallback(n=>{let l=t(n);return n[0]===1&&l.kind===z.Text&&(l={...l,readonly:!0}),l},[t]),E=e.useCallback(()=>{const n=r;for(let l=0;l<6;l++){const D=t([l,n]);s([l,n],G(D))}b(l=>l+1)},[t,r,s]);return e.createElement(k,{...V,getCellContent:h,columns:g,rowMarkers:"both",onPaste:!0,fillHandle:a?{shape:u,size:m,offsetX:p,offsetY:f,outline:w}:!1,allowedFillDirections:C,keybindings:{downFill:!0,rightFill:!0},onCellEdited:R,trailingRowOptions:{sticky:!0,tint:!0,hint:"New row..."},rows:r,onRowAppended:E})};var i,c,d;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`({
  fillHandleEnabled,
  shape,
  size,
  offsetX,
  offsetY,
  outline,
  allowedFillDirections
}) => {
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
  return <DataEditor {...defaultProps} getCellContent={getCellContentMangled} columns={cols} rowMarkers={"both"} onPaste={true} fillHandle={fillHandleEnabled ? {
    shape,
    size,
    offsetX,
    offsetY,
    outline
  } : false} allowedFillDirections={allowedFillDirections} keybindings={{
    downFill: true,
    rightFill: true
  }} onCellEdited={setCellValue} trailingRowOptions={{
    sticky: true,
    tint: true,
    hint: "New row..."
  }} rows={numRows} onRowAppended={onRowAppended} />;
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const I=["FillHandle"];export{o as FillHandle,I as __namedExportsOrder,W as default};
