"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { rootMachine } from './machine'

export const ActorsModelContext = createActorContext(rootMachine)

export const ActorsModelProvider = ({ children }: any) => {
  return <ActorsModelContext.Provider>{children}</ActorsModelContext.Provider>
}
