"use client"
import NextLink from "next/link"

import { registryNames } from "#adaptive-registry"
import { createTreeCollection } from "@chakra-ui/react"
import { SimpleGrid, GridItem, TreeView } from "@chakra-ui/react"
import { LuChevronRight, LuFile } from "react-icons/lu"
import { CardWithScrollArea } from "#adaptive/components/ui/card-with-scroll-area"
import { useParams } from "next/navigation"

interface RegistryNode {
  id: string
  name: string
  href?: string
  displayName?: string
  children?: RegistryNode[]
}

const buildRegistryTree = (names: string[]) => {
  const groups: Record<string, RegistryNode> = {}

  names.forEach((fullName) => {
    const parts = fullName.split("-")
    const groupKey: any = parts.length >= 2 ? `${parts[0]}-${parts[1]}` : parts[0]

    if (!groups[groupKey]) {
      groups[groupKey] = {
        id: groupKey,
        name: groupKey,
        children: [],
      }
    }

    const suffix = fullName.startsWith(groupKey + "-")
      ? fullName.slice(groupKey.length + 1)
      : fullName


    groups[groupKey].children!.push({
      id: fullName,
      name: fullName,
      displayName: suffix,
      href: `./${fullName}`,
    })
  })

  return {
    id: "ROOT",
    name: "",
    children: Object.values(groups),
  }
}

const collection = createTreeCollection<RegistryNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: buildRegistryTree(registryNames),
})


export const NavRegistry = ({ selectedValue }: any) => {

  return (
    <CardWithScrollArea title={"Stories"}>
      <TreeView.Root collection={collection}>
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
                  <NextLink href={node.href!}>
                    <LuFile />
                    <TreeView.ItemText fontWeight={node.name === selectedValue ? "bold" : "normal"}>
                      {node.displayName ?? node.name}
                    </TreeView.ItemText>
                  </NextLink>
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.Root>
    </CardWithScrollArea>
  )
}