'use client';

import * as React from 'react';
import { createActorContext } from '@xstate/react';
import {
    instanceManagerMachine,
    type InstanceManagerInput,
} from './machines';

export const InstanceManagerContext = createActorContext(instanceManagerMachine);

export interface InstanceManagerProviderProps extends React.PropsWithChildren {
    input: InstanceManagerInput;
}

export function InstanceManagerProvider({
    children,
    input,
}: InstanceManagerProviderProps) {
    return (
        <InstanceManagerContext.Provider options={{ input }}>
            {children}
        </InstanceManagerContext.Provider>
    );
}
