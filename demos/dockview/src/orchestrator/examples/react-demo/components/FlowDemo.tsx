import { useState, useMemo } from "react"
import type React from "react"
import { useFlow } from "#xflows-plugin-react"
import demoFlow from "../flows/demo-flow.json"
import ViewRenderer from "./ViewRenderer"
import FlowDebugger from "./FlowDebugger"
import type { ViewConfig, FlowConfig } from "#xflows-core"
import { Container, HStack, Button, Box, Card, Fieldset, Field } from "@chakra-ui/react"

const FlowDemo: React.FC = () => {
  const [showDebugger, setShowDebugger] = useState(false)

  // Stabilize the flow config reference
  const stableFlowConfig = useMemo(() => demoFlow as FlowConfig, [])

  // Use the flow hook
  const { state, send, view, context } = useFlow(stableFlowConfig)

  const handleEvent = (event: string, data?: unknown) => {
    send(event, data)
  }

  const handleBack = () => {
    send("BACK")
  }

  const handleNext = (data?: unknown) => {
    if (data === "CALL_API") {
      send("CALL_API")
    } else {
      send("NEXT", data)
    }
  }

  return (
    <Container>
      <HStack w={"full"} justifyContent={"flex-end"}>
        <Button onClick={() => setShowDebugger(!showDebugger)}>{showDebugger ? "Hide" : "Show"} Debugger</Button>
      </HStack>

      {showDebugger && <FlowDebugger state={state} context={context} currentStep={state.value as string} />}

      <Box borderRadius='md' p={2} boxShadow={'md'}>
        <ViewRenderer
          view={view as ViewConfig}
          context={context}
          onNext={handleNext}
          onBack={handleBack}
          onEvent={handleEvent}
        />
      </Box>
    </Container>
  )
}

export default FlowDemo
