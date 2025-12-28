import { assign, setup } from "xstate"
import { createChildNodes } from './node.create-child'
import { typeOf, isNumber, isBranch, isBoolean, isFunction, isString, isNull,  isLeaf, isArray, isObject, isObjectLeaf } from "../utils"

export const createNode = (input: any) => {
  return setup({
    actions: {
      // update node event
      spawnChildNodes: assign(({ context, event, spawn, self }: any) => {
        context.dataConfig.value = event.data
        context.refs.childNodes = createChildNodes({
          context,
          spawn,
        })
      }),


      setBranchOpen: assign(({ context, event }: any) => {
        context.viewConfig.isOpen = event.isOpen
      }),
    },
    actors: {},
  }).createMachine({
    id: "node",
    initial: "idle",
    context: ({ spawn, self }: any) => {

      const parentRef = input?.refs?.parent || null
      const dataConfig = {
        value: input?.dataConfig?.value,
      }
      const dataRuntime = {
        info: {
          dataType: typeOf(input?.dataConfig?.value),
          isScalar: isLeaf(input?.dataConfig?.value),
          isObject: isObject(input?.dataConfig?.value),
          isBranch: isBranch(input?.dataConfig?.value),
          isArray: isArray(input?.dataConfig?.value),
          isNumber: isNumber(input?.dataConfig?.value),
          isString: isString(input?.dataConfig?.value),
          isBoolean: isBoolean(input?.dataConfig?.value),
          isFunction: isFunction(input?.dataConfig?.value),
          isNull: isNull(input?.dataConfig?.value),
        }
      }
      const refs = {
        self,
        parent: parentRef,
      }


      return {
        refs: {
          ...refs,
          childNodes: createChildNodes({
            context: {
              refs,
              dataConfig,
              dataRuntime
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
        viewConfig: {
          isOpen: input?.viewConfig?.value
          /* props of the view */
        },
        viewRuntime: {
          /* manage the evaluated state of the view */
        },
      }
    },
    on: {
      UPDATE: {
        actions: ["spawnChildNodes"],
      },

      BRANCH_OPEN_CHANGED: {
        actions: ['setBranchOpen']
      }
    },

    states: {
      idle: {},
    },
  })
}
