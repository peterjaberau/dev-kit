"use client"

import { RegistryTree } from "#plugins/registry-manager-plugin/view"
import { SimpleGrid, GridItem } from "@chakra-ui/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SimpleGrid
      w={"full"}
      columns={10}
      p={6}
      h={"100vh"}
      overflow={"hidden"}
      gap={6}
    >
      <GridItem colSpan={2} bg="bg.panel">
        <RegistryTree baseUrl={"/lab/registry"} />
      </GridItem>
      <GridItem colSpan={8}>{children}</GridItem>
    </SimpleGrid>
  )
}
