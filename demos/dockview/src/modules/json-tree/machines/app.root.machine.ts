import { assign, enqueueActions, setup } from "xstate"
import { createNode } from "./node.create"
import { machineConstants } from "../utils/constants"
import { treeManagerMachine } from "#tree-with-actor/machines/tree-manager.machine"
import { createTreeItem } from "#tree-with-actor/machines/tree-item.create"

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

    spawnTreeActor: assign(({ context, spawn, self }) => {
      context.treeActorRef = spawn(
        createTreeItem({
          refs: {
            // parent: self,
          },
          dataConfig: {
            name: '_TREE_ACTOR_ROOT_',
            value: context?.data,
          },
          viewConfig: {
            isOpen: true,
          },
        }),
      )
    }),

    spawnTreeManager: assign(({ context, spawn, self }) => {
      context.treeManagerRef = spawn("treeManagerMachine", {
        id: "tree-manager",
        systemId: "tree-manager",
        input: {
          data: context?.data,
        },
      })
    }),
  },
  actors: {
    treeManagerMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
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
    enqueue("spawnTreeManager")
    enqueue("spawnTreeActor")
  }),
})
