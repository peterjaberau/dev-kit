import { assign, createMachine } from "xstate"
import { appMachine } from "./app-machine"

import { DOCK_VIEW_ENUM } from "../constants"

export const rootMachine = createMachine({
  entry: assign({
    app: ({ spawn }: any) => spawn(appMachine, { systemId: DOCK_VIEW_ENUM.APP }),
  }),
})
