"use client"
import React from "react"
import { createActorContext } from "@xstate/react"
import { desktopMachine } from "../machines"

export const DesktopContext = createActorContext(desktopMachine)

const inspect = (inspectionEvent: any) => {
  if (inspectionEvent.type !== "@xstate.event" || inspectionEvent.sourceRef !== inspectionEvent.actorRef) return

  const events = inspectionEvent.actorRef.system.get("events")
  if (!events || inspectionEvent.event.type.startsWith("events.")) return

  events.send({
    type: "events.inspected",
    params: {
      event: inspectionEvent.event,
      sourceSystemId: inspectionEvent.sourceRef.systemId,
    },
  })
}

export const DesktopProvider = ({ children, input = {} }: any) => {
  return <DesktopContext.Provider options={{ input, systemId: "desktop", inspect }}>{children}</DesktopContext.Provider>
}
