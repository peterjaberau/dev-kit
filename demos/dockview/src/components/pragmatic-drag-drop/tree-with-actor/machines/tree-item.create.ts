
import { assign, setup } from "xstate"
import { createChildTreeItems } from "./tree-item.create-child"
import { isArray, isBoolean, isBranch, isFunction, isLeaf, isNull, isNumber, isObject, isString, typeOf } from "#shared/utils"
import { omit } from "lodash"

export const createTreeItem = (input: any) => {
  return setup({
    actions: {

      setBranchOpen: assign(({ context, event }) => {
        context.viewConfig.isOpen = event?.isOpen
      }),
    },
  }).createMachine({
    id: "tree-node",
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
      const dataObject = dataRuntime.info?.isObject ? omit(dataValue, ['children']) : null


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
          childNodes: createChildTreeItems({
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

