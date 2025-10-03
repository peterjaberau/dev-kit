"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { createMachine, assign } from "xstate"
import { SYSTEM_ACTOR_ID } from './constants'
import { exampleMachine } from "./machines"


export const rootMachine = createMachine({
  entry: assign({
    example: ({ spawn }) => spawn(exampleMachine, { systemId: SYSTEM_ACTOR_ID.EXAMPLE }),
  }),
})

export const RootActorContext = createActorContext(rootMachine)

export const RootActorProvider = ({ children }: any) => {
  return <RootActorContext.Provider>{children}</RootActorContext.Provider>
}
