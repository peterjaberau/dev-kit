import { assign, createMachine } from "xstate"
import { configMachine, currentAppMachine, currentUserMachine, resourceMachine } from "."
import { MACHINE_IDS } from "../lib/constants"

export const rootMachine = createMachine({
  entry: assign({
    configRef: ({ spawn }) => spawn(configMachine, { systemId: MACHINE_IDS.CONFIG, id: MACHINE_IDS.CONFIG }),
    currentAppRef: ({ spawn }) =>
      spawn(currentAppMachine, { systemId: MACHINE_IDS.CURRENT_APP, id: MACHINE_IDS.CURRENT_APP }),
    currentUserRef: ({ spawn }) =>
      spawn(currentUserMachine, { systemId: MACHINE_IDS.CURRENT_USER, id: MACHINE_IDS.CURRENT_USER }),
    resourceRef: ({ spawn }) => spawn(resourceMachine, { systemId: MACHINE_IDS.RESOURCE, id: MACHINE_IDS.RESOURCE }),
  }),
})
