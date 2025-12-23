import { assign, createMachine } from "xstate"
import { rootMachine } from "./root.machine"
import { machineConstants } from "../utils"



export const nodeTypeofObjectMachine = createMachine({
  context: ({ input }: any) => {
    return input
  },
})
