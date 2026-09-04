"use client"

import {
  useEffect,
  useRef,
  useState,
} from "react"
import { Box, Flex, HStack, Icon as ChakraIcon, Text } from "@chakra-ui/react"
import { View } from "#view/react"
import { usePointerDrag } from "./use-pointer-drag"
import { RegistryTree, RegistryViewer } from "#plugins/registry-manager-plugin/view"
import { usePlayground } from "./playground-provider"

function renderTabHeader(tab: any) {
  return <Text as="span">{tab.data.title}</Text>
}

function renderTabContent(tab: any) {
  const data = tab.data ?? {}
  const componentId = data.inputs?.componentId

  return componentId ? (
    <RegistryViewer componentId={componentId} title={data.title} />
  ) : (
    <RegistryTree withCardWrapper={false} actionType="select" />
  )
}


export function PlaygroundApp() {
  const { sendToPlayground, viewCallbacks, config, runtime } = usePlayground()
  const mounted = runtime.variables?.mounted ?? false
  const stageRef = useRef<HTMLDivElement>(null)
  const browserRef = useRef<HTMLDivElement>(null)
  const [frameSize, setFrameSize] = useState<{
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    sendToPlayground({ type: "onMount" })
  }, [sendToPlayground])


  const resizeContextRef = useRef<{
    direction: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"
    initialWidth: number
    initialHeight: number
  } | null>(null)

  const { startDrag } = usePointerDrag({
    onMove: (e) => {
      const stage = stageRef.current
      const ctx = resizeContextRef.current
      if (!stage || !ctx) return
      const rect = stage.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const horiz = ctx.direction.includes("e") || ctx.direction.includes("w")
      const vert = ctx.direction.includes("n") || ctx.direction.includes("s")
      const width = horiz ? Math.max(360, Math.min(rect.width, 2 * Math.abs(e.clientX - cx))) : ctx.initialWidth
      const height = vert ? Math.max(280, Math.min(rect.height, 2 * Math.abs(e.clientY - cy))) : ctx.initialHeight
      setFrameSize({ width: Math.round(width), height: Math.round(height) })
    },
  })

  const startResize = (event: any, direction: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw") => {
    event.preventDefault()
    const browser = browserRef.current
    if (!browser) return
    const initialRect = browser.getBoundingClientRect()
    resizeContextRef.current = {
      direction,
      initialWidth: initialRect.width,
      initialHeight: initialRect.height,
    }
    startDrag(event.currentTarget, event.pointerId)
  }

  return (
    <>
      <Flex ref={stageRef} minW="0" minH="0" flex="1" align="center" justify="center" overflow="hidden">
        <Flex
          ref={browserRef}
          position="relative"
          direction="column"
          h={{ base: "full", lg: "min(660px, 100%)" }}
          maxH="full"
          minH="18rem"
          w={{ base: "full", lg: "min(1240px, 100%)" }}
          minW="48rem"
          maxW="full"
          overflow="hidden"
          borderWidth="1px"
          borderColor="border"
          bg="var(--view-bg, #0e0f12)"
          backgroundClip="padding-box"
          shadow="2xl"
          style={frameSize ?? undefined}
        >
          <Box
            minH="0"
            minW="0"
            flex="1"
            bg="var(--view-bg, #0e0f12)"
            css={{
              "& .view": {
                height: "100%",
                fontSize: "var(--chakra-font-sizes-sm)",
              },
            }}
            style={runtime.theme}
          >
            {mounted ? (
              <View
                ref={viewCallbacks.setController as any}
                initialLayout={config.layout}
                resizable={config.global.resizable}
                minSize={config.global.minSize}
                resizeHandleHitSize={config.global.resizeHandleHitSize}
                showActionsButton={config.global.showActionsButton}
                showNewTabButton={config.global.showNewTabButton}
                onNewTab={viewCallbacks.createNewTab}
                onChange={viewCallbacks.handleChange}
                onActiveTabChange={viewCallbacks.handleActiveTabChange}
                onPanelSplit={viewCallbacks.handlePanelSplit}
                onTabsMove={viewCallbacks.handleTabsMove}
                onTabsOpen={viewCallbacks.handleTabsOpen}
                onTabsClose={viewCallbacks.handleTabsClose}
                onPanelsOpen={viewCallbacks.handlePanelsOpen}
                onPanelsClose={viewCallbacks.handlePanelsClose}
                renderTabHeader={renderTabHeader}
                renderTabContent={renderTabContent}
              />
            ) : null}
          </Box>
          <Box
            as="span"
            position="absolute"
            insetInline="0"
            top="0"
            zIndex="10"
            h="1.5"
            cursor="ns-resize"
            touchAction="none"
            onPointerDown={(e) => startResize(e, "n")}
            aria-hidden="true"
          />
          <Box
            as="span"
            position="absolute"
            insetInline="0"
            bottom="0"
            zIndex="10"
            h="1.5"
            cursor="ns-resize"
            touchAction="none"
            onPointerDown={(e) => startResize(e, "s")}
            aria-hidden="true"
          />
          <Box
            as="span"
            position="absolute"
            insetBlock="0"
            right="0"
            zIndex="10"
            w="1.5"
            cursor="ew-resize"
            touchAction="none"
            onPointerDown={(e) => startResize(e, "e")}
            aria-hidden="true"
          />
          <Box
            as="span"
            position="absolute"
            insetBlock="0"
            left="0"
            zIndex="10"
            w="1.5"
            cursor="ew-resize"
            touchAction="none"
            onPointerDown={(e) => startResize(e, "w")}
            aria-hidden="true"
          />
          <Box
            as="span"
            position="absolute"
            right="0"
            top="0"
            zIndex="10"
            boxSize="3.5"
            cursor="nesw-resize"
            touchAction="none"
            onPointerDown={(e) => startResize(e, "ne")}
            aria-hidden="true"
          />
          <Box
            as="span"
            position="absolute"
            left="0"
            top="0"
            zIndex="10"
            boxSize="3.5"
            cursor="nwse-resize"
            touchAction="none"
            onPointerDown={(e) => startResize(e, "nw")}
            aria-hidden="true"
          />
          <Box
            as="span"
            position="absolute"
            bottom="0"
            right="0"
            zIndex="10"
            boxSize="3.5"
            cursor="nwse-resize"
            touchAction="none"
            onPointerDown={(e) => startResize(e, "se")}
            aria-hidden="true"
          />
          <Box
            as="span"
            position="absolute"
            bottom="0"
            left="0"
            zIndex="10"
            boxSize="3.5"
            cursor="nesw-resize"
            touchAction="none"
            onPointerDown={(e) => startResize(e, "sw")}
            aria-hidden="true"
          />
        </Flex>
      </Flex>
    </>
  )
}
