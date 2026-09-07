'use client';

import { useSelector } from '@xstate/react';
import { InstanceManagerContext } from './provider';
import type { RegistryComponentProps } from './machines';

const EMPTY_PROPS: RegistryComponentProps = {};

export function useInstanceManager() {
    const instanceManagerRef = InstanceManagerContext.useActorRef();
    const instanceManagerContext = InstanceManagerContext.useSelector(
        (state) => state.context
    );

    return {
        instanceManagerRef,
        sentToInstanceManager: instanceManagerRef.send,
        instanceManagerContext,
        instanceManagerState: instanceManagerRef.getSnapshot(),
        instanceManagerId: instanceManagerRef.id,
        metadata: instanceManagerContext.metadata,
        instanceRefs: instanceManagerContext.instanceRefs,
    };
}

export function useInstance(instanceId: string) {
    const instanceRef = InstanceManagerContext.useSelector(
        (state) => state.context.instanceRefs[instanceId]
    );
    const instanceProps = useSelector(
        instanceRef,
        (state) => state?.context.props ?? EMPTY_PROPS
    );

    return {
        instanceRef,
        sentToInstance: instanceRef?.send,
        instanceContext: instanceRef?.getSnapshot().context,
        instanceState: instanceRef?.getSnapshot(),
        instanceProps,
        instanceId,
    };
}
