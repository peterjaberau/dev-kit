import { chakra, mergeProps } from "@chakra-ui/react"
import { forwardRef } from "react"
import { useRenderStrategyPropsContext, createSplitProps } from "#adaptive-shared"
import { Collapsible } from "@chakra-ui/react"
import { useTreeContext, useNodeContext, useNodePropsContext } from "../../providers"

const splitVisibilityProps = createSplitProps()

export const Branch = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const nodeProps = useNodePropsContext()
  const nodeState: any = useNodeContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const mergedProps = mergeProps(treeView.getBranchProps(nodeProps), props)
  const branchContentProps = treeView.getBranchContentProps(nodeProps)

  return (
    <Collapsible.Root
      ref={ref}
      open={nodeState.expanded}
      ids={{ content: branchContentProps.id }}
      {...renderStrategyProps}
      {...mergedProps}
    />
  )
})

export const BranchContent = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const nodeProps = useNodePropsContext()
  const contentProps = treeView.getBranchContentProps(nodeProps)

  //@ts-ignore
  const [, branchContentProps] = splitVisibilityProps(contentProps, ["hidden", "data-state"])
  const mergedProps = mergeProps(branchContentProps, props)

  return <Collapsible.Content ref={ref} {...mergedProps} />
})

export const BranchControl = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchControlProps(nodeProps), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

export const BranchIndentGuide = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchIndentGuideProps(nodeProps), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

export const BranchIndicator = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchIndicatorProps(nodeProps), props)

  return <chakra.div {...mergedProps} ref={ref} />
})

export const BranchText = forwardRef<HTMLSpanElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchTextProps(nodeProps), props)

  return <chakra.span {...mergedProps} ref={ref} />
})

export const BranchTrigger = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeContext()
  const nodeProps = useNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchTriggerProps(nodeProps), props)

  return <chakra.div {...mergedProps} ref={ref} />
})