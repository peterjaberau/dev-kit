"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { desktopMachine } from "../machines"

export const DesktopContext = createActorContext(desktopMachine)

export const DesktopProvider = ({ children, input = {} }: any) => {
  return <DesktopContext.Provider options={{ input }}>{children}</DesktopContext.Provider>
}
