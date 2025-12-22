import { createContext } from './utils/create-context'


export const [AvatarProvider, useAvatarContext]: any = createContext<any>({
  name: 'AvatarContext',
  hookName: 'useAvatarContext',
  providerName: '<AvatarProvider />',
})
