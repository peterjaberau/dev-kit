import { setup } from "xstate"

export const pluginClientMachine = setup({
  guards: {
    canDeactivate: ({ context, event }): boolean => {
      return false
    }
  },
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      id: 0,
      isLoaded: false,
      status: ["edited", "succeeded", "failed", "loading", "none"],
      name: undefined,
      methods: [],
      options: {
        customTheme: false,
      },
      ...input,
    }
  },

  states: {
    idle: {
      on: {
        onActivation: {},
        onload: {},
        onInvoke: {}
      },
    },

  },
})