"use client"

import { useParams } from "next/navigation"
import { Center, Container, GridItem, SimpleGrid } from "@chakra-ui/react"
import {
  Playground,
  RequestView,
  ProcessView,
  ResponseView,
  // usePlayground,
  // useJsonManager,
  // useJsonViews,
  // useJsonOperations,
} from "./app"

export default function Page() {

  return (
    <Playground.Root>
      <SimpleGrid columns={10} px={6} gap={10} h={"full"}>
        <GridItem colSpan={3}>
          <RequestView />
        </GridItem>

        <GridItem colSpan={5}>
          <ProcessView />
        </GridItem>

        <GridItem colSpan={2}>
          <ResponseView />
        </GridItem>
      </SimpleGrid>
    </Playground.Root>
  )
}
