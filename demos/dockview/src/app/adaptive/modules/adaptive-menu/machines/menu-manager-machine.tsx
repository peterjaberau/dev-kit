import { assign, enqueueActions, setup } from "xstate"
import { createMenuItem } from "./menu-item-machine"
import { attachInstruction, extractInstruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
import { DndDropIndicator as DropIndicator } from "../dnd-drop-indicator"

export const menuManagerMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    handleInitiate: assign(({ context }) => {}),

    spawnRootMenuItem: assign(({ context, spawn, self }) => {
      context.dataRef = spawn(
        createMenuItem({
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
    addMenuItemReference: assign(({ context, event }) => {
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
      actions: ["addMenuItemReference"],
    },
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnRootMenuItem")
  }),
})
