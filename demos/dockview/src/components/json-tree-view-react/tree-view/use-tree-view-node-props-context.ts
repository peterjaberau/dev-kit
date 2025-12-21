import { createContext } from './utils/create-context'


export const [TreeViewNodePropsProvider, useTreeViewNodePropsContext]: any = createContext<any>({
  name: 'TreeViewNodePropsContext',
  hookName: 'useTreeViewNodePropsContext',
  providerName: '<TreeViewItemProvider />',
})
