import { assign, createMachine } from "xstate"
import { rootMachine } from "./root.machine"
import { machineConstants } from "../utils"



export const appMachine = createMachine({
  id: machineConstants.APP,
  context: ({ input }: any) => {
    return input
  },
  entry: assign({
    root: ({ spawn, context }: any) => {
      console.log("--create app machine---", context)
      return spawn(rootMachine, { systemId: machineConstants.ROOT, input: context })
    },
  }),
})
