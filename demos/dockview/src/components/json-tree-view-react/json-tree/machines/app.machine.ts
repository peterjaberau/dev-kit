import { assign, createMachine } from "xstate"
import { appRootMachine } from "./app.root.machine"
import { machineConstants } from "../utils"



export const appMachine = createMachine({
  id: machineConstants.APP,
  context: ({ input }: any) => {
    return input
  },
  entry: assign({
    root: ({ spawn, context }: any) => {
      return spawn(appRootMachine, { systemId: machineConstants.APP_ROOT, input: context })
    },
  }),
})
