"use client"

import * as React from "react"
import { useSelector } from "@xstate/react"
import type { ActorRefFrom } from "xstate"
import type { localStoreMachine } from "../machines/local-store.machine"
import { useDesktop } from "./desktop.selector"

export function useLocalStore<T = unknown>(storeKey?: string) {
  const { desktopContext } = useDesktop()
  const localStoreRef = (desktopContext.store.localStoreRef ?? undefined) as
    | ActorRefFrom<typeof localStoreMachine>
    | undefined
  const localStoreState = useSelector(localStoreRef, (state) => state)
  const localStoreContext = localStoreState?.context
  const localStoreSnapshot = localStoreRef?.getSnapshot()
  const key = storeKey ?? localStoreContext?.settings.storeKey
  const value = (key ? localStoreContext?.data[key] : undefined) as T | null | undefined

  const save = React.useCallback(
    (nextValue: T) => {
      if (!key) return
      localStoreRef?.send({
        type: "SET_ITEM",
        key,
        value: nextValue,
      })
    },
    [key, localStoreRef],
  )

  const reset = React.useCallback(() => {
    if (key) localStoreRef?.send({ type: "RESET_ITEM", key })
  }, [key, localStoreRef])

  const load = React.useCallback(
    () => (key ? localStoreRef?.getSnapshot().context.data[key] : undefined) as T | null | undefined,
    [key, localStoreRef],
  )

  return {
    localStoreRef,
    sentToLocalStore: localStoreRef?.send,
    localStoreState,
    localStoreSnapshot,
    localStoreContext,
    data: localStoreContext?.data,
    key,
    value,
    saved: value,
    save,
    load,
    reset,
  }
}
