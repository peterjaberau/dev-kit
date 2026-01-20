"use client"

import { App } from  './app'

import { chakra, Container } from "@chakra-ui/react"
import { Root } from "#adaptive-menu/root"
import { data as getInitialData } from "#adaptive-menu/stories/json-tree-dnd/components/data"
import { Tree } from "#adaptive-menu/stories/json-tree-dnd/components/dnd-ui"
import React from "react"

const Index = () => {
  return (
    <Container margin={0} padding={0} border="1px solid black" backgroundColor={"bg.panel"}>
      <Root data={getInitialData}>
        <chakra.div
          css={{
            flex: 1,
            overflow: "auto",
          }}
        >
          <chakra.div
            css={{
              margin: 0,
              padding: 0,
              color: "#172B4D",
              textDecorationSkipInk: "auto",
              paddingBlockStart: "9pt",
              paddingInlineEnd: "9pt",
              paddingBlockEnd: "9pt",
              paddingInlineStart: "9pt",
            }}
          >
            <App />

          </chakra.div>
        </chakra.div>
      </Root>
    </Container>
  )
}

export default Index
