import { assign, enqueueActions, setup } from "xstate"
import { createNode } from "./node.create"
import { machineConstants } from "../utils/constants"
import { treeMachine } from "#tree-with-actor/machines/tree.machines"

export const appRootMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    handleInitiate: assign(({ context }) => {}),
    spawnRootNode: assign(({ context, spawn, self }) => {
      context.nodeRef = spawn(
        createNode({
          refs: {
            // parent: self,
          },
          dataConfig: {
            name: machineConstants.NODE_ROOT_NAME,
            value: context?.data,
          },
          viewConfig: {
            isOpen: true,
          },
        }),
      )
    }),

    spawnTree: assign(({ context, spawn, self }) => {

      const treeRef = spawn("treeMachine", {
        id: "tree",
        systemId: "tree",
        input: {
          data: context?.data,
        },
      })
      treeRef.on("TREE_ITEM_SPAWNED", (event: any) => {
        self.send(event)
      })
      context.treeRef = treeRef


    }),
  },
  actors: {
    treeMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      treeRef: null,

      resources: {
        tasks: null,
        projects: null,
        labels: null,
        projectGroups: null,
        labelGroups: null,
        settings: null,
        user: null,
      },
      resourcesRef: {
        tasks: null,
        projects: null,
        labels: null,
        projectGroups: null,
        labelGroups: null,
        settings: null,
        user: null,
      },

      //part of implementation of treeWithActor
      treeManagerRef: null,
      treeActorRef: null,
      nodeRef: null,
      nodeMetaRef: null,
      nodeRecursiveRef: null,
      data: input?.data,
      collapsed: true,
      enableClipboard: true,
      editable: false,
      displayArrayIndex: true,
      displaySize: true,
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnRootNode")
    enqueue("spawnTree")
  }),
})
