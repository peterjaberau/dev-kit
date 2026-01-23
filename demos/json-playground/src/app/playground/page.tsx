"use client"

import { useParams } from "next/navigation"
import { Center, Container, GridItem, SimpleGrid } from "@chakra-ui/react"
import {
  Playground,
  RequestView,
  ProcessView,
  ResponseView,
  usePlayground,
  useJsonManager,
  useJsonViews,
  useJsonOperations,
} from "./app"

export default function Page() {
  const params = useParams()
  const paramValue = params.name as string
  return (
    <Playground.Root>
      <SimpleGrid columns={10} px={6} gap={10} h={"full"}>
        <GridItem colSpan={2}>
          <ResponseView />
        </GridItem>

        <GridItem colSpan={5}>
          <ProcessView />
        </GridItem>

        <GridItem colSpan={3}>
          <ResponseView />
        </GridItem>
      </SimpleGrid>
    </Playground.Root>
  )
}
