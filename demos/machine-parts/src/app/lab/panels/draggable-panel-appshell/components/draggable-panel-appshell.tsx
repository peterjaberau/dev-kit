"use client"
import { useState } from "react"
import { Flexbox } from "react-layout-kit"
import { Button, HStack, Flex, IconButton, Text } from "@chakra-ui/react"
import { LuFolder as IconFolder, LuFolderOpen as IconFolderOpen } from "react-icons/lu"

import { DraggablePanel } from "@dev-kit/components"

function DraggablePanelAppShell() {
  const [expandLeft, setExpandLeft] = useState(true)
  const [pinLeft, setPinLeft] = useState(true)

  const [expandRight, setExpandRight] = useState(true)
  const [pinRight, setPinRight] = useState(true)

  const [expandBottom, setExpandBottom] = useState(true)
  const [pinBottom, setPinBottom] = useState(true)

  return (
    <Flexbox direction={"vertical"} height={"100%"} style={{ position: "relative" }} width={"100%"}>
      {/* Header */}
      <Flex
        direction="row"
        css={{
          justifyContent: "space-between",
          width: "full",
          height: "50px",
          borderBottom: "1px solid",
          borderBottomColor: "border",
          p: 2,
        }}
      >
        {/* Header - Start */}
        <Flex
          direction="row"
          css={{
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button onClick={() => setExpandLeft(!expandLeft)} size="xs" variant={expandLeft ? "subtle" : "ghost"}>
            {expandLeft ? <IconFolderOpen /> : <IconFolder />} Left Panel
          </Button>
        </Flex>
        {/* Header - center */}
        <Flex
          direction={"row"}
          css={{
            flex: 1,
            justifyContent: "center",
            borderLeft: "1px dotted",
            borderLeftColor: "border",
            borderRight: "1px dotted",
            borderRightColor: "border",
            gap: 2,
          }}
        >
          <Button onClick={() => setExpandBottom(!expandBottom)} size="xs" variant={expandBottom ? "subtle" : "ghost"}>
            {expandBottom ? <IconFolderOpen /> : <IconFolder />} Bottom Panel
          </Button>
        </Flex>

        {/* Header - end */}
        <Flex
          direction={"row"}
          css={{
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button onClick={() => setExpandRight(!expandRight)} size="xs" variant={expandRight ? "subtle" : "ghost"}>
            {expandRight ? <IconFolderOpen /> : <IconFolder />} Right Panel
          </Button>
        </Flex>
      </Flex>

      {/* main */}

      <Flexbox
        direction="horizontal"
        width="100%"
        height="100%"
        style={{ maxWidth: "100vw", overflow: "hidden", position: "relative" }}
      >
        {/* Left Sidebar */}
        <Flex
          direction="column"
          css={{
            justifyContent: "space-between",
            width: "50px",
            height: "full",
            borderRight: "1px solid",
            borderRightColor: "border",
            p: 2,
          }}
        >
          {/* Left Sidebar - Start */}
          <Flex
            direction="column"
            css={{
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton onClick={() => setExpandLeft(!expandLeft)} size="xs" variant={expandLeft ? "subtle" : "ghost"}>
              {expandLeft ? <IconFolderOpen /> : <IconFolder />}
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
          </Flex>
          {/* Left Sidebar - center */}
          <Flex
            direction={"column"}
            css={{
              flex: 1,
              justifyContent: "center",
              borderTop: "1px dotted",
              borderTopColor: "border",
              borderBottom: "1px dotted",
              borderBottomColor: "border",
              gap: 2,
            }}
          >
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
          </Flex>

          {/* Left Sidebar - end */}
          <Flex
            direction={"column"}
            css={{
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
          </Flex>
        </Flex>

        {/* left draggable panel */}
        <DraggablePanel
          expand={expandLeft}
          mode={pinLeft ? "fixed" : "float"}
          css={
            !pinLeft && {
              left: "50px",
            }
          }
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
            <DraggablePanel.Body>
              DraggablePanel Left DraggablePanel Left DraggablePanel Left DraggablePanel Left DraggablePanel Left{" "}
            </DraggablePanel.Body>
            <DraggablePanel.Footer>Footer Left</DraggablePanel.Footer>
          </DraggablePanel.Container>
        </DraggablePanel>

        {/* content */}
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
              <DraggablePanel.Body>
                DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel
                Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom{" "}
                DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel
                Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom{" "}
              </DraggablePanel.Body>
              <DraggablePanel.Footer>Footer Bottom</DraggablePanel.Footer>
            </DraggablePanel.Container>
          </DraggablePanel>
        </Flexbox>

        {/* right draggable panel */}
        <DraggablePanel
          showHandleHighlight={true}
          expand={expandRight}
          mode={pinRight ? "fixed" : "float"}
          pin={pinRight}
          css={
            !pinRight && {
              right: "50px",
            }
          }
          placement="right"
          onExpandChange={setExpandRight}
        >
          <DraggablePanel.Container style={{ flex: 1 }}>
            <DraggablePanel.Header
              pin={pinRight}
              position="right"
              setExpand={setExpandRight}
              setPin={setPinRight}
              title="Header Right"
            />
            <DraggablePanel.Body>DraggablePanel Right</DraggablePanel.Body>
            <DraggablePanel.Footer>Footer Right</DraggablePanel.Footer>
          </DraggablePanel.Container>
        </DraggablePanel>

        {/* Right Sidebar */}
        <Flex
          direction="column"
          css={{
            justifyContent: "space-between",
            width: "50px",
            height: "full",
            borderLeft: "1px solid",
            borderLeftColor: "border",
            p: 2,
          }}
        >
          {/* Right Sidebar - Start */}
          <Flex
            direction="column"
            css={{
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton
              onClick={() => setExpandRight(!expandRight)}
              size="xs"
              variant={expandRight ? "subtle" : "ghost"}
            >
              {expandRight ? <IconFolderOpen /> : <IconFolder />}
            </IconButton>
          </Flex>
          {/* Left Sidebar - center */}
          <Flex
            direction={"column"}
            css={{
              flex: 1,
              justifyContent: "center",
              borderTop: "1px dotted",
              borderTopColor: "border",
              borderBottom: "1px dotted",
              borderBottomColor: "border",
              gap: 2,
            }}
          >
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
          </Flex>

          {/* Right Sidebar - end */}
          <Flex
            direction={"column"}
            css={{
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
          </Flex>
        </Flex>
      </Flexbox>

      {/* Status Bar */}
      <Flex
        direction="row"
        css={{
          justifyContent: "space-between",
          width: "full",
          height: "50px",
          borderTop: "1px solid",
          borderTopColor: "border",
          p: 2,
        }}
      >
        {/* Header - Start */}
        <Flex
          direction="row"
          css={{
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button onClick={() => setExpandLeft(!expandLeft)} size="xs" variant={expandLeft ? "subtle" : "ghost"}>
            {expandLeft ? <IconFolderOpen /> : <IconFolder />} Left Panel
          </Button>
        </Flex>
        {/* Header - center */}
        <Flex
          direction={"row"}
          css={{
            flex: 1,
            justifyContent: "center",
            borderLeft: "1px dotted",
            borderLeftColor: "border",
            borderRight: "1px dotted",
            borderRightColor: "border",
            gap: 2,
          }}
        >
          <Button onClick={() => setExpandBottom(!expandBottom)} size="xs" variant={expandBottom ? "subtle" : "ghost"}>
            {expandBottom ? <IconFolderOpen /> : <IconFolder />} Bottom Panel
          </Button>
        </Flex>

        {/* Header - end */}
        <Flex
          direction={"row"}
          css={{
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button onClick={() => setExpandRight(!expandRight)} size="xs" variant={expandRight ? "subtle" : "ghost"}>
            {expandRight ? <IconFolderOpen /> : <IconFolder />} Right Panel
          </Button>
        </Flex>
      </Flex>
    </Flexbox>
  )
}

export default DraggablePanelAppShell
