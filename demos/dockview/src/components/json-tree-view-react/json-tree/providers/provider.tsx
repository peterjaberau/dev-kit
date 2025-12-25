import { createContext } from "../helpers/utils"

export const Context = (props: any) => props.children(useContext())

export const [Provider, useContext]: any = createContext({
  name: "Context",
  hookName: "useContext",
  providerName: "<Provider />",
})
