"use client"
import { chakra } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import React from "react"
import { useJson, useJsonAgent, useJsonView } from "#json-play/runtime/actors"

export function JsonInspect() {
  const { jsonState, jsonContext, jsonRef } = useJson()
  const { agentState, agentContext, agentRef } = useJsonAgent()
  const { viewState, viewContext, viewRef } = useJsonView()

  return (
    <chakra.div px={4}>
      <JsonView
        src={{

          agentData: agentContext.data,
          agentCurrent: agentContext.current,
          agentState: agentState?.value,
          agentContext: agentContext,
          agentActor: agentRef,

          viewCurrent: viewContext?.current,
          viewConfig: viewContext?.config,
          viewState: viewState?.value,
          viewContext: viewContext,
          viewActor: viewRef,

          jsonState: jsonState?.value,
          jsonContext: jsonContext,
          jsonActor: jsonRef,
        }}
        collapsed={1}
        theme="github"
        displaySize
        displayArrayIndex
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
    </chakra.div>
  )
}
