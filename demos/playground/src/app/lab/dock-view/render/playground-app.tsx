"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Box, Flex, HStack, Icon as ChakraIcon, Text } from "@chakra-ui/react"
import { View } from "#view/react"
import { usePointerDrag } from "./use-pointer-drag"
import { RegistryTree, RegistryViewer } from "#plugins/registry-manager-plugin/view"

import {
  initialConfig,
  PG_THEMES,
  collectPanels,
} from "./playground-data"

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
  const controllerRef = useRef<any | null>(null)
  const idRef = useRef(0)
  const seqRef = useRef(0)

  const [mounted, setMounted] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const browserRef = useRef<HTMLDivElement>(null)
  const [frameSize, setFrameSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const [snapshot, setSnapshot] = useState<any | null>(null)
  const [themeId, setThemeId] = useState(initialConfig.options.themeId)



  const refresh = useCallback(() => {
    const controller = controllerRef.current
    if (controller) setSnapshot(controller.getLayout())
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) refresh()
  }, [mounted, refresh])


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

  const startResize = useCallback(
    (event: any, direction: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw") => {
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
    },
    [startDrag],
  )

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
            style={{
              ...PG_THEMES.find((t) => t.id === initialConfig.options.themeId)?.style,
            }}
          >
            {mounted ? (
              <View
                ref={controllerRef as any}
                initialLayout={initialConfig.layout}
                resizable={initialConfig.global.resizable}
                minSize={initialConfig.global.minSize}
                resizeHandleHitSize={initialConfig.global.resizeHandleHitSize}
                showActionsButton={initialConfig.global.showActionsButton}
                showNewTabButton={initialConfig.global.showNewTabButton}
                onNewTab={() => {
                  idRef.current += 1
                  seqRef.current += 1
                  return {
                    id: `${initialConfig.options.makeTabPrefix.id}-${idRef.current}`,
                    data: { title: initialConfig.options.makeTabPrefix.title + ` ${seqRef.current}` },
                  }
                }}
                onChange={refresh}
                onActiveTabChange={(e: any) =>
                  console.log({
                    type: "activeTab",
                    detail: e,
                  })
                }
                onPanelSplit={(e: any) =>
                  console.log({
                    type: "panelSplit",
                    detail: e,
                  })
                }
                onTabsMove={(e: any) =>
                  console.log({
                    type: "tabsMove",
                    detail: e,
                  })
                }
                onTabsOpen={(e: any) =>
                  console.log({
                    type: "tabsOpen",
                    detail: e,
                  })
                }
                onTabsClose={(e: any) =>
                  console.log({
                    type: "tabsClose",
                    detail: e,
                  })
                }
                onPanelsOpen={(e: any) =>
                  console.log({
                    type: "panelsOpen",
                    detail: e,
                  })
                }
                onPanelsClose={(e: any) =>
                  console.log({
                    type: "panelsClose",
                    detail: e,
                  })
                }
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



