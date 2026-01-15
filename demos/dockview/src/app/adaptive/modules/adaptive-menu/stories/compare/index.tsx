"use client"

import { Center, Container, GridItem, Heading, SimpleGrid, Stack, Textarea } from "@chakra-ui/react"
// import RenderSimple from "../simple"
import RenderJira from "../jira"
import RenderOrigin from "../origin-html"
import RenderInlined from "../inlined-html"
import React, { useEffect, useState } from "react"

function Index() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true) // runs after hydration + CSS applied
  }, [])

  if (!ready) return null // or a loader

  return (
    <SimpleGrid columns={3} gap={10} h={"full"}>
      <GridItem colSpan={1} flex={1}>
        <Stack>
          <Heading size={"md"}>Jira - inDev</Heading>
          <RenderJira />
        </Stack>
      </GridItem>
      <GridItem colSpan={1} flex={1}>
        <Stack>
          <Heading size={"md"}>Origin Html - Classes</Heading>
          <RenderOrigin />
        </Stack>
      </GridItem>
      <GridItem colSpan={1} flex={1}>
        <Heading size={"md"}>Inlined Html - Styles</Heading>
        <RenderInlined />
      </GridItem>
    </SimpleGrid>
  )
}

export default Index