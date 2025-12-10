import { assign, enqueueActions, setup } from "xstate"
import { dynamicPanelViewMachine } from "./views/machine.view.dynamic-panel"
import { DOCK_VIEW_ENUM } from "#modules/dockview/actors/lib"


export const dockViewPanelMachine = setup({
  types: {} as any,
  actions: {
    handleAddPanel: ({ context }) => {
      const api = context?.model?.api
      const view = {
        id: context.view.id,
        ...context.view.view,
      }
      // const api = context.input.apiRef.getSnapshot().context?.api
      if (api) {
        api?.addPanel(view)

        context.model.panelApi = api.getPanel(view.id)?.api


      //   dockApi?.getPanel(id)
      }
    },

    spawnDynamicPanelView: assign(({ context, spawn }) => {
      context.refs.relations.view = spawn("dynamicPanelViewMachine", {
        systemId: context.view?.id + "_view",
      })
    }),


    handleRemovePanel: ({ context, event }) => {
      // const { api } = event.payload
      // api.close()

      context.model?.panelApi.close()


    },
  },
  actors: {
    dynamicPanelViewMachine
  },
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input, self }: any) => {
    return {
      refs: {
        internal: {
          self: self,
          parent: input?.refs?.internal?.parent || null,
        },
        external: {
          api: input?.refs?.external?.api || null,
        },
        relations: {
          view: null,
        }

      },
      props: {
        ...input?.props,
      },
      view: {
        id: input?.view?.id,
        view: {
          type: input?.view?.view?.type,
          component: input?.view?.view?.component || "default",
          title: input?.view?.view?.title || "Panel",
          renderer: input?.view?.view?.renderer || "always",
          position: input?.view?.view?.position || undefined,
          params: input?.view?.view?.params || {},
        },
      },
      model: {
        api: input?.model?.api,
        panelApi: null,
      },
    }
  },
  states: {
    idle: {
      entry: enqueueActions(({ enqueue }) => {
        enqueue("handleAddPanel")
        enqueue("spawnDynamicPanelView")
      }),
      on: {
        onTerminate: {
          actions: ["handleRemovePanel"],
          target: ["terminate"],
        },
        onDidActivePanelChange: {},
        addPanelCompletion: {},
        onDidRemovePanel: {},
        removePanelCompletion: {},
        activePanelChangeCompletion: {},
        movePanelCompletion: {},
      },
    },
    terminate: {
      type: "final",
    },
  },
})
