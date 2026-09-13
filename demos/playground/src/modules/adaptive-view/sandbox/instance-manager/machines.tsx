"use client"

import { assign, enqueueActions, setup } from "xstate"

export type RegistryComponentProps = Record<string, unknown>

type RegistryComponentContext = {
  plugin: string
  props: RegistryComponentProps
}

export type RegistryComponentInstance = {
  id: string
  plugin: string
  props?: RegistryComponentProps
}

export type InstanceManagerInput = {
  id: string
  data: {
    instances: RegistryComponentInstance[]
  }
}

export const DESKTOP_INSTANCE_ID = "desktop-instance"

type DesktopInstanceContext = {
  selectedInstanceId: string | null
}

type DesktopInstanceEvent = {
  type: "onSelectInstance"
  params: { instanceId: string }
}

type RegistryComponentEvent = {
  type: "ON_SET_PROPS"
  props: RegistryComponentProps
}

export const desktopInstanceMachine = setup({
  types: {
    context: {} as DesktopInstanceContext,
    events: {} as DesktopInstanceEvent,
  },
  actions: {
    selectInstance: assign({
      selectedInstanceId: ({ context, event }) =>
        context.selectedInstanceId === event.params.instanceId ? null : event.params.instanceId,
    }),
  },
}).createMachine({
  id: DESKTOP_INSTANCE_ID,
  initial: "idle",
  context: {
    selectedInstanceId: null,
  },
  states: {
    idle: {
      on: {
        onSelectInstance: {
          actions: "selectInstance",
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
      plugin: string
      props?: RegistryComponentProps
    },
  },
  actions: {
    setProps: assign({
      props: ({ event }) => ({ ...event.props }),
    }),
  },
}).createMachine({
  id: "registry-component",
  initial: "idle",
  context: ({ input }) => ({
    plugin: input.plugin,
    props: { ...(input.props ?? {}) },
  }),
  states: {
    idle: {
      on: {
        ON_SET_PROPS: {
          actions: "setProps",
        },
      },
    },
  },
})

type InstanceManagerContext = {
  data: InstanceManagerInput["data"]
}

export const instanceManagerMachine = setup({
  types: {
    context: {} as InstanceManagerContext,
    input: {} as InstanceManagerInput,
  },
  actors: {
    registryComponentMachine,
    desktopInstanceMachine,
  },
  actions: {
    spawnRegistryComponents: enqueueActions(({ context, enqueue }) => {
      for (const instance of context.data.instances) {
        enqueue.spawnChild("registryComponentMachine", {
          id: instance.id,
          systemId: instance.id,
          input: {
            plugin: instance.plugin,
            props: instance.props,
          },
        })
      }
    }),
    spawnDesktopInstance: enqueueActions(({ enqueue }) => {
      enqueue.spawnChild("desktopInstanceMachine", {
        id: DESKTOP_INSTANCE_ID,
        systemId: DESKTOP_INSTANCE_ID,
      })
    }),
  },
}).createMachine({
  id: "instance-manager",
  initial: "initiating",
  context: ({ input }) => ({
    data: input.data,
  }),
  states: {
    initiating: {
      entry: "spawnRegistryComponents",
      always: "ready",
    },
    ready: {
      entry: "spawnDesktopInstance",
    },
  },
})
