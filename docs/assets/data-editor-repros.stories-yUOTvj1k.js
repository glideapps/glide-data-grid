import{j as t,a as m,s as w}from"./marked.esm-dbrxtycE.js";import"./index-BMVQvedj.js";import{B as f}from"./story-utils-K2EZnGjM.js";import{G as p}from"./image-window-loader-6IwN0BJG.js";import{D as g}from"./data-editor-all-5_FSs0lI.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./iframe-o2bFZbuT.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-WDauxac0.js";const{useState:T,useMemo:S}=__STORYBOOK_MODULE_ADDONS__,$={title:"Tests/TestCases/Bugs",decorators:[e=>t(f,{width:1e3,height:800,children:t(e,{})})]},A=([,e])=>({allowOverlay:!0,kind:p.Number,data:e,displayData:e.toString()}),x=()=>{},v=w("div")({name:"Bug70Style",class:"b1nvh7n2",propsAsIs:!1});function o(){return m(v,{className:"App",children:[t("p",{children:"To cause error: scroll down at least one row, edit a cell in Col2, and hit Tab"}),t("a",{href:"https://github.com/glideapps/glide-data-grid/issues/70",target:"_blank",rel:"noreferrer",children:"Original report"}),t(g,{width:500,height:500,rows:100,columns:[{title:"Col1",width:100},{title:"Col2",width:100}],getCellContent:A,onCellEdited:x})]})}const _=([e,r])=>({allowOverlay:!0,kind:p.Text,data:`${e} - ${r}`,displayData:`${e} - ${r}`}),l=[{title:"Col AAAA",width:120},{title:"Col AAA",width:120},{title:"Col AA",width:120},{title:"Col A",width:120},{title:"Col",width:120}];function n(){const[e,r]=T(""),C=S(()=>e===""?l:l.filter(s=>s.title.toLowerCase().includes(e.toLowerCase())),[e]);return m("div",{children:[t("input",{value:e,onChange:s=>{r(s.target.value)}}),t(g,{width:1e3,height:500,rows:100,columns:C,getCellContent:_,smoothScrollX:!0,smoothScrollY:!0})]})}var a,i,c;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`function Bug70() {
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
}`,...(c=(i=o.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var u,d,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`function FilterColumns() {
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
}`,...(h=(d=n.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};const j=["Bug70","FilterColumns"];export{o as Bug70,n as FilterColumns,j as __namedExportsOrder,$ as default};
