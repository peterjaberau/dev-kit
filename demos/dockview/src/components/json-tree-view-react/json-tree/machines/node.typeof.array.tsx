import { assign, createMachine } from "xstate"
import { rootMachine } from "./root.machine"
import { machineConstants } from "../utils"



export const nodeTypeofArrayMachine = createMachine({
  context: ({ input }: any) => {
    return input
  },
})
