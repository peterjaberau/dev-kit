import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from './helpers/utils/create-split-props'
import { Collapsible } from '@chakra-ui/react'
import { useTreeViewContext } from './context'
import { useNodePropsContext } from './context'


const splitVisibilityProps = createSplitProps()

export const BranchContent = forwardRef<HTMLDivElement, any>((props, ref) => {
  const treeView: any = useTreeViewContext()
  const nodeProps = useNodePropsContext()
  const contentProps = treeView.getBranchContentProps(nodeProps)

  //@ts-ignore
  const [, branchContentProps] = splitVisibilityProps(contentProps, ['hidden', 'data-state'])
  const mergedProps = mergeProps(branchContentProps, props)

  return <Collapsible.Content ref={ref} {...mergedProps} />
})

BranchContent.displayName = 'BranchContent'
