'use client';

import { assign, enqueueActions, setup } from 'xstate';
import { registryNames } from '#registry';

export type RegistryComponentProps = Record<string, unknown>;

type RegistryComponentContext = {
    plugin: string;
    props: RegistryComponentProps;
};

export type RegistryComponentInstance = {
    id: string;
    plugin: string;
    props?: RegistryComponentProps;
};

export type InstanceManagerInput = {
    id: string;
    data: {
        instances: RegistryComponentInstance[];
    };
};

type RegistryComponentEvent = {
    type: 'ON_SET_PROPS';
    props: RegistryComponentProps;
};

export const registryComponentMachine = setup({
    types: {
        context: {} as RegistryComponentContext,
        events: {} as RegistryComponentEvent,
        input: {} as {
            plugin: string;
            props?: RegistryComponentProps;
        },
    },
    actions: {
        setProps: assign({
            props: ({ event }) => ({ ...event.props }),
        }),
    },
}).createMachine({
    id: 'registry-component',
    initial: 'idle',
    context: ({ input }) => ({
        plugin: input.plugin,
        props: { ...(input.props ?? {}) },
    }),
    states: {
        idle: {
            on: {
                ON_SET_PROPS: {
                    actions: 'setProps',
                },
            },
        },
    },
});

type InstanceManagerContext = {
    metadata: {
        registryNames: readonly string[];
    };
    data: InstanceManagerInput['data'];
};

const availableRegistryNames = registryNames.filter(
    (name: unknown): name is string => typeof name === 'string'
);

export const instanceManagerMachine = setup({
    types: {
        context: {} as InstanceManagerContext,
        input: {} as InstanceManagerInput,
    },
    actors: {
        registryComponentMachine,
    },
    actions: {
        spawnRegistryComponents: enqueueActions(({ context, enqueue }) => {
            for (const instance of context.data.instances) {
                enqueue.spawnChild('registryComponentMachine', {
                    id: instance.id,
                    systemId: instance.id,
                    input: {
                        plugin: instance.plugin,
                        props: instance.props,
                    },
                });
            }
        }),
    },
}).createMachine({
    id: 'instance-manager',
    initial: 'initiating',
    context: ({ input }) => ({
        metadata: {
            registryNames: availableRegistryNames,
        },
        data: input.data,
    }),
    states: {
        initiating: {
            entry: 'spawnRegistryComponents',
            always: 'ready',
        },
        ready: {},
    },
});
