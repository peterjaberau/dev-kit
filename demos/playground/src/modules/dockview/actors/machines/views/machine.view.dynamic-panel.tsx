import { assign, setup } from "xstate"
import { dockViewDynamicPanelConfig } from '../../config'


export const dynamicPanelViewMachine = setup({
  types: {} as any,
  actions: {
    handleSelectScope: assign(({ context, event }) => {}),
    handleSelectionChange: assign(({ context, event }) => {
      const { selectedValue } = event.payload
      context.scope.selectedValue = selectedValue
      context.scoped.targetPanel = selectedValue[0] || null
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "scope",
  context: ({ input }: any) => ({
    ...dockViewDynamicPanelConfig,
    ...input,
  }),
  states: {
    scope: {
      on: {
        SELECT_SCOPE: {
          actions: ["handleSelectScope"],
          target: "scoped",
        },
        EXPANDED_CHANGE: {
          actions: ["handleSelectScope"],
        },
        SELECTION_CHANGE: {
          actions: ["handleSelectionChange"],
          target: "scoped",
        },
      },
    },
    scoped: {
      on: {
        BACK_TO_SCOPE: {
          target: "scope",
        },
        SELECTION_CHANGE: {
          actions: ["handleSelectionChange"],
        },
      },
    },
  },
})
