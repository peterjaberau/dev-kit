"use client"

import NextLink from "next/link"
import { useParams } from "next/navigation"
import { registryNames } from "#adaptive-registry"
import { Button, Stack, Container, SimpleGrid, GridItem } from "@chakra-ui/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const paramValue = params.name as string


  return (
    <Container p={10}>
      <SimpleGrid columns={4}>
        <GridItem>
          <Stack gap="3" p={4} align="stretch">
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
        </GridItem>

        <GridItem colSpan={3}>{children}</GridItem>
      </SimpleGrid>
    </Container>
  )
}