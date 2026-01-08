import { createContext } from "@chakra-ui/react"

export const Context = (props: any) => props.children(useTreeViewContext())

export const [TreeViewNodeStateProvider, useTreeViewNodeContext] = createContext({
  name: "TreeViewNodeContext",
  hookName: "useTreeViewNodeContext",
  providerName: "<TreeViewNodeProvider />",
})

export const [TreeViewProvider, useTreeViewContext] = createContext({
  name: "TreeViewContext",
  hookName: "useTreeViewContext",
  providerName: "<TreeViewProvider />",
})

export const [TreeViewNodePropsProvider, useTreeViewNodePropsContext] = createContext({
  name: "TreeViewNodePropsContext",
  hookName: "useTreeViewNodePropsContext",
  providerName: "<TreeViewItemProvider />",
})
