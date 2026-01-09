export { createFileTreeCollection, createTreeCollection } from "@chakra-ui/react"
export {
  Branch,
  BranchContent,
  BranchControl,
  BranchIndentGuide,
  BranchIndicator,
  BranchText,
  BranchTrigger,
} from "./branch"

export { TreeContext } from "../../providers"
export { Item, ItemIndicator, ItemText } from "./item"
export { NodeContext, NodeProvider } from "../../providers"
export { RootProvider } from "../../providers"
export { Tree } from "./tree"
export { NodeCheckbox, NodeCheckboxIndicator, NodeRenameInput } from "./node"

export { anatomy as treeAnatomy } from "#adaptive-core/machines/tree"

export { useTree } from "../../hooks"
export { useTreeContext, useNodeContext } from "../../providers"

export * as BaseTree from "./namespace"
