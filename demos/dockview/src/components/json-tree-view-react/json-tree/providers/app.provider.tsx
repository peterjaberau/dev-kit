"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { appMachine } from "../machines"

export const AppContext = createActorContext(appMachine)

export const AppProvider = (props: any) => {
  const { children, ...rest } = props
  console.log("Legacy AppProvider props:", props)
  return (
    <AppContext.Provider
      options={{
        input: { ...rest },
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
