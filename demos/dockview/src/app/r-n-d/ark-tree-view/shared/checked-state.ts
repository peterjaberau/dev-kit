import { add, remove, uniq } from "@zag-js/utils"

export function getCheckedState(collection: any, node: any, checkedValue: string[]) {
  const value = collection.getNodeValue(node)
  if (!collection.isBranchNode(node)) {
    return checkedValue.includes(value)
  }

  const childValues = collection.getDescendantValues(value)
  const allChecked = childValues.every((v: any) => checkedValue.includes(v))
  const someChecked = childValues.some((v: any) => checkedValue.includes(v))
  return allChecked ? true : someChecked ? "indeterminate" : false
}

export function toggleBranchChecked(collection: any, value: string, checkedValue: string[]) {
  const childValues = collection.getDescendantValues(value)
  const allChecked = childValues.every((child: any) => checkedValue.includes(child))
  return uniq(allChecked ? remove(checkedValue, ...childValues) : add(checkedValue, ...childValues))
}

export function getCheckedValueMap(collection: any, checkedValue: string[]) {
  const map: any = new Map()

  collection.visit({
    onEnter: (node: any) => {
      const value = collection.getNodeValue(node)
      const isBranch = collection.isBranchNode(node)
      const checked = getCheckedState(collection, node, checkedValue)

      map.set(value, {
        type: isBranch ? "branch" : "leaf",
        checked,
      })
    },
  })

  return map
}
