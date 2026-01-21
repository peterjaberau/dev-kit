'use client'
import { assign, enqueueActions, fromCallback, fromPromise, setup } from "xstate"
import { useJson } from "./json-machine"
import { useSelector } from "@xstate/react"

export const utilsMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    saveLoadedData: assign(({ context, event }: any, params: any) => {
      context.data = params
    }),
    logError: assign(({ context, event }: any, params: any) => {
      console.log("agent error ---", { params, event})
    }),
  },
  actors: {
    dataLoader: fromPromise(async ({ input }) => {
      return input
    }),
  },
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      refs: {},
      config: {
        ...input?.config,
      },
      current: {},

      data: input?.data,
      engine: {},
    }
  },
  states: {
    idle: {
      on: {
        LOAD_DATA: {
          target: "dataLoading",
        },
      },
    },
    dataLoading: {
      invoke: {
        src: "dataLoader",
        input: ({ context, event }: any) => {
          return event.params
        },
        onDone: {
          target: "idle",
          actions: [
            {
              type: "saveLoadedData",
              params: ({ event }: any) => {
                return event.output
              },
            },
          ],
        },
        onError: {
          target: "error",
        },
      },
    },
    error: {
      entry: ["logError"],
    },
  },
})

export const useUtilsAgent = () => {
  const { jsonContext } = useJson()
  const agentRef = jsonContext?.refs?.agent

  const sendToAgent = agentRef?.send
  const sendLoadDataEvent = (e: any) => sendToAgent({ type: "LOAD_DATA", params: e  })

  const agentState: any = useSelector(agentRef, (state) => state)
  const agentContext = agentState?.context

  const agentId = agentRef?.id

  const config = agentContext?.cpmfog
  const current = agentContext?.current

  const data = agentContext?.data
  const engine = agentContext?.engine


  return {
    agentRef,
    agentId,
    sendToAgent,
    sendLoadDataEvent,

    agentState,
    agentContext,
    config,
    current,

    data,
    engine,
  }
}
