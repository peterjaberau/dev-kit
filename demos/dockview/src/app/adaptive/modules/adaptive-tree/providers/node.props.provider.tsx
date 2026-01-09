import { createContext } from "@chakra-ui/react"

export const [NodePropsProvider, useNodePropsContext] = createContext({
  name: "NodePropsContext",
  hookName: "useNodePropsContext",
  providerName: "<ItemProvider />",
})
