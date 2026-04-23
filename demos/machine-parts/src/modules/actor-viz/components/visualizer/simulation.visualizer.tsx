import { useSelector } from "@xstate/store/react"
import { appStore, computeSimSnapshot } from "../../lib/store"
import { useEffect, useMemo, useRef } from "react"
import {
  chakra,
  Button,
  Card,
  Center,
  Container,
  EmptyState,
  Heading,
  Icon,
  Stack,
  Text,
  HStack,
  Flex,
  VStack,
  Code,
} from "@chakra-ui/react"

function formatEventType(type: string): string {
  // "xstate.after.2000.trafficLight.yellow" → "after 2000ms"
  const afterMatch = type.match(/^xstate\.after\.(\d+)/)
  if (afterMatch) return `after ${afterMatch[1]}ms`

  // "xstate.done.state.foo" → "done (foo)"
  const doneMatch = type.match(/^xstate\.done\.state\.(.+)/)
  if (doneMatch) return `done (${doneMatch[1]})`

  // Strip "xstate." prefix for other internal events
  if (type.startsWith("xstate.")) return type.slice(7)

  return type
}

export function SimulationPanel() {
  const isSimulating = useSelector(appStore, (s) => s.context.mode === "sim")
  const simEvents = useSelector(appStore, (s) => s.context.simEvents)
  const simMachine = useSelector(appStore, (s) => s.context.simMachine)
  const bottomRef = useRef<HTMLDivElement>(null)

  const eventStates = useMemo(() => {
    if (!simMachine || simEvents.length === 0) return []
    return simEvents.map((_, index) => {
      const eventsUpToHere = simEvents.slice(0, index + 1)
      const snapshot = computeSimSnapshot(simMachine, eventsUpToHere)
      return JSON.stringify(snapshot.value)
    })
  }, [simMachine, simEvents])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [simEvents.length])

  if (!isSimulating) {
    return (
      <Card.Root>
        <Card.Header
          pb="6"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth="1px"
        >
          <Stack gap="1">
            <Heading as="h2" textStyle="xl">
              Event History (Simulator)
            </Heading>
          </Stack>
          <Button size="sm" onClick={() => appStore.trigger.startSim()}>
            Start
          </Button>
        </Card.Header>
        <Card.Body>
          {simEvents.length === 0 && (
            <EmptyState.Root
              css={{
                display: "flex",
                minH: "full",
                flexDirection: "column",
              }}
            >
              <EmptyState.Content>
                <VStack textAlign="center">
                  <EmptyState.Title>No simulation events yet</EmptyState.Title>
                  <EmptyState.Description>
                    Start simulation and trigger transitions to inspect the event stream.
                  </EmptyState.Description>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          )}

          {simEvents.length > 0 && (
            <Flex css={{ flexDirection: "column", gap: 2, p: 3 }} >
              {simEvents.map((simEvent, index) => (

                  <Card.Root key={`${simEvent.timestamp}-${index}`} size="sm">
                    <Card.Body>
                      <Flex css={{ alignItems: "center", justifyContent: "space-between", gap: 3 }}>
                        <Text
                          textStyle="sm"
                          css={{
                            fontWeight: "medium",
                          }}
                        >
                          {formatEventType(simEvent.event.type)}
                        </Text>
                        <Text textStyle="xs" color="fg.muted">
                          {new Date(simEvent.timestamp).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </Text>
                      </Flex>
                      <Code size={'sm'}>{eventStates[index] ?? "null"}</Code>
                    </Card.Body>
                  </Card.Root>


              ))}
              <chakra.div ref={bottomRef} />
            </Flex>
          )}
        </Card.Body>
      </Card.Root>
    )
  }

}
