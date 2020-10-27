import React from "react";

export function lazilyLoadedComponent<T extends React.ComponentType<any>>(
    _assetName: string,
    loader: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
    return React.lazy(async () => await loader());
}
