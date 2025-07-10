import{R as e}from"./iframe-C9FNI4m0.js";import{D as w}from"./data-editor-all-CHbkwdka.js";import{B as g,D as h,P as R,u as b,d as E}from"./utils-CqcLcTat.js";import{S as y}from"./story-utils-D7boojzF.js";import"./image-window-loader-DYJfv2GP.js";import"./throttle-Ba3AGMok.js";import"./marked.esm-DDeLBihO.js";import"./flatten-B4LMMRSZ.js";import"./scrolling-data-grid-CGfYI2PI.js";import"./index-D_kXk1yT.js";import"./index.esm-BvVvgvCB.js";import"./index-kACBoQx9.js";const V={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(y,null,e.createElement(g,{title:"Right Element",description:e.createElement(h,null,"A DOM element may be added as a trailer to the grid by using the"," ",e.createElement(R,null,"rightElement")," prop.")},e.createElement(n,null)))]},o=()=>{const{cols:n,getCellContent:p,setCellValue:a}=b(8,!1),m=e.useMemo(()=>n.map(s=>({...s,grow:1})),[n]),[r,u]=e.useState(300),d=e.useCallback(()=>{const s=r;u(t=>t+1);for(let t=0;t<6;t++)a([t,s],{displayData:"",data:""})},[r,a]);return e.createElement(w,{...E,getCellContent:p,columns:m,rowMarkers:"both",onCellEdited:a,trailingRowOptions:{hint:"New row...",sticky:!0,tint:!0},rows:r,onRowAppended:d,rightElementProps:{sticky:!0},rightElement:e.createElement("div",{style:{height:"100%",padding:"20px 20px 40px 20px",width:200,color:"black",whiteSpace:"pre-wrap",backgroundColor:"rgba(240, 240, 250, 0.2)",display:"flex",justifyContent:"center",alignItems:"center",boxShadow:"0 0 10px rgba(0, 0, 0, 0.15)",backdropFilter:"blur(12px)"}},"This is a real DOM element. You can put whatever you want here. You can also size it as big as you want. ",`

`,"It also does not have to be sticky.")})};var l,i,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
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
      setCellValue([c, newRow], {
        displayData: "",
        data: ""
      } as any);
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
}`,...(c=(i=o.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const G=["RightElement"];export{o as RightElement,G as __namedExportsOrder,V as default};
