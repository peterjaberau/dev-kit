"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { appMachine } from "../machines"

export const AppContext = createActorContext<any>()

export const AppProvider = ({ children, data }: any) => {

  console.log('---data----', {
    data
  })

  return (
    <AppContext.Provider logic={appMachine(data)} >
      {children}
    </AppContext.Provider>
  )
}
