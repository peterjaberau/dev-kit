"use client"

import NextLink from "next/link"
import { useParams } from "next/navigation"
import { registryNames } from "#adaptive-registry"
import DevPanel from '#components/ui-common/dev-panel'
import { Button, Stack, Container, SimpleGrid, GridItem } from "@chakra-ui/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const paramValue = params.name as string


  return (
    <SimpleGrid w={"full"} columns={10} p={4} h={"vh"} overflow={"hidden"} gap={4} data-page="adaptive-stories-layout">
      <GridItem colSpan={2} p={2} bg="bg.panel">
        <DevPanel title="Stories">
          <Stack gap="3" p={4} align="stretch" boxShadow="sm" borderRadius="md">
            {registryNames.map((name: any, index: any) => (
              <Button
                css={{
                  justifyContent: "flex-start",
                  boxShadow: "xs",
                }}
                variant={name === paramValue ? "subtle" : "ghost"}
                fontWeight={name === paramValue ? "bold" : "normal"}
                size={"sm"}
                key={index}
                asChild
              >
                <NextLink href={`./${name}`}>{name}</NextLink>
              </Button>
            ))}
          </Stack>
        </DevPanel>
      </GridItem>

      <GridItem colSpan={8}>{children}</GridItem>
    </SimpleGrid>
  )
}