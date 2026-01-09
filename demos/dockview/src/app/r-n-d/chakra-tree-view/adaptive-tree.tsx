"use client"

import { TreeView, useTreeViewContext } from "../ark-tree-view"
import type React from "react"
import { createSlotRecipeContext } from "@chakra-ui/react"
import { adaptiveTreeSlotRecipe } from "./recipe"

const {
  withProvider,
  withContext,
  useStyles: useAdaptiveTreeStyles,
  PropsProvider,
} = createSlotRecipeContext({ recipe: adaptiveTreeSlotRecipe })

export { useAdaptiveTreeStyles }

export const AdaptiveTreeRootProvider = withProvider(TreeView.RootProvider, "root", {
  forwardAsChild: true,
})

export const AdaptiveTreeRoot = withProvider(TreeView.Root, "root", {
  forwardAsChild: true,
})

export const AdaptiveTreePropsProvider = PropsProvider

export const AdaptiveTreeBranch = withContext(TreeView.Branch, "branch", {
  forwardAsChild: true,
})

export const AdaptiveTreeBranchContent = withContext(TreeView.BranchContent, "branchContent", {
  forwardAsChild: true,
})

export const AdaptiveTreeBranchControl = withContext(TreeView.BranchControl, "branchControl", {
  forwardAsChild: true,
})

export const AdaptiveTreeBranchTrigger = withContext(TreeView.BranchTrigger, "branchTrigger", {
  forwardAsChild: true,
})

export const AdaptiveTreeBranchIndicator = withContext(TreeView.BranchIndicator, "branchIndicator", {
  forwardAsChild: true,
})

export const AdaptiveTreeBranchText = withContext(TreeView.BranchText, "branchText", { forwardAsChild: true })

export const AdaptiveTreeBranchIndentGuide = withContext(TreeView.BranchIndentGuide, "branchIndentGuide", {
  forwardAsChild: true,
})

export const AdaptiveTreeItem = withContext(TreeView.Item, "item", {
  forwardAsChild: true,
})

export const AdaptiveTreeItemIndicator = withContext(TreeView.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
})

export const AdaptiveTreeItemText = withContext(TreeView.ItemText, "itemText", {
  forwardAsChild: true,
})

export const AdaptiveTreeLabel = withContext(TreeView.Label, "label", {
  forwardAsChild: true,
})

export const AdaptiveTreeTree = withContext(TreeView.Tree, "tree", {
  forwardAsChild: true,
})

export const AdaptiveTreeNodeCheckbox = withContext(TreeView.NodeCheckbox, "nodeCheckbox", { forwardAsChild: true })

export function AdaptiveTreeNode(props: any) {
  const { render, indentGuide, branchProps, branchContentProps } = props
  const tree: any = useTreeViewContext()

  const renderNode = (node: any, indexPath: number[]) => (
    <TreeView.NodeProvider key={indexPath.join(".")} node={node} indexPath={indexPath}>
      <TreeView.NodeContext>
        {(nodeState: any) => {
          if (nodeState.isBranch) {
            return (
              <AdaptiveTreeBranch {...branchProps}>
                {render({ node, indexPath, nodeState })}
                <AdaptiveTreeBranchContent {...branchContentProps}>
                  {indentGuide}
                  {tree.collection
                    .getNodeChildren(node)
                    .map((child: any, index: any) => renderNode(child as any, [...indexPath, index]))}
                </AdaptiveTreeBranchContent>
              </AdaptiveTreeBranch>
            )
          } else {
            return render({ node, indexPath, nodeState })
          }
        }}
      </TreeView.NodeContext>
    </TreeView.NodeProvider>
  )

  return (
    <>
      {tree.collection
        .getNodeChildren(tree.collection.rootNode)
        .map((node: any, index: any) => renderNode(node as any, [index]))}
    </>
  )
}
