import { assign, enqueueActions, setup } from "xstate"
import { machineToGraph } from "../utils"

export const graphMachine = setup({
  actions: {
    getRoots: assign(({ context }) => {}),
    setRoot: assign(({ context }) => {}),
    setRootEdges: assign(({ context }) => {}),
    setTopLevelStates: assign(({ context }) => {}),
    setSortedStates: assign(({ context }) => {}),
  },
}).createMachine({
  context: ({ input }: any) => {
    return {
      machine: input?.machine,
      graph: machineToGraph(input?.machine),
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    // console.log("graphMachine entry", context)
  }),
})
