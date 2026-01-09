import { createContext } from "@chakra-ui/react"

export const TreeContext = (props: any) => props.children(useTreeContext())
export const [TreeProvider, useTreeContext] = createContext({
  name: "TreeContext",
  hookName: "useTreeContext",
  providerName: "<TreeProvider />",
})
