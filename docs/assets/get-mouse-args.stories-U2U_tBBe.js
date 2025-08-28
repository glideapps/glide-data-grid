import{R as e}from"./iframe-B_Q06Dca.js";import{D as g}from"./data-editor-all-ClUqzqIV.js";import{u as f,B as M,D as v,P as E,d as D}from"./utils-CCjQfXGC.js";import{S as P}from"./story-utils-DDLeMfpA.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-D7sQ27jY.js";import"./throttle-Co5oNmeu.js";import"./marked.esm-CcrTC-0Z.js";import"./flatten-DXL8hG6G.js";import"./scrolling-data-grid-DvEd2NXF.js";import"./index-D_kXk1yT.js";import"./index.esm-mFikWORe.js";import"./index-CZXiV8zI.js";const N={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(P,null,e.createElement(n,null))]},o=()=>{const{cols:n,getCellContent:m}=f(6),i=e.useRef(null),[p,r]=e.useState("Move the mouse over the grid"),d=e.useCallback(s=>{var a;const t=(a=i.current)==null?void 0:a.getMouseArgsForPosition(s.clientX,s.clientY,s);t===void 0?r("Outside grid"):t.kind==="cell"?r(`Cell ${t.location[0]}, ${t.location[1]}`):r(t.kind)},[]);return e.createElement(M,{title:"getMouseArgsForPosition",description:e.createElement(v,null,"Use ",e.createElement(E,null,"getMouseArgsForPosition")," to translate pointer coordinates into grid locations.")},e.createElement("div",{onMouseMove:d},e.createElement(g,{...D,ref:i,columns:n,getCellContent:m,rows:1e3})),e.createElement("div",{style:{marginTop:8}},p))};var l,c,u;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  const ref = React.useRef<DataEditorRef>(null);
  const [info, setInfo] = React.useState<string>("Move the mouse over the grid");
  const onMouseMove = React.useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
    const args = ref.current?.getMouseArgsForPosition(ev.clientX, ev.clientY, ev);
    if (args === undefined) {
      setInfo("Outside grid");
    } else if (args.kind === "cell") {
      setInfo(\`Cell \${args.location[0]}, \${args.location[1]}\`);
    } else {
      setInfo(args.kind);
    }
  }, []);
  return <BeautifulWrapper title="getMouseArgsForPosition" description={<Description>
                    Use <PropName>getMouseArgsForPosition</PropName> to translate
                    pointer coordinates into grid locations.
                </Description>}>
            <div onMouseMove={onMouseMove}>
                <DataEditor {...defaultProps} ref={ref} columns={cols} getCellContent={getCellContent} rows={1000} />
            </div>
            <div style={{
      marginTop: 8
    }}>{info}</div>
        </BeautifulWrapper>;
}`,...(u=(c=o.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const O=["GetMouseArgsForPosition"];export{o as GetMouseArgsForPosition,O as __namedExportsOrder,N as default};
