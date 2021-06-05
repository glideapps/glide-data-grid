import React from "react";
export declare function lazilyLoadedComponent<T extends React.ComponentType<any>>(_assetName: string, loader: () => Promise<{
    default: T;
}>): React.LazyExoticComponent<T>;
//# sourceMappingURL=react-lazy-loading.d.ts.map