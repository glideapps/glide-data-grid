import{R as e}from"./iframe-92PtdqhR.js";import{D as p}from"./data-editor-all-poFJa0K3.js";import{B as S,D as C,u as b,d as R}from"./utils-CELGcBWn.js";import{C as l}from"./image-window-loader-3O14wN7T.js";import{S as y}from"./story-utils-vulgHWF2.js";import"./throttle-DLicu2BN.js";import"./flatten-fYmq5s1I.js";import"./scrolling-data-grid-CbKo07NZ.js";import"./marked.esm-CN_5r9Ld.js";import"./index-D_kXk1yT.js";import"./index.esm-ggfF5t3J.js";import"./index-2T43OZCe.js";const F={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(y,null,e.createElement(S,{title:"Scroll Shadows",description:e.createElement(e.Fragment,null,e.createElement(C,null,"You can enable and disable the horizontal/vertical scroll shadows."))},e.createElement(n,null)))]},r=()=>{const{cols:n,getCellContent:m}=b(6),[h,u]=e.useState({rows:l.empty(),columns:l.empty()}),w=e.useCallback(t=>{var s;let o=l.empty();t.current!==void 0&&(o=o.add([t.current.range.y,t.current.range.y+t.current.range.height]));for(const a of((s=t.current)==null?void 0:s.rangeStack)??[])o=o.add([a.y,a.y+a.height]);u({...t,rows:o})},[]),f=e.useMemo(()=>({accentLight:"#b1f6ff",horizontalBorderColor:"transparent",headerBottomBorderColor:"rgba(115, 116, 131, 0.16)"}),[]),g=e.useCallback(t=>t%2===0?void 0:{bgCell:"#f5f5f6"},[]);return e.createElement(p,{...R,rowMarkers:"number",gridSelection:h,onGridSelectionChange:w,fixedShadowX:!1,headerHeight:26,drawFocusRing:!1,rowHeight:22,fixedShadowY:!1,getRowThemeOverride:g,verticalBorder:!1,getCellContent:m,columns:n,rows:1e3,theme:f})};var c,i,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  const [selection, setSelection] = React.useState<GridSelection>({
    rows: CompactSelection.empty(),
    columns: CompactSelection.empty()
  });
  const onSelectionChange = React.useCallback((newSel: GridSelection) => {
    let newRows = CompactSelection.empty();
    if (newSel.current !== undefined) {
      newRows = newRows.add([newSel.current.range.y, newSel.current.range.y + newSel.current.range.height]);
    }
    for (const b of newSel.current?.rangeStack ?? []) {
      newRows = newRows.add([b.y, b.y + b.height]);
    }
    setSelection({
      ...newSel,
      rows: newRows
    });
  }, []);
  const theme = React.useMemo<Partial<Theme>>(() => ({
    accentLight: "#b1f6ff",
    horizontalBorderColor: "transparent",
    headerBottomBorderColor: "rgba(115, 116, 131, 0.16)"
  }), []);
  const getRowThemeOverride = React.useCallback(row => row % 2 === 0 ? undefined : {
    bgCell: "#f5f5f6"
  }, []);
  return <DataEditor {...defaultProps} rowMarkers={"number"} gridSelection={selection} onGridSelectionChange={onSelectionChange} fixedShadowX={false} headerHeight={26} drawFocusRing={false} rowHeight={22} fixedShadowY={false} getRowThemeOverride={getRowThemeOverride} verticalBorder={false} getCellContent={getCellContent} columns={cols} rows={1000} theme={theme} />;
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const P=["ScrollShadows"];export{r as ScrollShadows,P as __namedExportsOrder,F as default};
