"use client"
import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const usePattern = () => {
  const { rootPatternRef: patternRef } = useRootActors()
  const patternState: any = useSelector(patternRef, (state) => state)
  const patternContext = patternState?.context || {}
  const sendToPattern = patternRef?.send

  const canCreate = patternState?.hasTag("canCreate")
  const canTerminate = patternState?.hasTag("canTerminate")
  const canStart = patternState?.hasTag("canStart")
  const canProcess = patternState?.hasTag("canProcess")
  const canComplete = patternState?.hasTag("canComplete")
  const stateCan = {
    canCreate,
    canTerminate,
    canStart,
    canProcess,
    canComplete,
  }

  const guard = {
    isAutoCreate: patternContext?.config.autoCreate && patternContext?.instance.isCreated === false,
    isAutomateCreation: patternContext?.config.automateCreation || patternContext?.config.autoCreate,
    isAutomateTermination: patternContext?.config.automateTermination,
    isInstance: patternContext?.instance.isInitiated,
    isInstanceInitiated: patternContext?.instance.isInitiated,
    isInstanceCreated: patternContext?.instance.isCreated,
  }

  const isReady = patternState?.matches("ready")
  const isCreating = patternState?.matches("creating")
  const isTerminating = patternState?.matches("terminating")

  const isCreatingStart = patternState?.matches("creating.start")
  const isCreatingProcess = patternState?.matches("creating.process")
  const isCreatingComplete = patternState?.matches("creating.complete")

  const isTerminatingStart = patternState?.matches("creating.start")
  const isTerminatingProcess = patternState?.matches("creating.process")
  const isTerminatingComplete = patternState?.matches("creating.complete")

  const fireEvent = (type: any) => sendToPattern({ type: type })

  const stateStatus = {
    isReady,
    isCreating,
    isTerminating,
    isCreatingStart,
    isCreatingProcess,
    isCreatingComplete,
    isTerminatingStart,
    isTerminatingProcess,
    isTerminatingComplete,
  }

  const allowed = {
    allowCreate: canCreate && !guard.isAutoCreate,
  }

  return {
    patternRef,
    sendToPattern,
    fireEvent,

    patternState,
    patternContext,

    guard,

    stateStatus,
    stateCan,
    allowed,
  }
}
