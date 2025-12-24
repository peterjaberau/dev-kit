import { assign, setup } from "xstate"
import { isLeaf, isArray, isObject } from "../utils"
import { createNode } from './node.create'

export const createChildNodes = ({ dataConfig, refs, spawn }: any) => {
  const isScalarNode = isLeaf(dataConfig.value)
  const isObjectNode = isObject(dataConfig.value)
  const isArrayNode = isArray(dataConfig.value)

  if (isArrayNode) {
    return dataConfig.value.map((item: any, index: any) => {
      return spawn(
        createNode({
          refs: {
            self,
            parent: refs?.parent
          },
          dataConfig: {
            value: item,
          },
        }),
        { id: String(index) },
      )
    })
  }

  if (isObjectNode) {
    const nodes: any = {}
    for (const [key, val] of Object.entries(dataConfig?.value)) {
      nodes[key] = spawn(
        createNode({
          refs: {
            self,
            parent: refs?.parent
          },
          dataConfig: {
            value: val,
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
