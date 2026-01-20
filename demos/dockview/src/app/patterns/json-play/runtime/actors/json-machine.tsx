import { assign, enqueueActions, setup } from "xstate"
import { jsonAgentMachine } from "./json-agent-machine"
import { createActorContext, useSelector } from "@xstate/react"
import React from "react"
import { MenuContext } from "#adaptive-menu/menu-provider"

export const jsonMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    spawnAgent: assign(({ context, spawn }) => {
      context.refs.jsonAgent = spawn("jsonAgentMachine", {
        id: "json-agent",
        systemId: "json-agent",
        input: {
          data: context?.data,
          config: {},
        },
      })
    }),
  },
  actors: {
    jsonAgentMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      refs: {
        agent: null,
      },
      data: input?.data,
      config: {
        view: input?.view,
      },
      current: {
        view: null,
      },
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnAgent")
  }),
})

export const JsonContext = createActorContext(jsonMachine)

export const JsonProvider = (props: any) => {
  const { children, data, view, ...rest } = props
  return (
    <JsonContext.Provider
      options={{
        input: {
          data: data,
          view: view,
          ...rest,
        },
      }}
    >
      {children}
    </JsonContext.Provider>
  )
}

export const useJson = () => {
  const jsonRef = JsonContext.useActorRef()
  const sendToJson = jsonRef.send

  const jsonState: any = useSelector(jsonRef, (state) => state)
  const jsonContext = jsonState.context

  const jsonId = jsonRef?.id

  const data = jsonContext?.data
  const config = jsonContext?.config
  const current = jsonContext?.current

  return {
    jsonRef,
    sendToJson,
    jsonId,

    jsonState,
    jsonContext,

    data,
    config,
    current,
  }
}
