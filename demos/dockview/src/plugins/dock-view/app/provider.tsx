"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { dockViewRootMachine } from '#plugin-dock-view'

export const DockViewContext = createActorContext(dockViewRootMachine)

export const DockViewProvider = ({ children }: any) => {
  return <DockViewContext.Provider>{children}</DockViewContext.Provider>
}
