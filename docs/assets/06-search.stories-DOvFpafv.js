import{r as e}from"./iframe-BR7xuyxq.js";import{G as w}from"./image-window-loader-CxzDuQ9s.js";import{D as i}from"./data-editor-all-CYc0zstB.js";import{S as E}from"./story-utils-CIsdngZT.js";import{D as b,M as s,H as m,W as h}from"./doc-wrapper-DSDDnRC8.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-Ddt7N8Q3.js";import"./marked.esm-GWu2Uyfc.js";import"./flatten-Db_qbC0f.js";import"./scrolling-data-grid-B5dbQ4nv.js";import"./toConsumableArray-Cg7-Q_9P.js";const N={title:"Glide-Data-Grid/Docs",decorators:[n=>e.createElement(E,null,e.createElement(n,null))]},o=[{name:"Deidre Morris",company:"GONKLE",email:"deidremorris@gonkle.com",phone:"+1 (867) 507-3332"},{name:"Sheryl Craig",company:"EVENTAGE",email:"sherylcraig@eventage.com",phone:"+1 (869) 520-2227"},{name:"Lidia Bowers",company:"ANOCHA",email:"lidiabowers@anocha.com",phone:"+1 (808) 414-3826"},{name:"Jones Norton",company:"REPETWIRE",email:"jonesnorton@repetwire.com",phone:"+1 (875) 582-3320"},{name:"Lula Bruce",company:"COMDOM",email:"lulabruce@comdom.com",phone:"+1 (873) 452-2472"},{name:"Larsen Montgomery",company:"SQUISH",email:"larsenmontgomery@squish.com",phone:"+1 (893) 482-3651"},{name:"Becky Bright",company:"COMCUR",email:"beckybright@comcur.com",phone:"+1 (879) 494-2331"},{name:"Charlotte Rowland",company:"FROLIX",email:"charlotterowland@frolix.com",phone:"+1 (861) 439-2134"},{name:"Sonya Hensley",company:"GEEKETRON",email:"sonyahensley@geeketron.com",phone:"+1 (802) 553-2194"},{name:"Stephenson Guthrie",company:"EXOSWITCH",email:"stephensonguthrie@exoswitch.com",phone:"+1 (903) 449-3271"},{name:"Mcmillan Cline",company:"TURNLING",email:"mcmillancline@turnling.com",phone:"+1 (982) 496-2454"},{name:"Kemp Davis",company:"TETRATREX",email:"kempdavis@tetratrex.com",phone:"+1 (859) 594-2982"},{name:"Matilda Levy",company:"SLOFAST",email:"matildalevy@slofast.com",phone:"+1 (841) 521-2444"},{name:"Hattie Simpson",company:"COMTRAK",email:"hattiesimpson@comtrak.com",phone:"+1 (962) 587-3805"},{name:"Kinney Munoz",company:"IDETICA",email:"kinneymunoz@idetica.com",phone:"+1 (921) 513-2012"},{name:"Lambert Raymond",company:"TURNABOUT",email:"lambertraymond@turnabout.com",phone:"+1 (919) 519-2442"},{name:"Bryant Dunlap",company:"BYTREX",email:"bryantdunlap@bytrex.com",phone:"+1 (872) 583-2883"}],a=()=>{const n=e.useCallback(t=>{const[g,C]=t,c=o[C][["name","company","email","phone"][g]];return{kind:w.Text,allowOverlay:!0,displayData:c,data:c}},[]),r=e.useMemo(()=>[{title:"Name",id:"name"},{title:"Company",id:"company"},{title:"Email",id:"email"},{title:"Phone",id:"phone"}],[]),[S,l]=e.useState(!1),y=e.useCallback(()=>l(!1),[]);return e.createElement(b,null,e.createElement(s,null,`
# Search

Search is a controlled property in Glide Data Grid. Triggering the search interface is up to the application but once triggered search is handled interally on the data grid. Search always depends on a properly implemented \`getCellsForSelection\`.`),e.createElement(m,null,`
const [showSearch, setShowSearch] = React.useState(false);
const onSearchClose = React.useCallback(() => setShowSearch(false), []);

return <DataEditor {...rest} showSearch={showSearch} getCellsForSelection={true} onSearchClose={onSearchClose}  />
`),e.createElement("button",{onClick:()=>l(t=>!t)},"Show Search"),e.createElement(h,{height:200},e.createElement(i,{showSearch:S,onSearchClose:y,getCellContent:n,getCellsForSelection:!0,columns:r,rows:o.length})),e.createElement(s,null,`
# Automatic Search

Search can also be handled by the data grid automatically if you enable the search keybinding.`),e.createElement(m,null,`
return <DataEditor {...rest} keybindings={{search: true}} getCellsForSelection={true}  />
`),e.createElement(h,{height:200},e.createElement(i,{keybindings:{search:!0},getCellContent:n,getCellsForSelection:!0,columns:r,rows:o.length})))};a.storyName="06. Search";var p,d,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
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
            <button onClick={() => setShowSearch(prev => !prev)}>Show Search</button>
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
}`,...(u=(d=a.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const v=["Search"];export{a as Search,v as __namedExportsOrder,N as default};
