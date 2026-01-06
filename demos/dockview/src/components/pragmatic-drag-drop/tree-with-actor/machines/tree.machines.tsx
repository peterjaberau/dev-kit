import { assign, enqueueActions, setup } from "xstate"
import { omit } from "lodash"

import { isArray, isObject } from "#shared/utils"

//import { attachInstruction, extractInstruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"

export const createTreeItem = (input: any) => {
  return setup({
    actions: {
      setBranchOpen: assign(({ context, event }) => {
        context.viewConfig.isOpen = event?.isOpen
      }),
    },
  }).createMachine({
    id: "tree-item",
    initial: "idle",

    context: ({ spawn, self }: any) => {
      const parentRef = input?.refs?.parent || null
      const viewConfig = input?.viewConfig
      const dataRuntime = {
        info: {
          isRoot: !parentRef,
          isObject: isObject(input?.dataConfig?.value),
          isArray: isArray(input?.dataConfig?.value),
        },
      }

      const dataValue = input?.dataConfig?.value
      const dataChildren = dataRuntime.info?.isArray ? dataValue : dataRuntime.info?.isObject ? dataValue?.children : []
      const dataObject = dataRuntime.info?.isObject ? omit(dataValue, ["children"]) : null

      const dataConfig = {
        name: input?.dataConfig?.name,
        value: {
          ...dataObject,
          children: dataChildren,
        },
      }

      const refs = {
        parent: parentRef,
        self,
      }
      return {
        refs: {
          ...refs,
          childItems: createChildTreeItems({
            context: {
              refs,
              dataConfig,
              dataRuntime,
              viewConfig,
            },
            spawn,
          }),
        },

        dataSchema: {
          /* schema of the mapped data - potentially it could be referenced */
        },
        dataConfig,
        dataRuntime,

        viewSchema: {
          /* schema of the view including mapping with components */
        },
        viewConfig,

        viewRuntime: {
          /* manage the evaluated state of the view */
        },
      }
    },

    on: {
      BRANCH_OPEN_CHANGED: {
        actions: "setBranchOpen",
      },
    },

    states: {
      idle: {},
    },
  })
}

export const createChildTreeItems = ({ context, spawn }: any) => {
  const refs = context?.refs || {}
  const parentSelf = context.refs.self
  const dataInfo = context?.dataRuntime?.info
  const dataValue = context?.dataConfig?.value


  if (!dataValue.children) return

  return dataValue.children.map((child: any, index: any) =>
    spawn(
      createTreeItem({
        refs: {
          parent: parentSelf,

        },
        dataConfig: {
          name: child.id ?? String(index),
          value: child,
        },
        viewConfig: {
          isOpen: !!child.isOpen,
        },
      }),
    ),
  )
}

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
          viewConfig: {
            isOpen: true,
          },
        }),
      )
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      //extractInstruction: extractInstruction, attachInstruction: attachInstruction
      dependencies: null,

      data: input?.data || null,
      dataRef: input?.dataRef || null,
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnDataTreeItems")
  }),
})
