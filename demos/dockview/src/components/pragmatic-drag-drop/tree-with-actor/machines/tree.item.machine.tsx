import { assign, emit, enqueueActions, setup } from "xstate"
import { isArray, isObject } from "#shared/utils"
import { omit } from "lodash"

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
          dragItemId: null,
          /* manage the evaluated state of the view */
        },
      }
    },
    on: {
      toggle: {
        actions: assign(({ context, event, self }) => {
          const { open = true, itemId = null } = event

          const hasChildren = context.dataConfig?.value?.children?.length > 0
          const isOpen = context.dataConfig?.value?.isOpen

          // has children, no change keep it as it
          if (!hasChildren) {

            return
          }

          // auto toggle
          if (self.id === itemId) {

            context.dataConfig?.value && (context.dataConfig.value.isOpen = !context.dataConfig.value.isOpen)
          }

          // explicit open
          if (open) {
            if (hasChildren && !isOpen) {
              context.dataConfig?.value && (context.dataConfig.value.isOpen = true)
            }
          }

          // explicit close
          if (!open) {
            if (hasChildren && isOpen) {
              context.dataConfig?.value && (context.dataConfig.value.isOpen = false)
            }
          }

          // context.dataConfig?.value && (context.dataConfig.value.isOpen = event?.open)
        }),
      },
      instruction: {
        actions: assign(({ context, event }) => {
          const { type, instruction, itemId, targetId } = event

          // the rest of the actions require you to drop on something else
          if (itemId === targetId) {
            return
          }

          //instruction was blocked and should not do anything
          if (instruction.blocked) {
            return
          }

          if (instruction.operation === "reorder-before") {
            /* TODO: actor way
            let result = tree.remove(data, action.itemId)
            result = tree.insertBefore(result, action.targetId, item)
            return result
           */
          }

          if (instruction.operation === "reorder-after") {
            /* TODO: actor way
            let result = tree.remove(data, action.itemId)
            result = tree.insertAfter(result, action.targetId, item)
            return result
           */
          }

          if (instruction.operation === "combine") {
            /* TODO: actor way
            let result = tree.remove(data, action.itemId)
            result = tree.insertChild(result, action.targetId, item)
            return result
           */
          }

          //TODO: everything
          return
        }),
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
