import { assign, emit, enqueueActions, setup } from "xstate"
import { isArray, isObject } from "#shared/utils"
import { omit } from "lodash"
import { createMenuItem } from './menu-item-machine'


export const createMenuList = ({ context, spawn }: any) => {
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
      // children: child?.children ?? [],
      children: child?.children ?? undefined,
    }
    const currentDataPath = `${parentDataPath}['children'][${index}]`

    return spawn(
      createMenuItem({
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
