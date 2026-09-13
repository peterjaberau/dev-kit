"use client"

import { useSelector } from "@xstate/react"
import type { ActorRefFrom } from "xstate"
import { InstanceManagerContext } from "./provider"
import {
  DESKTOP_INSTANCE_ID,
  desktopInstanceMachine,
  registryComponentMachine,
  type RegistryComponentProps,
} from "./machines"

const EMPTY_PROPS: RegistryComponentProps = {}

export function useInstanceManager() {
  const instanceManagerRef = InstanceManagerContext.useActorRef()
  const instanceManagerState = InstanceManagerContext.useSelector((state) => state)
  const instanceManagerContext = instanceManagerState.context
  const instanceChildren = instanceManagerState.children
  const instanceRefs = Object.fromEntries(
    Object.entries(instanceChildren).filter(([id]) => id !== DESKTOP_INSTANCE_ID),
  ) as Record<string, ActorRefFrom<typeof registryComponentMachine> | undefined>
  const instanceIds = Object.keys(instanceRefs)
  const instancesList = instanceIds.map((id) => {
    const configuredInstance = instanceManagerContext.data.instances.find((instance) => instance.id === id)
    const actorInstance = instanceRefs[id]?.getSnapshot().context

    return {
      id,
      name: configuredInstance?.plugin ?? actorInstance?.plugin ?? id,
    }
  })
  const metadata = {
    instances: instancesList,
  }
  const instanceManagerSnapshot = instanceManagerRef.getSnapshot()

  return {
    instanceManagerRef,
    sentToInstanceManager: instanceManagerRef.send,
    instanceManagerContext,
    instanceManagerState,
    instanceManagerSnapshot,
    instanceManagerId: instanceManagerRef.id,
    metadata,
    instanceRefs,
    instanceIds,
    instancesList,
  }
}

export function useDesktopInstance() {
  const desktopInstanceRef = InstanceManagerContext.useSelector(
    (state) => state.children[DESKTOP_INSTANCE_ID] as ActorRefFrom<typeof desktopInstanceMachine> | undefined,
  )
  const desktopInstanceState = useSelector(desktopInstanceRef, (state) => state)
  const desktopInstanceContext = desktopInstanceState?.context
  const desktopInstanceSnapshot = desktopInstanceRef?.getSnapshot()

  return {
    desktopInstanceRef,
    sendToDesktopInstance: desktopInstanceRef?.send,
    desktopInstanceContext,
    desktopInstanceState,
    desktopInstanceSnapshot,
    selectedInstanceId: desktopInstanceContext?.selectedInstanceId ?? null,
  }
}

export function useInstance(instanceId: string) {
  const instanceRef = InstanceManagerContext.useSelector(
    (state) => state.children[instanceId] as ActorRefFrom<typeof registryComponentMachine> | undefined,
  )
  const instanceState = useSelector(instanceRef, (state) => state)
  const instanceContext = instanceState?.context
  const instanceProps = instanceContext?.props ?? EMPTY_PROPS
  const instancePlugin = instanceContext?.plugin
  const instanceSnapshot = instanceRef?.getSnapshot()

  return {
    instanceRef,
    sentToInstance: instanceRef?.send,
    instanceContext,
    instanceState,
    instanceSnapshot,
    instanceProps,
    instancePlugin,
    instanceId,
  }
}
