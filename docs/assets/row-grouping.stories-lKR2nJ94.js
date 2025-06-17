import{R as e}from"./iframe-E18WDqGN.js";import{u as k,D as v}from"./data-editor-all-UZfoINIX.js";import{B as x,D as O,P as y,u as I,d as D}from"./utils-s889fhwk.js";import{S as P}from"./story-utils-9f-CcBuH.js";import{G as C}from"./image-window-loader-aVHplOsd.js";import"./lodash-vLCVQIgq.js";import"./throttle-OmRZ_GSL.js";import"./flatten-dSVB22Sh.js";import"./scrolling-data-grid-UgRf7iQf.js";import"./marked.esm-EoQsFayW.js";import"./index-PWBWJyi_.js";import"./index.esm-MBE67sSk.js";import"./index-uJxdELD9.js";const L={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>e.createElement(P,null,e.createElement(x,{title:"Row Grouping",description:e.createElement(O,null,"The ",e.createElement(y,null,"rowGrouping")," prop can be used to group and even fold rows.")},e.createElement(s,null)))]},l=s=>{const{cols:G,getCellContent:p}=I(100),u=1e3,[r,f]=e.useState(()=>({groups:[{headerIndex:0,isCollapsed:!1},{headerIndex:10,isCollapsed:!0,subGroups:[{headerIndex:15,isCollapsed:!1},{headerIndex:20,isCollapsed:!1}]},{headerIndex:30,isCollapsed:!1}],height:55,navigationBehavior:"block",selectionBehavior:"block-spanning",themeOverride:{bgCell:"rgba(0, 100, 255, 0.1)"}})),{mapper:t,getRowGroupingForPath:d,updateRowGroupingByPath:g}=k(r,u),R=e.useCallback(o=>{const{path:n,isGroupHeader:a}=t(o);if(a&&o[0]===0){const i=d(r.groups,n);f(c=>({...c,groups:g(c.groups,n,{isCollapsed:!i.isCollapsed})}))}},[d,t,r.groups,g]),b=e.useCallback(o=>{const{path:n,isGroupHeader:a,originalIndex:i}=t(o);return o[0]===0?{kind:C.Text,data:`Row ${JSON.stringify(n)}`,displayData:`Row ${JSON.stringify(n)}`,allowOverlay:!1}:a?{kind:C.Loading,allowOverlay:!1}:p(i)},[p,t]);return e.createElement(v,{...D,rowGrouping:r,height:"100%",rowMarkers:"both",freezeColumns:s.freezeColumns,getRowThemeOverride:(o,n,a)=>{if(n%2===0)return{bgCell:"rgba(0, 0, 0, 0.1)"}},onCellClicked:R,getCellContent:b,columns:G,rows:u})};var m,w,h;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`(p: {
  freezeColumns: number;
}) => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const rows = 1000;
  const [rowGrouping, setRowGrouping] = React.useState<RowGroupingOptions>(() => ({
    groups: [{
      headerIndex: 0,
      isCollapsed: false
    }, {
      headerIndex: 10,
      isCollapsed: true,
      subGroups: [{
        headerIndex: 15,
        isCollapsed: false
      }, {
        headerIndex: 20,
        isCollapsed: false
      }]
    }, {
      headerIndex: 30,
      isCollapsed: false
    }],
    height: 55,
    navigationBehavior: "block",
    selectionBehavior: "block-spanning",
    themeOverride: {
      bgCell: "rgba(0, 100, 255, 0.1)"
    }
  }));
  const {
    mapper,
    getRowGroupingForPath,
    updateRowGroupingByPath
  } = useRowGrouping(rowGrouping, rows);
  const onCellClicked = React.useCallback((item: Item) => {
    const {
      path,
      isGroupHeader
    } = mapper(item);
    if (isGroupHeader && item[0] === 0) {
      const group = getRowGroupingForPath(rowGrouping.groups, path);
      setRowGrouping(prev => {
        const result: RowGroupingOptions = {
          ...prev,
          groups: updateRowGroupingByPath(prev.groups, path, {
            isCollapsed: !group.isCollapsed
          })
        };
        return result;
      });
    }
  }, [getRowGroupingForPath, mapper, rowGrouping.groups, updateRowGroupingByPath]);
  const getCellContentMangled = React.useCallback<DataEditorAllProps["getCellContent"]>(item => {
    const {
      path,
      isGroupHeader,
      originalIndex
    } = mapper(item);
    if (item[0] === 0) {
      return {
        kind: GridCellKind.Text,
        data: \`Row \${JSON.stringify(path)}\`,
        displayData: \`Row \${JSON.stringify(path)}\`,
        allowOverlay: false
      };
    } else if (isGroupHeader) {
      return {
        kind: GridCellKind.Loading,
        allowOverlay: false
        // span: [1, cols.length - 1],
      };
    }
    return getCellContent(originalIndex);
  }, [getCellContent, mapper]);
  return <DataEditor {...defaultProps} rowGrouping={rowGrouping} height="100%" rowMarkers="both" freezeColumns={p.freezeColumns} getRowThemeOverride={(_row, groupRow, _contentRow) => {
    if (groupRow % 2 === 0) {
      return {
        bgCell: "rgba(0, 0, 0, 0.1)"
      };
    }
    return undefined;
  }} onCellClicked={onCellClicked} getCellContent={getCellContentMangled} columns={cols}
  // verticalBorder={false}
  rows={rows} />;
}`,...(h=(w=l.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};const W=["RowGrouping"];export{l as RowGrouping,W as __namedExportsOrder,L as default};
