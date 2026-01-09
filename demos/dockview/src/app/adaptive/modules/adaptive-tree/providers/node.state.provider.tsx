import { createContext } from "@chakra-ui/react"

export const [NodeStateProvider, useNodeContext] = createContext({
  name: "NodeContext",
  hookName: "useNodeContext",
  providerName: "<NodeProvider />",
})