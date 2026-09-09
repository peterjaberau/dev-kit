"use client"

import { AdaptiveDebuggerContext } from "./provider"

export function useAdaptiveDebugger() {
  const adaptiveDebuggerRef = AdaptiveDebuggerContext.useActorRef()
  const adaptiveDebuggerState = AdaptiveDebuggerContext.useSelector((state) => state)
  const adaptiveDebuggerContext = adaptiveDebuggerState.context

  return {
    adaptiveDebuggerRef,
    adaptiveDebuggerState,
    adaptiveDebuggerContext,
    adaptiveDebuggerSnapshot: adaptiveDebuggerRef.getSnapshot(),
    adaptiveDebuggerId: adaptiveDebuggerRef.id,
    sentToAdaptiveDebugger: adaptiveDebuggerRef.send,
    api: adaptiveDebuggerContext.api,
    open: adaptiveDebuggerContext.open,
  }
}
