"use client"

import * as React from "react"
import { createActorContext } from "@xstate/react"
import { storeManagerMachine } from "./machines"

export const DEFAULT_STORE_MANAGER_INPUT: any = {
  data: {
    "sandbox.layout": {},
  },
}

export const StoreManagerContext = createActorContext(storeManagerMachine)


export function StoreManagerProvider({ children, input = DEFAULT_STORE_MANAGER_INPUT }: any) {
  return <StoreManagerContext.Provider options={{ input }}>{children}</StoreManagerContext.Provider>
}
