import { chakra, Container } from "@chakra-ui/react"
import React from "react"
import { Tree } from "./dnd-ui"
import { Root } from "#adaptive-menu/namespaces/primitive"

import { useDndTree } from "./dnd"
import { useMenuRoot } from "#adaptive-menu/use-menu-root"

import { data as getInitialData } from "./data"
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"

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
            <Tree />
          </chakra.div>
        </chakra.div>
      </Root>
    </Container>
  )
}

export default Index
