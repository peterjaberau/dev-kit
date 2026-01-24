"use client"

import { useParams } from "next/navigation"
import { Center, Container, GridItem, SimpleGrid } from "@chakra-ui/react"
// import {
  // App,

  // usePlayground,
  // useJsonManager,
  // useJsonViews,
  // useJsonOperations,
// } from "./app"
import { RequestView, ProcessView, ResponseView } from "./views"
import { AppProvider } from './machines/provider.app'
import { App } from './machines/app'

export default function Page() {

  return (
    <App>
      <SimpleGrid columns={10} px={6} gap={10} h={"full"}>
        <GridItem colSpan={3}>
          <RequestView />
        </GridItem>

        <GridItem colSpan={4}>
          <ProcessView />
        </GridItem>

        <GridItem colSpan={3}>
          <ResponseView />
        </GridItem>
      </SimpleGrid>
    </App>
  )
}
