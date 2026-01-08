import { useTreeViewNodeContext } from './context'

export const NodeCheckboxIndicator = (props: any) => {
  const { children, indeterminate, fallback } = props
  const nodeState: any = useTreeViewNodeContext()
  const checkedState = nodeState.checked

  if (checkedState === 'indeterminate' && indeterminate) {
    return <>{indeterminate}</>
  }

  if (checkedState === true && children) {
    return <>{children}</>
  }

  return <>{fallback}</>
}

NodeCheckboxIndicator.displayName = 'TreeViewNodeCheckboxIndicator'
