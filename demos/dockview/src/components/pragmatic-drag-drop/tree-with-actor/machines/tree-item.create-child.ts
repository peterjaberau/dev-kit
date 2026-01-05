import { createTreeItem } from "./tree-item.create"
import { omit } from "lodash"


export const createChildTreeItems = ({ context, spawn }: any) => {

  const refs = context?.refs || {}
  const parentSelf = context.refs.self
  const dataInfo = context?.dataRuntime?.info
  const dataValue = context?.dataConfig?.value

  console.log('---dataValue---', { dataValue, dataInfo })

  if (!dataValue.children) return


  return dataValue.children.map((child: any, index: any) =>
    spawn(
      createTreeItem({
        refs: {
          parent: parentSelf,
        },
        dataConfig: {
          name: child.id ?? String(index),
          value: child,
        },
        viewConfig: {
          isOpen: !!child.isOpen,
        },
      }),
    ),
  )
}
