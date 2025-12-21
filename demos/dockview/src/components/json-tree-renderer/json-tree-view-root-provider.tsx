import type { JsonNode } from '@zag-js/json-tree-utils'
import { forwardRef } from 'react'
import { TreeView } from '../pro/components/tree-view-pro'

export interface JsonTreeViewRootProviderProps extends TreeView.RootProviderProps {}

export const JsonTreeViewRootProvider = forwardRef<HTMLDivElement, JsonTreeViewRootProviderProps>((props, ref) => {
  return <TreeView.RootProvider data-scope="json-tree-view" {...props} ref={ref} />
})

JsonTreeViewRootProvider.displayName = 'JsonTreeViewRootProvider'
