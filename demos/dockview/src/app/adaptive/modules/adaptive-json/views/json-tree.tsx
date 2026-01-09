'use client'
import { forwardRef } from 'react'
import { createSplitProps } from '#adaptive-shared'
import { AdaptiveTree, useAdaptiveTreeContext } from "#adaptive-tree"
import { JsonTreeNode } from './json-tree.node'


const splitNodeProps = createSplitProps<any>()

export const JsonTree = forwardRef<HTMLDivElement, any>((props, ref) => {
  const [nodeProps, treeProps] = splitNodeProps(props, ["arrow", "indentGuide", "renderValue"] as any)
  const tree: any = useAdaptiveTreeContext()
  const children = tree.collection.getNodeChildren(tree.collection.rootNode)
  return (
    <AdaptiveTree.Tree data-scope="json-tree-view" {...treeProps} ref={ref}>
      {children.map((child: any, index: any) => (
        <JsonTreeNode key={index} node={child} indexPath={[index]} {...nodeProps} />
      ))}
    </AdaptiveTree.Tree>
  )
})

