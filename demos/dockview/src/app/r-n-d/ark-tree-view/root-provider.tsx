import { mergeProps } from '@zag-js/react'
import { type JSX, forwardRef } from 'react'
import { createSplitProps } from './helpers/utils/create-split-props'
import {
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from './helpers/utils/render-strategy'
import { chakra } from '@chakra-ui/react'
import { TreeViewProvider } from './hooks/use-tree-view-context'


const TreeViewImpl = (props: any, ref: React.Ref<HTMLDivElement>) => {
  const [renderStrategyProps, treeViewProps] = splitRenderStrategyProps(props)
  //@ts-ignore
  const [{ value: treeView }, localProps]: any = createSplitProps()(treeViewProps, ['value' as any])
  const mergedProps = mergeProps(treeView.getRootProps(), localProps)

  return (
    <TreeViewProvider value={treeView}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <chakra.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TreeViewProvider>
  )
}


export const RootProvider = forwardRef(TreeViewImpl)
