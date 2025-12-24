import { assign, setup } from "xstate"

export const createNode = (input: any) => {
  return setup({
    actions: {
      spawnChildNodes: assign(({ context, event, spawn }: any) => {
        context.config.data = event.data
        // context.refs.internal.nodes =
      }),
    },
    actors: {},
  }).createMachine({
    id: "node",
    initial: "idle",
    context: ({ spawn, self }) => {
      return {
        refs: {
          internal: {
            self,
            parent: input?.refs?.internal?.parent || null,
            nodes: [],
          },
          external: {},
        },
        config: {
          data: input?.config?.data,
        },
        runtime: {},
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

export const createChildNodes = ({ data, spawn }: any) => {
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      return spawn(
        createNode({
          config: {
            data: item,
          },
        }),
        { id: String(index) },
      )
    })
  }

  if (typeof data === 'object' && data !== null) {
    const children: any = {};
    for (const [key, val] of Object.entries(data)) {
      children[key] = spawn(createNode({
        config: {
          data: val
        }
      }), { id: key})
    }
    return children
  }
  return undefined
}
