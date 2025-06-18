import{R as e}from"./iframe-DiheQaUA.js";import{C as r,u as w}from"./image-window-loader-hNj5Aoan.js";import{D as f}from"./data-editor-all-CSR0hTtR.js";import{B as V,D as y,a as E,d as R}from"./utils-BOs7twSn.js";import{S as D}from"./story-utils-D7TLGwv7.js";import"./throttle-BSqrYiSf.js";import"./marked.esm-DNbdADwI.js";import"./flatten-BTPJBjbG.js";import"./scrolling-data-grid-Dg126-rv.js";import"./index-D_kXk1yT.js";import"./index.esm-CVoXghnp.js";import"./index-DbmoAxKL.js";const L={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e.createElement(D,null,e.createElement(V,{title:"Filtering down to search results",description:e.createElement(e.Fragment,null,e.createElement(y,null,"You can update your grid however you want based on search inputs."))},e.createElement(a,null)))]},o=()=>{const{cols:a,getCellContent:m,onColumnResize:h,setCellValue:S}=E(),[p,s]=e.useState(!1),[d,C]=e.useState({rows:r.empty(),columns:r.empty()});w("keydown",e.useCallback(t=>{(t.ctrlKey||t.metaKey)&&t.code==="KeyF"&&(s(g=>!g),t.stopPropagation(),t.preventDefault())},[]),window,!1,!0);const[n,l]=e.useState("");return e.createElement(f,{...R,searchResults:[],getCellContent:m,getCellsForSelection:!0,gridSelection:d,onGridSelectionChange:C,columns:a,onCellEdited:S,onColumnResize:h,searchValue:n,onSearchValueChange:l,showSearch:p,onSearchClose:()=>{s(!1),l("")},rows:n.length===0?1e4:n.length})};var c,i,u;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
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
  const [searchValue, setSearchValue] = React.useState("");
  return <DataEditor {...defaultProps} searchResults={[]} getCellContent={getCellContent} getCellsForSelection={true} gridSelection={selection} onGridSelectionChange={setSelection} columns={cols} onCellEdited={setCellValue} onColumnResize={onColumnResize} searchValue={searchValue} onSearchValueChange={setSearchValue} showSearch={showSearch} onSearchClose={() => {
    setShowSearch(false);
    setSearchValue("");
  }} rows={searchValue.length === 0 ? 10_000 : searchValue.length} />;
}`,...(u=(i=o.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const M=["SearchAsFilter"];export{o as SearchAsFilter,M as __namedExportsOrder,L as default};
