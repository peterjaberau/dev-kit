import { assign, setup } from "xstate"
import { createChildNodes } from './node.create-child'

export const createNode = (input: any) => {
  return setup({
    actions: {
      // update node event
      spawnChildNodes: assign(({ context, event, spawn, self }: any) => {
        context.dataConfig.value = event.data
        context.refs.childNodes = createChildNodes({
          refs: { parent: self },
          dataConfig: { value: event.data },
          spawn,
        })
      }),
    },
    actors: {},
  }).createMachine({
    id: "node",
    initial: "idle",
    context: ({ spawn, self }: any) => {
      return {
        refs: {
          self,
          parent: input?.refs?.parent || null,
          childNodes: createChildNodes({
            dataConfig: { value: input?.dataConfig?.value },
            refs: { parent: self },
            spawn,
          }),
        },

        dataSchema: {
          /* schema of the mapped data - potentially it could be referenced */
        },
        dataConfig: {
          /* binding config of the data based on dataSchema */
          value: input?.dataConfig?.value,
        },
        dataRuntime: {
          /* manage the evaluated state of the data  */
        },

        viewSchema: {
          /* schema of the view including mapping with components */
        },
        viewConfig: {
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
    },

    states: {
      idle: {},
    },
  })
}
