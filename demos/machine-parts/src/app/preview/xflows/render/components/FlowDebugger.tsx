import React from "react"
import JsonView from "react18-json-view"
import { Card, ScrollArea } from "@chakra-ui/react"

interface FlowDebuggerProps {
  state: any
  context: any
  currentStep: string
}

const FlowDebugger: React.FC<FlowDebuggerProps> = ({ state, context, currentStep }) => {
  return (
    <Card.Root
      variant={"subtle"}
      size={"sm"}
      css={{ flex: 1, minH: 0, h: "full", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <Card.Header css={{ py: 2, borderBottom: "1px solid", borderBottomColor: "border", flexShrink: 0 }}>
        <Card.Title>Flow Debugger</Card.Title>
      </Card.Header>
      <Card.Body css={{ flex: 1, minH: 0, overflow: "hidden", p: 0 }}>
        <ScrollArea.Root h="full" size="sm" variant="always">
          <ScrollArea.Viewport>
            <ScrollArea.Content p={3}>
              <JsonView
                src={{
                  state: state,
                  context: context,
                  currentStep: currentStep,
                }}
                collapsed={1}
                customizeNode={(params) => {
                  const node = params.node
                  if (typeof node === "function") return <span>function</span>
                }}
                theme={"github"}
                style={{ fontSize: "13px", fontWeight: "bold" }}
              />
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </Card.Body>
    </Card.Root>
  )
}

export default FlowDebugger
