import { measureTextCached, getMiddleCenterBias, GridCellKind } from "@glideapps/glide-data-grid";
import { styled } from "@linaria/react";
import * as React from "react";
import { roundedRect } from "../draw-fns.js";
const tagHeight = 20;
const innerPad = 6;
const _exp = /*#__PURE__*/() => p => p.tagHeight / 2;
const _exp2 = /*#__PURE__*/() => p => p.tagHeight;
const _exp3 = /*#__PURE__*/() => p => p.innerPad;
const EditorWrap = /*#__PURE__*/styled('div')({
  name: "EditorWrap",
  class: "gdg-e1wnlokz",
  propsAsIs: false,
  vars: {
    "e1wnlokz-0": [_exp(), "px"],
    "e1wnlokz-1": [_exp2(), "px"],
    "e1wnlokz-2": [_exp3(), "px"]
  }
});
const renderer = {
  kind: GridCellKind.Custom,
  isMatch: c => c.data.kind === "tags-cell",
  draw: (args, cell) => {
    const {
      ctx,
      theme,
      rect
    } = args;
    const {
      possibleTags,
      tags
    } = cell.data;
    const drawArea = {
      x: rect.x + theme.cellHorizontalPadding,
      y: rect.y + theme.cellVerticalPadding,
      width: rect.width - 2 * theme.cellHorizontalPadding,
      height: rect.height - 2 * theme.cellVerticalPadding
    };
    const rows = Math.max(1, Math.floor(drawArea.height / (tagHeight + innerPad)));
    let x = drawArea.x;
    let row = 1;
    let y = drawArea.y + (drawArea.height - rows * tagHeight - (rows - 1) * innerPad) / 2;
    for (const tag of tags) {
      const color = possibleTags.find(t => t.tag === tag)?.color ?? theme.bgBubble;
      ctx.font = `12px ${theme.fontFamily}`;
      const metrics = measureTextCached(tag, ctx);
      const width = metrics.width + innerPad * 2;
      const textY = tagHeight / 2;
      if (x !== drawArea.x && x + width > drawArea.x + drawArea.width && row < rows) {
        row++;
        y += tagHeight + innerPad;
        x = drawArea.x;
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      roundedRect(ctx, x, y, width, tagHeight, theme.roundingRadius ?? tagHeight / 2);
      ctx.fill();
      ctx.fillStyle = theme.textDark;
      ctx.fillText(tag, x + innerPad, y + textY + getMiddleCenterBias(ctx, `12px ${theme.fontFamily}`));
      x += width + 8;
      if (x > drawArea.x + drawArea.width && row >= rows) break;
    }
    return true;
  },
  provideEditor: () => {
    // eslint-disable-next-line react/display-name
    return p => {
      const {
        onChange,
        value
      } = p;
      const {
        readonly = false
      } = value;
      const {
        possibleTags,
        tags
      } = value.data;
      return React.createElement(EditorWrap, {
        tagHeight: tagHeight,
        innerPad: innerPad,
        className: readonly ? "gdg-readonly" : ""
      }, possibleTags.map(t => {
        const selected = tags.indexOf(t.tag) !== -1;
        return React.createElement("label", {
          key: t.tag
        }, !readonly && React.createElement("input", {
          className: "gdg-input",
          type: "checkbox",
          checked: selected,
          onChange: () => {
            const newTags = selected ? tags.filter(x => x !== t.tag) : [...tags, t.tag];
            onChange({
              ...p.value,
              data: {
                ...value.data,
                tags: newTags
              }
            });
          }
        }), React.createElement("div", {
          className: "gdg-pill " + (selected ? "gdg-selected" : "gdg-unselected"),
          style: {
            backgroundColor: selected ? t.color : undefined
          }
        }, t.tag));
      }));
    };
  },
  onPaste: (v, d) => ({
    ...d,
    tags: d.possibleTags.map(x => x.tag).filter(x => v.split(",").map(s => s.trim()).includes(x))
  })
};
export default renderer;

