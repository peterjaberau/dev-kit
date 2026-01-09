import { createContext } from "@chakra-ui/react"

export const [NodePropsProvider, useNodePropsContext]: any = createContext({
  name: "NodePropsContext",
  hookName: "useNodePropsContext",
  providerName: "<ItemProvider />",
})
