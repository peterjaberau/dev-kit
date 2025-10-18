import { assign, createMachine } from "xstate"
import { appMachine, currentAppMachine, sessionMachine } from "./machines"
import { ROOT_SYSTEM_IDS } from "./shared/constants"

export const rootMachine = createMachine({
  entry: assign({
    app: ({ spawn }) => spawn(appMachine, { systemId: ROOT_SYSTEM_IDS.APP }),
    session: ({ spawn }) => spawn(sessionMachine, { systemId: ROOT_SYSTEM_IDS.SESSION }),
    currentApp: ({ spawn }) => spawn(currentAppMachine, { systemId: ROOT_SYSTEM_IDS.CURRENT_APP }),
  }),
})
