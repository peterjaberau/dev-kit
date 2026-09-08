'use client';

import { useSelector } from '@xstate/react';
import { InstanceManagerContext } from './provider';
import type { RegistryComponentProps } from './machines';

const EMPTY_PROPS: RegistryComponentProps = {};

export function useInstanceManager() {
    const instanceManagerRef = InstanceManagerContext.useActorRef();
    const instanceManagerState = InstanceManagerContext.useSelector(
        (state) => state
    );
    const instanceManagerContext = instanceManagerState.context;
    const instanceChildren = instanceManagerState.children;
    const instanceNames = Object.keys(instanceChildren);
    const instanceManagerSnapshot = instanceManagerRef.getSnapshot();

    return {
        instanceManagerRef,
        sentToInstanceManager: instanceManagerRef.send,
        instanceManagerContext,
        instanceManagerState,
        instanceManagerSnapshot,
        instanceManagerId: instanceManagerRef.id,
        metadata: instanceManagerContext.metadata,
        instanceRefs: instanceChildren,
        instanceNames,
    };
}

export function useInstance(instanceId: string) {
    const instanceRef = InstanceManagerContext.useSelector(
        (state) => state.children[instanceId]
    );
    const instanceState = useSelector(instanceRef, (state) => state);
    const instanceContext = instanceState?.context;
    const instanceProps = instanceContext?.props ?? EMPTY_PROPS;
    const instancePlugin = instanceContext?.plugin;
    const instanceSnapshot = instanceRef?.getSnapshot();

    return {
        instanceRef,
        sentToInstance: instanceRef?.send,
        instanceContext,
        instanceState,
        instanceSnapshot,
        instanceProps,
        instancePlugin,
        instanceId,
    };
}
