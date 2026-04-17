'use client';
import { useState } from "react"
import { Flexbox } from "react-layout-kit"
import { Button, HStack, IconButton, Text } from "@chakra-ui/react"

import {
  DraggablePanelBody,
  DraggablePanelContainer,
  DraggablePanelFooter,
  DraggablePanelHeader,
} from "../../DraggablePanel"
import { DraggablePanel } from "../../DraggablePanel/DraggablePanel"


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
          <DraggablePanelContainer style={{ flex: 1 }}>
            <DraggablePanelHeader
              pin={pinLeft}
              position="left"
              setExpand={setExpandLeft}
              setPin={setPinLeft}
              title="Header Left"
            />
            <DraggablePanelBody>
              DraggablePanel Left
            </DraggablePanelBody>
            <DraggablePanelFooter>Footer Left</DraggablePanelFooter>
          </DraggablePanelContainer>
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
            <DraggablePanelContainer style={{ flex: 1 }}>
              <DraggablePanelHeader
                pin={pinBottom}
                position="bottom"
                setExpand={setExpandBottom}
                setPin={setPinBottom}
                title="Header Bottom"
              />
              <DraggablePanelBody>DraggablePanel Bottom</DraggablePanelBody>
              <DraggablePanelFooter>Footer Bottom</DraggablePanelFooter>
            </DraggablePanelContainer>
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
          <DraggablePanelContainer style={{ flex: 1 }}>
            <DraggablePanelHeader
              pin={pinRight}
              position="left"
              setExpand={setExpandRight}
              setPin={setPinRight}
              title="Header Right"
            />
            <DraggablePanelBody>DraggablePanel Right</DraggablePanelBody>
            <DraggablePanelFooter>Footer Right</DraggablePanelFooter>
          </DraggablePanelContainer>
        </DraggablePanel>
      </Flexbox>
    </Flexbox>
  )
}
