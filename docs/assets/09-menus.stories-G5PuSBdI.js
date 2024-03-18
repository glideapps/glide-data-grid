import{j as n,a as s}from"./marked.esm-dbrxtycE.js";import{r as a}from"./index-BMVQvedj.js";import{G as S}from"./image-window-loader-6IwN0BJG.js";import{D as h}from"./data-editor-all-5_FSs0lI.js";import{S as f}from"./story-utils-K2EZnGjM.js";import{D as O,M as p,H as g,W as b}from"./doc-wrapper-m1-LpzDL.js";import{u as E}from"./react-laag.esm-PpDllAFI.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./iframe-o2bFZbuT.js";import"../sb-preview/runtime.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-WDauxac0.js";import"./toConsumableArray-ppDpjNRJ.js";import"./index-wocATsGp.js";const _={title:"Glide-Data-Grid/Docs",decorators:[r=>n(f,{children:n(r,{})})]},l=[{name:"Deidre Morris",company:"GONKLE",email:"deidremorris@gonkle.com",phone:"+1 (867) 507-3332"},{name:"Sheryl Craig",company:"EVENTAGE",email:"sherylcraig@eventage.com",phone:"+1 (869) 520-2227"},{name:"Lidia Bowers",company:"ANOCHA",email:"lidiabowers@anocha.com",phone:"+1 (808) 414-3826"},{name:"Jones Norton",company:"REPETWIRE",email:"jonesnorton@repetwire.com",phone:"+1 (875) 582-3320"},{name:"Lula Bruce",company:"COMDOM",email:"lulabruce@comdom.com",phone:"+1 (873) 452-2472"},{name:"Larsen Montgomery",company:"SQUISH",email:"larsenmontgomery@squish.com",phone:"+1 (893) 482-3651"},{name:"Becky Bright",company:"COMCUR",email:"beckybright@comcur.com",phone:"+1 (879) 494-2331"},{name:"Charlotte Rowland",company:"FROLIX",email:"charlotterowland@frolix.com",phone:"+1 (861) 439-2134"},{name:"Sonya Hensley",company:"GEEKETRON",email:"sonyahensley@geeketron.com",phone:"+1 (802) 553-2194"},{name:"Stephenson Guthrie",company:"EXOSWITCH",email:"stephensonguthrie@exoswitch.com",phone:"+1 (903) 449-3271"},{name:"Mcmillan Cline",company:"TURNLING",email:"mcmillancline@turnling.com",phone:"+1 (982) 496-2454"},{name:"Kemp Davis",company:"TETRATREX",email:"kempdavis@tetratrex.com",phone:"+1 (859) 594-2982"},{name:"Matilda Levy",company:"SLOFAST",email:"matildalevy@slofast.com",phone:"+1 (841) 521-2444"},{name:"Hattie Simpson",company:"COMTRAK",email:"hattiesimpson@comtrak.com",phone:"+1 (962) 587-3805"},{name:"Kinney Munoz",company:"IDETICA",email:"kinneymunoz@idetica.com",phone:"+1 (921) 513-2012"},{name:"Lambert Raymond",company:"TURNABOUT",email:"lambertraymond@turnabout.com",phone:"+1 (919) 519-2442"},{name:"Bryant Dunlap",company:"BYTREX",email:"bryantdunlap@bytrex.com",phone:"+1 (872) 583-2883"}],i=()=>{const r=a.useCallback(t=>{const[o,H]=t,m=l[H][["name","company","email","phone"][o]];return{kind:S.Text,allowOverlay:!0,displayData:m,data:m}},[]),d=a.useMemo(()=>[{title:"Name",id:"name",hasMenu:!0},{title:"Company",id:"company",hasMenu:!0},{title:"Email",id:"email",hasMenu:!0},{title:"Phone",id:"phone",hasMenu:!0}],[]),C=a.useCallback((t,o)=>{window.alert("Header menu clicked "+t+JSON.stringify(o))},[]),[e,u]=a.useState(),k=a.useCallback((t,o)=>{u({col:t,bounds:o})},[]),{renderLayer:R,layerProps:c}=E({isOpen:e!==void 0,triggerOffset:4,onOutsideClick:()=>u(void 0),trigger:{getBounds:()=>({bottom:((e==null?void 0:e.bounds.y)??0)+((e==null?void 0:e.bounds.height)??0),height:(e==null?void 0:e.bounds.height)??0,left:(e==null?void 0:e.bounds.x)??0,right:((e==null?void 0:e.bounds.x)??0)+((e==null?void 0:e.bounds.width)??0),top:(e==null?void 0:e.bounds.y)??0,width:(e==null?void 0:e.bounds.width)??0})},placement:"bottom-start",auto:!0,possiblePlacements:["bottom-start","bottom-end"]});return s(O,{children:[n(p,{children:`
# Menus

Glide Data Grid doesn't come with built in menus. Instead it is evented and ready to work with whatever menus you want 
to use. Let's learn how to add basic menus using [react-laag](https://www.react-laag.com/). Adding menu drop down indicators to headers is as simple
as passing a bool and listening to click events using \`onHeaderMenuClick\`.`}),n(g,{children:`
const columns = React.useMemo<GridColumn[]>(() => {
    return [
        {
            title: "Name",
            id: "name",
            hasMenu: true,
        },
        {
            title: "Company",
            id: "company",
            hasMenu: true,
        },
        {
            title: "Email",
            id: "email",
            hasMenu: true,
        },
        {
            title: "Phone",
            id: "phone",
            hasMenu: true,
        },
    ];
}, []);

const onHeaderMenuClick = React.useCallback((col: number, position: Rectangle) => {
    window.alert("Header menu clicked " + col + JSON.stringify(position));
}, []);

return <DataEditor {...rest} onHeaderMenuClick={onHeaderMenuClick} />;
`}),n(b,{height:200,children:n(h,{getCellContent:r,columns:d,rows:l.length,onHeaderMenuClick:C})}),n(p,{children:`
The provided coordinates are in page space. This makes it trivial to use [react-laag](https://www.react-laag.com/) to create a basic menu. Some 
styling would go a long way here.`}),n(g,{children:`
const [showMenu, setShowMenu] = React.useState<{ bounds: Rectangle; col: number }>();

const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
    setShowMenu({ col, bounds });
}, []);

const { renderLayer, layerProps } = useLayer({
    isOpen: showMenu !== undefined,
    triggerOffset: 4,
    onOutsideClick: () => setShowMenu(undefined),
    trigger: {
        getBounds: () => ({
            bottom: (showMenu?.bounds.y ?? 0) + (showMenu?.bounds.height ?? 0),
            height: showMenu?.bounds.height ?? 0,
            left: showMenu?.bounds.x ?? 0,
            right: (showMenu?.bounds.x ?? 0) + (showMenu?.bounds.width ?? 0),
            top: showMenu?.bounds.y ?? 0,
            width: showMenu?.bounds.width ?? 0,
        }),
    },
    placement: "bottom-start",
    auto: true,
    possiblePlacements: ["bottom-start", "bottom-end"],
    });

return <>
    <DataEditor {...rest} onHeaderMenuClick={onHeaderMenuClick} />
    {showMenu !== undefined &&
        renderLayer(
            <div
                {...layerProps}
                style={{
                    ...layerProps.style,
                    width: 300,
                    padding: 4,
                    borderRadius: 8,
                    backgroundColor: "white",
                    border: "1px solid black",
                }}>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
        )}
</>;
`}),s(b,{height:200,children:[n(h,{getCellContent:r,columns:d,rows:l.length,onHeaderMenuClick:k}),e!==void 0&&R(n("div",{...c,style:{...c.style,width:300,padding:4,borderRadius:8,backgroundColor:"white",border:"1px solid black"},children:s("ul",{children:[n("li",{children:"Item 1"}),n("li",{children:"Item 2"}),n("li",{children:"Item 3"})]})}))]})]})};i.storyName="09. Menus";var w,y,M;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
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
      hasMenu: true
    }, {
      title: "Company",
      id: "company",
      hasMenu: true
    }, {
      title: "Email",
      id: "email",
      hasMenu: true
    }, {
      title: "Phone",
      id: "phone",
      hasMenu: true
    }];
  }, []);
  const onHeaderMenuClickedStage1 = React.useCallback((col: number, position: Rectangle) => {
    window.alert("Header menu clicked " + col + JSON.stringify(position));
  }, []);
  const [showMenu, setShowMenu] = React.useState<{
    bounds: Rectangle;
    col: number;
  }>();
  const onHeaderMenuClickedStage2 = React.useCallback((col: number, bounds: Rectangle) => {
    setShowMenu({
      col,
      bounds
    });
  }, []);
  const {
    renderLayer,
    layerProps
  } = useLayer({
    isOpen: showMenu !== undefined,
    triggerOffset: 4,
    onOutsideClick: () => setShowMenu(undefined),
    trigger: {
      getBounds: () => ({
        bottom: (showMenu?.bounds.y ?? 0) + (showMenu?.bounds.height ?? 0),
        height: showMenu?.bounds.height ?? 0,
        left: showMenu?.bounds.x ?? 0,
        right: (showMenu?.bounds.x ?? 0) + (showMenu?.bounds.width ?? 0),
        top: showMenu?.bounds.y ?? 0,
        width: showMenu?.bounds.width ?? 0
      })
    },
    placement: "bottom-start",
    auto: true,
    possiblePlacements: ["bottom-start", "bottom-end"]
  });
  return <DocWrapper>
            <Marked>
                {\`
# Menus

Glide Data Grid doesn't come with built in menus. Instead it is evented and ready to work with whatever menus you want 
to use. Let's learn how to add basic menus using [react-laag](https://www.react-laag.com/). Adding menu drop down indicators to headers is as simple
as passing a bool and listening to click events using \\\`onHeaderMenuClick\\\`.\`}
            </Marked>
            <Highlight>
                {\`
const columns = React.useMemo<GridColumn[]>(() => {
    return [
        {
            title: "Name",
            id: "name",
            hasMenu: true,
        },
        {
            title: "Company",
            id: "company",
            hasMenu: true,
        },
        {
            title: "Email",
            id: "email",
            hasMenu: true,
        },
        {
            title: "Phone",
            id: "phone",
            hasMenu: true,
        },
    ];
}, []);

const onHeaderMenuClick = React.useCallback((col: number, position: Rectangle) => {
    window.alert("Header menu clicked " + col + JSON.stringify(position));
}, []);

return <DataEditor {...rest} onHeaderMenuClick={onHeaderMenuClick} />;
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor getCellContent={getContent} columns={columns} rows={data.length} onHeaderMenuClick={onHeaderMenuClickedStage1} />
            </Wrapper>
            <Marked>
                {\`
The provided coordinates are in page space. This makes it trivial to use [react-laag](https://www.react-laag.com/) to create a basic menu. Some 
styling would go a long way here.\`}
            </Marked>
            <Highlight>
                {\`
const [showMenu, setShowMenu] = React.useState<{ bounds: Rectangle; col: number }>();

const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
    setShowMenu({ col, bounds });
}, []);

const { renderLayer, layerProps } = useLayer({
    isOpen: showMenu !== undefined,
    triggerOffset: 4,
    onOutsideClick: () => setShowMenu(undefined),
    trigger: {
        getBounds: () => ({
            bottom: (showMenu?.bounds.y ?? 0) + (showMenu?.bounds.height ?? 0),
            height: showMenu?.bounds.height ?? 0,
            left: showMenu?.bounds.x ?? 0,
            right: (showMenu?.bounds.x ?? 0) + (showMenu?.bounds.width ?? 0),
            top: showMenu?.bounds.y ?? 0,
            width: showMenu?.bounds.width ?? 0,
        }),
    },
    placement: "bottom-start",
    auto: true,
    possiblePlacements: ["bottom-start", "bottom-end"],
    });

return <>
    <DataEditor {...rest} onHeaderMenuClick={onHeaderMenuClick} />
    {showMenu !== undefined &&
        renderLayer(
            <div
                {...layerProps}
                style={{
                    ...layerProps.style,
                    width: 300,
                    padding: 4,
                    borderRadius: 8,
                    backgroundColor: "white",
                    border: "1px solid black",
                }}>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
        )}
</>;
\`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor getCellContent={getContent} columns={columns} rows={data.length} onHeaderMenuClick={onHeaderMenuClickedStage2} />
                {showMenu !== undefined && renderLayer(<div {...layerProps} style={{
        ...layerProps.style,
        width: 300,
        padding: 4,
        borderRadius: 8,
        backgroundColor: "white",
        border: "1px solid black"
      }}>
                            <ul>
                                <li>Item 1</li>
                                <li>Item 2</li>
                                <li>Item 3</li>
                            </ul>
                        </div>)}
            </Wrapper>
        </DocWrapper>;
}`,...(M=(y=i.parameters)==null?void 0:y.docs)==null?void 0:M.source}}};const z=["Menus"];export{i as Menus,z as __namedExportsOrder,_ as default};
