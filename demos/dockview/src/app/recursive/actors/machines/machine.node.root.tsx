import { assign, enqueueActions, setup } from "xstate"
import { nodeItemMachine } from "./machine.node.item"
import { ACTOR_CONSTANTS } from "../constants"
import { initialConfig } from '../../config'

export const nodeRootMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    spawnChildNodes: assign(({ context, self, spawn }) => {
      context.props.nodes.forEach((currentItem: any) => {

        const childRef = spawn('nodeItemMachine', {
          id: currentItem.id,
          systemId: currentItem.id,
          input: {
            internalRefs: {
              parent: self,
              children: []
            },
            props: {
              id: currentItem.id,
              nodes: currentItem.children || []
            }
          },
        })

        context.internalRefs.children = [...context.internalRefs.children, childRef];
      })
    }),
  },
  actors: {
    nodeItemMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      internalRefs: {
        parent: input?.internalRefs?.parent,
        children: []
      },
      props: {
        nodes: initialConfig.nodes
      },
      ...input
    }
  },
  entry: enqueueActions(({ enqueue }) => {
    enqueue("spawnChildNodes")
  }),
})
