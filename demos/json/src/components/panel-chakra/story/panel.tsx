"use client"

import React, { useState } from "react"
import classNames from "classnames"
import { upperFirst } from "lodash"
import { chakra, CloseButton, Button, SimpleGrid, Tabs, Heading, Container, Center } from "@chakra-ui/react"

import { Panel } from ".."
import type { PANEL_POSITIONS } from "../useResizablePanel"
import { panels } from "./data"

const PanelBodyContent: React.FC<React.PropsWithChildren<{ position: (typeof PANEL_POSITIONS)[number] }>> = ({
  position,
  children,
}) => (
  <chakra.div
    css={{
      p: 2,
      backgroundColor: "bg.panel",
      border: "none",
      height: "100%",
      [`border${position}Width`]: "1px",
    }}
  >
    {children}
  </chakra.div>
)

export function PanelBasicStory() {
  const [position, setPosition] = useState<(typeof PANEL_POSITIONS)[number]>("left")
  const [value, setValue] = useState<string | null>(panels[0].id)
  const [floating, setFloating] = useState(true)


  const closePanel = () => setValue(null)

  return (
    <>
      <Container>
        <Center gap={4} py={4}>
          <Button onClick={() => setPosition("left")}>Show left panel</Button>
          <Button onClick={() => setPosition("right")}>Show right panel</Button>
          <Button onClick={() => setPosition("bottom")}>Show bottom panel</Button>
          <Button onClick={() => setFloating(!floating)}>{floating ? "Floating on" : "Floating Off"}</Button>
        </Center>
      </Container>

      <Panel
        isFloating={floating}
        position={position}
        defaultSize={100}
        storageKey={`size-cache-${position}`}
        // className="panel"
        ariaLabel="Next.js panel"
      >
        <PanelBodyContent position={position}>
          <b>{upperFirst(position)}</b> panel content
        </PanelBodyContent>
      </Panel>
    </>
  )
}
