import { createContext } from '@chakra-ui/react'

export const [TreeViewProvider, useTreeViewContext] = createContext({
  name: 'TreeViewContext',
  hookName: 'useTreeViewContext',
  providerName: '<TreeViewProvider />',
})
