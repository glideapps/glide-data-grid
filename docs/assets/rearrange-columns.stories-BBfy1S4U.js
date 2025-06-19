import{R as e}from"./iframe-C1-tNiF2.js";import{D as M}from"./data-editor-all-DmhSNLJC.js";import{B as x,D as v,P as k,u as f,d as I}from"./utils-xL8XIxQl.js";import{S}from"./story-utils-CDI4T5Xi.js";import"./image-window-loader-CXb9j7hw.js";import"./throttle-SLdF8OvU.js";import"./marked.esm-D3slmJuh.js";import"./flatten-DXbQYuqR.js";import"./scrolling-data-grid-BWhfxTgG.js";import"./index-D_kXk1yT.js";import"./index.esm-BaHk0IuN.js";import"./index-CNGx-KVY.js";const W={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(S,null,e.createElement(x,{title:"Rearrange Columns",description:e.createElement(v,null,"Columns can be rearranged by drag and dropping, as long as you respond to the"," ",e.createElement(k,null,"onColumnMoved")," callback.")},e.createElement(o,null)))]},r=()=>{const{cols:o,getCellContent:c}=f(60),[s,C]=e.useState(o),u=e.useCallback((l,t)=>{C(a=>{const n=[...a],[b]=n.splice(l,1);return n.splice(t,0,b),n})},[]),p=e.useCallback((l,t)=>t!==3,[]),g=e.useCallback(([l,t])=>{const a=o.findIndex(n=>n.title===s[l].title);return c([a,t])},[o,c,s]);return e.createElement(M,{...I,freezeColumns:1,rowMarkers:"both",getCellContent:g,onColumnProposeMove:p,columns:s,onColumnMoved:u,columnSelectionBlending:"mixed",rangeSelectionBlending:"mixed",rows:1e3})};var d,m,i;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(60);

  // This is a dirty hack because the mock generator doesn't really support changing this. In a real data source
  // you should track indexes properly
  const [sortableCols, setSortableCols] = React.useState(cols);
  const onColMoved = React.useCallback((startIndex: number, endIndex: number): void => {
    setSortableCols(old => {
      const newCols = [...old];
      const [toMove] = newCols.splice(startIndex, 1);
      newCols.splice(endIndex, 0, toMove);
      return newCols;
    });
  }, []);
  const onColProposeMove = React.useCallback((_startIndex: number, endIndex: number): boolean => {
    return endIndex !== 3;
  }, []);
  const getCellContentMangled = React.useCallback(([col, row]: Item): GridCell => {
    const remappedCol = cols.findIndex(c => c.title === sortableCols[col].title);
    return getCellContent([remappedCol, row]);
  }, [cols, getCellContent, sortableCols]);
  return <DataEditor {...defaultProps} freezeColumns={1} rowMarkers="both" getCellContent={getCellContentMangled} onColumnProposeMove={onColProposeMove} columns={sortableCols} onColumnMoved={onColMoved} columnSelectionBlending="mixed" rangeSelectionBlending="mixed" rows={1000} />;
}`,...(i=(m=r.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};const A=["RearrangeColumns"];export{r as RearrangeColumns,A as __namedExportsOrder,W as default};
