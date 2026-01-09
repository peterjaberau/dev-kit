"use client"

import { BaseTree, useTreeContext as useBaseTreeContext } from "../base"
import type React from "react"
import { createSlotRecipeContext } from "@chakra-ui/react"
import { treeSlotRecipe } from "./style"

const {
  withProvider,
  withContext,
  useStyles: useTreeStyles,
  PropsProvider: TreePropsProvider,
} = createSlotRecipeContext({ recipe: treeSlotRecipe })

export { useTreeStyles }

export const RootProvider: any = withProvider(BaseTree.RootProvider, "root", {
  forwardAsChild: true,
})

export const Root: any = withProvider(BaseTree.Root, "root", {
  forwardAsChild: true,
})

export const PropsProvider: any = TreePropsProvider

export const Branch: any = withContext(BaseTree.Branch, "branch", {
  forwardAsChild: true,
})

export const BranchContent: any = withContext(BaseTree.BranchContent, "branchContent", {
  forwardAsChild: true,
})

export const BranchControl: any = withContext(BaseTree.BranchControl, "branchControl", {
  forwardAsChild: true,
})

export const BranchTrigger: any = withContext(BaseTree.BranchTrigger, "branchTrigger", {
  forwardAsChild: true,
})

export const BranchIndicator: any = withContext(BaseTree.BranchIndicator, "branchIndicator", {
  forwardAsChild: true,
})

export const BranchText: any = withContext(BaseTree.BranchText, "branchText", { forwardAsChild: true })

export const BranchIndentGuide: any = withContext(BaseTree.BranchIndentGuide, "branchIndentGuide", {
  forwardAsChild: true,
})

export const Item: any = withContext(BaseTree.Item, "item", {
  forwardAsChild: true,
})

export const ItemIndicator: any = withContext(BaseTree.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
})

export const ItemText: any = withContext(BaseTree.ItemText, "itemText", {
  forwardAsChild: true,
})

export const Label: any = withContext(BaseTree.Label, "label", {
  forwardAsChild: true,
})

export const Tree: any = withContext(BaseTree.Tree, "tree", {
  forwardAsChild: true,
})

export const NodeCheckbox: any = withContext(BaseTree.NodeCheckbox, "nodeCheckbox", { forwardAsChild: true })


export const Node: any = (props: any) => {
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
