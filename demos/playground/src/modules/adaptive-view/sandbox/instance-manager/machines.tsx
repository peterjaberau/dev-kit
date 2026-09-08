'use client';

import { assign, enqueueActions, setup } from 'xstate';

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

export const SANDBOX_INSTANCE_ID = 'sandbox-instance';

type SandboxInstanceContext = {
    selectedInstanceId: string | null;
};

type SandboxInstanceEvent = {
    type: 'ON_SELECT_INSTANCE';
    instanceId: string;
};

type RegistryComponentEvent = {
    type: 'ON_SET_PROPS';
    props: RegistryComponentProps;
};

export const sandboxInstanceMachine = setup({
  types: {
    context: {} as SandboxInstanceContext,
    events: {} as SandboxInstanceEvent,
  },
  actions: {
    selectInstance: assign({
      selectedInstanceId: ({ context, event }) =>
        context.selectedInstanceId === event.instanceId
          ? null
          : event.instanceId,
    }),
  },
}).createMachine({
  id: "sandbox-instance",
  initial: "idle",
  context: {
    selectedInstanceId: null
  },
  states: {
    idle: {
      on: {
        ON_SELECT_INSTANCE: {
          actions: 'selectInstance',
        },
      },
    },
  },
})

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
    data: InstanceManagerInput['data'];
};

export const instanceManagerMachine = setup({
    types: {
        context: {} as InstanceManagerContext,
        input: {} as InstanceManagerInput,
    },
    actors: {
        registryComponentMachine,
        sandboxInstanceMachine,
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
        spawnSandboxInstance: enqueueActions(({ enqueue }) => {
            enqueue.spawnChild('sandboxInstanceMachine', {
                id: SANDBOX_INSTANCE_ID,
                systemId: SANDBOX_INSTANCE_ID,
            });
        }),
    },
}).createMachine({
    id: 'instance-manager',
    initial: 'initiating',
    context: ({ input }) => ({
        data: input.data,
    }),
    states: {
        initiating: {
            entry: 'spawnRegistryComponents',
            always: 'ready',
        },
        ready: {
            entry: 'spawnSandboxInstance',
        },
    },
});
