import{j as e,a as b}from"./marked.esm-dbrxtycE.js";import{r as o}from"./index-BMVQvedj.js";import{G as k}from"./image-window-loader-OdeDDfWK.js";import{D as i}from"./data-editor-all-x3Z0J_KE.js";import{S as E}from"./story-utils-K2EZnGjM.js";import{D as R,M as s,H as h,W as m}from"./doc-wrapper-m1-LpzDL.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./iframe-WiXKo5C8.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-mah7XTYW.js";import"./toConsumableArray-ppDpjNRJ.js";const B={title:"Glide-Data-Grid/Docs",decorators:[n=>e(E,{children:e(n,{})})]},t=[{name:"Deidre Morris",company:"GONKLE",email:"deidremorris@gonkle.com",phone:"+1 (867) 507-3332"},{name:"Sheryl Craig",company:"EVENTAGE",email:"sherylcraig@eventage.com",phone:"+1 (869) 520-2227"},{name:"Lidia Bowers",company:"ANOCHA",email:"lidiabowers@anocha.com",phone:"+1 (808) 414-3826"},{name:"Jones Norton",company:"REPETWIRE",email:"jonesnorton@repetwire.com",phone:"+1 (875) 582-3320"},{name:"Lula Bruce",company:"COMDOM",email:"lulabruce@comdom.com",phone:"+1 (873) 452-2472"},{name:"Larsen Montgomery",company:"SQUISH",email:"larsenmontgomery@squish.com",phone:"+1 (893) 482-3651"},{name:"Becky Bright",company:"COMCUR",email:"beckybright@comcur.com",phone:"+1 (879) 494-2331"},{name:"Charlotte Rowland",company:"FROLIX",email:"charlotterowland@frolix.com",phone:"+1 (861) 439-2134"},{name:"Sonya Hensley",company:"GEEKETRON",email:"sonyahensley@geeketron.com",phone:"+1 (802) 553-2194"},{name:"Stephenson Guthrie",company:"EXOSWITCH",email:"stephensonguthrie@exoswitch.com",phone:"+1 (903) 449-3271"},{name:"Mcmillan Cline",company:"TURNLING",email:"mcmillancline@turnling.com",phone:"+1 (982) 496-2454"},{name:"Kemp Davis",company:"TETRATREX",email:"kempdavis@tetratrex.com",phone:"+1 (859) 594-2982"},{name:"Matilda Levy",company:"SLOFAST",email:"matildalevy@slofast.com",phone:"+1 (841) 521-2444"},{name:"Hattie Simpson",company:"COMTRAK",email:"hattiesimpson@comtrak.com",phone:"+1 (962) 587-3805"},{name:"Kinney Munoz",company:"IDETICA",email:"kinneymunoz@idetica.com",phone:"+1 (921) 513-2012"},{name:"Lambert Raymond",company:"TURNABOUT",email:"lambertraymond@turnabout.com",phone:"+1 (919) 519-2442"},{name:"Bryant Dunlap",company:"BYTREX",email:"bryantdunlap@bytrex.com",phone:"+1 (872) 583-2883"}],a=()=>{const n=o.useCallback(g=>{const[C,w]=g,c=t[w][["name","company","email","phone"][C]];return{kind:k.Text,allowOverlay:!0,displayData:c,data:c}},[]),r=o.useMemo(()=>[{title:"Name",id:"name"},{title:"Company",id:"company"},{title:"Email",id:"email"},{title:"Phone",id:"phone"}],[]),[u,l]=o.useState(!1),y=o.useCallback(()=>l(!1),[]);return b(R,{children:[e(s,{children:`
# Search

Search is a controlled property in Glide Data Grid. Triggering the search interface is up to the application but once triggered search is handled interally on the data grid. Search always depends on a properly implemented \`getCellsForSelection\`.`}),e(h,{children:`
const [showSearch, setShowSearch] = React.useState(false);
const onSearchClose = React.useCallback(() => setShowSearch(false), []);

return <DataEditor {...rest} showSearch={showSearch} getCellsForSelection={true} onSearchClose={onSearchClose}  />
`}),e("button",{onClick:()=>l(!0),children:"Show Search"}),e(m,{height:200,children:e(i,{showSearch:u,onSearchClose:y,getCellContent:n,getCellsForSelection:!0,columns:r,rows:t.length})}),e(s,{children:`
# Automatic Search

Search can also be handled by the data grid automatically if you enable the search keybinding.`}),e(h,{children:`
return <DataEditor {...rest} keybindings={{search: true}} getCellsForSelection={true}  />
`}),e(m,{height:200,children:e(i,{keybindings:{search:!0},getCellContent:n,getCellsForSelection:!0,columns:r,rows:t.length})})]})};a.storyName="06. Search";var d,p,S;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: d,
      data: d
    };
  }, []);
  const columns = React.useMemo<GridColumn[]>(() => {
    return [{
      title: "Name",
      id: "name"
    }, {
      title: "Company",
      id: "company"
    }, {
      title: "Email",
      id: "email"
    }, {
      title: "Phone",
      id: "phone"
    }];
  }, []);
  const [showSearch, setShowSearch] = React.useState(false);
  const onSearchClose = React.useCallback(() => setShowSearch(false), []);
  return <DocWrapper>
            <Marked>
                {\`
# Search

Search is a controlled property in Glide Data Grid. Triggering the search interface is up to the application but once triggered search is handled interally on the data grid. Search always depends on a properly implemented \\\`getCellsForSelection\\\`.\`}
            </Marked>
            <Highlight>
                {\`
const [showSearch, setShowSearch] = React.useState(false);
const onSearchClose = React.useCallback(() => setShowSearch(false), []);

return <DataEditor {...rest} showSearch={showSearch} getCellsForSelection={true} onSearchClose={onSearchClose}  />
\`}
            </Highlight>
            <button onClick={() => setShowSearch(true)}>Show Search</button>
            <Wrapper height={200}>
                <DataEditor showSearch={showSearch} onSearchClose={onSearchClose} getCellContent={getContent} getCellsForSelection={true} columns={columns} rows={data.length} />
            </Wrapper>
            <Marked>
                {\`
# Automatic Search

Search can also be handled by the data grid automatically if you enable the search keybinding.\`}
            </Marked>
            <Highlight>
                {\`
return <DataEditor {...rest} keybindings={{search: true}} getCellsForSelection={true}  />
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor keybindings={{
        search: true
      }} getCellContent={getContent} getCellsForSelection={true} columns={columns} rows={data.length} />
            </Wrapper>
        </DocWrapper>;
}`,...(S=(p=a.parameters)==null?void 0:p.docs)==null?void 0:S.source}}};const K=["Search"];export{a as Search,K as __namedExportsOrder,B as default};
