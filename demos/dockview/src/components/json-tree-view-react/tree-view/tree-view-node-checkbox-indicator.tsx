import { useTreeViewNodeContext } from './use-tree-view-node-context'


export const TreeViewNodeCheckboxIndicator = (props: any) => {
  const { children, indeterminate, fallback } = props
  const nodeState = useTreeViewNodeContext()
  const checkedState = nodeState.checked

  if (checkedState === 'indeterminate' && indeterminate) {
    return <>{indeterminate}</>
  }

  if (checkedState === true && children) {
    return <>{children}</>
  }

  return <>{fallback}</>
}

TreeViewNodeCheckboxIndicator.displayName = 'TreeViewNodeCheckboxIndicator'
