'use client'
import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const usePattern = () => {

  const { rootPatternRef: patternRef } = useRootActors()

  const patternState: any = useSelector(patternRef, (state) => state)
  const isTerminated = !patternState?.value || false

  if (isTerminated) return {
    patternRef,
    sendToPattern: null,
    fireEvent: null,

    patternState: null,
    patternContext: {},

    stateStatus: {},
    stateCan: {},

    isReady: null,
    isCreating: null,
    isTerminating: null,
    isCreatingStart: null,
    isCreatingProcess: null,
    isCreatingComplete: null,

    isTerminatingStart: null,
    isTerminatingProcess: null,
    isTerminatingComplete: null,
    isTerminated
  } as any

  console.log(patternState)

  const patternContext = patternState.context

  const sendToPattern = patternRef.send

  const isReady = patternState.matches('ready')
  const isCreating = patternState.matches('creating')
  const isTerminating = patternState.matches('terminating')

  const isCreatingStart = patternState.matches('creating.start')
  const isCreatingProcess = patternState.matches('creating.process')
  const isCreatingComplete = patternState.matches('creating.complete')

  const isTerminatingStart = patternState.matches('creating.start')
  const isTerminatingProcess = patternState.matches('creating.process')
  const isTerminatingComplete = patternState.matches('creating.complete')


  const fireEvent = (type: any) => sendToPattern({ type: type })

  const canCreate = patternState.hasTag('canCreate')
  const canTerminate = patternState.hasTag('canTerminate')
  const canStart = patternState.hasTag('canStart')
  const canProcess = patternState.hasTag('canProcess')
  const canComplete = patternState.hasTag('canComplete')


  const stateCan = {
    canCreate,
    canTerminate,
    canStart,
    canProcess,
    canComplete
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
    isTerminatingComplete
  }


  return {
    patternRef,
    sendToPattern,
    fireEvent,

    patternState,
    patternContext,

    stateStatus,
    stateCan,

    isReady,
    isCreating,
    isTerminating,
    isCreatingStart,
    isCreatingProcess,
    isCreatingComplete,

    isTerminatingStart,
    isTerminatingProcess,
    isTerminatingComplete,

    isTerminated


  }
}
