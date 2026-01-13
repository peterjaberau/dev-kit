import { assign, enqueueActions, setup } from "xstate"
import { createTreeItem } from "./tree-item.machine"
import { attachInstruction, extractInstruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
import { DropIndicator } from "../components/dnd/drop-indicator/list-item"

export const treeMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    handleInitiate: assign(({ context }) => {}),

    spawnDataTreeItems: assign(({ context, spawn, self }) => {
      context.dataRef = spawn(
        createTreeItem({
          refs: {
            // parent: self,
          },
          dataConfig: {
            name: "_TREE_ITEMS_ROOT_",
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
              open: false
            },
            isOpen: true,
          },
        }),
      )
    }),
    addTreeItemReference: assign(({ context, event }) => {
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
      actions: ["addTreeItemReference"],
    },
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnDataTreeItems")
  }),
})
