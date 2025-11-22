"use client"
import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const usePattern = () => {
  const { rootPatternRef: patternRef } = useRootActors()
  const patternState: any = useSelector(patternRef, (state) => state)
  const patternContext = patternState?.context || {}
  const sendToPattern = patternRef?.send

  // states: initiating, ready
  const canCreate = patternState?.hasTag("canCreate")
  const canTerminate = patternState?.hasTag("canTerminate")

  // states: creating, terminating
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

  const config = patternContext?.config || {}



  const isInitiating = patternState?.matches("initiating")
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


  const canState = {
    canCreate,
    canTerminate,
    canStart,
    canProcess,
    canComplete,
  }

  const isState = {
    isInitiating,
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

  const allowState = {
    allowCreate: canCreate && !guard.isAutoCreate,
  }

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

    canState,
    isState,
    allowState,

    config
  }
}
