import{R as e}from"./iframe-DzUnzz49.js";import{D as I}from"./data-editor-all-gksW55uT.js";import{a as T,B as k,D as M,P as p,M as g,d as w}from"./utils-BAcdM8lM.js";import{G as d}from"./image-window-loader-BJAy_c_3.js";import{S as b}from"./story-utils-DZBHTHu6.js";import"./throttle-BTju9Vi9.js";import"./flatten-Bb-cl50g.js";import"./scrolling-data-grid-CLTkCsm_.js";import"./marked.esm-_fi_nHnk.js";import"./index-D_kXk1yT.js";import"./index.esm-B4c5nbaJ.js";import"./index-V2KuqDje.js";const z={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>e.createElement(b,null,e.createElement(s,null))]},f=new Set(["image/png","image/gif","image/bmp","image/jpeg"]),a=()=>{const{cols:s,getCellContent:i,onColumnResize:E,setCellValue:c}=T(),[v,r]=e.useState([]),[m,R]=e.useState(),y=e.useCallback((n,t)=>{if(r([]),t===null)return;const{files:l}=t;if(l.length!==1)return;const[o]=l;if(!f.has(o.type))return;const u=URL.createObjectURL(o);c(n,{kind:d.Image,data:[u],allowOverlay:!0,readonly:!0},!0,!0),R(n)},[c]),P=e.useCallback((n,t)=>{if(t===null)return;const{items:l}=t;if(l.length!==1)return;const[o]=l;if(!f.has(o.type))return;const[u,S]=n;i(n).kind===d.Image?r([{color:"#44BB0022",range:{x:u,y:S,width:1,height:1}}]):r([])},[i]),O=e.useCallback(()=>{r([])},[]);return e.createElement(k,{title:"Drop events",description:e.createElement(e.Fragment,null,e.createElement(M,null,"You can drag and drop into cells by using ",e.createElement(p,null,"onDragOverCell")," and"," ",e.createElement(p,null,"onDrop"),"."),e.createElement("div",null,m===void 0?e.createElement(g,null,"Nothing dropped, yet"):e.createElement(e.Fragment,null,e.createElement(g,null,"You last dropped in cell ",e.createElement(p,null,JSON.stringify(m))))))},e.createElement(I,{...w,getCellContent:i,columns:s,onCellEdited:c,onColumnResize:E,rows:1e3,onDrop:y,onDragOverCell:P,onDragLeave:O,highlightRegions:v,rowMarkers:"none"}))};var h,C,D;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const [highlights, setHighlights] = React.useState<DataEditorProps["highlightRegions"]>([]);
  const [lastDropCell, setLastDropCell] = React.useState<Item | undefined>();
  const onDrop = React.useCallback((cell: Item, dataTransfer: DataTransfer | null) => {
    setHighlights([]);
    if (dataTransfer === null) {
      return;
    }
    const {
      files
    } = dataTransfer;
    // This only supports one image, for simplicity.
    if (files.length !== 1) {
      return;
    }
    const [file] = files;
    if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
      return;
    }
    const imgUrl = URL.createObjectURL(file);
    setCellValue(cell, {
      kind: GridCellKind.Image,
      data: [imgUrl],
      allowOverlay: true,
      readonly: true
    }, true, true);
    setLastDropCell(cell);
  }, [setCellValue]);
  const onDragOverCell = React.useCallback((cell: Item, dataTransfer: DataTransfer | null) => {
    if (dataTransfer === null) {
      return;
    }
    const {
      items
    } = dataTransfer;
    // This only supports one image, for simplicity.
    if (items.length !== 1) {
      return;
    }
    const [item] = items;
    if (!SUPPORTED_IMAGE_TYPES.has(item.type)) {
      return;
    }
    const [col, row] = cell;
    if (getCellContent(cell).kind === GridCellKind.Image) {
      setHighlights([{
        color: "#44BB0022",
        range: {
          x: col,
          y: row,
          width: 1,
          height: 1
        }
      }]);
    } else {
      setHighlights([]);
    }
  }, [getCellContent]);
  const onDragLeave = React.useCallback(() => {
    setHighlights([]);
  }, []);
  return <BeautifulWrapper title="Drop events" description={<>
                    <Description>
                        You can drag and drop into cells by using <PropName>onDragOverCell</PropName> and{" "}
                        <PropName>onDrop</PropName>.
                    </Description>

                    <div>
                        {lastDropCell === undefined ? <MoreInfo>Nothing dropped, yet</MoreInfo> : <>
                                <MoreInfo>
                                    You last dropped in cell <PropName>{JSON.stringify(lastDropCell)}</PropName>
                                </MoreInfo>
                            </>}
                    </div>
                </>}>
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} onCellEdited={setCellValue} onColumnResize={onColumnResize} rows={1000} onDrop={onDrop} onDragOverCell={onDragOverCell} onDragLeave={onDragLeave} highlightRegions={highlights} rowMarkers="none" />
        </BeautifulWrapper>;
}`,...(D=(C=a.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const W=["DropEvents"];export{a as DropEvents,W as __namedExportsOrder,z as default};
