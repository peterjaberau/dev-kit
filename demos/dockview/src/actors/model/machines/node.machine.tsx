import { assign, enqueueActions, raise, setup } from "xstate"
import { nodeManagerConfig } from "#actors/model/shared/config"
// import { currentAppExampleMachine } from "./current-app.machine"

export const nodeMachine = setup({
  types: {} as any,
  actions: {
    createView: assign(({ context, event, self }) => {
      const api = context.input.api
      const node = context.input.node

      const view = {
        id: node.id,
        component: node.view.component,
        title: node.view.title,
        renderer: node.view.renderer,
        position: node.view.position,
        params: {
          id: node.id,
          parentRef: context.parentRef,
          input: context.input,
        },
      }
      api?.addPanel(view)

      context.view = view
    }),
    createViewRenderer: ({ context }) => {
      const view = context.view
      const api = context.input.api

      api?.addPanel(view)
    },
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "Initiating",
  context: ({ input, self }: any) => {
    return {
      parentRef: self,
      view: null,
      model: {},
      input: {
        api: input.api,
        node: input.node,
      },
    }
  },
  states: {
    Initiating: {
      always: {
        target: "CreatingView",
      },
    },

    CreatingView: {
      entry: enqueueActions(({ enqueue }) => {
        enqueue("createView")
        raise({ type: "createView.completed" })
      }),
      on: {
        "createView.completed": {
          target: "CreatingViewRenderer",
        },
      },
    },

    CreatingViewRenderer: {
      entry: enqueueActions(({ enqueue }) => {
        enqueue("createViewRenderer")
        raise({ type: "createViewRenderer.completed" })
      }),
      on: {
        "createViewRenderer.completed": {
          target: "idle",
        },
      },
    },

    idle: {
      on: {},
    },
  },
})

export const nodeManagerMachine: any = setup({
  types: {} as any,
  actions: {
    resetAction: assign(({ context, event }) => {}),
  },
  actors: {
    nodeMachine,
  },
  guards: {},
}).createMachine({
  // initial: "idle",
  context: ({ input, spawn }: any) => {
    const nodes = nodeManagerConfig.nodes.map((item: any) => {
      const spawnedNode = spawn("nodeMachine", {
        id: item.id,
        // systemId: item.id,
        input: {
          node: item,
          api: input.api,
        },
      })
      return spawnedNode
    })

    return {
      // systemId: 'node-manager',
      // id: 'node-manager',
      nodes,
      status: {
        isReady: true,
      },
      ...input,
    }
  },
})
