"use client"

import { assign, setup } from "xstate"

export type LocalStoreEvent =
  | { type: "HYDRATE" }
  | { type: "SET_ITEM"; key: string; value: unknown }
  | { type: "RESET_ITEM"; key: string }

const readItem = (key: string, fallback: unknown): unknown => {
  if (typeof window === "undefined") {
    return fallback
  }

  try {
    const stored = window.localStorage.getItem(key)
    return stored === null ? fallback : JSON.parse(stored)
  } catch {
    return fallback
  }
}

const hydrateData = (data: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(Object.entries(data).map(([key, fallback]) => [key, readItem(key, fallback)]))

const writeItem = (key: string, value: unknown) => {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The store may be unavailable or full. The actor remains the source of
    // truth for the current session even when persistence fails.
  }
}

const removeItem = (key: string) => {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.removeItem(key)
  } catch {
    // Ignore an unavailable store; context is still reset below.
  }
}

const hasStoredItem = (key: string): boolean => {
  if (typeof window === "undefined") {
    return false
  }

  try {
    return window.localStorage.getItem(key) !== null
  } catch {
    return false
  }
}

export const localStoreMachine = setup({
  types: {
    events: {} as LocalStoreEvent,
    input: {} as { initialLayout?: unknown },
  },
  actions: {
    persistInitialData: ({ context }) => {
      for (const [key, value] of Object.entries(context.data)) {
        if (!hasStoredItem(key)) {
          writeItem(key, value)
        }
      }
    },
    hydrate: assign({
      data: ({ context }) => hydrateData(context.data),
    }),
    setItem: assign({
      data: ({ context, event }) => {
        if (event.type !== "SET_ITEM") {
          return context.data
        }

        writeItem(event.key, event.value)
        return { ...context.data, [event.key]: event.value }
      },
    }),
    resetItem: assign({
      data: ({ context, event }) => {
        if (event.type !== "RESET_ITEM") {
          return context.data
        }

        removeItem(event.key)
        return {
          ...context.data,
          [event.key]: null,
        }
      },
    }),
  },
}).createMachine({
  id: "local-store",
  initial: "ready",
  context: ({ input }) => {
    const settings = { storeKey: "sandbox-adaptive-view" }
    return {
      settings,
      data: hydrateData({ [settings.storeKey]: input?.initialLayout ?? null }),
    }
  },
  entry: "persistInitialData",
  states: {
    ready: {
      on: {
        HYDRATE: { actions: "hydrate" },
        SET_ITEM: { actions: "setItem" },
        RESET_ITEM: { actions: "resetItem" },
      },
    },
  },
})
