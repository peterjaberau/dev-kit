import { EmptyState, VStack, Button, ButtonGroup } from "@chakra-ui/react"

export function EmptyStateView({ title = "untitled" }) {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
        </VStack>
        <ButtonGroup>
          <Button>Inspect</Button>
        </ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}
