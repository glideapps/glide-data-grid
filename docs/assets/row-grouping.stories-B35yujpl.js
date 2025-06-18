import{R as n}from"./iframe-DPg-y61j.js";import{u as v,D as k}from"./data-editor-all-Cz7LUH88.js";import{B as x,D as y,P as O,u as I,d as D}from"./utils-CmnmZJ4c.js";import{S as P}from"./story-utils-ClR13Xy3.js";import{G as m}from"./image-window-loader-CNunBHwY.js";import"./lodash-DFr4-lC-.js";import"./throttle-0ZFJsqod.js";import"./flatten-Bh33zcF_.js";import"./scrolling-data-grid-CFwQxEVk.js";import"./marked.esm-C6zVSTXC.js";import"./index-D_kXk1yT.js";import"./index.esm-CmK_US7f.js";import"./index-BsW4W0HJ.js";const L={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>n.createElement(P,null,n.createElement(x,{title:"Row Grouping",description:n.createElement(y,null,"The ",n.createElement(O,null,"rowGrouping")," prop can be used to group and even fold rows.")},n.createElement(s,null)))]},l=s=>{const{cols:G,getCellContent:u}=I(100),i=1e5,[o,f]=n.useState(()=>({groups:[{headerIndex:10,isCollapsed:!0,subGroups:[{headerIndex:15,isCollapsed:!1},{headerIndex:20,isCollapsed:!1}]},{headerIndex:30,isCollapsed:!1},...Array.from({length:100},(r,e)=>({headerIndex:i/100*e,isCollapsed:!1}))],height:55,navigationBehavior:"block",selectionBehavior:"block-spanning",themeOverride:{bgCell:"rgba(0, 100, 255, 0.1)"}})),{mapper:t,getRowGroupingForPath:d,updateRowGroupingByPath:g}=v(o,i),R=n.useCallback(r=>{const{path:e,isGroupHeader:a}=t(r);if(a&&r[0]===0){const p=d(o.groups,e);f(c=>({...c,groups:g(c.groups,e,{isCollapsed:!p.isCollapsed})}))}},[d,t,o.groups,g]),b=n.useCallback(r=>{const{path:e,isGroupHeader:a,originalIndex:p}=t(r);return r[0]===0?{kind:m.Text,data:`Row ${JSON.stringify(e)}`,displayData:`Row ${JSON.stringify(e)}`,allowOverlay:!1}:a?{kind:m.Loading,allowOverlay:!1}:u(p)},[u,t]);return n.createElement(k,{...D,rowGrouping:o,height:"100%",rowMarkers:"both",freezeColumns:s.freezeColumns,getRowThemeOverride:(r,e,a)=>{if(e%2===0)return{bgCell:"rgba(0, 0, 0, 0.1)"}},onCellClicked:R,getCellContent:b,columns:G,rows:i})};var C,w,h;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`(p: {
  freezeColumns: number;
}) => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const rows = 100_000;
  const [rowGrouping, setRowGrouping] = React.useState<RowGroupingOptions>(() => ({
    groups: [{
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
    }, ...Array.from({
      length: 100
    }, (_value, i): RowGroupingOptions["groups"][number] => {
      return {
        headerIndex: rows / 100 * i,
        isCollapsed: false
      };
    })],
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
