import { useSelector } from "@xstate/react"
import { useCallback } from "react"
import { DesktopContext } from "../providers/DesktopProvider"

export function useEvents() {
  const eventsRef = DesktopContext.useSelector((state) => state.context.eventsRef)
  const subscriptions = useSelector(eventsRef, (state: any) => state.context.subscriptions)
  const subscribe = useCallback(
    (systemId: string, eventTypes: string[]) =>
      eventsRef.send({ type: "events.subscribe", params: { systemId, eventTypes } }),
    [eventsRef],
  )
  const unsubscribe = useCallback(
    (systemId: string, eventTypes: string[]) =>
      eventsRef.send({ type: "events.unsubscribe", params: { systemId, eventTypes } }),
    [eventsRef],
  )

  return {
    eventsRef,
    sendToEvents: eventsRef.send,
    subscriptions,
    subscribe,
    unsubscribe,
  }
}
