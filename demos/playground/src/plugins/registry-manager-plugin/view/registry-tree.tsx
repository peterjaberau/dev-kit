"use client"
import NextLink from "next/link"

import { registryNames, registryPluginPrefixes } from "#registry"
import { createTreeCollection } from "@chakra-ui/react"
import { TreeView, useTreeView } from "@chakra-ui/react"
import { LuChevronRight, LuFile } from "react-icons/lu"
import { CardWithScrollArea } from "../components/card-with-scroll-area"

interface RegistryNode {
  id: string
  name: string
  path?: string
  displayName?: string
  children?: RegistryNode[]
}

const buildRegistryTree = (names: string[], prefixes: string[]) => {
  const groups: Record<string, RegistryNode> = {}

  names.forEach((fullName) => {
    const prefix = prefixes
      .filter((candidate) => fullName.startsWith(candidate))
      .sort((a, b) => b.length - a.length)[0]
    const groupKey = prefix ? prefix.replace(/-$/, "") : "other"

    if (!groups[groupKey]) {
      groups[groupKey] = {
        id: groupKey,
        name: groupKey,
        children: [],
      }
    }

    const suffix = prefix ? fullName.slice(prefix.length) : fullName

    groups[groupKey].children!.push({
      id: fullName,
      name: fullName,
      displayName: suffix,
      path: encodeURIComponent(fullName),
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
  rootNode: buildRegistryTree(registryNames, registryPluginPrefixes),
})

export default function Index({ baseUrl }: { baseUrl: string }) {
  const store = useTreeView({
    collection,
  })

  return (
    <CardWithScrollArea title={"Registry"}>
      <TreeView.RootProvider value={store}>
        <TreeView.Tree>
          <TreeView.Node
            render={({ node, nodeState }) =>
              node.children ? (
                <TreeView.BranchControl>
                  <TreeView.BranchText>{node.name}</TreeView.BranchText>
                  <TreeView.BranchIndicator>
                    <LuChevronRight />
                  </TreeView.BranchIndicator>
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item asChild>
                  <NextLink href={`${baseUrl}/${node.path!}`}>
                    <LuFile />
                    <TreeView.ItemText fontWeight={store.selectedValue === node.id ? "bold" : "normal"}>
                      {node.displayName ?? node.name}
                    </TreeView.ItemText>
                  </NextLink>
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.RootProvider>
    </CardWithScrollArea>
  )
}
