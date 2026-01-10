import { chakra, mergeProps } from "@chakra-ui/react"
import { forwardRef } from "react"
import { useBaseTreeContext, useBaseNodeContext, useBaseNodePropsContext } from "."

export const NodeCheckbox = forwardRef<HTMLSpanElement, any>((props, ref) => {
  const treeView: any = useBaseTreeContext()
  const nodeProps = useBaseNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeCheckboxProps(nodeProps), props)

  return <chakra.span {...mergedProps} ref={ref} />
})

export const NodeCheckboxIndicator = (props: any) => {
  const { children, indeterminate, fallback } = props
  const nodeState: any = useBaseNodeContext()
  const checkedState = nodeState.checked

  if (checkedState === "indeterminate" && indeterminate) {
    return <>{indeterminate}</>
  }

  if (checkedState === true && children) {
    return <>{children}</>
  }

  return <>{fallback}</>
}

export const NodeRenameInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  const treeView: any = useBaseTreeContext()
  const nodeProps = useBaseNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeRenameInputProps(nodeProps), props)

  return <chakra.input {...mergedProps} ref={ref} />
})
