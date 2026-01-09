import { createContext } from "@chakra-ui/react"

export const TreeViewContext = (props: any) => props.children(useTreeViewContext())

export const [NodeStateProvider, useNodeContext] = createContext({
  name: "NodeContext",
  hookName: "useNodeContext",
  providerName: "<NodeProvider />",
})

export const [TreeViewProvider, useTreeViewContext] = createContext({
  name: "Context",
  hookName: "useTreeViewContext",
  providerName: "<TreeViewProvider />",
})

export const [NodePropsProvider, useNodePropsContext] = createContext({
  name: "NodePropsContext",
  hookName: "useNodePropsContext",
  providerName: "<ItemProvider />",
})
