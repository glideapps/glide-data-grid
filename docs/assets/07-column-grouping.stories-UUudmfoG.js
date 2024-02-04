import{j as n,a as u}from"./marked.esm-dbrxtycE.js";import{r}from"./index-BMVQvedj.js";import{G as h}from"./image-window-loader-dU4qzvAw.js";import{D as y}from"./data-editor-all-dpbiIcgh.js";import{S as g}from"./story-utils-K2EZnGjM.js";import{D as C,M as E,H as x,W as R}from"./doc-wrapper-m1-LpzDL.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./iframe-X6AJfRqk.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-efMrkhNM.js";import"./toConsumableArray-ppDpjNRJ.js";const L={title:"Glide-Data-Grid/Docs",decorators:[o=>n(g,{children:n(o,{})})]},t=[{name:"Deidre Morris",company:"GONKLE",email:"deidremorris@gonkle.com",phone:"+1 (867) 507-3332"},{name:"Sheryl Craig",company:"EVENTAGE",email:"sherylcraig@eventage.com",phone:"+1 (869) 520-2227"},{name:"Lidia Bowers",company:"ANOCHA",email:"lidiabowers@anocha.com",phone:"+1 (808) 414-3826"},{name:"Jones Norton",company:"REPETWIRE",email:"jonesnorton@repetwire.com",phone:"+1 (875) 582-3320"},{name:"Lula Bruce",company:"COMDOM",email:"lulabruce@comdom.com",phone:"+1 (873) 452-2472"},{name:"Larsen Montgomery",company:"SQUISH",email:"larsenmontgomery@squish.com",phone:"+1 (893) 482-3651"},{name:"Becky Bright",company:"COMCUR",email:"beckybright@comcur.com",phone:"+1 (879) 494-2331"},{name:"Charlotte Rowland",company:"FROLIX",email:"charlotterowland@frolix.com",phone:"+1 (861) 439-2134"},{name:"Sonya Hensley",company:"GEEKETRON",email:"sonyahensley@geeketron.com",phone:"+1 (802) 553-2194"},{name:"Stephenson Guthrie",company:"EXOSWITCH",email:"stephensonguthrie@exoswitch.com",phone:"+1 (903) 449-3271"},{name:"Mcmillan Cline",company:"TURNLING",email:"mcmillancline@turnling.com",phone:"+1 (982) 496-2454"},{name:"Kemp Davis",company:"TETRATREX",email:"kempdavis@tetratrex.com",phone:"+1 (859) 594-2982"},{name:"Matilda Levy",company:"SLOFAST",email:"matildalevy@slofast.com",phone:"+1 (841) 521-2444"},{name:"Hattie Simpson",company:"COMTRAK",email:"hattiesimpson@comtrak.com",phone:"+1 (962) 587-3805"},{name:"Kinney Munoz",company:"IDETICA",email:"kinneymunoz@idetica.com",phone:"+1 (921) 513-2012"},{name:"Lambert Raymond",company:"TURNABOUT",email:"lambertraymond@turnabout.com",phone:"+1 (919) 519-2442"},{name:"Bryant Dunlap",company:"BYTREX",email:"bryantdunlap@bytrex.com",phone:"+1 (872) 583-2883"}],e=()=>{const o=r.useCallback(c=>{const[s,d]=c,a=t[d][["name","company","email","phone"][s]];return{kind:h.Text,allowOverlay:!0,displayData:a,data:a}},[]),p=r.useMemo(()=>[{title:"Name",id:"name",group:"Core"},{title:"Company",id:"company",group:"Core"},{title:"Email",id:"email",group:"Extra"},{title:"Phone",id:"phone",group:"Extra"}],[]);return u(C,{children:[n(E,{children:`
# Column Grouping

Columns can be grouped by assinging them a group. Easy peasy.`}),n(x,{children:`
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
`}),n(R,{height:500,children:n(y,{getCellContent:o,columns:p,rows:t.length})})]})};e.storyName="07. Column Grouping";var m,i,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
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
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const v=["ColumnGrouping"];export{e as ColumnGrouping,v as __namedExportsOrder,L as default};
