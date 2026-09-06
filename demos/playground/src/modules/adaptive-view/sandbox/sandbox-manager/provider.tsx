'use client';

import * as React from 'react';
import { useSelector } from '@xstate/store/react';
import {
    createSandboxManagerStore,
    SandboxManagerStore,
} from './store';

const SandboxManagerStoreContext = React.createContext<
    SandboxManagerStore | undefined
>(undefined);

export function SandboxManagerProvider({
    children,
}: React.PropsWithChildren) {
    const [store] = React.useState(createSandboxManagerStore);

    return (
        <SandboxManagerStoreContext.Provider value={store}>
            {children}
        </SandboxManagerStoreContext.Provider>
    );
}

export function useSandboxManagerStore(): SandboxManagerStore {
    const store = React.useContext(SandboxManagerStoreContext);

    if (!store) {
        throw new Error(
            'useSandboxManagerStore must be used inside SandboxManagerProvider'
        );
    }

    return store;
}

export function useSandboxManagerSelector<T>(
    selector: (snapshot: ReturnType<SandboxManagerStore['getSnapshot']>) => T
): T {
    return useSelector(useSandboxManagerStore(), selector);
}
