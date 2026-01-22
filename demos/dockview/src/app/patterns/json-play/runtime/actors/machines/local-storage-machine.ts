import { setup, assign } from "xstate"
import { useJson } from "../json-machine"
import { useSelector } from "@xstate/react"
export const mapFromEvent =
  () =>
  ({ event }) =>
    event
export const mapFromInput =
  (selector) =>
  ({ context }) =>
    selector(context)
export const mapFromContext =
  (selector) =>
  ({ context }) =>
    selector(context)

export const localStorageMachine = setup({
  actions: {
    load: assign(({ context }, params: { appKey: string }) => {
      const raw = localStorage.getItem(params.appKey)
      if (raw !== null) {
        context.store = JSON.parse(raw)
      } else {
        context.store = {}
        localStorage.setItem(params.appKey, JSON.stringify(context.store))
      }
    }),

    persist: ({ context }) => {
      localStorage.setItem(context.appKey, JSON.stringify(context.store))
    },

    setItem: assign(({ context }, params: { key: string; value: any }) => {
      context.store[params.key] = params.value
      context.result = params.value
    }),

    getItem: assign(({ context }, params: { key: string }) => {
      context.result = context.store[params.key]
    }),

    removeItem: assign(({ context }, params: { key: string }) => {
      delete context.store[params.key]
      context.result = undefined
    }),

    clear: assign(({ context }) => {
      context.store = {}
      context.result = undefined
    }),
  },
}).createMachine({
  context: ({ input }: any) => {
    return {
      appKey: input.appKey || "__json_play__",
      config: {},
      current: {},
      store: {},
      result: undefined,
    }
  },

  entry: [
    {
      type: "load",
      params: ({ context }) => ({
        appKey: context.appKey,
      }),
    },
  ],

  on: {
    setItem: {
      actions: {
        type: "setItem",
        params: mapFromEvent(),
      },
    },

    getItem: {
      actions: {
        type: "getItem",
        params: mapFromEvent(),
      },
    },

    removeItem: {
      actions: [
        {
          type: "removeItem",
          params: ({ event }) => mapFromEvent(),
        },
        "persist",
      ],
    },

    clear: {
      actions: ["clear", "persist"],
    },
  },
})

export const useLocalstorage = () => {
  const { jsonContext } = useJson()
  const localStorageRef = jsonContext?.refs?.localStorage

  const localStorageId = localStorageRef?.id

  const localStorageState: any = useSelector(localStorageRef, (state) => state)
  const localStorageContext = localStorageState?.context

  const sendTolocalStorage = localStorageRef?.send

  const config = localStorageContext?.config
  const current = localStorageContext?.current

  const appKey = localStorageContext?.appKey
  const store = localStorageContext?.store
  const result = localStorageContext?.result

  return {
    localStorageRef,
    localStorageId,
    sendTolocalStorage,

    localStorageState,
    localStorageContext,

    appKey,
    store,
    result,
  }
}
