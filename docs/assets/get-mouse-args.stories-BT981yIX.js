import{R as e}from"./iframe-BR7xuyxq.js";import{D as g}from"./data-editor-all-CYc0zstB.js";import{u as f,B as M,D as v,P as E,d as D}from"./utils-Cimubnom.js";import{S as P}from"./story-utils-CIsdngZT.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-CxzDuQ9s.js";import"./throttle-Ddt7N8Q3.js";import"./marked.esm-GWu2Uyfc.js";import"./flatten-Db_qbC0f.js";import"./scrolling-data-grid-B5dbQ4nv.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const $={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(P,null,e.createElement(n,null))]},o=()=>{const{cols:n,getCellContent:m}=f(6),i=e.useRef(null),[d,r]=e.useState("Move the mouse over the grid"),p=e.useCallback(s=>{var a;const t=(a=i.current)==null?void 0:a.getMouseArgsForPosition(s.clientX,s.clientY,s);t===void 0?r("Outside grid"):t.kind==="cell"?r(`Cell ${t.location[0]}, ${t.location[1]}`):r(t.kind)},[]);return e.createElement(M,{title:"getMouseArgsForPosition",description:e.createElement(v,null,"Use ",e.createElement(E,null,"getMouseArgsForPosition")," to translate pointer coordinates into grid locations.")},e.createElement("div",{onMouseMove:p},e.createElement(g,{...D,ref:i,columns:n,getCellContent:m,rows:1e3})),e.createElement("div",{style:{marginTop:8}},d))};var l,c,u;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
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
}`,...(u=(c=o.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const N=["GetMouseArgsForPosition"];export{o as GetMouseArgsForPosition,N as __namedExportsOrder,$ as default};
