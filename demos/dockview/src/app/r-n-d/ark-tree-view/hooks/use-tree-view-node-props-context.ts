import type { NodeProps } from '@zag-js/tree-view'
import { createContext } from '@chakra-ui/react'


export const [TreeViewNodePropsProvider, useTreeViewNodePropsContext] = createContext({
  name: 'TreeViewNodePropsContext',
  hookName: 'useTreeViewNodePropsContext',
  providerName: '<TreeViewItemProvider />',
})
