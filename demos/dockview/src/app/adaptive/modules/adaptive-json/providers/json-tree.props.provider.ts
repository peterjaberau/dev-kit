import { createContext } from "@chakra-ui/react"

export const [JsonTreePropsProvider, useJsonTreePropsContext] = createContext({
  name: "JsonTreePropsContext",
  hookName: "useJsonTreePropsContext",
  providerName: "<JsonTreePropsProvider />",
})
