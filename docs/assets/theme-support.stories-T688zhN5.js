import{R as e}from"./iframe-Cx8gvy1E.js";import{D as g}from"./data-editor-all-BgYYBmPH.js";import{a as h,B as C,D as R,P as S,M as w,d as k}from"./utils-aJXQjdMB.js";import{S as x}from"./story-utils-D65Y641Y.js";import"./image-window-loader-C9YYYyBz.js";import"./throttle-kM8s9ilK.js";import"./marked.esm-qCtXNNKQ.js";import"./flatten-DpASM6AF.js";import"./scrolling-data-grid-CikSAkxI.js";import"./index-D_kXk1yT.js";import"./index.esm-DoLLkpQu.js";import"./index-CX8JGE1I.js";const V={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(x,null,e.createElement(n,null))]},D={accentColor:"#8c96ff",accentLight:"rgba(202, 206, 255, 0.253)",textDark:"#ffffff",textMedium:"#b8b8b8",textLight:"#a0a0a0",textBubble:"#ffffff",bgIconHeader:"#b8b8b8",fgIconHeader:"#000000",textHeader:"#a1a1a1",textHeaderSelected:"#000000",bgCell:"#16161b",bgCellMedium:"#202027",bgHeader:"#212121",bgHeaderHasFocus:"#474747",bgHeaderHovered:"#404040",bgBubble:"#212121",bgBubbleSelected:"#000000",bgSearchResult:"#423c24",borderColor:"rgba(225,225,225,0.2)",drilldownBorder:"rgba(225,225,225,0.4)",linkColor:"#4F5DFF",headerFontStyle:"bold 14px",baseFontStyle:"13px",fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif"},H={accentColor:"#8c96ff",accentLight:"rgba(202, 206, 255, 0.253)",textDark:"#ffffff",textMedium:"rgba(255, 255, 255, 0.9)",textLight:"rgba(255, 255, 255, 0.7)",textBubble:"#000000",bgIconHeader:"#880000",fgIconHeader:"#ff5555",textHeader:"rgba(0, 0, 0, 0.9)",textHeaderSelected:"#000000",bgCell:"#ff0000",bgCellMedium:"#ff4d4d",bgHeader:"#f3f300",bgHeaderHasFocus:"#eeee00",bgHeaderHovered:"#e0e000",bgBubble:"#ffff00",bgBubbleSelected:"#ffff00",bgSearchResult:"#423c24",borderColor:"#ffff00",drilldownBorder:"#ffff00",linkColor:"#4F5DFF",headerFontStyle:"bold 14px",baseFontStyle:"13px",fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",roundingRadius:6},o=()=>{const{cols:n,getCellContent:d,onColumnResize:u,setCellValue:a}=h(),[m,r]=e.useState({}),[l,p]=e.useState(1e3),b=e.useCallback(()=>{const f=l;p(t=>t+1);for(let t=0;t<6;t++)a([t,f],{displayData:"",data:""})},[l,a]);return e.createElement(C,{title:"Theme support",description:e.createElement(e.Fragment,null,e.createElement(R,null,"DataGrid respects the theme provided by the ",e.createElement(S,null,"theme")," prop."),e.createElement(w,null,e.createElement("button",{onClick:()=>r({})},"Light")," or"," ",e.createElement("button",{onClick:()=>r(D)},"Dark")," even"," ",e.createElement("button",{onClick:()=>r(H)},"Hotdog Stand")))},e.createElement(g,{...k,theme:m,getCellContent:d,columns:n,onRowAppended:b,trailingRowOptions:{tint:!0,sticky:!0},onCellEdited:a,onColumnResize:u,rows:l}))};var s,i,c;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const [theme, setTheme] = React.useState<Partial<Theme>>({});
  const [numRows, setNumRows] = React.useState(1000);
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
  return <BeautifulWrapper title="Theme support" description={<>
                    <Description>
                        DataGrid respects the theme provided by the <PropName>theme</PropName> prop.
                    </Description>
                    <MoreInfo>
                        <button onClick={() => setTheme({})}>Light</button> or{" "}
                        <button onClick={() => setTheme(darkTheme)}>Dark</button> even{" "}
                        <button onClick={() => setTheme(hotdogStand)}>Hotdog Stand</button>
                    </MoreInfo>
                </>}>
            <DataEditor {...defaultProps} theme={theme} getCellContent={getCellContent} columns={cols} onRowAppended={onRowAppended} trailingRowOptions={{
      tint: true,
      sticky: true
    }} onCellEdited={setCellValue} onColumnResize={onColumnResize} rows={numRows} />
        </BeautifulWrapper>;
}`,...(c=(i=o.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const z=["ThemeSupport"];export{o as ThemeSupport,z as __namedExportsOrder,V as default};
