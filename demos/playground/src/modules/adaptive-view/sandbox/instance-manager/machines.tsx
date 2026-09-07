'use client';

import { assign, setup } from 'xstate';
import type { ActorRefFrom } from 'xstate';
import { registryNames } from '#registry';

export type RegistryComponentProps = Record<string, unknown>;

type RegistryComponentContext = {
    props: RegistryComponentProps;
};

type RegistryComponentEvent = {
    type: 'ON_SET_PROPS';
    props: RegistryComponentProps;
};

export const registryComponentMachine = setup({
    types: {
        context: {} as RegistryComponentContext,
        events: {} as RegistryComponentEvent,
        input: {} as { props?: RegistryComponentProps },
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

export type RegistryComponentActorRef = ActorRefFrom<
    typeof registryComponentMachine
>;

type InstanceManagerContext = {
    metadata: {
        registryNames: readonly string[];
    };
    instanceRefs: Record<string, RegistryComponentActorRef>;
};

const availableRegistryNames = registryNames.filter(
    (name: unknown): name is string => typeof name === 'string'
);

export const instanceManagerMachine = setup({
    types: {
        context: {} as InstanceManagerContext,
    },
    actors: {
        registryComponentMachine,
    },
    actions: {
        spawnRegistryComponents: assign({
            instanceRefs: ({ context, spawn }) =>
                Object.fromEntries(
                    context.metadata.registryNames.map((name) => [
                        name,
                        spawn('registryComponentMachine', {
                            id: name,
                            systemId: name,
                            input: { props: {} },
                        }),
                    ])
                ),
        }),
    },
}).createMachine({
    id: 'instance-manager',
    initial: 'initiating',
    context: {
        metadata: {
            registryNames: availableRegistryNames,
        },
        instanceRefs: {},
    },
    states: {
        initiating: {
            entry: 'spawnRegistryComponents',
            always: 'ready',
        },
        ready: {},
    },
});
