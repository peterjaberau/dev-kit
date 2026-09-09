"use client"

import * as React from "react"
import { createActorContext } from "@xstate/react"
import { adaptiveDebuggerMachine } from "./machine"

export const AdaptiveDebuggerContext = createActorContext(adaptiveDebuggerMachine)

export function AdaptiveDebuggerProvider({ children }: React.PropsWithChildren) {
  return <AdaptiveDebuggerContext.Provider>{children}</AdaptiveDebuggerContext.Provider>
}
