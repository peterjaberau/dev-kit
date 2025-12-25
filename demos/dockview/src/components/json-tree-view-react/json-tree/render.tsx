'use client'
import {
  JsonTreeRoot,
  JsonTreeNode,
} from './components'
import { useAppRoot, useNode } from "#json-tree-view-react/json-tree/selectors"
import { Container } from "@chakra-ui/react"
import React from "react"

export const Render = (props: any) => {
  const {
    nodeRef,
  }: any = useNode()

  return (
    <JsonTreeRoot>
      <Container mt={4} css={{ bg: "bg.muted", borderRadius: "md", boxShadow: "sm", px: 2, py: 3 }}>
        <JsonTreeNode nodeRef={nodeRef} />
      </Container>
    </JsonTreeRoot>
  )
}
