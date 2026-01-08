import { useTreeViewContext } from './hooks/use-tree-view-context'


export const Context = (props: any) =>
  props.children(useTreeViewContext())
