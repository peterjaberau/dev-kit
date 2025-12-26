'use client'
import { Base } from '#json-tree/components'
import { useNode } from "#json-tree-view-react/json-tree/selectors"
import { Container } from "@chakra-ui/react"
import React from "react"

export const Tree = (props: any) => {
  const {
    nodeRef,
  }: any = useNode()

  return (
    <Base.Root>
      <Container mt={4} css={{ bg: "bg.muted", borderRadius: "md", boxShadow: "sm", px: 2, py: 3 }}>
        <Base.Node nodeRef={nodeRef} />
      </Container>
    </Base.Root>
  )
}
