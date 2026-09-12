import { assign, enqueueActions, setup } from "xstate"

export const dockviewMachine = setup({
  actions: {},
  actors: {},
}).createMachine({
  id: "dockview-api",
  initial: "ready",
  context: ({ input }: any) => ({
    dockviewApi: null,
    fixtures: {},
    current: {},
  }),
  states: {
    ready: {
      on: {
        onDidAddPanel: {},
        onDidActivePanelChange: {},
        onDidRemovePanel: {},
        onDidAddGroup: {},
        onDidMovePanel: {},
        onDidMaximizedGroupChange: {},
        onDidRemoveGroup: {},
        onDidActiveGroupChange: {},
      },
    },
  },
})
