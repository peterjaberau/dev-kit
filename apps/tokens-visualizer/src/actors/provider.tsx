"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { createMachine, assign } from "xstate"
import { SYSTEM_ACTOR_ID } from './constants'
import { graphGridMachine } from "./machines"


export const rootMachine = createMachine({
  entry: assign({
    graphGrid: ({ spawn }) => spawn(graphGridMachine, { systemId: SYSTEM_ACTOR_ID.GRAPH_GRID }),
  }),
})

export const RootActorContext = createActorContext(rootMachine)

export const RootActorProvider = ({ children }: any) => {
  return <RootActorContext.Provider>{children}</RootActorContext.Provider>
}
