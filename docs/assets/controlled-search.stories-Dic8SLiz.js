import{R as e}from"./iframe-B_Q06Dca.js";import{C as c,u as w}from"./image-window-loader-D7sQ27jY.js";import{D as R}from"./data-editor-all-ClUqzqIV.js";import{B as y,D as E,P as V,a as v,d as D}from"./utils-CCjQfXGC.js";import{S as K}from"./story-utils-DDLeMfpA.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-Co5oNmeu.js";import"./marked.esm-CcrTC-0Z.js";import"./flatten-DXL8hG6G.js";import"./scrolling-data-grid-DvEd2NXF.js";import"./index-D_kXk1yT.js";import"./index.esm-mFikWORe.js";import"./index-CZXiV8zI.js";const I={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>e.createElement(K,null,e.createElement(y,{title:"Controlling search results",description:e.createElement(e.Fragment,null,e.createElement(E,null,"Search results can be controlled via ",e.createElement(V,null,"searchResults"),". You can implement any search algorithm you want, even a silly one."))},e.createElement(s,null)))]},o=()=>{const{cols:s,getCellContent:h,onColumnResize:S,setCellValue:p}=v(),[d,a]=e.useState(!1),[C,g]=e.useState({rows:c.empty(),columns:c.empty()});w("keydown",e.useCallback(t=>{(t.ctrlKey||t.metaKey)&&t.code==="KeyF"&&(a(n=>!n),t.stopPropagation(),t.preventDefault())},[]),window,!1,!0);const[l,r]=e.useState(""),f=e.useMemo(()=>{const t=[];for(let n=0;n<l.length;n++)t.push([3,n]);return t},[l.length]);return e.createElement(R,{...D,searchResults:f,getCellContent:h,getCellsForSelection:!0,gridSelection:C,onGridSelectionChange:g,columns:s,onCellEdited:p,onColumnResize:S,searchValue:l,onSearchValueChange:r,showSearch:d,onSearchClose:()=>{a(!1),r("")},rows:1e4})};var i,u,m;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
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
  const searchResults = React.useMemo(() => {
    const result: Item[] = [];
    for (let i = 0; i < searchValue.length; i++) {
      result.push([3, i]);
    }
    return result;
  }, [searchValue.length]);
  return <DataEditor {...defaultProps} searchResults={searchResults} getCellContent={getCellContent} getCellsForSelection={true} gridSelection={selection} onGridSelectionChange={setSelection} columns={cols} onCellEdited={setCellValue} onColumnResize={onColumnResize} searchValue={searchValue} onSearchValueChange={setSearchValue} showSearch={showSearch} onSearchClose={() => {
    setShowSearch(false);
    setSearchValue("");
  }} rows={10_000} />;
}`,...(m=(u=o.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};const N=["ControlledSearch"];export{o as ControlledSearch,N as __namedExportsOrder,I as default};
