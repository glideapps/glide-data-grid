import{R as e,r as k}from"./iframe-BJuau1L3.js";import{k as f,D as h}from"./data-editor-all-B_YAyjyw.js";import{u as C,B as x,D as E,d as K}from"./utils-CrhZVVz_.js";import{S as v}from"./story-utils-DaD9K3ZR.js";import"./image-window-loader-si8C6aod.js";import"./throttle-CJ3Hu3Nl.js";import"./marked.esm-DKH6RWtz.js";import"./flatten-CoQNgitC.js";import"./scrolling-data-grid-DPFIXEQW.js";import"./index-D_kXk1yT.js";import"./index.esm-DfiefBJF.js";import"./index-BnArgvv2.js";const F={title:"Glide-Data-Grid/DataEditor Demos",decorators:[i=>e.createElement(v,null,e.createElement(i,null))]},s=()=>{const{getCellContent:i,cols:c,setCellValue:y}=C(30,!1),g={display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gridColumnGap:"32px",gridRowGap:"10px",marginBottom:"10px",marginTop:"20px",font:"13px sans-serif"},u={display:"flex",justifyContent:"space-between",alignItems:"center"},{copy:w,cut:D,paste:S,pageDown:G,pageUp:T,first:B,last:M,...o}=f,[a,m]=k.useState(o),r=(n,t)=>{m(b=>({...b,[n]:t}))};return e.createElement(x,{title:"Custom Keybindings",description:e.createElement(E,null,"This demo showcases custom keybindings. Modify the keybindings using the controls below.",e.createElement("div",{style:g},Object.keys(o).map(n=>e.createElement("div",{key:n,style:u},e.createElement("label",null,n,": "),e.createElement("div",null,e.createElement("input",{type:"checkbox",checked:a[n]===!0,onChange:t=>r(n,!!t.target.checked)}),e.createElement("input",{type:"text",style:{width:"100px"},value:a[n]||"",onChange:t=>r(n,t.target.value)}))))))},e.createElement(h,{...K,getCellContent:i,onCellEdited:y,keybindings:a,columns:c,rangeSelect:"multi-rect",rows:100,rowMarkers:"both"}))};var l,d,p;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const {
    getCellContent,
    cols,
    setCellValue
  } = useMockDataGenerator(30, false);
  const keybindingStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridColumnGap: "32px",
    gridRowGap: "10px",
    marginBottom: "10px",
    marginTop: "20px",
    font: "13px sans-serif"
  };
  const controlGroupStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };
  const {
    copy,
    cut,
    paste,
    pageDown,
    pageUp,
    first,
    last,
    ...rest
  } = keybindingDefaults;
  const [keybindings, setKeybindings] = useState<Partial<Keybinds>>(rest);
  const handleKeybindingChange = (key: keyof Keybinds, value: Keybind) => {
    setKeybindings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  return <BeautifulWrapper title="Custom Keybindings" description={<Description>
                    This demo showcases custom keybindings. Modify the keybindings using the controls below.
                    <div style={keybindingStyle}>
                        {Object.keys(rest).map(key => <div key={key} style={controlGroupStyle}>
                                <label>{key}: </label>
                                <div>
                                    <input type="checkbox" checked={keybindings[key as keyof Keybinds] === true} onChange={e => handleKeybindingChange(key as keyof Keybinds, e.target.checked ? true : false)} />
                                    <input type="text" style={{
            width: "100px"
          }} value={keybindings[key as keyof Keybinds] as string || ""} onChange={e => handleKeybindingChange(key as keyof Keybinds, e.target.value)} />
                                </div>
                            </div>)}
                    </div>
                </Description>}>
            <DataEditor {...defaultProps} getCellContent={getCellContent} onCellEdited={setCellValue} keybindings={keybindings} columns={cols} rangeSelect="multi-rect" rows={100} rowMarkers="both" />
        </BeautifulWrapper>;
}`,...(p=(d=s.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const H=["CustomKeybindings"];export{s as CustomKeybindings,H as __namedExportsOrder,F as default};
