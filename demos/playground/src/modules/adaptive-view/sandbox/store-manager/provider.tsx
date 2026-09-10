"use client"

import * as React from "react"
import { createActorContext } from "@xstate/react"
import { storeManagerMachine, type StoreManagerInput } from "./machines"

export const DEFAULT_STORE_MANAGER_INPUT: StoreManagerInput = {
  data: {
    "sandbox.layout": {},
  },
}

export const StoreManagerContext = createActorContext(storeManagerMachine)

export interface StoreManagerProviderProps extends React.PropsWithChildren {
  input?: StoreManagerInput
}

export function StoreManagerProvider({ children, input = DEFAULT_STORE_MANAGER_INPUT }: StoreManagerProviderProps) {
  return <StoreManagerContext.Provider options={{ input }}>{children}</StoreManagerContext.Provider>
}
