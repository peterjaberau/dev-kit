import { createContext } from '../../utils/create-context'


export const [EnvironmentContextProvider, useEnvironmentContext]: any = createContext<any>({
  name: 'EnvironmentContext',
  hookName: 'useEnvironmentContext',
  providerName: '<EnvironmentProvider />',
  strict: false,
  defaultValue: {
    getRootNode: () => document,
    getDocument: () => document,
    getWindow: () => window,
  },
})
