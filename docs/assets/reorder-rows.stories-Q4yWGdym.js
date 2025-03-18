import{j as o,F as C,a as D}from"./marked.esm-dbrxtycE.js";import{l as f}from"./lodash-8jIGfDyZ.js";import{R as t}from"./index-BMVQvedj.js";import{D as h}from"./data-editor-all-50ixdI5b.js";import{B as b,D as g,P as v,d as k}from"./utils-79SXuv2L.js";import{G as x}from"./image-window-loader-14Ewq8Gv.js";import{S as M}from"./story-utils-K2EZnGjM.js";import"./iframe-O3X4YIA0.js";import"../sb-preview/runtime.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-2HuByfij.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const q={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>o(M,{children:o(b,{title:"Reorder Rows",description:o(C,{children:D(g,{children:["Rows can be re-arranged by using the ",o(v,{children:"onRowMoved"})," callback. When set the first row can be used to drag and drop."]})}),children:o(s,{})})})]},a=()=>{const s=t.useMemo(()=>[{title:"Col A",width:150},{title:"Col B",width:150}],[]),[n,m]=t.useState(()=>f.range(0,50).map(e=>[`A: ${e}`,`B: ${e}`])),p=t.useCallback(([e,r])=>({kind:x.Text,allowOverlay:!1,data:n[r][e],displayData:n[r][e]}),[n]),w=t.useCallback((e,r)=>{m(u=>{const l=[...u],R=l.splice(e,1);return l.splice(r,0,...R),l})},[]);return o(h,{...k,rowMarkers:"both",onRowMoved:w,getCellContent:p,columns:s,rows:50})};var d,i,c;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const cols = React.useMemo<GridColumn[]>(() => [{
    title: "Col A",
    width: 150
  }, {
    title: "Col B",
    width: 150
  }], []);
  const [rowData, setRowData] = React.useState(() => {
    return range(0, 50).map(x => [\`A: \${x}\`, \`B: \${x}\`]);
  });
  const getCellContent = React.useCallback<DataEditorProps["getCellContent"]>(([col, row]) => {
    return {
      kind: GridCellKind.Text,
      allowOverlay: false,
      data: rowData[row][col],
      displayData: rowData[row][col]
    };
  }, [rowData]);
  const reorderRows = React.useCallback((from: number, to: number) => {
    setRowData(cv => {
      const d = [...cv];
      const removed = d.splice(from, 1);
      d.splice(to, 0, ...removed);
      return d;
    });
  }, []);
  return <DataEditor {...defaultProps} rowMarkers={"both"} onRowMoved={reorderRows} getCellContent={getCellContent} columns={cols} rows={50} />;
}`,...(c=(i=a.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const z=["ReorderRows"];export{a as ReorderRows,z as __namedExportsOrder,q as default};
