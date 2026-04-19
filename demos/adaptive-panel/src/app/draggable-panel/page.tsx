"use client"
import { useState } from "react"
import { Flexbox } from "react-layout-kit"
import { Button, HStack, IconButton, Text } from "@chakra-ui/react"

import { DraggablePanel } from "./components"

export default function Page() {
  const [expandLeft, setExpandLeft] = useState(true)
  const [pinLeft, setPinLeft] = useState(true)
  const [showBorderLeft, setShowBorderLeft] = useState(true)

  const [expandRight, setExpandRight] = useState(true)
  const [pinRight, setPinRight] = useState(true)

  const [expandBottom, setExpandBottom] = useState(true)
  const [pinBottom, setPinBottom] = useState(true)

  return (
    <Flexbox direction={"vertical"} height={"100%"} style={{ position: "relative" }} width={"100%"}>
      <Flexbox
        direction={"horizontal"}
        height={"50px"}
        width={"full"}
        style={{ overflow: "hidden", position: "relative", borderBottom: "1px solid", borderBottomColor: "#d9d9d9" }}
      >
        <HStack w={"full"} justifyContent={"center"}>
          <HStack border={"1px solid"} borderColor={"border"} p={1}>
            <Text textStyle={"sm"} fontWeight={"bold"}>
              Left
            </Text>
            <Button onClick={() => setExpandLeft(!expandLeft)} size={"2xs"} variant={expandLeft ? "solid" : "outline"}>
              Expand {expandLeft ? "(ON)" : "(OFF)"}
            </Button>
            <Button onClick={() => setPinLeft(!pinLeft)} size={"2xs"} variant={pinLeft ? "solid" : "outline"}>
              Pin {pinLeft ? "(ON)" : "(OFF)"}
            </Button>
            <Button
              onClick={() => setShowBorderLeft(!showBorderLeft)}
              size={"2xs"}
              variant={showBorderLeft ? "solid" : "outline"}
            >
              Border {showBorderLeft ? "(ON)" : "(OFF)"}
            </Button>
          </HStack>
          <HStack border={"1px solid"} borderColor={"border"} p={1}>
            <Text textStyle={"sm"} fontWeight={"bold"}>
              Bottom
            </Text>
            <Button
              onClick={() => setExpandBottom(!expandBottom)}
              size={"2xs"}
              variant={expandBottom ? "solid" : "outline"}
            >
              Expand {expandBottom ? "(ON)" : "(OFF)"}
            </Button>
            <Button onClick={() => setPinBottom(!pinBottom)} size={"2xs"} variant={pinBottom ? "solid" : "outline"}>
              Pin {pinBottom ? "(ON)" : "(OFF)"}
            </Button>
          </HStack>
          <HStack border={"1px solid"} borderColor={"border"} p={1}>
            <Text textStyle={"sm"} fontWeight={"bold"}>
              Right
            </Text>
            <Button
              onClick={() => setExpandRight(!expandRight)}
              size={"2xs"}
              variant={expandRight ? "solid" : "outline"}
            >
              Expand {expandRight ? "(ON)" : "(OFF)"}
            </Button>
            <Button onClick={() => setPinRight(!pinRight)} size={"2xs"} variant={pinRight ? "solid" : "outline"}>
              Pin {pinRight ? "(ON)" : "(OFF)"}
            </Button>
          </HStack>
        </HStack>
      </Flexbox>
      <Flexbox
        direction="horizontal"
        width="100%"
        height="100%"
        style={{ maxWidth: "100vw", overflow: "hidden", position: "relative" }}
      >
        <DraggablePanel
          expand={expandLeft}
          mode={pinLeft ? "fixed" : "float"}
          showHandleWhenCollapsed={true}
          showHandleHighlight={true}
          pin={pinLeft}
          placement="left"
          onExpandChange={setExpandLeft}
        >
          <DraggablePanel.Container style={{ flex: 1 }}>
            <DraggablePanel.Header
              pin={pinLeft}
              position="left"
              setExpand={setExpandLeft}
              setPin={setPinLeft}
              title="Header Left"
            />
            <DraggablePanel.Body>DraggablePanel Left</DraggablePanel.Body>
            <DraggablePanel.Footer>Footer Left</DraggablePanel.Footer>
          </DraggablePanel.Container>
        </DraggablePanel>

        <Flexbox
          flex={1}
          direction={"vertical"}
          width={"100%"}
          height={"100%"}
          style={{ overflow: "hidden", position: "relative" }}
        >
          <Flexbox
            flex={1}
            direction={"vertical"}
            style={{
              overflow: "hidden auto",
              position: "relative",
              backgroundColor: "white",
              padding: 1,
            }}
          >
            content
          </Flexbox>
          <DraggablePanel
            showHandleWhenCollapsed={true}
            showHandleHighlight={true}
            expand={expandBottom}
            mode={pinBottom ? "fixed" : "float"}
            pin={pinBottom}
            placement="bottom"
            onExpandChange={setExpandBottom}
          >
            <DraggablePanel.Container style={{ flex: 1 }}>
              <DraggablePanel.Header
                pin={pinBottom}
                position="right"
                setExpand={setExpandBottom}
                setPin={setPinBottom}
                title="Header Bottom"
              />
              <DraggablePanel.Body>DraggablePanel Bottom</DraggablePanel.Body>
              <DraggablePanel.Footer>Footer Bottom</DraggablePanel.Footer>
            </DraggablePanel.Container>
          </DraggablePanel>
        </Flexbox>

        <DraggablePanel
          showHandleWhenCollapsed={true}
          showHandleHighlight={true}
          expand={expandRight}
          mode={pinRight ? "fixed" : "float"}
          pin={pinRight}
          placement="right"
          onExpandChange={setExpandRight}
        >
          <DraggablePanel.Container style={{ flex: 1 }}>
            <DraggablePanel.Header
              pin={pinRight}
              position="left"
              setExpand={setExpandRight}
              setPin={setPinRight}
              title="Header Right"
            />
            <DraggablePanel.Body>DraggablePanel Right</DraggablePanel.Body>
            <DraggablePanel.Footer>Footer Right</DraggablePanel.Footer>
          </DraggablePanel.Container>
        </DraggablePanel>
      </Flexbox>
    </Flexbox>
  )
}
