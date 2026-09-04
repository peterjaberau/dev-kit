"use client"

import NextLink from "next/link"
import { useParams } from "next/navigation"
import { RegistryViewer, RegistryTree } from "#plugins/registry-manager-plugin/view"
import { Button, Stack, Container, SimpleGrid, GridItem } from "@chakra-ui/react"
/**
 * Groups names by their common prefix (first two dash segments)
 * examples:
 * - patterns-tree-*
 * - adaptive-json-*
 */


export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const paramValue = params.name as string

  return (
    <SimpleGrid
      w={"full"}
      columns={10}
      p={6}
      h={"100vh"}
      overflow={"hidden"}
      gap={6}
      data-page="adaptive-stories-layout"
    >
      <GridItem colSpan={2} bg="bg.panel">
        <RegistryTree />
      </GridItem>
      <GridItem colSpan={8}>{children}</GridItem>
    </SimpleGrid>
  )
}