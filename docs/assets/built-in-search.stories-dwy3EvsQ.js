import{j as e,a as n,F as y}from"./marked.esm-dbrxtycE.js";import{R as s}from"./index-BMVQvedj.js";import{C as c,u as g}from"./image-window-loader-ArmVyMQr.js";import{D}from"./data-editor-all-QKtwKayM.js";import{B as K,D as R,P as v,M as E,K as a,a as k,d as F}from"./utils-R4daMEP1.js";import{S as G}from"./story-utils-K2EZnGjM.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./iframe-ai2fO41v.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-8mduaMVo.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const T={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e(G,{children:e(K,{title:"Search is easy",description:n(y,{children:[n(R,{children:["Search for any data in your grid by setting ",e(v,{children:"showSearch"}),"."]}),n(E,{children:["In this story, ",e(a,{children:"Ctrl"})," (",e(a,{children:"⌘"})," on Mac) +"," ",e(a,{children:"f"})," toggles the search bar. Make sure you're focused on the Data Grid!"]})]}),children:e(r,{})})})]},o=()=>{const{cols:r,getCellContent:u,onColumnResize:p,setCellValue:h}=k(),[S,l]=s.useState(!1),[C,f]=s.useState({rows:c.empty(),columns:c.empty()});return g("keydown",s.useCallback(t=>{(t.ctrlKey||t.metaKey)&&t.code==="KeyF"&&(l(w=>!w),t.stopPropagation(),t.preventDefault())},[]),window,!1,!0),e(D,{...F,getCellContent:u,getCellsForSelection:!0,gridSelection:C,onGridSelectionChange:f,columns:r,onCellEdited:h,onColumnResize:p,showSearch:S,onSearchClose:()=>l(!1),rows:1e4})};var i,m,d;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const [showSearch, setShowSearch] = React.useState(false);
  const [selection, setSelection] = React.useState<GridSelection>({
    rows: CompactSelection.empty(),
    columns: CompactSelection.empty()
  });
  useEventListener("keydown", React.useCallback(event => {
    if ((event.ctrlKey || event.metaKey) && event.code === "KeyF") {
      setShowSearch(cv => !cv);
      event.stopPropagation();
      event.preventDefault();
    }
  }, []), window, false, true);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} getCellsForSelection={true} gridSelection={selection} onGridSelectionChange={setSelection} columns={cols} onCellEdited={setCellValue} onColumnResize={onColumnResize} showSearch={showSearch} onSearchClose={() => setShowSearch(false)} rows={10_000} />;
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const q=["BuiltInSearch"];export{o as BuiltInSearch,q as __namedExportsOrder,T as default};
