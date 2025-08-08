import{r as e}from"./iframe-CtW1CVg1.js";import{G as u}from"./image-window-loader-C_5bZyUb.js";import{D as d}from"./data-editor-all-CUqWUnOy.js";import{S as y}from"./story-utils-DKCi6NPd.js";import{D as g,M as h,H as C,W as E}from"./doc-wrapper-BAv_FHcw.js";import"./throttle-C-KpY_yN.js";import"./marked.esm-BrVFcF7s.js";import"./flatten-DRwPyEc4.js";import"./scrolling-data-grid-BrY_AJhw.js";import"./toConsumableArray-Cg7-Q_9P.js";const W={title:"Glide-Data-Grid/Docs",decorators:[o=>e.createElement(y,null,e.createElement(o,null))]},t=[{name:"Deidre Morris",company:"GONKLE",email:"deidremorris@gonkle.com",phone:"+1 (867) 507-3332"},{name:"Sheryl Craig",company:"EVENTAGE",email:"sherylcraig@eventage.com",phone:"+1 (869) 520-2227"},{name:"Lidia Bowers",company:"ANOCHA",email:"lidiabowers@anocha.com",phone:"+1 (808) 414-3826"},{name:"Jones Norton",company:"REPETWIRE",email:"jonesnorton@repetwire.com",phone:"+1 (875) 582-3320"},{name:"Lula Bruce",company:"COMDOM",email:"lulabruce@comdom.com",phone:"+1 (873) 452-2472"},{name:"Larsen Montgomery",company:"SQUISH",email:"larsenmontgomery@squish.com",phone:"+1 (893) 482-3651"},{name:"Becky Bright",company:"COMCUR",email:"beckybright@comcur.com",phone:"+1 (879) 494-2331"},{name:"Charlotte Rowland",company:"FROLIX",email:"charlotterowland@frolix.com",phone:"+1 (861) 439-2134"},{name:"Sonya Hensley",company:"GEEKETRON",email:"sonyahensley@geeketron.com",phone:"+1 (802) 553-2194"},{name:"Stephenson Guthrie",company:"EXOSWITCH",email:"stephensonguthrie@exoswitch.com",phone:"+1 (903) 449-3271"},{name:"Mcmillan Cline",company:"TURNLING",email:"mcmillancline@turnling.com",phone:"+1 (982) 496-2454"},{name:"Kemp Davis",company:"TETRATREX",email:"kempdavis@tetratrex.com",phone:"+1 (859) 594-2982"},{name:"Matilda Levy",company:"SLOFAST",email:"matildalevy@slofast.com",phone:"+1 (841) 521-2444"},{name:"Hattie Simpson",company:"COMTRAK",email:"hattiesimpson@comtrak.com",phone:"+1 (962) 587-3805"},{name:"Kinney Munoz",company:"IDETICA",email:"kinneymunoz@idetica.com",phone:"+1 (921) 513-2012"},{name:"Lambert Raymond",company:"TURNABOUT",email:"lambertraymond@turnabout.com",phone:"+1 (919) 519-2442"},{name:"Bryant Dunlap",company:"BYTREX",email:"bryantdunlap@bytrex.com",phone:"+1 (872) 583-2883"}],n=()=>{const o=e.useCallback(p=>{const[c,s]=p,a=t[s][["name","company","email","phone"][c]];return{kind:u.Text,allowOverlay:!0,displayData:a,data:a}},[]),l=e.useMemo(()=>[{title:"Name",id:"name",group:"Core"},{title:"Company",id:"company",group:"Core"},{title:"Email",id:"email",group:"Extra"},{title:"Phone",id:"phone",group:"Extra"}],[]);return e.createElement(g,null,e.createElement(h,null,`
# Column Grouping

Columns can be grouped by assinging them a group. Easy peasy.`),e.createElement(C,null,`
const columns = React.useMemo<GridColumn[]>(() => {
    return [
        {
            title: "Name",
            id: "name",
            group: "Core",
        },
        {
            title: "Company",
            id: "company",
            group: "Core",
        },
        {
            title: "Email",
            id: "email",
            group: "Extra",
        },
        {
            title: "Phone",
            id: "phone",
            group: "Extra",
        },
    ];
}, []);
`),e.createElement(E,{height:500},e.createElement(d,{getCellContent:o,columns:l,rows:t.length})))};n.storyName="07. Column Grouping";var r,m,i;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
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
      id: "name",
      group: "Core"
    }, {
      title: "Company",
      id: "company",
      group: "Core"
    }, {
      title: "Email",
      id: "email",
      group: "Extra"
    }, {
      title: "Phone",
      id: "phone",
      group: "Extra"
    }];
  }, []);
  return <DocWrapper>
            <Marked>
                {\`
# Column Grouping

Columns can be grouped by assinging them a group. Easy peasy.\`}
            </Marked>
            <Highlight>
                {\`
const columns = React.useMemo<GridColumn[]>(() => {
    return [
        {
            title: "Name",
            id: "name",
            group: "Core",
        },
        {
            title: "Company",
            id: "company",
            group: "Core",
        },
        {
            title: "Email",
            id: "email",
            group: "Extra",
        },
        {
            title: "Phone",
            id: "phone",
            group: "Extra",
        },
    ];
}, []);
\`}
            </Highlight>
            <Wrapper height={500}>
                <DataEditor getCellContent={getContent} columns={columns} rows={data.length} />
            </Wrapper>
        </DocWrapper>;
}`,...(i=(m=n.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};const f=["ColumnGrouping"];export{n as ColumnGrouping,f as __namedExportsOrder,W as default};
