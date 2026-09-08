'use client';

import { useSelector } from '@xstate/react';
import type { ActorRefFrom } from 'xstate';
import { InstanceManagerContext } from './provider';
import {
    SANDBOX_INSTANCE_ID,
    registryComponentMachine,
    sandboxInstanceMachine,
    type RegistryComponentProps,
} from './machines';

const EMPTY_PROPS: RegistryComponentProps = {};

export function useInstanceManager() {
    const instanceManagerRef = InstanceManagerContext.useActorRef();
    const instanceManagerState = InstanceManagerContext.useSelector(
        (state) => state
    );
    const instanceManagerContext = instanceManagerState.context;
    const instanceChildren = instanceManagerState.children;
    const instanceRefs = Object.fromEntries(
        Object.entries(instanceChildren).filter(
            ([id]) => id !== SANDBOX_INSTANCE_ID
        )
    ) as Record<
        string,
        ActorRefFrom<typeof registryComponentMachine> | undefined
    >;
    const instanceIds = Object.keys(instanceRefs);
    const instancesList = instanceIds.map((id) => {
        const configuredInstance = instanceManagerContext.data.instances.find(
            (instance) => instance.id === id
        );
        const actorInstance = instanceRefs[id]?.getSnapshot().context;

        return {
            id,
            name: configuredInstance?.plugin ?? actorInstance?.plugin ?? id,
        };
    });
    const metadata = {
        instances: instancesList,
    };
    const instanceManagerSnapshot = instanceManagerRef.getSnapshot();

    return {
        instanceManagerRef,
        sentToInstanceManager: instanceManagerRef.send,
        instanceManagerContext,
        instanceManagerState,
        instanceManagerSnapshot,
        instanceManagerId: instanceManagerRef.id,
        metadata,
        instanceRefs,
        instanceIds,
        instancesList,
    };
}

export function useSandboxInstance() {
    const sandboxInstanceRef = InstanceManagerContext.useSelector(
        (state) =>
            state.children[SANDBOX_INSTANCE_ID] as
                | ActorRefFrom<typeof sandboxInstanceMachine>
                | undefined
    );
    const sandboxInstanceState = useSelector(
        sandboxInstanceRef,
        (state) => state
    );
    const sandboxInstanceContext = sandboxInstanceState?.context;
    const sandboxInstanceSnapshot = sandboxInstanceRef?.getSnapshot();

    return {
        sandboxInstanceRef,
        sentToSandboxInstance: sandboxInstanceRef?.send,
        sandboxInstanceContext,
        sandboxInstanceState,
        sandboxInstanceSnapshot,
        selectedInstanceId:
            sandboxInstanceContext?.selectedInstanceId ?? null,
    };
}

export function useInstance(instanceId: string) {
    const instanceRef = InstanceManagerContext.useSelector(
        (state) =>
            state.children[instanceId] as
                | ActorRefFrom<typeof registryComponentMachine>
                | undefined
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
