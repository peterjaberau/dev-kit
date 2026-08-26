import { assign, createMachine } from "xstate"
import { appMachine } from "./machines"


import { DOCK_VIEW_ENUM } from './lib'

export const rootMachine = createMachine({
  entry: assign({
    app: ({ spawn }: any) => spawn(appMachine, { systemId: DOCK_VIEW_ENUM.APP }),

  }),
})
