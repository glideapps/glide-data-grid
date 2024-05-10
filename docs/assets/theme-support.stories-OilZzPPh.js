import{j as e,a as s,F as C}from"./marked.esm-dbrxtycE.js";import{R as i}from"./index-BMVQvedj.js";import{D as R}from"./data-editor-all-ZqeXZrI7.js";import{a as S,B as w,D as k,P as x,M as D,d as H}from"./utils-Eaa2yR9r.js";import{S as F}from"./story-utils-K2EZnGjM.js";import"./iframe-CHucUuiQ.js";import"../sb-preview/runtime.js";import"./image-window-loader-KuvgVtpW.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-Lq0bpFDr.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e(F,{children:e(n,{})})]},y={accentColor:"#8c96ff",accentLight:"rgba(202, 206, 255, 0.253)",textDark:"#ffffff",textMedium:"#b8b8b8",textLight:"#a0a0a0",textBubble:"#ffffff",bgIconHeader:"#b8b8b8",fgIconHeader:"#000000",textHeader:"#a1a1a1",textHeaderSelected:"#000000",bgCell:"#16161b",bgCellMedium:"#202027",bgHeader:"#212121",bgHeaderHasFocus:"#474747",bgHeaderHovered:"#404040",bgBubble:"#212121",bgBubbleSelected:"#000000",bgSearchResult:"#423c24",borderColor:"rgba(225,225,225,0.2)",drilldownBorder:"rgba(225,225,225,0.4)",linkColor:"#4F5DFF",headerFontStyle:"bold 14px",baseFontStyle:"13px",fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif"},v={accentColor:"#8c96ff",accentLight:"rgba(202, 206, 255, 0.253)",textDark:"#ffffff",textMedium:"rgba(255, 255, 255, 0.9)",textLight:"rgba(255, 255, 255, 0.7)",textBubble:"#000000",bgIconHeader:"#880000",fgIconHeader:"#ff5555",textHeader:"rgba(0, 0, 0, 0.9)",textHeaderSelected:"#000000",bgCell:"#ff0000",bgCellMedium:"#ff4d4d",bgHeader:"#f3f300",bgHeaderHasFocus:"#eeee00",bgHeaderHovered:"#e0e000",bgBubble:"#ffff00",bgBubbleSelected:"#ffff00",bgSearchResult:"#423c24",borderColor:"#ffff00",drilldownBorder:"#ffff00",linkColor:"#4F5DFF",headerFontStyle:"bold 14px",baseFontStyle:"13px",fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",roundingRadius:6},o=()=>{const{cols:n,getCellContent:p,onColumnResize:m,setCellValue:r}=S(),[f,a]=i.useState({}),[l,b]=i.useState(1e3),h=i.useCallback(()=>{const g=l;b(t=>t+1);for(let t=0;t<6;t++)r([t,g],{displayData:"",data:""})},[l,r]);return e(w,{title:"Theme support",description:s(C,{children:[s(k,{children:["DataGrid respects the theme provided by the ",e(x,{children:"theme"})," prop."]}),s(D,{children:[e("button",{onClick:()=>a({}),children:"Light"})," or"," ",e("button",{onClick:()=>a(y),children:"Dark"})," even"," ",e("button",{onClick:()=>a(v),children:"Hotdog Stand"})]})]}),children:e(R,{...H,theme:f,getCellContent:p,columns:n,onRowAppended:h,trailingRowOptions:{tint:!0,sticky:!0},onCellEdited:r,onColumnResize:m,rows:l})})};var d,c,u;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
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
      setCellValue([c, newRow], ({
        displayData: "",
        data: ""
      } as any));
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
}`,...(u=(c=o.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const K=["ThemeSupport"];export{o as ThemeSupport,K as __namedExportsOrder,_ as default};
