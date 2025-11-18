"use client"
import React from "react"
import { Card } from "@chakra-ui/react"
import JsonView from "react18-json-view"

interface FlowDebuggerProps {
  state: any
  context: any
  currentStep: string
}

const FlowDebugger: React.FC<FlowDebuggerProps> = ({ state, context, currentStep }) => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Flow Debugger</Card.Title>
      </Card.Header>
      <Card.Body>
        <JsonView
          src={{
            "Current State": state,
            Context: context,
            "Current Step": currentStep,
          }}
          collapsed={1}
          theme="github"
          displaySize
          displayArrayIndex
          style={{ fontSize: 13, fontWeight: "bold" }}
        />
      </Card.Body>
    </Card.Root>
  )
}

export default FlowDebugger
