import * as React from "react";
import { lazilyLoadedComponent } from "../common/react-lazy-loading";

type Size = {
  height: number;
  width: number;
};
type AutoSizerProps = {
  children: (props: Partial<Size>) => React.ReactNode;
  className?: string;
  defaultHeight?: number;
  defaultWidth?: number;
  disableHeight?: boolean;
  disableWidth?: boolean;
  nonce?: string;
  onResize?: (info: Size) => any;
  style?: React.CSSProperties;
  [key: string]: any;
};

const AS = lazilyLoadedComponent("auto-sizer", () =>
  import("react-virtualized/dist/es/AutoSizer").then((m) => ({
    default: m.AutoSizer,
  }))
);

const AutoSizer: React.FunctionComponent<AutoSizerProps> = (p) => {
  if (process.env.NODE_ENV === "test") {
    return (
      <div
        style={{
          width: 375,
        }}
      >
        {p.children({ width: 375, height: 375 })}
      </div>
    );
  }
  return (
    <React.Suspense fallback={<div />}>
      <AS {...p} />
    </React.Suspense>
  );
};

export default AutoSizer;
