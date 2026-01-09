import { createContext } from '@chakra-ui/react'

export const [JsonTreePropsProvider, useJsonTreePropsContext] = createContext({
  name: "JsonTreeTreePropsContext",
  hookName: "useJsonTreeTreePropsContext",
  providerName: "<JsonTreeTreePropsProvider />",
})
