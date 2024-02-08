import{j as t,a as c,F as f}from"./marked.esm-dbrxtycE.js";import{R as s}from"./index-BMVQvedj.js";import{D as h}from"./data-editor-all-v3SUrwQv.js";import{B as k,D as b,M as D,P as F,u as M,c as v,d as y}from"./utils-_crEUr6w.js";import{G as E}from"./image-window-loader-2Fr7t2ou.js";import{S as G}from"./story-utils-K2EZnGjM.js";import"./iframe-UFWDJmcQ.js";import"../sb-preview/runtime.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-By3ovTFU.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const J={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>t(G,{children:t(k,{title:"Fill handle",description:c(f,{children:[t(b,{children:"Fill handles can be used to downfill data with the mouse."}),c(D,{children:["Just click and drag, the top row will be copied down. Enable using the"," ",t(F,{children:"fillHandle"})," prop."]})]}),children:t(r,{})})})]},o=()=>{const{cols:r,getCellContent:n,setCellValueRaw:i,setCellValue:m}=M(60,!1),[a,w]=s.useState(50),C=s.useCallback(l=>{let e=n(l);return l[0]===1&&e.kind===E.Text&&(e={...e,readonly:!0}),e},[n]),R=s.useCallback(()=>{const l=a;for(let e=0;e<6;e++){const g=n([e,l]);i([e,l],v(g))}w(e=>e+1)},[n,a,i]);return t(h,{...y,getCellContent:C,columns:r,rowMarkers:"both",onPaste:!0,fillHandle:!0,keybindings:{downFill:!0,rightFill:!0},onCellEdited:m,trailingRowOptions:{sticky:!0,tint:!0,hint:"New row..."},rows:a,onRowAppended:R})};var d,u,p;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
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
}`,...(p=(u=o.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const q=["FillHandle"];export{o as FillHandle,q as __namedExportsOrder,J as default};
