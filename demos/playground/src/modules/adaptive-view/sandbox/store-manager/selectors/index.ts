"use client"

import * as React from "react"
import { useSelector } from "@xstate/react"
import type { ActorRefFrom } from "xstate"
import { StoreManagerContext } from "../provider"
import { LOCAL_STORE_ID, localStorageMachine } from "../machines"

export function useStoreManager() {
  const storeManagerRef = StoreManagerContext.useActorRef()
  const storeManagerState = StoreManagerContext.useSelector((state) => state)
  const storeManagerContext = storeManagerState.context
  const localStoreRef = storeManagerState.children[LOCAL_STORE_ID] as
    | ActorRefFrom<typeof localStorageMachine>
    | undefined
  const storeManagerSnapshot = storeManagerRef.getSnapshot()

  return {
    storeManagerRef,
    sentToStoreManager: storeManagerRef.send,
    storeManagerState,
    storeManagerSnapshot,
    storeManagerContext,
    localStoreRef,
  }
}

export function useLocalStore<T = unknown>(key: string) {
  const { localStoreRef } = useStoreManager()
  const localStoreState = useSelector(localStoreRef, (state) => state)
  const localStoreContext = localStoreState?.context
  const localStoreSnapshot = localStoreRef?.getSnapshot()
  const value = localStoreContext?.data[key] as T | null | undefined

  const save = React.useCallback(
    (nextValue: T) => {
      localStoreRef?.send({
        type: "SET_ITEM",
        key,
        value: nextValue,
      })
    },
    [key, localStoreRef],
  )

  const reset = React.useCallback(() => {
    localStoreRef?.send({ type: "RESET_ITEM", key })
  }, [key, localStoreRef])

  const load = React.useCallback(
    () => localStoreRef?.getSnapshot().context.data[key] as T | null | undefined,
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
