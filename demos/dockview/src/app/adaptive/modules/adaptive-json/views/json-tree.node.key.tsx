import { keyPathToKey } from "@zag-js/json-tree-utils"

export const JsonTreeNodeKey = (props: any): React.ReactNode => {
  const { node, showQuotes } = props
  const key = keyPathToKey(node.keyPath)
  return (
    <>
      <span data-kind="key" suppressHydrationWarning data-non-enumerable={node.isNonEnumerable ? "" : undefined}>
        {showQuotes ? `"${key}"` : key}
      </span>
      <span data-kind="colon">: </span>
    </>
  )
}
