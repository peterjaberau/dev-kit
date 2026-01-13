import { assign, enqueueActions, setup } from "xstate"
import { createNodeItemMachine } from "./node-item"
import { attachInstruction, extractInstruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
import { DropIndicator } from "../../dnd/drop-indicator/list-item"

export const nodeManagerMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    handleInitiate: assign(({ context }) => {}),

    spawnRootNode: assign(({ context, spawn, self }) => {
      context.dataRef = spawn(
        createNodeItemMachine({
          refs: {
            // parent: self,
          },
          dataConfig: {
            name: "_ROOT_NODE_",
            value: context?.data,
          },
          dataRuntime: {
            info: {
              // path: "/",
              // dataPath: "$"
            },
          },
          viewConfig: {
            control: {
              open: false,
            },
            isOpen: true,
          },
        }),
      )
    }),
    addNodeReference: assign(({ context, event }) => {
      // console.log("---event.treeMachine----", event)

      context.dataTreeReferences.push({
        ...event,
      })
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      //extractInstruction: extractInstruction, attachInstruction: attachInstruction
      dependencies: {
        attachInstruction: attachInstruction,
        extractInstruction: extractInstruction,
        DropIndicator: DropIndicator,
      },
      uniqueContextId: Symbol("tree-context"),
      data: input?.data || null,
      dataRef: input?.dataRef || null,
      dataTreeReferences: [],
    }
  },
  on: {
    TREE_ITEM_SPAWNED: {
      actions: ["addNodeReference"],
    },
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnRootNode")
  }),
})
