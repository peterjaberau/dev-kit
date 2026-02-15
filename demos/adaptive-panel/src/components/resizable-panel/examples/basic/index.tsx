"use client"

import React, { useState } from "react"
import JsonView from "react18-json-view"
import { upperFirst } from "lodash"
import {
  DataList,
  chakra,
  Stack,
  Button,
  Container,
  Center,
  HStack,
} from "@chakra-ui/react"

import ResizablePanel from "../.."
import { panels } from "../data"

const floatingStyle: any = {
  false: {
    position: "absolute",
    flex: "0 0 auto",
  },
  true: {
    position: "fixed",
  },
}
const positionStyle: any = {
  bottom: {
    left: 0,
    right: 0,
    handle: {
      height: "0.35rem",
      top: "calc(-0.175rem)",
      left: 0,
      right: 0,
      cursor: "ns-resize",
    },
  },
  left: {
    top: 0,
    bottom: 0,
    left: 0,
    handle: {
      width: "0.35rem",
      right: "calc(-0.175rem)",
      top: 0,
      bottom: 0,
      cursor: "ew-resize",
    },
  },
  right: {
    top: 0,
    bottom: 0,
    right: 0,
    handle: {
      width: "0.35rem",
      left: "calc(-0.175rem)",
      top: 0,
      bottom: 0,
      cursor: "ew-resize",
    },
  },
}

const ExampleWrapper = ({ children }: any) => {
  return (
    <Container w={"1200px"} h={"600px"} bg={"bg.emphasized"}>
      <HStack w={'full'} h={'full'} justifyContent={'space-between'} alignItems={'top'}>{children}</HStack>
    </Container>
  )
}

const PanelBodyContent = ({ position, children }: any) => (
  <chakra.div
    css={{
      p: 2,
      backgroundColor: "bg.panel",
      height: "100%",
      [`border${position}Width`]: "1px",
      boxShadow: "sm",
    }}
  >
    {children}
  </chakra.div>
)

export function ResiablePanelBasicExample() {
  const [position, setPosition]: any = useState("left")
  const [value, setValue] = useState<string | null>(panels[0].id)
  const [floating, setFloating]: any = useState(true)

  const closePanel = () => setValue(null)

  return (
    <ExampleWrapper>

      <Center gap={4} py={4} flex={1}>
        <Stack>
          <DataList.Root orientation="horizontal">
            <DataList.Item>
              <DataList.ItemLabel>Docking position</DataList.ItemLabel>
              <DataList.ItemValue>
                <HStack>
                  <Button
                    size="xs"
                    onClick={() => setPosition("left")}
                    variant={position === "left" ? "outline" : "solid"}
                  >
                    L
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => setPosition("right")}
                    variant={position === "right" ? "outline" : "solid"}
                  >
                    R
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => setPosition("bottom")}
                    variant={position === "bottom" ? "outline" : "solid"}
                  >
                    B
                  </Button>
                </HStack>
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Floating</DataList.ItemLabel>
              <DataList.ItemValue>
                <Button size="xs" onClick={() => setFloating(!floating)}>
                  {floating ? "On" : "Off"}
                </Button>
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
          <JsonView
            src={{
              style: {
                ...floatingStyle[floating],
                ...positionStyle[position],
              },
            }}
            theme={"github"}
            style={{
              fontSize: "12px",
            }}
          />
        </Stack>
      </Center>

      <ResizablePanel
        isFloating={floating}
        position={position}
        defaultSize={200}
        storageKey={`size-cache-${position}`}
        // className="panel"
        ariaLabel="Next.js panel"
      >
        <PanelBodyContent position={position}>
          <b>{upperFirst(position)}</b> panel content
        </PanelBodyContent>
      </ResizablePanel>
    </ExampleWrapper>
  )
}
