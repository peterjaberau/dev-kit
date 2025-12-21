import { createContext } from './utils/create-context'


export const [TreeViewProvider, useTreeViewContext]: any = createContext<any>({
  name: 'TreeViewContext',
  hookName: 'useTreeViewContext',
  providerName: '<TreeViewProvider />',
})
