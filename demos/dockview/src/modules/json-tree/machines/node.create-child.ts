import { createNode } from './node.create'

export const createChildNodes = ({ context, spawn }: any) => {

  const parentRef = context?.refs?.parent
  const dataInfo = context?.dataRuntime?.info

  const dataValue = context?.dataConfig?.value


  if (dataInfo?.isArray) {
    return dataValue.map((item: any, index: any) => {
      return spawn(
        createNode({
          refs: {
            self,
            parent: parentRef
          },
          dataConfig: {
            value: item,
          },
          viewConfig: {
            isOpen: false,
          }
        }),
        { id: String(index) },
      )
    })
  }

  if (dataInfo?.isObject) {
    const nodes: any = {}
    for (const [key, val] of Object.entries(dataValue)) {
      nodes[key] = spawn(
        createNode({
          refs: {
            self,
            parent: parentRef
          },
          dataConfig: {
            value: val,
          },
          viewConfig: {
            isOpen: false,
          }
        }),
        { id: key },
      )
    }
    return nodes
  }


  return undefined
}
