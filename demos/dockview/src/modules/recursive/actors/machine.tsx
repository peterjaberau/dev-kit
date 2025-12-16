import { assign, createMachine } from "xstate"
import { appMachine } from "./machines"

import { ACTOR_CONSTANTS } from './constants'

export const rootMachine = createMachine({
  entry: assign({
    app: ({ spawn }: any) => spawn(appMachine, { systemId: ACTOR_CONSTANTS.APP_MACHINE_ID }),
  }),
})
