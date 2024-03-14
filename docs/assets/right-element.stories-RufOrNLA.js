import{j as t,a as d}from"./marked.esm-dbrxtycE.js";import{R as l}from"./index-BMVQvedj.js";import{D as g}from"./data-editor-all-GpgGLgAp.js";import{B as R,D as b,P as y,u as C,d as x}from"./utils-7mONzaSM.js";import{S as k}from"./story-utils-K2EZnGjM.js";import"./iframe-IBA1fIo6.js";import"../sb-preview/runtime.js";import"./image-window-loader-EipmoZrG.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-x65Jn_nE.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const T={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>t(k,{children:t(R,{title:"Right Element",description:d(b,{children:["A DOM element may be added as a trailer to the grid by using the"," ",t(y,{children:"rightElement"})," prop."]}),children:t(n,{})})})]},o=()=>{const{cols:n,getCellContent:m,setCellValue:a}=C(8,!1),u=l.useMemo(()=>n.map(s=>({...s,grow:1})),[n]),[r,w]=l.useState(300),h=l.useCallback(()=>{const s=r;w(e=>e+1);for(let e=0;e<6;e++)a([e,s],{displayData:"",data:""})},[r,a]);return t(g,{...x,getCellContent:m,columns:u,rowMarkers:"both",onCellEdited:a,trailingRowOptions:{hint:"New row...",sticky:!0,tint:!0},rows:r,onRowAppended:h,rightElementProps:{sticky:!0},rightElement:d("div",{style:{height:"100%",padding:"20px 20px 40px 20px",width:200,color:"black",whiteSpace:"pre-wrap",backgroundColor:"rgba(240, 240, 250, 0.2)",display:"flex",justifyContent:"center",alignItems:"center",boxShadow:"0 0 10px rgba(0, 0, 0, 0.15)",backdropFilter:"blur(12px)"},children:["This is a real DOM element. You can put whatever you want here. You can also size it as big as you want. ",`

`,"It also does not have to be sticky."]})})};var i,c,p;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(8, false);
  const columns = React.useMemo(() => cols.map(c => ({
    ...c,
    grow: 1
  })), [cols]);
  const [numRows, setNumRows] = React.useState(300);
  const onRowAppended = React.useCallback(() => {
    const newRow = numRows;
    setNumRows(cv => cv + 1);
    for (let c = 0; c < 6; c++) {
      setCellValue([c, newRow], ({
        displayData: "",
        data: ""
      } as any));
    }
  }, [numRows, setCellValue]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={columns} rowMarkers={"both"} onCellEdited={setCellValue} trailingRowOptions={{
    hint: "New row...",
    sticky: true,
    tint: true
  }} rows={numRows} onRowAppended={onRowAppended} rightElementProps={{
    sticky: true
  }} rightElement={<div style={{
    height: "100%",
    padding: "20px 20px 40px 20px",
    width: 200,
    color: "black",
    whiteSpace: "pre-wrap",
    backgroundColor: "rgba(240, 240, 250, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
    backdropFilter: "blur(12px)"
  }}>
                    This is a real DOM element. You can put whatever you want here. You can also size it as big as you
                    want. {"\\n\\n"}It also does not have to be sticky.
                </div>} />;
}`,...(p=(c=o.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const _=["RightElement"];export{o as RightElement,_ as __namedExportsOrder,T as default};
