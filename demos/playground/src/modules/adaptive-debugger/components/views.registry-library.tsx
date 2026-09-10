"use client"

import { Button, Flex, Stack, Text } from "@chakra-ui/react"
import { useInstanceManager } from "../../adaptive-view/sandbox/instance-manager/selectors"

export function DebuggerRegistryLibraryView() {
  const { instancesList } = useInstanceManager()

  return (
    <Stack width="full" gap="2" padding="2">
      {instancesList.map(({ id, name }) => (
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
