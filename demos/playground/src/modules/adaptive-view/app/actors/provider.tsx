"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { rootMachine } from './machines'

export const ActorsModelContext = createActorContext(rootMachine)

export const ActorsModelProvider = ({ children, input = {} }: any) => {
  return <ActorsModelContext.Provider options={{ input }}>{children}</ActorsModelContext.Provider>
}
