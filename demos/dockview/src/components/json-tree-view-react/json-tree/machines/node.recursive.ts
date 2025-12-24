import { assign, setup } from "xstate"
import { isLeaf, isArray, isObject } from "../utils"

export const createNode = (input: any) => {
  return setup({
    actions: {
      spawnChildNodes: assign(({ context, event, spawn }: any) => {
        context.config.data = event.data
        context.refs.internal.nodes = createChildNodes({ data: event.data, spawn })
        // context.refs.internal.nodes =
      }),
    },
    actors: {},
  }).createMachine({
    id: "node",
    initial: "idle",
    context: ({ spawn, self }: any) => {

      console.log('---createNode.input----', { input })

      return {
        refs: {
          internal: {
            self,
            parent: input?.refs?.internal?.parent || null,
            nodes: createChildNodes({ data: input?.config?.data, spawn }),
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
  const isScalarNode = isLeaf(data)
  const isObjectNode = isObject(data)
  const isArrayNode = isArray(data)

  if (isArrayNode) {
    return data.map((item: any, index: any) => {
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

  if (isObjectNode) {
    const nodes: any = {}
    for (const [key, val] of Object.entries(data)) {
      nodes[key] = spawn(
        createNode({
          config: {
            data: val,
          },
        }),
        { id: key },
      )
    }
    return nodes

  }


  // if (isScalarNode) {
  //   return spawn(
  //     createNode({
  //       config: {
  //         data,
  //       },
  //     }),
  //   )
  // }
  return undefined


}
