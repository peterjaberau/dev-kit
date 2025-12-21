import { assign, createMachine } from "xstate"
import { rootMachine } from "./root.machine"
import { machineConstants } from "../utils"

export const appMachine = (data: any) => {
  return createMachine({
    id: machineConstants.APP,
    entry: assign({
      root: ({ spawn }: any) => {
        return spawn(rootMachine, { systemId: machineConstants.ROOT, input: { data } })
      },
    }),
  })
}
