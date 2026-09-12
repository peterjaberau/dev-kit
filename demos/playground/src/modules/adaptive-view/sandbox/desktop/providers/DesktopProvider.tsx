"use client"
import React from "react"
import { createActorContext, useSelector } from "@xstate/react"
import { desktopMachine } from "../machines"

export const DesktopContext = createActorContext(desktopMachine)

export const DesktopProvider = ({ children, input = {} }: any) => {
  return <DesktopContext.Provider options={{ input }}>{children}</DesktopContext.Provider>
}

export const useDesktop = () => {
  const actorRef = DesktopContext.useActorRef()

  const sendTo = actorRef.send
  const state = useSelector(actorRef, (state) => state)
  const context = state.context

  return {
    desktopRef: actorRef,
    sendToDesktop: sendTo,
    desktopState: state,
    desktopContext: context,
    dockviewApi: context.dockviewApi,
  }
}
