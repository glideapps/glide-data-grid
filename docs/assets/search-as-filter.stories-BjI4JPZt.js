import{R as e}from"./iframe-B6SGc2rO.js";import{C as r,u as w}from"./image-window-loader-C6btADxh.js";import{D as f}from"./data-editor-all-C9_g1Ubb.js";import{B as V,D as y,a as E,d as R}from"./utils-C18Rw6G3.js";import{S as D}from"./story-utils-BxP6XtVy.js";import"./throttle-DiTf4WkO.js";import"./marked.esm-DUXHH2IH.js";import"./flatten-DyO5syz-.js";import"./scrolling-data-grid-DUmfy0vJ.js";import"./index-D_kXk1yT.js";import"./index.esm-CI0qK3ar.js";import"./index-C7mL3qzk.js";const L={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e.createElement(D,null,e.createElement(V,{title:"Filtering down to search results",description:e.createElement(e.Fragment,null,e.createElement(y,null,"You can update your grid however you want based on search inputs."))},e.createElement(a,null)))]},o=()=>{const{cols:a,getCellContent:m,onColumnResize:h,setCellValue:S}=E(),[p,s]=e.useState(!1),[d,C]=e.useState({rows:r.empty(),columns:r.empty()});w("keydown",e.useCallback(t=>{(t.ctrlKey||t.metaKey)&&t.code==="KeyF"&&(s(g=>!g),t.stopPropagation(),t.preventDefault())},[]),window,!1,!0);const[n,l]=e.useState("");return e.createElement(f,{...R,searchResults:[],getCellContent:m,getCellsForSelection:!0,gridSelection:d,onGridSelectionChange:C,columns:a,onCellEdited:S,onColumnResize:h,searchValue:n,onSearchValueChange:l,showSearch:p,onSearchClose:()=>{s(!1),l("")},rows:n.length===0?1e4:n.length})};var c,i,u;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
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
