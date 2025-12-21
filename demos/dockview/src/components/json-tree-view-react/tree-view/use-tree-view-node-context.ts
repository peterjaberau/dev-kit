import { createContext } from './utils/create-context'


export const [TreeViewNodeStateProvider, useTreeViewNodeContext]: any = createContext<any>({
  name: 'TreeViewNodeContext',
  hookName: 'useTreeViewNodeContext',
  providerName: '<TreeViewNodeProvider />',
})
