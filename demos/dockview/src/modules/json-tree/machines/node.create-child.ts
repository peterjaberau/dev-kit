import { createNode } from './node.create'

/**
 * createChildNodes(options)
 * - context: { refs, dataConfig, dataRuntime }  (from the parent)
 * - spawn: spawn function provided by xstate
 * - parentRef: ActorRef of the actor that is spawning these children (IMPORTANT)
 *
 * This function maps the parent's value into child dataConfig entries and spawns a node actor
 * for each child, making sure the child's input.refs.parent is the direct parent actor.
 */

export const createChildNodes = ({ context, spawn }: any) => {

  const refs = context?.refs || {}


// console.log('createChildNodes context:', context)
  const parentSelf = context.refs.self

  // const parentRef = self
  const dataInfo = context?.dataRuntime?.info
  const dataValue = context?.dataConfig?.value


  if (dataInfo?.isArray) {
    return dataValue.map((item: any, index: any) => {
      return spawn(
        createNode({
          refs: {
            // self,
            // parentRef is the ActorRef of the immediate spawner (the current node)
            // parent: parentRef ?? refs.self ?? null,
            parent: parentSelf
          },
          dataConfig: {
            name: String(index),
            value: item,
          },
          viewConfig: {
            isOpen: false,
          },
        }),
        // { id: String(index) },
      )
    })
  }

  if (dataInfo?.isObject) {
    const nodes: any = {}
    for (const [key, val] of Object.entries(dataValue)) {
      nodes[key] = spawn(
        createNode({
          refs: {
            // self,
            // parentRef is the ActorRef of the immediate spawner (the current node)
            parent: parentSelf
          },
          dataConfig: {
            name: key,
            value: val,
          },
          viewConfig: {
            isOpen: false,
          }
        }),
        // { id: key },
      )
    }
    return nodes
  }


  return undefined
}



