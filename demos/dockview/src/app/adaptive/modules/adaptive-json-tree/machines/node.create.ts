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
          parentRef: context.refs.self // ensure direct parent is used when spawning
        })
      }),


      setBranchOpen: assign(({ context, event }: any) => {
        context.viewConfig['isOpen'] = event?.isOpen
      }),
    },
    actors: {},
  }).createMachine({
    id: "node",
    initial: "idle",
    context: ({ spawn, self }: any) => {

      const parentRef = input?.refs?.parent || null
      // const parentRef = input?.refs?.parent ? input?.refs?.parent : self

      // const parentRef = input?.isRoot ? null : self



      /*
       const dataConfig = {
        name: input?.dataConfig?.name,
        value: input?.dataConfig?.value,
      }
       */
      const dataConfig = input?.dataConfig
      const viewConfig = input?.viewConfig

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
        parent: parentRef,
        self
      }


      return {
        refs: {
          ...refs,
          childNodes: createChildNodes({
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




