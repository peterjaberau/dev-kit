import { assign, createMachine } from "xstate"
import { rootMachine } from "./root.machine"
import { JSON_TREE_ENUMS } from '../utils'

export const jsonTreeMachine = createMachine({
  id: JSON_TREE_ENUMS.APP,
  entry: assign({
    root: ({ spawn }: any) => spawn(rootMachine, { systemId: JSON_TREE_ENUMS.ROOT }),
  }),
})
