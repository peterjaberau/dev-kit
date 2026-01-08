import type { NodeState } from '@zag-js/tree-view'
import { createContext } from '@chakra-ui/react'


export const [TreeViewNodeStateProvider, useTreeViewNodeContext] = createContext({
  name: 'TreeViewNodeContext',
  hookName: 'useTreeViewNodeContext',
  providerName: '<TreeViewNodeProvider />',
})
