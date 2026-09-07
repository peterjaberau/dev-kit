'use client';

import * as React from 'react';
import { createActorContext } from '@xstate/react';
import { instanceManagerMachine } from './machines';

export const InstanceManagerContext = createActorContext(instanceManagerMachine);

export function InstanceManagerProvider({ children }: React.PropsWithChildren) {
    return (
        <InstanceManagerContext.Provider>
            {children}
        </InstanceManagerContext.Provider>
    );
}
