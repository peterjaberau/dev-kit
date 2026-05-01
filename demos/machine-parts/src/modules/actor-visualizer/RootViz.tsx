import { useSelector } from "@xstate/store-react"
import { appStore } from "./lib/store"
import { type ChangeEvent, useCallback, useEffect, useRef } from "react"
import { chakra, Button, HStack, Text } from "@chakra-ui/react"
import { MachineViz } from "./MachineViz"
import { actorVisualizerMachines } from "./data/machines"

export const RootViz = () => {
  const graph = useSelector(appStore, (s) => s.context.graph)
  const error = useSelector(appStore, (s) => s.context.error)
  const mode = useSelector(appStore, (s) => s.context.mode)
  const selectedMachineId = useSelector(appStore, (s) => s.context.selectedMachineId)
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

  const handleMachineSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    appStore.trigger.selectMachine({ machineId: event.target.value })
  }, [])

  const isEmpty = !graph
  const isSim = mode === "sim"

  const toolbar = (
    <HStack gap={2}>
      <chakra.select
        aria-label="Select machine"
        value={selectedMachineId}
        onChange={handleMachineSelect}
        css={{
          minW: "180px",
          h: "32px",
          borderWidth: "1px",
          borderColor: "border",
          borderRadius: "6px",
          bg: "bg",
          px: 2,
          fontSize: "sm",
        }}
      >
        {actorVisualizerMachines.map((machine) => (
          <option key={machine.id} value={machine.id}>
            {machine.label}
          </option>
        ))}
      </chakra.select>

      {!isEmpty && !error && (
        <Button size={"xs"} onClick={isSim ? handleStopSim : handleStartSim}>
          {isSim ? "Stop" : "Play"}
        </Button>
      )}
    </HStack>
  )

  const vizContent = isEmpty ? (
    <chakra.div
      css={{
        p: 8,
      }}
    >
      <HStack justify="space-between" align="center">
        <Text>{error ?? "empty"}</Text>
        {toolbar}
      </HStack>
    </chakra.div>
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
      <MachineViz graph={graph} toolbar={toolbar} />
    </chakra.div>
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
    </chakra.div>
  )
}
