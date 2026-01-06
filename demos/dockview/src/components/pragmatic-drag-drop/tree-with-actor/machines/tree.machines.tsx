import { assign, enqueueActions, setup, emit } from "xstate"
import { omit } from "lodash"

import { isArray, isObject } from "#shared/utils"

//import { attachInstruction, extractInstruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"

export const createTreeItem = (input: any) => {
  return setup({
    actions: {
      setBranchOpen: assign(({ context, event }) => {
        context.viewConfig.isOpen = event?.isOpen
      }),

      emitTreeItemSpawned: emit(({ context }) => {
        console.log("---createTreeItem.event----", context)

        return {
          type: "TREE_ITEM_SPAWNED",
          refs: context.refs,
          context: context,
          path: context.dataRuntime.info?.path,
          dataPath: context.dataRuntime.info?.dataPath,
        }
      }),
    },
  }).createMachine({
    id: "tree-item",
    initial: "idle",

    context: ({ spawn, self }: any) => {
      // fist call will be considered as root item, then parentRef and parentPath will be null
      const parentRef = input?.refs?.parent || null

      const viewConfig = input?.viewConfig
      const dataRuntime = {
        info: {
          path: input?.dataRuntime?.info?.path,
          dataPath: input?.dataRuntime?.info?.dataPath,
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

    // entry: ["emitTreeItemSpawned"],

    entry: enqueueActions(({ enqueue, context, event, system }) => {
      const treeActor = system.get("tree")

      enqueue.sendTo(treeActor, { type: "TREE_ITEM_SPAWNED", ...context })
    }),

    states: {
      idle: {},
    },
  })
}

export const createChildTreeItems = ({ context, spawn }: any) => {
  // refs
  const refs = context?.refs || {}
  const parentSelf = context.refs.self

  // parent data, use children to spawn child items
  const dataInfo = context?.dataRuntime?.info
  const dataValue = context?.dataConfig?.value
  if (!dataValue.children) return

  // parent dataRuntime, use info.path to calculate the path of each child
  const dataRuntime = context?.dataRuntime || {}

  const parentPath = dataInfo?.path ?? ""
  const parentDataPath = dataInfo?.dataPath ?? "$"
  const currentPath = `${parentPath}/${parentSelf.id}`

  // parent has children, spawn child tree items
  return dataValue.children.map((child: any, index: any) => {
    const itemName = child?.id ?? String(index)

    const childObject = {
      ...omit(child, ["children"]),
      children: child?.children ?? [],
    }
    const currentDataPath = `${parentDataPath}['children'][${index}]`

    return spawn(
      createTreeItem({
        refs: {
          parent: parentSelf,
        },
        dataConfig: {
          name: itemName,
          value: childObject,
        },
        dataRuntime: {
          info: {
            path: currentPath,
            dataPath: currentDataPath,
          },
        },

        viewConfig: {
          isOpen: !!child.isOpen,
        },
      }),
    )
  })
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
          dataRuntime: {
            info: {
              // path: "/",
              // dataPath: "$"
            },
          },
          viewConfig: {
            isOpen: true,
          },
        }),
      )
    }),
    addTreeItemReference: assign(({ context, event }) => {
      console.log("---event.treeMachine----", event)

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
      dependencies: null,

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

