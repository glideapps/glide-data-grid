import{j as o,F as S}from"./marked.esm-dbrxtycE.js";import{R as t}from"./index-BMVQvedj.js";import{D as C}from"./data-editor-all-BRJ4jo8P.js";import{B as b,D as R,u as y,d as k}from"./utils-Pc9bIpez.js";import{C as c}from"./image-window-loader-kcFVuRwy.js";import{S as B}from"./story-utils-K2EZnGjM.js";import"./iframe-bMSjurlU.js";import"../sb-preview/runtime.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-QSoV3kaN.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const L={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>o(B,{children:o(b,{title:"Scroll Shadows",description:o(S,{children:o(R,{children:"You can enable and disable the horizontal/vertical scroll shadows."})}),children:o(a,{})})})]},n=()=>{const{cols:a,getCellContent:h}=y(6),[w,f]=t.useState({rows:c.empty(),columns:c.empty()}),p=t.useCallback(e=>{var l;let r=c.empty();e.current!==void 0&&(r=r.add([e.current.range.y,e.current.range.y+e.current.range.height]));for(const s of((l=e.current)==null?void 0:l.rangeStack)??[])r=r.add([s.y,s.y+s.height]);f({...e,rows:r})},[]),u=t.useMemo(()=>({accentLight:"#b1f6ff",horizontalBorderColor:"transparent",headerBottomBorderColor:"rgba(115, 116, 131, 0.16)"}),[]),g=t.useCallback(e=>e%2===0?void 0:{bgCell:"#f5f5f6"},[]);return o(C,{...k,rowMarkers:"number",gridSelection:w,onGridSelectionChange:p,fixedShadowX:!1,headerHeight:26,drawFocusRing:!1,rowHeight:22,fixedShadowY:!1,getRowThemeOverride:g,verticalBorder:!1,getCellContent:h,columns:a,rows:1e3,theme:u})};var i,d,m;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
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
}`,...(m=(d=n.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const W=["ScrollShadows"];export{n as ScrollShadows,W as __namedExportsOrder,L as default};
