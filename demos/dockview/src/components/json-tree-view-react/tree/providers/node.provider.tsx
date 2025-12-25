import { createContext, createSplitProps } from "../helpers/utils"
import { useContext } from "./provider"

export const NodeContext = (props: any) => props.children(useNodeContext())

export const [NodeProvider, useNodeContext]: any = createContext({
  name: "NodeContext",
  hookName: "useNodeContext",
  providerName: "<NodeProvider />",
})


