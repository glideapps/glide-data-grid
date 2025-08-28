import{R as e}from"./iframe-BgfFcZ9C.js";import{u as D,B as x,D as E,M as k,K as U,d as M}from"./utils-DqFEZiEk.js";import{G as b}from"./image-window-loader-BrZNY-5H.js";import{S as I}from"./story-utils-CJEJw97k.js";import{D as G}from"./data-editor-all-Bnd86m2g.js";import"./preload-helper-C1FmrZbK.js";import"./index-D_kXk1yT.js";import"./marked.esm-DQlBXtuN.js";import"./throttle-DtWufps6.js";import"./flatten-BwlvJWCG.js";import"./throttle--dN168Gr.js";import"./scrolling-data-grid-ifJU8ga0.js";const q={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e.createElement(I,null,e.createElement(a,null))]};let m=1;function w(){return m=m*16807%2147483647}const n=()=>{const{cols:a,getCellContent:g,setCellValueRaw:o}=D(100),l=e.useRef(null),s=e.useRef(0),r=e.useRef(null);return e.useEffect(()=>{let d=0;const c=()=>{var u;const i=[],y=performance.now();for(let t=0;t<5e3;t++){const p=Math.max(10,w()%100),f=w()%1e4;o([p,f],{kind:b.Text,data:t.toString(),displayData:`${t}k`,themeOverride:t%5!==0?{bgCell:"#f2fff4",textDark:"#00d41c"}:{bgCell:"#fff6f6",textDark:"#d40000"},allowOverlay:!0,lastUpdated:y}),i.push({cell:[p,f]})}s.current+=5e3,r.current!==null&&(r.current.textContent=`${s.current}`),(u=l.current)==null||u.updateCells(i),d=window.requestAnimationFrame(c)};return c(),()=>{cancelAnimationFrame(d)}},[o]),e.createElement(x,{title:"Rapid updating",description:e.createElement(e.Fragment,null,e.createElement(E,null,"Data grid can support many thousands of updates per seconds. The data grid can easily update data faster than a human can read it, more importantly the faster the data grid can update, the more time your code can spend doing more valuable work."),e.createElement(k,null,"Updates processed: ",e.createElement(U,{ref:r})," We could do this faster but we wrote a really crappy data store for this demo which is actually slowing down the data grid."))},e.createElement(G,{...M,ref:l,getCellContent:g,columns:a,rows:1e4}))};var h,R,C;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValueRaw
  } = useMockDataGenerator(100);
  const ref = React.useRef<DataEditorRef>(null);
  const countRef = React.useRef(0);
  const displayCountRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    let rafID = 0;
    const sendUpdate = () => {
      const cells: {
        cell: Item;
      }[] = [];
      const now = performance.now();
      for (let x = 0; x < 5000; x++) {
        const col = Math.max(10, rand() % 100);
        const row = rand() % 10_000;
        setCellValueRaw([col, row], {
          kind: GridCellKind.Text,
          data: x.toString(),
          displayData: \`\${x}k\`,
          themeOverride: x % 5 !== 0 ? {
            bgCell: "#f2fff4",
            textDark: "#00d41c"
          } : {
            bgCell: "#fff6f6",
            textDark: "#d40000"
          },
          allowOverlay: true,
          lastUpdated: now
        });
        cells.push({
          cell: [col, row]
        });
      }
      countRef.current += 5000;
      if (displayCountRef.current !== null) {
        displayCountRef.current.textContent = \`\${countRef.current}\`;
      }
      ref.current?.updateCells(cells);
      rafID = window.requestAnimationFrame(sendUpdate);
    };
    sendUpdate();
    return () => {
      cancelAnimationFrame(rafID);
    };
  }, [setCellValueRaw]);
  return <BeautifulWrapper title="Rapid updating" description={<>
                    <Description>
                        Data grid can support many thousands of updates per seconds. The data grid can easily update
                        data faster than a human can read it, more importantly the faster the data grid can update, the
                        more time your code can spend doing more valuable work.
                    </Description>
                    <MoreInfo>
                        Updates processed: <KeyName ref={displayCountRef} /> We could do this faster but we wrote a
                        really crappy data store for this demo which is actually slowing down the data grid.
                    </MoreInfo>
                </>}>
            <DataEditorAll {...defaultProps} ref={ref} getCellContent={getCellContent} columns={cols} rows={10_000} />
        </BeautifulWrapper>;
}`,...(C=(R=n.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};const N=["RapidUpdates"];export{n as RapidUpdates,N as __namedExportsOrder,q as default};
