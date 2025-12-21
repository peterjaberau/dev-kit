import type { NodeProps } from '@zag-js/tree-view'
import { createContext } from '@chakra-ui/react'

export interface UseTreeViewNodePropsContext extends NodeProps {}

export const [TreeViewNodePropsProvider, useTreeViewNodePropsContext] = createContext<UseTreeViewNodePropsContext>({
  name: 'TreeViewNodePropsContext',
  hookName: 'useTreeViewNodePropsContext',
  providerName: '<TreeViewItemProvider />',
})
