"use client"

import { Box, HStack, List, Stack, Text } from "@chakra-ui/react"
import { PlaygroundContext } from "../render/playground-provider"
import { InspectorButton as Button } from "./playground-inspector-controls"
import JsonView from "react18-json-view"

export function InspectorActivity() {
  const actor = PlaygroundContext.useActorRef()
  const events = PlaygroundContext.useSelector((state) => state.context.inspector.events)
  const onClearEvents = () => actor.send({ type: "inspector.clearEvents" })

  return (
    <Stack gap="3" p="4" aria-label="Inspector activity">
      <HStack justify="space-between">
        <Text fontSize="xs" color="fg.muted">
          Recent events
        </Text>
        <Button variant="subtle" size="compact" onClick={onClearEvents} disabled={events.length === 0}>
          Clear
        </Button>
      </HStack>
      {events.length === 0 ? (
        <Text fontSize="xs" color="fg.muted">
          No events yet. Interact with the View or controls.
        </Text>
      ) : (
        <List.Root listStyle="none" gap="2">
          {events.map((event) => (
            <List.Item
              key={event.id}
              display="flex"
              flexDirection="column"
              gap="0.5"
              pb="2"
              borderBottomWidth="1px"
              borderColor="border.muted"
            >
              <HStack gap="2" align="baseline">
                <Text as="span" fontFamily="mono" fontSize="xs" fontWeight="bold" color="colorPalette.fg">
                  {event.type}
                </Text>
                <Box as="span" fontFamily="mono" fontSize="xs" color="fg.muted">
                  {event.timestamp}
                </Box>
              </HStack>
              <JsonView
                src={JSON.parse(event.detail)}
                collapsed={1}
                style={{ fontSize: "12px", fontWeight: "bold" }}
                theme="github"
              />
            </List.Item>
          ))}
        </List.Root>
      )}
    </Stack>
  )
}
