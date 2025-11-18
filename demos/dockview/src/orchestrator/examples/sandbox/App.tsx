import { FlowSandbox } from "./components/FlowSandbox"
import { chakra, Flex, Card, HStack, Stack, Badge } from "@chakra-ui/react"

function App() {
  return (
    <Card.Root css={{ minHeight: "full", backgroundColor: "bg.subtle" }}>
      {/* Header */}
      <Card.Header
        css={{ bgColor: "bg.panel", boxShadow: "sm", borderBottom: "1px solid", borderBottomColor: "border.muted" }}
      >
        <HStack w={"full"}>
          <HStack flex={1}>
            <Stack>
              <Card.Title>XFlows Sandbox</Card.Title>
              <Card.Description>Live Development Environment</Card.Description>
            </Stack>
          </HStack>
          <HStack>
            <Badge size={"md"} variant={"surface"}>
              Live
            </Badge>
            <Badge size={"md"} variant={"surface"}>
              Hot Reload
            </Badge>
          </HStack>
        </HStack>
      </Card.Header>

      <Card.Body>
        <FlowSandbox />
      </Card.Body>
    </Card.Root>
  )
}

export default App
