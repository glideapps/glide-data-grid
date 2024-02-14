import{j as e,a as h,F as k}from"./marked.esm-dbrxtycE.js";import{R as n}from"./index-BMVQvedj.js";import{u as U,B as M,D as b,M as E,K as I,d as G}from"./utils--Nf55hQd.js";import{G as v}from"./image-window-loader-Hk1rG8Sr.js";import{S as A}from"./story-utils-K2EZnGjM.js";import{D as F}from"./data-editor-all-3W5wpw6K.js";import"./index-PWBWJyi_.js";import"./_baseIteratee-WTHxv43n.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";import"./flatten-qRvRBp6y.js";import"./throttle-7EuXLZa7.js";import"./iframe-MU0yo5By.js";import"../sb-preview/runtime.js";import"./scrolling-data-grid-6oMlsc5s.js";const z={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e(A,{children:e(r,{})})]};let w=1;function R(){return w=w*16807%2147483647}const a=()=>{const{cols:r,getCellContent:D,setCellValueRaw:s}=U(100),l=n.useRef(null),d=n.useRef(0),o=n.useRef(null);return n.useEffect(()=>{let i=0;const c=()=>{var p;const u=[],x=performance.now();for(let t=0;t<5e3;t++){const f=Math.max(10,R()%100),m=R()%1e4;s([f,m],{kind:v.Text,data:t.toString(),displayData:`${t}k`,themeOverride:t%5!==0?{bgCell:"#f2fff4",textDark:"#00d41c"}:{bgCell:"#fff6f6",textDark:"#d40000"},allowOverlay:!0,lastUpdated:x}),u.push({cell:[f,m]})}d.current+=5e3,o.current!==null&&(o.current.textContent=`${d.current}`),(p=l.current)==null||p.updateCells(u),i=window.requestAnimationFrame(c)};return c(),()=>{cancelAnimationFrame(i)}},[s]),e(M,{title:"Rapid updating",description:h(k,{children:[e(b,{children:"Data grid can support many thousands of updates per seconds. The data grid can easily update data faster than a human can read it, more importantly the faster the data grid can update, the more time your code can spend doing more valuable work."}),h(E,{children:["Updates processed: ",e(I,{ref:o})," We could do this faster but we wrote a really crappy data store for this demo which is actually slowing down the data grid."]})]}),children:e(F,{...G,ref:l,getCellContent:D,columns:r,rows:1e4})})};var C,g,y;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
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
}`,...(y=(g=a.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};const J=["RapidUpdates"];export{a as RapidUpdates,J as __namedExportsOrder,z as default};
