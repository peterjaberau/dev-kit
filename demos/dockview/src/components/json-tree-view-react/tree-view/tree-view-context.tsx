import {  useTreeViewContext } from './use-tree-view-context'


export const TreeViewContext = (props: any) =>
  props.children(useTreeViewContext())
