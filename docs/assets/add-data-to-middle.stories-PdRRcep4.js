import{j as n,a as d,F as R}from"./marked.esm-dbrxtycE.js";import{R as c}from"./index-BMVQvedj.js";import{D as h}from"./data-editor-all-BRJ4jo8P.js";import{B as g,D as y,M as D,K as k,u as M,c as b,d as A}from"./utils-Pc9bIpez.js";import{S as V}from"./story-utils-K2EZnGjM.js";import"./iframe-bMSjurlU.js";import"../sb-preview/runtime.js";import"./image-window-loader-kcFVuRwy.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-QSoV3kaN.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const z={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>n(V,{children:n(g,{title:"Add data to middle",description:d(R,{children:[n(y,{children:"You can return a different location to have the new row append take place."}),d(D,{children:["Note that ",n(k,{children:"insertIndex"}),' is zero-based while the number column on the left side of the grid is one-based, so inserting at index "4" creates a new row at "5"']})]}),children:n(s,{})})})]},o=s=>{const{cols:w,getCellContent:a,setCellValueRaw:l,setCellValue:C}=M(60,!1),[i,x]=c.useState(50),r=s.insertIndex,f=c.useCallback(async()=>{for(let e=i;e>r;e--)for(let t=0;t<6;t++)l([t,e],a([t,e-1]));for(let e=0;e<6;e++){const t=a([e,r]);l([e,r],b(t))}return x(e=>e+1),r},[a,i,l,r]);return n(h,{...A,getCellContent:a,columns:w,rowMarkers:"both",onCellEdited:C,trailingRowOptions:{hint:"New row...",sticky:!0,tint:!0},rows:i,onRowAppended:f})};o.args={insertIndex:10};o.argTypes={insertIndex:{control:{type:"range",min:1,max:48}}};var p,m,u;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue
  } = useMockDataGenerator(60, false);
  const [numRows, setNumRows] = React.useState(50);
  const index = p.insertIndex;
  const onRowAppended = React.useCallback(async () => {
    // shift rows below index down
    for (let y = numRows; y > index; y--) {
      for (let x = 0; x < 6; x++) {
        setCellValueRaw([x, y], getCellContent([x, y - 1]));
      }
    }
    for (let c = 0; c < 6; c++) {
      const cell = getCellContent([c, index]);
      setCellValueRaw([c, index], clearCell(cell));
    }
    setNumRows(cv => cv + 1);
    return index;
  }, [getCellContent, numRows, setCellValueRaw, index]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers={"both"} onCellEdited={setCellValue} trailingRowOptions={{
    hint: "New row...",
    sticky: true,
    tint: true
  }} rows={numRows} onRowAppended={onRowAppended} />;
}`,...(u=(m=o.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const Y=["AddDataToMiddle"];export{o as AddDataToMiddle,Y as __namedExportsOrder,z as default};
