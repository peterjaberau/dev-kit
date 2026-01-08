import { mergeProps } from '@zag-js/react'
import { type JSX, forwardRef } from 'react'
import { createSplitProps } from './helpers/utils/create-split-props'
import {
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from './helpers/utils/render-strategy'
import { useTreeView } from './hooks/use-tree-view'
import { TreeViewProvider } from './hooks/use-tree-view-context'
import { chakra } from '@chakra-ui/react'

const TreeViewImpl = (props: any, ref: React.Ref<HTMLDivElement>) => {
  const [renderStrategyProps, treeViewProps] = splitRenderStrategyProps(props)
  const [useTreeViewProps, localProps]: any = createSplitProps()(treeViewProps, [
    'canRename',
    'checkedValue',
    'collection',
    'defaultCheckedValue',
    'defaultExpandedValue',
    'defaultFocusedValue',
    'defaultSelectedValue',
    'expandedValue',
    'expandOnClick',
    'focusedValue',
    'id',
    'ids',
    'loadChildren',
    'onBeforeRename',
    'onCheckedChange',
    'onExpandedChange',
    'onFocusChange',
    'onLoadChildrenComplete',
    'onLoadChildrenError',
    'onRenameComplete',
    'onRenameStart',
    'onSelectionChange',
    'scrollToIndexFn',
    'selectedValue',
    'selectionMode',
    'typeahead',
  ] as any)

  const treeView = useTreeView(useTreeViewProps)
  const mergedProps = mergeProps(treeView.getRootProps(), localProps)

  return (
    <TreeViewProvider value={treeView}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <chakra.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TreeViewProvider>
  )
}


export const Root = forwardRef(TreeViewImpl)
