"use client"
import { createActorContext, useSelector } from "@xstate/react"
import { assign, enqueueActions, setup } from "xstate"
import { JsonTreeInstanceContext } from '../providers'



export function useJsonTreeInstance() {
  const instanceRef = JsonTreeInstanceContext.useActorRef()
  const sendToInstance = instanceRef.send

  const instanceState: any = useSelector(instanceRef, (state) => state)
  const instanceContext = instanceState.context

  const instanceId = instanceRef?.id

  return {
    instanceRef,
    sendToInstance,
    instanceId,

    instanceState,
    instanceContext,
  }
}

