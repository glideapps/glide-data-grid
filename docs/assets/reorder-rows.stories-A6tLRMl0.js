import{l as R}from"./lodash-BO0hbJ6X.js";import{R as e}from"./iframe-DzUnzz49.js";import{D as C}from"./data-editor-all-gksW55uT.js";import{B as D,D as f,P as E,d as b}from"./utils-BAcdM8lM.js";import{G as g}from"./image-window-loader-BJAy_c_3.js";import{S as h}from"./story-utils-DZBHTHu6.js";import"./throttle-BTju9Vi9.js";import"./flatten-Bb-cl50g.js";import"./scrolling-data-grid-CLTkCsm_.js";import"./marked.esm-_fi_nHnk.js";import"./index-D_kXk1yT.js";import"./index.esm-B4c5nbaJ.js";import"./index-V2KuqDje.js";const W={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e.createElement(h,null,e.createElement(D,{title:"Reorder Rows",description:e.createElement(e.Fragment,null,e.createElement(f,null,"Rows can be re-arranged by using the ",e.createElement(E,null,"onRowMoved")," callback. When set the first row can be used to drag and drop."))},e.createElement(a,null)))]},o=()=>{const a=e.useMemo(()=>[{title:"Col A",width:150},{title:"Col B",width:150}],[]),[n,i]=e.useState(()=>R.range(0,50).map(t=>[`A: ${t}`,`B: ${t}`])),m=e.useCallback(([t,r])=>({kind:g.Text,allowOverlay:!1,data:n[r][t],displayData:n[r][t]}),[n]),p=e.useCallback((t,r)=>{i(u=>{const s=[...u],w=s.splice(t,1);return s.splice(r,0,...w),s})},[]);return e.createElement(C,{...b,rowMarkers:"both",onRowMoved:p,getCellContent:m,columns:a,rows:50})};var l,c,d;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
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
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const _=["ReorderRows"];export{o as ReorderRows,_ as __namedExportsOrder,W as default};
