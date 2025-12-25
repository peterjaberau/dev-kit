import { createContext } from "../helpers/utils"

export const NodeContext = (props: any) => props.children(useNodeContext())

export const [NodeProvider, useNodeContext]: any = createContext({
  name: "NodeContext",
  hookName: "useNodeContext",
  providerName: "<NodeProvider />",
})
