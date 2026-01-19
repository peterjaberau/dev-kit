"use client"

import NextLink from "next/link"
import { useParams } from "next/navigation"
import { registryNames } from "#adaptive-registry"
import DevPanel from '#components/ui-common/dev-panel'
import { Button, Stack, Container, SimpleGrid, GridItem } from "@chakra-ui/react"
import { NavRegistry } from './components/nav-registry'
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
    <SimpleGrid w={"full"} columns={10} p={6} h={"100vh"} overflow={"hidden"} gap={6} data-page="adaptive-stories-layout">
      <GridItem colSpan={2} bg="bg.panel">
            <NavRegistry selectedValue={paramValue} />
      </GridItem>
      <GridItem colSpan={8}>{children}</GridItem>
    </SimpleGrid>
  )
}