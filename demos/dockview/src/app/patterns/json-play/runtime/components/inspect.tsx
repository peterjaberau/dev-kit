"use client"
import { chakra } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import React from "react"
import { useJson, useJsonAgent, useJsonView, useLocalstorage } from "#json-play/runtime/actors"

export function JsonInspect() {
  const { jsonState, jsonContext, jsonRef } = useJson()
  const { agentState, agentContext, agentRef } = useJsonAgent()
  const { viewState, viewContext, viewRef } = useJsonView()

  const { localStorageState, localStorageContext, localStorageRef } = useLocalstorage()


  return (
    <chakra.div px={4}>
      <JsonView
        src={{
          data: agentContext?.data,
          view: viewContext.current,
          config: {
            ...jsonContext.config,
          },
          app: {
            instances: Object.keys(jsonContext.refs),
          },
          plugins: jsonContext?.plugins,
        }}
        collapsed={2}
        theme="github"
        displaySize
        displayArrayIndex
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
      <JsonView
        src={{
          data: agentContext?.data,
          agentData: agentContext?.data,
          agentCurrent: agentContext?.current,
          agentState: agentState?.value,
          agentContext: agentContext,
          agentActor: agentRef,

          viewCurrent: viewContext?.current,
          viewConfig: viewContext?.config,
          viewState: viewState?.value,
          viewContext: viewContext,
          viewActor: viewRef,

          localStorageState: localStorageState?.value,
          localStorageContext: localStorageContext,
          localStorageActor: localStorageRef,

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
