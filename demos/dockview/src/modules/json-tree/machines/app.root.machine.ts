import { assign, enqueueActions, setup } from "xstate"
import { createNode } from "./node.create"
import { machineConstants } from "../utils/constants"
import { data as resourcesData } from "../composable/data"
import { createResource } from "../composable/actors/resource.machine"

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
            parent: self,
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

    spawnResources: assign(({ context, spawn, self }) => {
      const resourcesKeys = Object.keys(resourcesData) || []
      resourcesKeys.map((key) => {
        context.resourcesRef[key] = spawn(
          createResource({
            data: resourcesData[key],
          }),
        )
      })
      context.resources = resourcesData
    }),
  },
  actors: {},
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
    enqueue("spawnResources")
  }),
})
