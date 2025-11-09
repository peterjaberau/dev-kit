import { assign, setup } from "xstate"
import { pluginsConfigDefaults } from '../shared/config'



export const pluginUiPreviewerMachine = setup({
  types: {} as any,
  actions: {
    resetAction: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    definitions: pluginsConfigDefaults.uiPreviewerPlugin.definitions,
    selections: pluginsConfigDefaults.uiPreviewerPlugin.selections,
    ...input,
  }),
  states: {
    idle: {
      on: {
        RESET: { actions: ["resetAction"] },
      },
    },
  },
})

export const pluginCodeBlockMachine = setup({
  types: {} as any,
  actions: {
    resetAction: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    definitions: pluginsConfigDefaults.codeBlockPlugin.definitions,
    selections: pluginsConfigDefaults.codeBlockPlugin.selections,
    ...input,
  }),
  states: {
    idle: {
      on: {
        RESET: { actions: ["resetAction"] },
      },
    },
  },
})

