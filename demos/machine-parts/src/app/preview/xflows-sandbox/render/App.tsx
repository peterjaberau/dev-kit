import React from "react"
import { Container, Card, HStack, Stack, Badge, Button, Status } from "@chakra-ui/react"
import { FlowSandbox } from "./components/FlowSandbox"

export function App() {
  return (
      <Container css={{ mx: "auto", w: "full", maxW: "full", h: "100dvh", py: 4, overflow: "hidden" }}>
        <Card.Root css={{ h: "full", minH: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Card.Header css={{ py: 2, borderBottom: "1px solid", borderBottomColor: "border", flexShrink: 0 }}>
            <HStack>
              <Stack css={{ flex: 1, alignItems: "flex-start" }}>
                <Card.Title>🚀 XFlows Sandbox</Card.Title>
                <Card.Description data-testid="root-description">Live Development Environment</Card.Description>
              </Stack>
              <HStack>
                <Status.Root colorPalette="green">
                  <Status.Indicator />
                  Live
                </Status.Root>

                <Status.Root colorPalette="blue">
                  <Status.Indicator />
                  Hot Reload
                </Status.Root>
              </HStack>
            </HStack>
          </Card.Header>
          <Card.Body css={{ display: "flex", flex: 1, h: "full", minH: 0, overflow: "hidden", p: 0 }}>
            <FlowSandbox />
          </Card.Body>
        </Card.Root>
      </Container>
  )
}
