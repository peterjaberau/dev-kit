import { useSelector } from "@xstate/store-react"
import { appStore } from "./lib/store"
import { useCallback, useEffect, useRef } from "react"
import { chakra, Container, Button, Card, Center, Heading, Icon, Stack, Text, HStack, Flex } from "@chakra-ui/react"
import { MachineViz } from "./MachineViz"

export const RootViz = () => {
  const graph = useSelector(appStore, (s) => s.context.graph)
  const error = useSelector(appStore, (s) => s.context.error)
  const mode = useSelector(appStore, (s) => s.context.mode)
  const vizPanelRef = useRef(null)
  const vizScrollRef = useRef<HTMLDivElement>(null)

  // Scroll to first active leaf node when a sim event comes in
  useEffect(() => {
    const scrollToActive = () => {
      const container = vizScrollRef.current
      if (!container) return
      const el = container.querySelector("[data-sim-active]")
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    }
    const subs = [
      appStore.on("simSend", scrollToActive),
      appStore.on("startSim", scrollToActive),
      appStore.on("restartSim", scrollToActive),
    ]
    return () => subs.forEach((sub) => sub.unsubscribe())
  }, [])

  const handleStartSim = useCallback(() => {
    appStore.trigger.startSim()
  }, [])

  const handleStopSim = useCallback(() => {
    appStore.trigger.stopSim()
  }, [])

  const isEmpty = !graph
  const isSim = mode === "sim"

  const vizContent = isEmpty ? (
    <div>empty</div>
  ) : (
    <chakra.div
      ref={vizScrollRef}
      css={{
        minH: 0,
        flex: 1,
        overflow: "auto",
        p: 8,
      }}
    >
      <MachineViz graph={graph} />
    </chakra.div>
  )

  const footerBar = (
    <HStack css={{ justifyContent: "space-between", borderTop: "solid 1px", borderTopColor: "border" }}>
      <Flex css={{ alignItems: "center", gap: 2 }}>
        {!isEmpty &&
          (isSim ? (
            <Button size={"sm"} onClick={handleStopSim}>
              Stop
            </Button>
          ) : (
            <Button size={"sm"} onClick={handleStartSim}>
              Play
            </Button>
          ))}
      </Flex>
    </HStack>
  )

  return (
    <chakra.div
      css={{
        display: "flex",
        h: "full",
        flexDirection: "column",
      }}
    >
      {vizContent}
      {footerBar}
    </chakra.div>
  )
}
