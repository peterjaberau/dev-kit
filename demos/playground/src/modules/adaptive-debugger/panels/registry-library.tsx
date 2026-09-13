"use client"

import { Button, Flex, Stack, Text } from "@chakra-ui/react"
import { useViews } from "#adaptive-view/sandbox/desktop/selectors"

export function DebuggerRegistryLibraryView() {
  const { viewsList } = useViews()

  return (
    <Stack width="full" gap="2" padding="2">
      {viewsList.map(({ id, name }) => (
        <Flex key={id} align="center" justify="space-between" gap="3">
          <Text truncate>{name}</Text>
          <Button size="xs" variant="outline" onClick={() => console.log({ id, name })}>
            Inspect
          </Button>
        </Flex>
      ))}
    </Stack>
  )
}
