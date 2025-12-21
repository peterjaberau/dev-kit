import { mergeProps } from '@zag-js/react'
import { type JSX, forwardRef } from 'react'
import { createSplitProps } from './utils/create-split-props'
import {
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from './utils/render-strategy'
import { chakra } from '@chakra-ui/react'
import { TreeViewProvider } from './use-tree-view-context'



const TreeViewImpl = (props: any, ref: React.Ref<HTMLDivElement>) => {
  const [renderStrategyProps, treeViewProps] = splitRenderStrategyProps(props)
  const [{ value: treeView }, localProps] = createSplitProps()(treeViewProps, ['value'])
  const mergedProps = mergeProps(treeView.getRootProps(), localProps)

  return (
    <TreeViewProvider value={treeView}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <chakra.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TreeViewProvider>
  )
}

export type TreeViewRootProviderComponent<P = {}> = (
  props: any,
) => JSX.Element

export const TreeViewRootProvider = forwardRef(TreeViewImpl)
