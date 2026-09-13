"use client"

import * as React from "react"
import { createActorContext } from "@xstate/react"
import { dockviewManagerMachine } from "./machines"

export const DockviewManagerContext = createActorContext(dockviewManagerMachine)

export function DockviewManagerProvider({ children }: React.PropsWithChildren) {
  return <DockviewManagerContext.Provider>{children}</DockviewManagerContext.Provider>
}
