import{s as M}from"./marked.esm-DFf-CCl8.js";import{R as n}from"./iframe-BZv_-3oC.js";import{u as v}from"./react-laag.esm-Dbj9MbNp.js";import{D as k}from"./data-editor-all-DHZhRUj8.js";import{B as E,D as y,P as H,a as O,d as w}from"./utils-Da6JC8lc.js";import{S as D}from"./story-utils-DyPFJ-Gb.js";import"./index-DTOmIdR0.js";import"./image-window-loader-BOKErPH_.js";import"./throttle-B38uoKju.js";import"./flatten-DvEpS0mN.js";import"./scrolling-data-grid-Cgtw8mio.js";import"./index-D_kXk1yT.js";import"./index.esm-C8aluT1_.js";const F={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>n.createElement(D,null,n.createElement(E,{title:"Header menus",description:n.createElement(n.Fragment,null,n.createElement(y,null,"Headers on the data grid can be configured to support menus. We provide the events and the menu icon, you provide the menu. The menu icon can be modified via the"," ",n.createElement(H,null,"menuIcon")," prop."))},n.createElement(s,null)))]},R=M("div")({name:"SimpleMenu",class:"s7szcfi",propsAsIs:!1}),l=()=>{const{cols:s,getCellContent:c,onColumnResize:m,setCellValue:p}=O(),C=n.useMemo(()=>s.map((o,r)=>r===2?{...o,hasMenu:!0,menuIcon:"dots",overlayIcon:"rowOwnerOverlay"}:r===3?{...o,hasMenu:!0,menuIcon:"headerUri"}:{...o,hasMenu:!0}),[s]),[e,t]=n.useState(),d=e!==void 0,{layerProps:h,renderLayer:g}=v({isOpen:d,auto:!0,placement:"bottom-end",triggerOffset:2,onOutsideClick:()=>t(void 0),trigger:{getBounds:()=>({left:(e==null?void 0:e.bounds.x)??0,top:(e==null?void 0:e.bounds.y)??0,width:(e==null?void 0:e.bounds.width)??0,height:(e==null?void 0:e.bounds.height)??0,right:((e==null?void 0:e.bounds.x)??0)+((e==null?void 0:e.bounds.width)??0),bottom:((e==null?void 0:e.bounds.y)??0)+((e==null?void 0:e.bounds.height)??0)})}}),f=n.useCallback((o,r)=>{t({col:o,bounds:r})},[]),b=n.useCallback(()=>{console.log("Header clicked")},[]);return n.createElement(n.Fragment,null,n.createElement(k,{...w,getCellContent:c,onHeaderMenuClick:f,onHeaderClicked:b,columns:C,onCellContextMenu:(o,r)=>r.preventDefault(),onCellEdited:p,onColumnResize:m,rows:1e3}),d&&g(n.createElement(R,{...h},n.createElement("div",{onClick:()=>t(void 0)},"These do nothing"),n.createElement("div",{onClick:()=>t(void 0)},"Add column right"),n.createElement("div",{onClick:()=>t(void 0)},"Add column left"),n.createElement("div",{className:"danger",onClick:()=>t(void 0)},"Delete"))))};var a,i,u;l.parameters={...l.parameters,docs:{...(a=l.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const realCols = React.useMemo(() => {
    return cols.map((c, index) => {
      if (index === 2) {
        return {
          ...c,
          hasMenu: true,
          menuIcon: "dots",
          overlayIcon: "rowOwnerOverlay"
        };
      } else if (index === 3) {
        return {
          ...c,
          hasMenu: true,
          menuIcon: "headerUri"
        };
      }
      return {
        ...c,
        hasMenu: true
      };
    });
  }, [cols]);
  const [menu, setMenu] = React.useState<{
    col: number;
    bounds: Rectangle;
  }>();
  const isOpen = menu !== undefined;
  const {
    layerProps,
    renderLayer
  } = useLayer({
    isOpen,
    auto: true,
    placement: "bottom-end",
    triggerOffset: 2,
    onOutsideClick: () => setMenu(undefined),
    trigger: {
      getBounds: () => ({
        left: menu?.bounds.x ?? 0,
        top: menu?.bounds.y ?? 0,
        width: menu?.bounds.width ?? 0,
        height: menu?.bounds.height ?? 0,
        right: (menu?.bounds.x ?? 0) + (menu?.bounds.width ?? 0),
        bottom: (menu?.bounds.y ?? 0) + (menu?.bounds.height ?? 0)
      })
    }
  });
  const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
    setMenu({
      col,
      bounds
    });
  }, []);
  const onHeaderClicked = React.useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("Header clicked");
  }, []);
  return <>
            <DataEditor {...defaultProps} getCellContent={getCellContent} onHeaderMenuClick={onHeaderMenuClick} onHeaderClicked={onHeaderClicked} columns={realCols} onCellContextMenu={(_, e) => e.preventDefault()} onCellEdited={setCellValue} onColumnResize={onColumnResize} rows={1000} />
            {isOpen && renderLayer(<SimpleMenu {...layerProps}>
                        <div onClick={() => setMenu(undefined)}>These do nothing</div>
                        <div onClick={() => setMenu(undefined)}>Add column right</div>
                        <div onClick={() => setMenu(undefined)}>Add column left</div>
                        <div className="danger" onClick={() => setMenu(undefined)}>
                            Delete
                        </div>
                    </SimpleMenu>)}
        </>;
}`,...(u=(i=l.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const G=["HeaderMenus"];export{l as HeaderMenus,G as __namedExportsOrder,F as default};
