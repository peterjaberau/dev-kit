"use client"

import { useEffect, useRef, useState } from "react"
import { Button, Center, HStack, chakra, Container, SimpleGrid, GridItem } from "@chakra-ui/react"
import { PanelTabsStory } from "../components/story/with-children"

export default function Page() {
  const [isClient, setIsClient] = useState(false)

  // IMPORTANT: neutral host element

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <Container w={"800px"} h={"600px"} backgroundColor={'red.200'}>
        <PanelTabsStory />
    </Container>
  )
}