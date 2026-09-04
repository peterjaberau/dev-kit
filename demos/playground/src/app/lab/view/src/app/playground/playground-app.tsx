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
import { usePointerDrag } from "../../hooks/use-pointer-drag"
import { useEventLog } from "../../hooks/use-event-log"
import {
  RiCodeSLine,
  RiFileTextLine,
  RiFolder3Line,
  RiLayoutLine,
  RiPulseLine,
  RiTerminalBoxLine,
} from "react-icons/ri"
import {
  PG_DEFAULT_LAYOUT,
  PG_KIND_LABEL,
  PG_TAB_KINDS,
  PG_THEMES,
  collectPanels,
} from "./playground-data"
import { PlaygroundInspector } from "./playground-inspector"

export function PlaygroundApp() {
  const controllerRef = useRef<any | null>(null)
  const idRef = useRef(0)
  const seqRef = useRef(0)

  const [mounted, setMounted] = useState(false)
  const [browserUrl, setBrowserUrl] = useState("")
  const stageRef = useRef<HTMLDivElement>(null)
  const browserRef = useRef<HTMLDivElement>(null)
  const [frameSize, setFrameSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const [snapshot, setSnapshot] = useState<any | null>(null)
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(null)
  const [selectedTabId, setSelectedTabId] = useState<string | null>(null)
  const [global, setGlobal] = useState<any>({
    resizable: true,
    showActionsButton: true,
    showNewTabButton: false,
    resizeHandleHitSize: 24,
    minSize: 10,
  })
  const [themeId, setThemeId] = useState("light")
  const [events, log, clearEvents] = useEventLog<{
    type: string
    detail: string
  }>(30)

  const uid = useCallback((prefix: string) => {
    idRef.current += 1
    return `${prefix}-${idRef.current}`
  }, [])

  const makeTab = useCallback((): any => {
    seqRef.current += 1
    const kind: any = PG_TAB_KINDS[seqRef.current % PG_TAB_KINDS.length]
    return {
      id: uid("tab"),
      data: { title: `${PG_KIND_LABEL[kind]} ${seqRef.current}`, kind },
    }
  }, [uid])

  const refresh = useCallback(() => {
    const controller = controllerRef.current
    if (controller) setSnapshot(controller.getLayout())
  }, [])

  useEffect(() => {
    setMounted(true)
    setBrowserUrl(window.location.host + window.location.pathname)
  }, [])
  useEffect(() => {
    if (mounted) refresh()
  }, [mounted, refresh])

  const panels: any[] = useMemo(() => (snapshot ? collectPanels(snapshot) : []), [snapshot])

  useEffect(() => {
    setSelectedPanelId((current) => {
      if (panels.length === 0) return null
      return current && panels.some((p) => p.id === current) ? current : panels[0].id
    })
  }, [panels])
  useEffect(() => {
    const panel = panels.find((p) => p.id === selectedPanelId)
    setSelectedTabId((current) => {
      if (!panel) return null
      return current && panel.tabs.some((t: any) => t.id === current) ? current : (panel.tabs[0]?.id ?? null)
    })
  }, [panels, selectedPanelId])

  const onActiveTabChange = useCallback(
    (event: any) => {
      const change = event.changes.find((c: any) => c.tabId) ?? event.changes[0]
      if (change?.tabId) {
        setSelectedPanelId(change.panelId)
        setSelectedTabId(change.tabId)
      }
      log({
        type: "activeTab",
        detail: event.changes.map((c: any) => `${c.panelId}: ${c.previousTabId ?? "∅"} → ${c.tabId ?? "∅"}`).join(", "),
      })
      refresh()
    },
    [log, refresh],
  )

  const handleNewTab = useCallback<any>(() => makeTab(), [makeTab])

  const themeStyle = useMemo<any>(() => PG_THEMES.find((t) => t.id === themeId)?.style ?? {}, [themeId])

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
      <PlaygroundInspector
        controllerRef={controllerRef}
        panels={panels}
        selectedPanelId={selectedPanelId}
        selectedTabId={selectedTabId}
        onSelectPanel={setSelectedPanelId}
        onSelectTab={setSelectedTabId}
        uid={uid}
        makeTab={makeTab}
        global={global}
        onGlobalChange={(patch) => setGlobal((g: any) => ({ ...g, ...patch }))}
        themeId={themeId}
        onThemeChange={setThemeId}
        events={events}
        onClearEvents={clearEvents}
        onResetFrame={() => setFrameSize(null)}
      />
      <Flex ref={stageRef} minW="0" minH="0" flex="1" align="center" justify="center" overflow="hidden">
        <Flex
          ref={browserRef}
          position="relative"
          direction="column"
          h={{ base: "full", lg: "min(660px, 100%)" }}
          maxH="full"
          minH="18rem"
          w={{ base: "full", lg: "min(980px, 100%)" }}
          minW="24rem"
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
            style={themeStyle}
          >
            {mounted ? (
              <View
                ref={controllerRef as any}
                initialLayout={PG_DEFAULT_LAYOUT}
                resizable={global.resizable}
                minSize={global.minSize}
                resizeHandleHitSize={global.resizeHandleHitSize}
                showActionsButton={global.showActionsButton}
                showNewTabButton={global.showNewTabButton}
                onNewTab={handleNewTab}
                onChange={refresh}
                onActiveTabChange={onActiveTabChange}
                onPanelSplit={(e: any) =>
                  log({
                    type: "panelSplit",
                    detail: `${e.splitPanelId} ${e.direction} → ${e.createdPanelId}`,
                  })
                }
                onTabsMove={(e: any) =>
                  log({
                    type: "tabsMove",
                    detail: e.tabs.map((t: any) => `${t.id} → ${t.panelId}`).join(", "),
                  })
                }
                onTabsOpen={(e: any) =>
                  log({
                    type: "tabsOpen",
                    detail: e.tabs.map((t: any) => t.id).join(", "),
                  })
                }
                onTabsClose={(e: any) =>
                  log({
                    type: "tabsClose",
                    detail: e.tabs.map((t: any) => t.id).join(", "),
                  })
                }
                onPanelsOpen={(e: any) =>
                  log({
                    type: "panelsOpen",
                    detail: e.panels.map((p: any) => p.id).join(", "),
                  })
                }
                onPanelsClose={(e: any) =>
                  log({
                    type: "panelsClose",
                    detail: e.panels.map((p: any) => p.id).join(", "),
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

const KIND_ICON: any = {
  editor: RiCodeSLine,
  terminal: RiTerminalBoxLine,
  files: RiFolder3Line,
  preview: RiLayoutLine,
  notes: RiFileTextLine,
  output: RiPulseLine,
}

function renderTabHeader(tab: any) {
  const KindIcon = KIND_ICON[tab.data.kind]
  return (
    <HStack as="span" display="inline-flex" gap="2">
      <ChakraIcon fontSize="sm" opacity="0.78" aria-hidden="true">
        <KindIcon />
      </ChakraIcon>
      <Text as="span">{tab.data.title}</Text>
    </HStack>
  )
}

function renderTabContent(tab: any) {
  return <div style={contentStyle}>{tabSample(tab.data)}</div>
}

const contentStyle: any = {
  height: "100%",
  padding: 16,
  overflow: "auto",
  color: "var(--view-tab-fg, #9aa1ab)",
  fontSize: 14,
  lineHeight: 1.5,
}

const mono: any = {
  margin: 0,
  padding: 0,
  border: 0,
  borderRadius: 0,
  background: "none",
  color: "inherit",
  fontFamily: "var(--site-mono)",
  fontSize: 12.5,
  lineHeight: 1.6,
  whiteSpace: "pre-wrap",
}

function tabSample({ kind, title }: any) {
  switch (kind) {
    case "editor":
      return (
        <pre style={mono}>
          {/\.css$/i.test(title)
            ? `.workspace {
  display: grid;
  height: 100%;
  background: #0e0f12;
}

.panel {
  border-radius: 6px;
  border: 1px solid #2a2d33;
}

.panel[data-active='true'] {
  color: #f3f4f7;
}`
            : `import { View } from '@viewjs/react';

export function App() {
  return <View initialLayout={layout} />;
}`}
        </pre>
      )
    case "terminal":
      return <pre style={mono}>{"$ pnpm dev\nready in 312ms\n› local http://localhost:3000"}</pre>
    case "output":
      return <pre style={mono}>{"[info] build started\n[info] compiled 42 modules\n[done] no errors"}</pre>
    case "files":
      return <pre style={mono}>{"src/\n  app/\n  components/\n  index.ts\npackage.json"}</pre>
    case "preview":
      return (
        <div style={{ display: "grid", gap: 8 }}>
          <div
            style={{
              width: 90,
              height: 10,
              borderRadius: 999,
              background: "var(--view-accent, #3884ff)",
            }}
          />
          <div
            style={{
              width: "100%",
              height: 8,
              borderRadius: 999,
              background: "currentColor",
              opacity: 0.25,
            }}
          />
          <div
            style={{
              width: "70%",
              height: 8,
              borderRadius: 999,
              background: "currentColor",
              opacity: 0.25,
            }}
          />
        </div>
      )
    case "notes":
    default:
      return (
        <p style={{ margin: 0 }}>
          {title} — a draggable, splittable surface. Use the inspector to lock, float, pop out, or rearrange this panel.
        </p>
      )
  }
}
