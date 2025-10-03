import { createMachine, assign, setup, fromCallback, enqueueActions } from "xstate"
import { config } from "./defaults"


export const templateMachine = setup({
  types: {} as any,
  actions: {
    updateProps: assign(({ context, event }: any) => {
      return {
        ...context,
        props: {
          ...context.props,
          ...event,
        },
      }
    }),

  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      ...input,
    }
  },
  states: {
    idle: {
      on: {
        update: {
          actions: enqueueActions(({ enqueue, check }: any) => {
            enqueue("updateProps")
          }),
        }
      }
    }
  }
})



export const exampleMachine = setup({
  types: {} as any,
  actions: {
    updateProps: assign(({ context, event }: any) => {
      return {
        ...context,
        props: {
          ...context.props,
          ...event,
        },
      }
    }),
    computeTheme: assign(({ context }) => {
      const { colorTheme, size }: any = context.props

      let result = context.colorThemeObj

      switch (colorTheme) {
        case "dark":
          result = {
            lineColorR: 40,
            lineColorG: 40,
            lineColorB: 40,
            backgroundColor: "#000000",
          }
        case "light":
        case "wireframe":
          result = {
            lineColorR: 230,
            lineColorG: 230,
            lineColorB: 230,
            backgroundColor: "#FFFFFF",
          }
        case "paper":
        default:
          result = {
            lineColorR: 167,
            lineColorG: 220,
            lineColorB: 240,
            backgroundColor: "#F5FFFA",
          }
      }

      context.colorThemeObj = result
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "initiating",
  context: ({ input }: any) =>
    ({
      props: config.example.props,
      colorThemeObj: {
        lineColorR: null,
        lineColorG: null,
        lineColorB: null,
        backgroundColor: null,
      },
      ...input,
    }) as any,
  entry: enqueueActions(({ enqueue, check }: any) => {
    enqueue("computeTheme")
  }),
  states: {
    ready: {
      on: {
        update: {
          actions: enqueueActions(({ enqueue, check }: any) => {
            enqueue("updateProps")
            enqueue("computeStyles")
          }),
        },
      },
    },
  },
})

