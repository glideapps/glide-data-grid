import{j as i,s as y}from"./marked.esm-dbrxtycE.js";import{r as n}from"./index-BMVQvedj.js";import{B as x}from"./story-utils-K2EZnGjM.js";import{G as T}from"./scrolling-data-grid-Lq0bpFDr.js";import{G as c,O as D,m as b,g as H,C as l,P as I}from"./image-window-loader-KuvgVtpW.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./iframe-CHucUuiQ.js";import"../sb-preview/runtime.js";const k=y("div")({name:"InnerContainer",class:"i1iwi3t9",propsAsIs:!1}),G=o=>{if(o.kind!==c.Custom)return I.find(r=>r.kind===o.kind)},$={title:"Subcomponents/ScrollingDataGrid",decorators:[o=>i("div",{children:i(x,{width:1500,height:1e3,children:i(k,{children:i(o,{})})})})]};function d(){const[o,r]=n.useState(0),[g,m]=n.useState(0),[f,h]=n.useState(0),[v,p]=n.useState(0),C=n.useCallback((e,t,R)=>{r(e.x),m(e.y),h(t),p(R)},[]),w=n.useMemo(()=>{let e=0;return["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"].map(t=>({title:t,width:122+(e+=50)}))},[]),S=n.useCallback(([e,t])=>({kind:c.Text,displayData:`${e},${t} Testing things that are way too long`,data:`${e},${t} Testing things that are way too long`,allowOverlay:!0}),[]);return i(T,{getCellRenderer:G,onMouseMove:()=>{},rows:1e4,enableGroups:!1,clientSize:[1e3,1e3,0],resizeIndicator:"full",cellXOffset:o,cellYOffset:g,drawHeader:void 0,experimental:void 0,headerIcons:void 0,isDraggable:void 0,nonGrowWidth:1e3,onCanvasBlur:()=>{},onCanvasFocused:()=>{},onCellFocused:()=>{},onContextMenu:()=>{},onDragEnd:()=>{},onDragLeave:()=>{},onDragOverCell:()=>{},onDragStart:()=>{},onDrop:()=>{},onHeaderIndicatorClick:()=>{},onItemHovered:()=>{},onKeyDown:()=>{},onKeyUp:()=>{},onMouseDown:()=>{},onMouseUp:()=>{},canvasRef:void 0,className:void 0,drawCell:void 0,disabledRows:void 0,fillHandle:void 0,fixedShadowX:void 0,fixedShadowY:void 0,getGroupDetails:void 0,getRowThemeOverride:void 0,highlightRegions:void 0,imageWindowLoader:new D,onHeaderMenuClick:void 0,prelightCells:void 0,drawFocusRing:!0,initialSize:void 0,overscrollX:void 0,overscrollY:void 0,preventDiagonalScrolling:void 0,rightElement:void 0,rightElementProps:void 0,scrollRef:void 0,minColumnWidth:50,isFocused:!0,theme:b(H()),isFilling:!1,maxColumnWidth:500,accessibilityHeight:50,translateX:f,translateY:v,lockColumns:0,selection:{current:void 0,rows:l.empty(),columns:l.empty()},firstColAccessible:!0,groupHeaderHeight:34,headerHeight:44,freezeTrailingRows:0,hasAppendRow:!1,rowHeight:34,onVisibleRegionChanged:C,columns:w,getCellContent:S,freezeColumns:0,verticalBorder:()=>!0,smoothScrollX:!0,smoothScrollY:!0})}var a,s,u;d.parameters={...d.parameters,docs:{...(a=d.parameters)==null?void 0:a.docs,source:{originalSource:`function Simplenotest() {
  const [x, setX] = React.useState<number>(0);
  const [y, setY] = React.useState<number>(0);
  const [translateX, setTx] = React.useState<number | undefined>(0);
  const [translateY, setTy] = React.useState<number | undefined>(0);
  const onVisibleRegionChanged = React.useCallback((range: Rectangle, tx?: number, ty?: number) => {
    setX(range.x);
    setY(range.y);
    setTx(tx);
    setTy(ty);
  }, []);
  const columns = React.useMemo(() => {
    let j = 0;
    return ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"].map(t => ({
      title: t,
      width: 122 + (j += 50)
    }));
  }, []);
  const getCellContent = React.useCallback(([col, row]: Item): GridCell => ({
    kind: GridCellKind.Text,
    displayData: \`\${col},\${row} Testing things that are way too long\`,
    data: \`\${col},\${row} Testing things that are way too long\`,
    allowOverlay: true
  }), []);
  return <GridScroller getCellRenderer={getCellRenderer} onMouseMove={() => undefined} rows={10_000} enableGroups={false} clientSize={[1000, 1000, 0]} resizeIndicator="full" cellXOffset={x} cellYOffset={y} drawHeader={undefined} experimental={undefined} headerIcons={undefined} isDraggable={undefined} nonGrowWidth={1000} onCanvasBlur={() => undefined} onCanvasFocused={() => undefined} onCellFocused={() => undefined} onContextMenu={() => undefined} onDragEnd={() => undefined} onDragLeave={() => undefined} onDragOverCell={() => undefined} onDragStart={() => undefined} onDrop={() => undefined} onHeaderIndicatorClick={() => undefined} onItemHovered={() => undefined} onKeyDown={() => undefined} onKeyUp={() => undefined} onMouseDown={() => undefined} onMouseUp={() => undefined} canvasRef={undefined} className={undefined} drawCell={undefined} disabledRows={undefined} fillHandle={undefined} fixedShadowX={undefined} fixedShadowY={undefined} getGroupDetails={undefined} getRowThemeOverride={undefined} highlightRegions={undefined} imageWindowLoader={new ImageWindowLoaderImpl()} onHeaderMenuClick={undefined} prelightCells={undefined} drawFocusRing={true} initialSize={undefined} overscrollX={undefined} overscrollY={undefined} preventDiagonalScrolling={undefined} rightElement={undefined} rightElementProps={undefined} scrollRef={undefined} minColumnWidth={50} isFocused={true} theme={mergeAndRealizeTheme(getDefaultTheme())} isFilling={false} maxColumnWidth={500} accessibilityHeight={50} translateX={translateX} translateY={translateY} lockColumns={0} selection={{
    current: undefined,
    rows: CompactSelection.empty(),
    columns: CompactSelection.empty()
  }} firstColAccessible={true} groupHeaderHeight={34} headerHeight={44} freezeTrailingRows={0} hasAppendRow={false} rowHeight={34} onVisibleRegionChanged={onVisibleRegionChanged} columns={columns} getCellContent={getCellContent} freezeColumns={0} verticalBorder={() => true} smoothScrollX={true} smoothScrollY={true} />;
}`,...(u=(s=d.parameters)==null?void 0:s.docs)==null?void 0:u.source}}};const B=["Simplenotest"];export{d as Simplenotest,B as __namedExportsOrder,$ as default};
