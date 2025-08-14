import{r as e}from"./iframe-BxJ75zue.js";import{B as R}from"./story-utils-xaK5zcuj.js";import{G as y}from"./scrolling-data-grid-0KQV7TXJ.js";import{s as x}from"./marked.esm-D6bVTsu2.js";import{G as u,C as r,m as T,P as D,O as b,g as H}from"./image-window-loader-BrYBBD6d.js";import"./throttle-CacdULpy.js";const E=x("div")({name:"InnerContainer",class:"i1iwi3t9",propsAsIs:!1}),I=o=>{if(o.kind!==u.Custom)return b.find(d=>d.kind===o.kind)},O={title:"Subcomponents/ScrollingDataGrid",decorators:[o=>e.createElement("div",null,e.createElement(R,{width:1500,height:1e3},e.createElement(E,null,e.createElement(o,null))))]};function i(){const[o,d]=e.useState(0),[c,m]=e.useState(0),[g,f]=e.useState(0),[v,h]=e.useState(0),p=e.useCallback((n,t,S)=>{d(n.x),m(n.y),f(t),h(S)},[]),C=e.useMemo(()=>{let n=0;return["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"].map(t=>({title:t,width:122+(n+=50)}))},[]),w=e.useCallback(([n,t])=>({kind:u.Text,displayData:`${n},${t} Testing things that are way too long`,data:`${n},${t} Testing things that are way too long`,allowOverlay:!0}),[]);return e.createElement(y,{getCellRenderer:I,onMouseMove:()=>{},rows:1e4,enableGroups:!1,clientSize:[1e3,1e3,0],resizeIndicator:"full",cellXOffset:o,cellYOffset:c,drawHeader:void 0,experimental:void 0,headerIcons:void 0,isDraggable:void 0,nonGrowWidth:1e3,onCanvasBlur:()=>{},onCanvasFocused:()=>{},onCellFocused:()=>{},onContextMenu:()=>{},onDragEnd:()=>{},onDragLeave:()=>{},onDragOverCell:()=>{},onDragStart:()=>{},onDrop:()=>{},onHeaderIndicatorClick:()=>{},onItemHovered:()=>{},onKeyDown:()=>{},onKeyUp:()=>{},onMouseDown:()=>{},onMouseUp:()=>{},canvasRef:void 0,className:void 0,drawCell:void 0,disabledRows:void 0,fillHandle:void 0,fixedShadowX:void 0,fixedShadowY:void 0,getGroupDetails:void 0,getRowThemeOverride:void 0,highlightRegions:void 0,imageWindowLoader:new D,onHeaderMenuClick:void 0,prelightCells:void 0,drawFocusRing:!0,initialSize:void 0,overscrollX:void 0,overscrollY:void 0,preventDiagonalScrolling:void 0,rightElement:void 0,rightElementProps:void 0,scrollRef:void 0,minColumnWidth:50,isFocused:!0,theme:T(H()),isFilling:!1,maxColumnWidth:500,accessibilityHeight:50,translateX:g,translateY:v,lockColumns:0,selection:{current:void 0,rows:r.empty(),columns:r.empty()},firstColAccessible:!0,groupHeaderHeight:34,headerHeight:44,freezeTrailingRows:0,hasAppendRow:!1,rowHeight:34,onVisibleRegionChanged:p,columns:C,getCellContent:w,freezeColumns:0,verticalBorder:()=>!0,smoothScrollX:!0,smoothScrollY:!0})}var l,a,s;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`function Simplenotest() {
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
}`,...(s=(a=i.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const z=["Simplenotest"];export{i as Simplenotest,z as __namedExportsOrder,O as default};
