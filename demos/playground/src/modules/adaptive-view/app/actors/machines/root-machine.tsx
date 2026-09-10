import { assign, createMachine } from "xstate"
import { dockviewMachine } from "."

import { DOCK_VIEW_ENUM } from "../constants"

// export const rootMachine = createMachine({
//   context: (({ input }) => {
//     return {
//       app: ({ spawn }: any) => spawn(dockviewMachine, { systemId: DOCK_VIEW_ENUM.DOCK_VIEW_ID, input: input }),
//     }
//   }),
// })


export const rootMachine = createMachine({
  context: ({ input }) => {
    return {
      app: ({ spawn }: any) => spawn(dockviewMachine, { systemId: DOCK_VIEW_ENUM.DOCK_VIEW_ID, input: input }),
    }
  },
  entry: assign({
    app: ({ spawn, context }: any) => spawn(dockviewMachine, { systemId: DOCK_VIEW_ENUM.DOCK_VIEW_ID, input: context.input }),
  }),
})
