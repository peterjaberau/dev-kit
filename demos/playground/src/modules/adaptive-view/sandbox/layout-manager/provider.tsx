'use client';

import * as React from 'react';
import { createActorContext } from '@xstate/react';
import { layoutManagerMachine } from './machines';

export const LayoutManagerContext = createActorContext(layoutManagerMachine);

export function LayoutManagerProvider({ children }: React.PropsWithChildren) {
    return (
        <LayoutManagerContext.Provider>
            {children}
        </LayoutManagerContext.Provider>
    );
}
