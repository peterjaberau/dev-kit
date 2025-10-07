"use client"
import { CardPanel } from "../CardPanel"
import Link from "next/link"
import { TreeView, createTreeCollection } from "@chakra-ui/react"
import { LuChevronRight, LuExternalLink, LuFile } from "react-icons/lu"
import { useState } from 'react'
interface Node {
  id: string
  name: string
  href?: string
  children?: Node[]
}
const expandedValues = ['node']
const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node",
        name: "Node",
        children: [
          {
            id: "node-simple",
            name: "Simple Example",
            href: "/play/node-simple",
          },
          {
            id: "node-style",
            name: "Node Style",
            href: "/play/node-style",
          },
        ],
      },
    ],
  },
})


export const NavigationPanel = () => {


  return (
    <CardPanel title="Examples">
      <TreeView.Root
        collection={collection}
        expandedValue={expandedValues}
      >
        <TreeView.Tree>
          <TreeView.Node
            render={({ node, nodeState }) =>
              nodeState.isBranch ? (
                <TreeView.BranchControl>
                  <TreeView.BranchText>{node.name}</TreeView.BranchText>
                  <TreeView.BranchIndicator>
                    <LuChevronRight />
                  </TreeView.BranchIndicator>
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item asChild>
                  <Link href={node.href}>
                    <TreeView.ItemText>{node.name}</TreeView.ItemText>
                  </Link>
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.Root>
    </CardPanel>
  )
}
