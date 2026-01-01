"use client"
import { useSelector } from "@xstate/react"
import { useAppRoot } from "../../selectors/app.root.selector"

export const useResource = ({ resourceId = null }: any) => {
  const { appRootRef, appRootContext } = useAppRoot()

  const resourceRef = appRootContext?.resourcesRef?.[resourceId]
  const resourceState: any = useSelector(resourceRef, (state) => state)
  const resourceContext = resourceState?.context
  const sendToResource = resourceRef?.send

  const data = resourceContext?.data

  return {
    resourceId,
    resourceRef,
    sendToResource,
    resourceState,
    resourceContext,
    data,
  }
}
