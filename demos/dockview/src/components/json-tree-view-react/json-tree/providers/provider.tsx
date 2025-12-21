"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { jsonTreeMachine } from '../machines'

export const AppContext = createActorContext(jsonTreeMachine)

export const AppProvider = ({ children }: any) => {
  return <AppContext.Provider>{children}</AppContext.Provider>
}
