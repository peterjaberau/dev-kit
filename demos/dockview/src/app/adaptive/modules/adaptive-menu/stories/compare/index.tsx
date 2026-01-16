"use client"

import { Center, Container, GridItem, Heading, SimpleGrid, Stack, Textarea } from "@chakra-ui/react"
import RenderJira from "../jira"
import React, { useEffect, useState } from "react"

function Index() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true) // runs after hydration + CSS applied
  }, [])

  if (!ready) return null // or a loader

  return (
    <SimpleGrid
      data-story-dynamic="/adaptive/stories/adaptive-menu-compare"
      data-story-direct="/adaptive/modules/adaptive-menu/stories/compare"
      columns={3}
      gap={10}
      h={"full"}
      w={'full'}
      px={6}
    >
      <GridItem colSpan={1} flex={1}>
        <Stack>
          <Heading size={"md"}>Jira - inDev</Heading>
          <RenderJira />
        </Stack>
      </GridItem>
      <GridItem colSpan={1} flex={1}>
        <Stack>
          <Heading size={"md"}>Origin Html - Classes</Heading>
        </Stack>
      </GridItem>
      <GridItem colSpan={1} flex={1}>
        <Heading size={"md"}>Inlined Html - Styles</Heading>
      </GridItem>
    </SimpleGrid>
  )
}

export default Index