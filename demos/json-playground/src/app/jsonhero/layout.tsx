"use client"

import NextLink from "next/link"
import { useParams } from "next/navigation"
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
    <SimpleGrid data-page="playground-layout" w={"full"} columns={1} p={6} h={"100vh"} overflow={"hidden"} gap={6}>
      {children}
    </SimpleGrid>
  )
}
