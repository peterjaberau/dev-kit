"use client"

import { BaseTree, useBaseTreeContext } from ".."
import type React from "react"
import { createSlotRecipeContext } from "@chakra-ui/react"
import { treeSlotRecipe } from "./style"

const {
  withProvider,
  withContext,
  useStyles: useTreeStyles,
  PropsProvider: TreeStylesPropsProvider,
} = createSlotRecipeContext({ recipe: treeSlotRecipe })

export { useTreeStyles }

export const RootProvider = withProvider(BaseTree.RootProvider, "root", {
  forwardAsChild: true,
})

export const Root = withProvider(BaseTree.Root, "root", {
  forwardAsChild: true,
})

export const PropsProvider = TreeStylesPropsProvider

export const Branch = withContext(BaseTree.Branch, "branch", {
  forwardAsChild: true,
})

export const BranchContent = withContext(BaseTree.BranchContent, "branchContent", {
  forwardAsChild: true,
})

export const BranchControl = withContext(BaseTree.BranchControl, "branchControl", {
  forwardAsChild: true,
})

export const BranchTrigger = withContext(BaseTree.BranchTrigger, "branchTrigger", {
  forwardAsChild: true,
})

export const BranchIndicator = withContext(BaseTree.BranchIndicator, "branchIndicator", {
  forwardAsChild: true,
})

export const BranchText = withContext(BaseTree.BranchText, "branchText", { forwardAsChild: true })

export const BranchIndentGuide = withContext(BaseTree.BranchIndentGuide, "branchIndentGuide", {
  forwardAsChild: true,
})

export const Item = withContext(BaseTree.Item, "item", {
  forwardAsChild: true,
})

export const ItemIndicator = withContext(BaseTree.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
})

export const ItemText = withContext(BaseTree.ItemText, "itemText", {
  forwardAsChild: true,
})

export const Label = withContext(BaseTree.Label, "label", {
  forwardAsChild: true,
})

export const Tree = withContext(BaseTree.Tree, "tree", {
  forwardAsChild: true,
})

export const NodeCheckbox = withContext(BaseTree.NodeCheckbox, "nodeCheckbox", { forwardAsChild: true })

export function Node(props: any) {
  const { render, indentGuide, branchProps, branchContentProps } = props
  const tree: any = useBaseTreeContext()

  const renderNode = (node: any, indexPath: number[]) => (
    <BaseTree.NodeProvider key={indexPath.join(".")} node={node} indexPath={indexPath}>
      <BaseTree.NodeContext>
        {(nodeState: any) => {
          if (nodeState.isBranch) {
            return (
              <Branch {...branchProps}>
                {render({ node, indexPath, nodeState })}
                <BranchContent {...branchContentProps}>
                  {indentGuide}
                  {tree.collection
                    .getNodeChildren(node)
                    .map((child: any, index: any) => renderNode(child as any, [...indexPath, index]))}
                </BranchContent>
              </Branch>
            )
          } else {
            return render({ node, indexPath, nodeState })
          }
        }}
      </BaseTree.NodeContext>
    </BaseTree.NodeProvider>
  )

  return (
    <>
      {tree.collection
        .getNodeChildren(tree.collection.rootNode)
        .map((node: any, index: any) => renderNode(node as any, [index]))}
    </>
  )
}
