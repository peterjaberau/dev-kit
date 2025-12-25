import { createContext } from "../helpers/utils"

export const AppContext = (props: any) => props.children(useAppContext())

export const [AppProvider, useAppContext]: any = createContext({
  name: "AppContext",
  hookName: "useAppContext",
  providerName: "<AppProvider />",
})
