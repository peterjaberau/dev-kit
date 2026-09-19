"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { rootMachine } from "../machines"

export const AppStoreContext = createActorContext(rootMachine)


export const AppStoreProvider = ({ children, input = {} }: any) => {
  return <AppStoreContext.Provider options={{ input }}>{children}</AppStoreContext.Provider>
}
