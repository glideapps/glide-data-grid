import{j as e,a as g,F as h}from"./marked.esm-dbrxtycE.js";import{R as o}from"./index-BMVQvedj.js";import{D as M}from"./data-editor-all-URz7QgpY.js";import{a as w,B as b,D as L,P as u,M as f,d as N}from"./utils-fHh7-QTb.js";import{G as C}from"./image-window-loader--0ktsihR.js";import{S as U}from"./story-utils-K2EZnGjM.js";import"./iframe-8T_ww7sJ.js";import"../sb-preview/runtime.js";import"./throttle-7EuXLZa7.js";import"./_baseIteratee-WTHxv43n.js";import"./flatten-qRvRBp6y.js";import"./scrolling-data-grid-F9iLdN7s.js";import"./index-PWBWJyi_.js";import"./index.esm-Ejw8GwRl.js";import"./index-wocATsGp.js";const Q={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e(U,{children:e(a,{})})]},D=new Set(["image/png","image/gif","image/bmp","image/jpeg"]),i=()=>{const{cols:a,getCellContent:c,onColumnResize:P,setCellValue:p}=w(),[E,l]=o.useState([]),[m,O]=o.useState(),S=o.useCallback((n,t)=>{if(l([]),t===null)return;const{files:r}=t;if(r.length!==1)return;const[s]=r;if(!D.has(s.type))return;const d=URL.createObjectURL(s);p(n,{kind:C.Image,data:[d],allowOverlay:!0,readonly:!0},!0,!0),O(n)},[p]),I=o.useCallback((n,t)=>{if(t===null)return;const{items:r}=t;if(r.length!==1)return;const[s]=r;if(!D.has(s.type))return;const[d,k]=n;c(n).kind===C.Image?l([{color:"#44BB0022",range:{x:d,y:k,width:1,height:1}}]):l([])},[c]),T=o.useCallback(()=>{l([])},[]);return e(b,{title:"Drop events",description:g(h,{children:[g(L,{children:["You can drag and drop into cells by using ",e(u,{children:"onDragOverCell"})," and"," ",e(u,{children:"onDrop"}),"."]}),e("div",{children:m===void 0?e(f,{children:"Nothing dropped, yet"}):e(h,{children:g(f,{children:["You last dropped in cell ",e(u,{children:JSON.stringify(m)})]})})})]}),children:e(M,{...N,getCellContent:c,columns:a,onCellEdited:p,onColumnResize:P,rows:1e3,onDrop:S,onDragOverCell:I,onDragLeave:T,highlightRegions:E,rowMarkers:"none"})})};var v,R,y;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
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
}`,...(y=(R=i.parameters)==null?void 0:R.docs)==null?void 0:y.source}}};const X=["DropEvents"];export{i as DropEvents,X as __namedExportsOrder,Q as default};
