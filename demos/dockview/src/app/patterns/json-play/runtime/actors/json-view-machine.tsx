"use client"
import { assign, enqueueActions, fromCallback, fromPromise, setup } from "xstate"
import { useJson } from "./json-machine"
import { useSelector } from "@xstate/react"

export const jsonViewMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    indentPreferenceSetter: assign(({ context, event }: any, params: any) => {
      console.log(params, event)
      context.current.preferences.indent = params
    }),

    loadPreferences: assign(({ context, event }: any, params: any) => {
      const preferencesDefaults = context.config.preferences.indent
      const savedPreferences = localStorage.getItem("preferences")
      const parsedPreferences = JSON.parse(savedPreferences || "{}")
      for (const [key, value] of Object.entries(preferencesDefaults)) {
        if (!parsedPreferences[key]) parsedPreferences[key] = value
      }
      constext.stable.preferences = parsedPreferences
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      refs: {},
      store: {
        localStorage: {
          indent: 2,
        },
      },


      config: {
        preferences: {
          indent: 2,
        },
      },

      current: {
        view: input?.config?.view,
        preferences: input?.config?.preferences,
      },

      stable: {
        preferences: {
          ident: 2,
        },
      },
      unstable: {
        preferences: {
        },
      },
    }
  },
  states: {
    idle: {
      on: {
        "preferences.indent.change": {
          actions: [{ type: "indentPreferenceSetter", params: ({ event }) => event.params }],
        },
      },
    },
    localStorageSync: {
      initial: "idle",
    },
  },
})

export const useJsonView = () => {
  const { jsonContext } = useJson()
  const viewRef = jsonContext?.refs?.view

  const sendToView = viewRef?.send
  const sendIndentSetter = (e: any) => sendToView({ type: "preferences.indent.change", params: e })

  const viewState: any = useSelector(viewRef, (state) => state)
  const viewContext = viewState?.context

  const viewId = viewRef?.id

  const config = viewContext?.cpmfog
  const current = viewContext?.current

  return {
    viewRef,
    viewId,
    sendToView,
    sendIndentSetter,

    viewState,
    viewContext,
    config,
    current,
  }
}
