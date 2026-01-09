
export function getBranchValues(tree: any, depth: number | any) {
  let values: string[] = []
  tree.visit({
    onEnter: (node: any, indexPath: any) => {
      if (indexPath.length === 0) return
      if (tree.isBranchNode(node) && indexPath.length <= depth) {
        values.push(tree.getNodeValue(node))
      }
    },
  })
  return values
}
