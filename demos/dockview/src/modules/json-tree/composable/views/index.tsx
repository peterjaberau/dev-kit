'use client'
import { useResourceManager } from "../actors"
import { Container } from "@chakra-ui/react"
import React from "react"

export const ComposableDragDrop = (props: any) => {
  const {
    resourcesKeys, resources
  }: any = useResourceManager()

  return (
    // <Base.Root>
      <Container mt={4} css={{ bg: "bg.muted", borderRadius: "md", boxShadow: "sm", px: 2, py: 3 }}>
        {/*<Base.Node nodeRef={nodeRef} />*/}
      </Container>
    // </Base.Root>
  )
}
