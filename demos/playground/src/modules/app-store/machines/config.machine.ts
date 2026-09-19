import { assign, setup } from "xstate"

const defaults = {
  openLeftPanel: true,
  openBottomPanel: true,
  openRightPanel: true,
  openDebugger: false,
  selectedComponents: [],
  selectedAction: null,
}

export const configMachine = setup({
  types: {} as any,
  actions: {
    resetConfig: assign(({ context }) => {
      context = defaults
    }),
    toggleLeftPanel: assign(({ context, event }) => {
      context.openLeftPanel = !context.openLeftPanel
    }),
    toggleRightPanel: assign(({ context, event }) => {
      context.openRightPanel = !context.openRightPanel
    }),
    toggleBottomPanel: assign(({ context, event }) => {
      context.openBottomPanel = !context.openBottomPanel
    }),
    toggleDebugger: assign(({ context, event }) => {
      context.openDebugger = !context.openDebugger
    }),
    updateSelectedComponents: assign(({ context, event }) => {
      const { selected } = event.params
      context.selectedComponents = [
        ...context.selectedComponents,
        ...selected.filter((item: any) => !context.selectedComponents.includes(item)),
      ]
    }),
    clearSelectedComponents: assign(({ context }) => {
      context.selectedComponents = []
    }),
    updatedSelectedAction: assign(({ context, event }) => {
      const { selected } = event.params
      context.selectedAction = selected
    }),
    clearSelectedAction: assign(({ context, event }) => {
      context.selectedAction = null
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  id: "config",
  initial: "idle",
  context: ({ input }: any) => ({
    ...defaults,
    ...input,
  }),
  states: {
    idle: {
      on: {
        onResetConfig: { actions: ["resetConfig"] },
        onToggleLeftPanel: { actions: ["toggleLeftPanel"] },
        onToggleRightPanel: { actions: ["toggleRightPanel"] },
        onToggleBottomPanel: { actions: ["toggleBottomPanel"] },
        onToggleDebugger: { actions: ["toggleDebugger"] },
        onUpdateSelectedComponents: { actions: ["updateSelectedComponents"] },
        onClearSelectedComponents: { actions: ["clearSelectedComponents"] },
        onUpdatedSelectedAction: { actions: ["updatedSelectedAction"] },
        onClearSelectedAction: { actions: ["clearSelectedAction"] },
      },
    },
  },
})
