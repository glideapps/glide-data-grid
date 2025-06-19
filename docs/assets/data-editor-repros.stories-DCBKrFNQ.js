import{r as t}from"./iframe-C1-tNiF2.js";import{B as f}from"./story-utils-CDI4T5Xi.js";import{G as h}from"./image-window-loader-CXb9j7hw.js";import{D as p}from"./data-editor-all-DmhSNLJC.js";import{s as w}from"./marked.esm-D3slmJuh.js";import{u as E,a as T}from"./chunk-2WNKQWTL-BldXtwAO.js";import"./throttle-SLdF8OvU.js";import"./flatten-DXbQYuqR.js";import"./scrolling-data-grid-BWhfxTgG.js";const k={title:"Tests/TestCases/Bugs",decorators:[e=>t.createElement(f,{width:1e3,height:800},t.createElement(e,null))]},S=([,e])=>({allowOverlay:!0,kind:h.Number,data:e,displayData:e.toString()}),A=()=>{},v=w("div")({name:"Bug70Style",class:"b1nvh7n2",propsAsIs:!1});function n(){const e=[{title:"Col1",width:100},{title:"Col2",width:100}];return t.createElement(v,{className:"App"},t.createElement("p",null,"To cause error: scroll down at least one row, edit a cell in Col2, and hit Tab"),t.createElement("a",{href:"https://github.com/glideapps/glide-data-grid/issues/70",target:"_blank",rel:"noreferrer"},"Original report"),t.createElement(p,{width:500,height:500,rows:100,columns:e,getCellContent:S,onCellEdited:A}))}const x=([e,r])=>({allowOverlay:!0,kind:h.Text,data:`${e} - ${r}`,displayData:`${e} - ${r}`}),s=[{title:"Col AAAA",width:120},{title:"Col AAA",width:120},{title:"Col AA",width:120},{title:"Col A",width:120},{title:"Col",width:120}];function o(){const[e,r]=E(""),g=T(()=>e===""?s:s.filter(l=>l.title.toLowerCase().includes(e.toLowerCase())),[e]),C=l=>{r(l.target.value)};return t.createElement("div",null,t.createElement("input",{value:e,onChange:C}),t.createElement(p,{width:1e3,height:500,rows:100,columns:g,getCellContent:x,smoothScrollX:!0,smoothScrollY:!0}))}var a,i,c;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`function Bug70() {
  const cols = [{
    title: "Col1",
    width: 100
  }, {
    title: "Col2",
    width: 100
  }];
  return <Bug70Style className="App">
            <p>To cause error: scroll down at least one row, edit a cell in Col2, and hit Tab</p>
            <a href="https://github.com/glideapps/glide-data-grid/issues/70" target="_blank" rel="noreferrer">
                Original report
            </a>
            <DataEditor width={500} height={500} rows={100} columns={cols} getCellContent={bug70Gen} onCellEdited={ignore} />
        </Bug70Style>;
}`,...(c=(i=n.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var u,d,m;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`function FilterColumns() {
  const [searchText, setSearchText] = useState("");
  const cols = useMemo(() => {
    if (searchText === "") {
      return filteringColumns;
    }
    return filteringColumns.filter(c => c.title.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText]);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return <div>
            <input value={searchText} onChange={onInputChange} />
            <DataEditor width={1000} height={500} rows={100} columns={cols} getCellContent={filterColumnsGen} smoothScrollX={true} smoothScrollY={true} />
        </div>;
}`,...(m=(d=o.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const $=["Bug70","FilterColumns"];export{n as Bug70,o as FilterColumns,$ as __namedExportsOrder,k as default};
