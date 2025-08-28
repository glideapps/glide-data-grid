import{r as e}from"./iframe-BgfFcZ9C.js";import{G as c}from"./image-window-loader-BrZNY-5H.js";import{D as p}from"./data-editor-all-Bnd86m2g.js";import{S as R}from"./story-utils-CJEJw97k.js";import{D as T,M as s,H as y,W as h}from"./doc-wrapper-FiTOPqS2.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-DtWufps6.js";import"./marked.esm-DQlBXtuN.js";import"./flatten-BwlvJWCG.js";import"./scrolling-data-grid-ifJU8ga0.js";import"./toConsumableArray-Cg7-Q_9P.js";const A={title:"Glide-Data-Grid/Docs",decorators:[a=>e.createElement(R,null,e.createElement(a,null))]},b=[{name:"Deidre Morris",company:"GONKLE",email:"deidremorris@gonkle.com",phone:"+1 (867) 507-3332"},{name:"Sheryl Craig",company:"EVENTAGE",email:"sherylcraig@eventage.com",phone:"+1 (869) 520-2227"},{name:"Lidia Bowers",company:"ANOCHA",email:"lidiabowers@anocha.com",phone:"+1 (808) 414-3826"},{name:"Jones Norton",company:"REPETWIRE",email:"jonesnorton@repetwire.com",phone:"+1 (875) 582-3320"},{name:"Lula Bruce",company:"COMDOM",email:"lulabruce@comdom.com",phone:"+1 (873) 452-2472"},{name:"Larsen Montgomery",company:"SQUISH",email:"larsenmontgomery@squish.com",phone:"+1 (893) 482-3651"},{name:"Becky Bright",company:"COMCUR",email:"beckybright@comcur.com",phone:"+1 (879) 494-2331"},{name:"Charlotte Rowland",company:"FROLIX",email:"charlotterowland@frolix.com",phone:"+1 (861) 439-2134"},{name:"Sonya Hensley",company:"GEEKETRON",email:"sonyahensley@geeketron.com",phone:"+1 (802) 553-2194"},{name:"Stephenson Guthrie",company:"EXOSWITCH",email:"stephensonguthrie@exoswitch.com",phone:"+1 (903) 449-3271"},{name:"Mcmillan Cline",company:"TURNLING",email:"mcmillancline@turnling.com",phone:"+1 (982) 496-2454"},{name:"Kemp Davis",company:"TETRATREX",email:"kempdavis@tetratrex.com",phone:"+1 (859) 594-2982"},{name:"Matilda Levy",company:"SLOFAST",email:"matildalevy@slofast.com",phone:"+1 (841) 521-2444"},{name:"Hattie Simpson",company:"COMTRAK",email:"hattiesimpson@comtrak.com",phone:"+1 (962) 587-3805"},{name:"Kinney Munoz",company:"IDETICA",email:"kinneymunoz@idetica.com",phone:"+1 (921) 513-2012"},{name:"Lambert Raymond",company:"TURNABOUT",email:"lambertraymond@turnabout.com",phone:"+1 (919) 519-2442"},{name:"Bryant Dunlap",company:"BYTREX",email:"bryantdunlap@bytrex.com",phone:"+1 (872) 583-2883"}],m=()=>{const a=e.useRef([{name:"Deidre Morris",company:"GONKLE",email:"deidremorris@gonkle.com",phone:"+1 (867) 507-3332"},{name:"Sheryl Craig",company:"EVENTAGE",email:"sherylcraig@eventage.com",phone:"+1 (869) 520-2227"},{name:"Lidia Bowers",company:"ANOCHA",email:"lidiabowers@anocha.com",phone:"+1 (808) 414-3826"},{name:"Jones Norton",company:"REPETWIRE",email:"jonesnorton@repetwire.com",phone:"+1 (875) 582-3320"},{name:"Lula Bruce",company:"COMDOM",email:"lulabruce@comdom.com",phone:"+1 (873) 452-2472"},{name:"Larsen Montgomery",company:"SQUISH",email:"larsenmontgomery@squish.com",phone:"+1 (893) 482-3651"},{name:"Becky Bright",company:"COMCUR",email:"beckybright@comcur.com",phone:"+1 (879) 494-2331"},{name:"Charlotte Rowland",company:"FROLIX",email:"charlotterowland@frolix.com",phone:"+1 (861) 439-2134"},{name:"Sonya Hensley",company:"GEEKETRON",email:"sonyahensley@geeketron.com",phone:"+1 (802) 553-2194"},{name:"Stephenson Guthrie",company:"EXOSWITCH",email:"stephensonguthrie@exoswitch.com",phone:"+1 (903) 449-3271"},{name:"Mcmillan Cline",company:"TURNLING",email:"mcmillancline@turnling.com",phone:"+1 (982) 496-2454"},{name:"Kemp Davis",company:"TETRATREX",email:"kempdavis@tetratrex.com",phone:"+1 (859) 594-2982"},{name:"Matilda Levy",company:"SLOFAST",email:"matildalevy@slofast.com",phone:"+1 (841) 521-2444"},{name:"Hattie Simpson",company:"COMTRAK",email:"hattiesimpson@comtrak.com",phone:"+1 (962) 587-3805"},{name:"Kinney Munoz",company:"IDETICA",email:"kinneymunoz@idetica.com",phone:"+1 (921) 513-2012"},{name:"Lambert Raymond",company:"TURNABOUT",email:"lambertraymond@turnabout.com",phone:"+1 (919) 519-2442"},{name:"Bryant Dunlap",company:"BYTREX",email:"bryantdunlap@bytrex.com",phone:"+1 (872) 583-2883"}]),w=e.useCallback(t=>{const[o,l]=t,n=a.current[l][["name","company","email","phone"][o]];return{kind:c.Text,allowOverlay:!0,displayData:n,data:n}},[]),E=e.useCallback(t=>{const[o,l]=t,n=b[l][["name","company","email","phone"][o]];return{kind:c.Text,allowOverlay:!0,displayData:n,data:n}},[]),k=e.useCallback((t,o)=>{if(o.kind!==c.Text)return;const l=["name","company","email","phone"],[i,r]=t,n=l[i];a.current[r][n]=o.data},[]),d=e.useMemo(()=>[{title:"Name",id:"name"},{title:"Company",id:"company"},{title:"Email",id:"email"},{title:"Phone",id:"phone"}],[]);return e.createElement(T,null,e.createElement(s,null,`
# Editing Data

Editing data is handled via callbacks. Taking the getting started example as a starting point, the \`getContent\` callback can be modified to allow editing.`),e.createElement(y,null,`
const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
        displayData: d,
        data: d,
    };
}, []);
`),e.createElement(s,null,"\n`allowOverlay` has been set to true. This allows the overlay to come up. For explanatory purposes the `readonly` field is being set to false. This is the default value, setting it to true would allow the overlay to come up but not allow editing."),e.createElement(h,{height:200},e.createElement(p,{getCellContent:E,columns:d,rows:a.current.length})),e.createElement(s,null,"\n> You can see the editor now, but the data is not saved.\n\nImplementing the `onCellEdited` callback allows responding to cell edit events. Edit events pass back a mutated version of the original `GridCell` returned from `getContent`."),e.createElement(y,null,`
const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {
    if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
    }

    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const [col, row] = cell;
    const key = indexes[col];
    data[row][key] = newValue.data;
}, []);`),e.createElement(h,{height:200},e.createElement(p,{getCellContent:w,onCellEdited:k,columns:d,rows:a.current.length})))};m.storyName="02. Editing Data";var u,g,C;m.parameters={...m.parameters,docs:{...(u=m.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  const dataRef = React.useRef([{
    name: "Deidre Morris",
    company: "GONKLE",
    email: "deidremorris@gonkle.com",
    phone: "+1 (867) 507-3332"
  }, {
    name: "Sheryl Craig",
    company: "EVENTAGE",
    email: "sherylcraig@eventage.com",
    phone: "+1 (869) 520-2227"
  }, {
    name: "Lidia Bowers",
    company: "ANOCHA",
    email: "lidiabowers@anocha.com",
    phone: "+1 (808) 414-3826"
  }, {
    name: "Jones Norton",
    company: "REPETWIRE",
    email: "jonesnorton@repetwire.com",
    phone: "+1 (875) 582-3320"
  }, {
    name: "Lula Bruce",
    company: "COMDOM",
    email: "lulabruce@comdom.com",
    phone: "+1 (873) 452-2472"
  }, {
    name: "Larsen Montgomery",
    company: "SQUISH",
    email: "larsenmontgomery@squish.com",
    phone: "+1 (893) 482-3651"
  }, {
    name: "Becky Bright",
    company: "COMCUR",
    email: "beckybright@comcur.com",
    phone: "+1 (879) 494-2331"
  }, {
    name: "Charlotte Rowland",
    company: "FROLIX",
    email: "charlotterowland@frolix.com",
    phone: "+1 (861) 439-2134"
  }, {
    name: "Sonya Hensley",
    company: "GEEKETRON",
    email: "sonyahensley@geeketron.com",
    phone: "+1 (802) 553-2194"
  }, {
    name: "Stephenson Guthrie",
    company: "EXOSWITCH",
    email: "stephensonguthrie@exoswitch.com",
    phone: "+1 (903) 449-3271"
  }, {
    name: "Mcmillan Cline",
    company: "TURNLING",
    email: "mcmillancline@turnling.com",
    phone: "+1 (982) 496-2454"
  }, {
    name: "Kemp Davis",
    company: "TETRATREX",
    email: "kempdavis@tetratrex.com",
    phone: "+1 (859) 594-2982"
  }, {
    name: "Matilda Levy",
    company: "SLOFAST",
    email: "matildalevy@slofast.com",
    phone: "+1 (841) 521-2444"
  }, {
    name: "Hattie Simpson",
    company: "COMTRAK",
    email: "hattiesimpson@comtrak.com",
    phone: "+1 (962) 587-3805"
  }, {
    name: "Kinney Munoz",
    company: "IDETICA",
    email: "kinneymunoz@idetica.com",
    phone: "+1 (921) 513-2012"
  }, {
    name: "Lambert Raymond",
    company: "TURNABOUT",
    email: "lambertraymond@turnabout.com",
    phone: "+1 (919) 519-2442"
  }, {
    name: "Bryant Dunlap",
    company: "BYTREX",
    email: "bryantdunlap@bytrex.com",
    phone: "+1 (872) 583-2883"
  }]);
  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = dataRef.current[row];
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: d,
      data: d
    };
  }, []);
  const getFixedContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = fixedData[row];
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: d,
      data: d
    };
  }, []);
  const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {
    if (newValue.kind !== GridCellKind.Text) {
      // we only have text cells, might as well just die here.
      return;
    }
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const [col, row] = cell;
    const key = indexes[col];
    dataRef.current[row][key] = newValue.data;
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
  return <DocWrapper>
            <Marked>
                {\`
# Editing Data

Editing data is handled via callbacks. Taking the getting started example as a starting point, the \\\`getContent\\\` callback can be modified to allow editing.\`}
            </Marked>
            <Highlight>
                {\`
const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const d = dataRow[indexes[col]];
    return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
        displayData: d,
        data: d,
    };
}, []);
\`}
            </Highlight>
            <Marked>
                {\`
\\\`allowOverlay\\\` has been set to true. This allows the overlay to come up. For explanatory purposes the \\\`readonly\\\` field is being set to false. This is the default value, setting it to true would allow the overlay to come up but not allow editing.\`}
            </Marked>
            <Wrapper height={200}>
                <DataEditor getCellContent={getFixedContent} columns={columns} rows={dataRef.current.length} />
            </Wrapper>
            <Marked>
                {\`
> You can see the editor now, but the data is not saved.

Implementing the \\\`onCellEdited\\\` callback allows responding to cell edit events. Edit events pass back a mutated version of the original \\\`GridCell\\\` returned from \\\`getContent\\\`.\`}
            </Marked>
            <Highlight>
                {\`
const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {
    if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
    }

    const indexes: (keyof DummyItem)[] = ["name", "company", "email", "phone"];
    const [col, row] = cell;
    const key = indexes[col];
    data[row][key] = newValue.data;
}, []);\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor getCellContent={getContent} onCellEdited={onCellEdited} columns={columns} rows={dataRef.current.length} />
            </Wrapper>
        </DocWrapper>;
}`,...(C=(g=m.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};const K=["EditingData"];export{m as EditingData,K as __namedExportsOrder,A as default};
