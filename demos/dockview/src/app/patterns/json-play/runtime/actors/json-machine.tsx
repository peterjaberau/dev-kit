import { assign, enqueueActions, setup } from "xstate"
import { jsonAgentMachine } from "./json-agent-machine"
import { jsonViewMachine } from "./json-view-machine"
import { localStorageMachine } from "./machines"
import { createActorContext, useSelector } from "@xstate/react"
import React from "react"

export const jsonMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    spawnAgent: assign(({ context, spawn }) => {
      context.refs.agent = spawn("jsonAgentMachine", {
        id: "json-agent",
        systemId: "json-agent",
        input: {
          data: context?.data,
          config: {},
        },
      })
    }),
    spawnView: assign(({ context, spawn }) => {
      context.refs.view = spawn("jsonViewMachine", {
        id: "json-view",
        systemId: "json-view",
        input: {
          config: {
            view: context.config?.view,
            preferences: context.config?.preferences,
          },
        },
      })
    }),
    spawnLocalStorage: assign(({ context, spawn }) => {
      context.refs.localStorage = spawn("localStorageMachine", {
        id: "local-storage",
        systemId: "local-storage",
        input: {
          key: context?.plugins?.localStorage?.appKey,
        },
      })
    }),
  },
  actors: {
    jsonAgentMachine,
    jsonViewMachine,
    localStorageMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      refs: {
        agent: null,
        view: null,
        localStorage: null,
      },
      data: input?.data,
      plugins: {
        localStorage: { appKey: "__json_play__" },
      },
      config: {
        view: input?.view,

        preferences: {
          indent: 2,
        },
      },
      current: {
        view: null,
      },
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnAgent")
    enqueue("spawnView")
    enqueue("spawnLocalStorage")
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
