"use client"

import { useEffect, useRef, useState } from "react"
import { Button, Center, HStack, chakra, Container, SimpleGrid, GridItem } from "@chakra-ui/react"
import { PanelTabsStory, PanelBasicStory } from "#components/panel/story"

export default function Page() {
  const [isClient, setIsClient] = useState(false)

  // IMPORTANT: neutral host element

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <Container w={'800px'}>
      <SimpleGrid columns={1} gap={10} h={"400px"} w={"full"} bg={"bg.emphasized"}>
        <PanelBasicStory />
        {/*<GridItem>*/}
        {/*  <PanelTabsStory />*/}
        {/*</GridItem>*/}
      </SimpleGrid>
    </Container>
  )
}